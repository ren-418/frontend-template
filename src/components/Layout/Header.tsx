import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import decode from "jwt-decode";
import { useWallet } from 'use-wallet'
import styled from 'styled-components'
import detectEthereumProvider from '@metamask/detect-provider'
import useStore from '../../useStore';
import Modal from '../Modal'
import Icon from '../Icon';
import { Now, copyToClipboard, tips, validateEmail, validateUsername } from '../../util';
import config from '../../config.json'
import networks from '../../blockchain/networks.json'

import logo from '../../assets/img/logo.webp'
import bnb from '../../assets/img/bnb.svg'

interface HeaderInterface {
	showLoginModal: boolean
	showRegisterModal: boolean
	showWalletModal: boolean
	showMenuModal: boolean
	signupmail: string
	signupname: string
	walletTab: number
	withdrawAddress: string
	withdrawAmount: string
	walletStatus: number
}

const Header = () => {
	// @ts-ignore
	const history = useHistory();
	const wallet = useWallet()
	const {logined, currentAccountAddress, update, call} = useStore()

	const [status, setStatus] = React.useState<HeaderInterface>({
		showLoginModal: false,
		showRegisterModal: false,
		showWalletModal: false,
		showMenuModal: false,
		signupmail: '',
		signupname: '',
		walletTab: 1,
		withdrawAddress: '',
		withdrawAmount: '',
		walletStatus: 0
	})
	const updateStatus = (params: Partial<HeaderInterface>) => setStatus({ ...status, ...params })
	

	const login = async () => {
		try {
			if(status.walletStatus === 0) {
				return window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank");
			}
			else if(status.walletStatus === 1) {
				await wallet.connect()
			}
			else if(status.walletStatus === 2) {
				update({loading: true})
				const signature = await sign()
				update({loading: true})
				const result = await call("/api/login", {
					address: wallet.account,
					sign: signature,
				})
				if(result){
					switch(result['message']) {
						case "success": {
							const token = result['token'];
							var data = decode(token) as any;
							update({
								currentAccountMail: data.email, 
								currentAccountName: data.name, 
								currentAccountAddress: data.address,
								token: token, 
								logined: true,
								lasttime: Now()
							})
							tips("success", "Welcome to login"); 
							updateStatus({showLoginModal: false, showMenuModal: false})
							history.push("/")
							break;
						}
						case "Please enter all required data.": tips("error", "Please enter all required data"); break;
						case "No exists user.": tips("error", "User doesn't exists"); break;
						case "No match password.": tips("warning", "Incorrect password"); break;
						case "internal error": tips("error", "Error"); break;
					}
				}
				update({loading: false})
			}
			else if(status.walletStatus === 3) {
				switchNetwork(config.CHAINID)
			}
		} catch(ex) {
			console.log(ex.message)
			update({loading: false})
			return tips("error", "Error")
		}
	}

	const signup = async () => {
		try {
			const name = status.signupname;
			const email = status.signupmail;
			if(email.trim() === "" || !validateEmail(email)) return tips("error", "Email format invalid");
			if(name.trim() === "" || !validateUsername(name)) return tips("error", "Name format invalid");
			
			if(status.walletStatus === 0) {
				return window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn", "_blank");
			}
			else if(status.walletStatus === 1) {
				await wallet.connect()
			}
			else if(status.walletStatus === 2) {
				update({loading: true})
				const signature = await sign()
				const result = await call("/api/signup/register", {
					name: name,
					email: email,
					address: wallet.account,
					sign: signature
				})
				if(result){
					switch(result['message']) {
						case "success": tips("success", "Registered successfully"); updateStatus({showRegisterModal: false, showLoginModal: true, showMenuModal: false}); break;
						case "Please enter all required data.": tips("error", "Invalid input value"); break;
						case "Already exists same name or email or phone.": tips("error", "Already registered same user"); break;
						case "internal error": tips("error", "Error"); break;
					}
				}
				update({loading: false})
			}
			else if(status.walletStatus === 3) {
				switchNetwork(config.CHAINID)
			}
		} catch(ex) {
			update({loading: false})
			return tips("error", "Error")
		}
	} 

	const detect = async () => {
		const provider = await detectEthereumProvider()
		if (provider) {
			updateStatus({ walletStatus: 1 })
		} else {
			updateStatus({ walletStatus: 0 })
		}
	}

	const switchNetwork = async (chainId: number) => {
		try {
			const ret = await wallet.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x' + Number(chainId).toString(16) }],
			})
		} catch (error) {
			console.log(error)
			addNetwork(config.CHAINID)
		}
	}

	const addNetwork = async (chainId: number) => {
		try {
			const network = networks.find((data) => data.chainId == chainId)
			await wallet.ethereum.request({
				method: 'wallet_addEthereumChain',
				params: [
					{
						chainId: `0x${Number(chainId).toString(16)}`,
						chainName: network.name,
						nativeCurrency: {
							name: network.name,
							symbol: network.symbol,
							decimals: network.decimals,
						},
						rpcUrls: [network.rpc],
						blockExplorerUrls: [network.explorer],
					},
				],
			})
			switchNetwork(chainId)
		} catch (err) {
			tips('warning', "Error add network ")
		}
	}

	const sign = async () => {
		try {
			const signature = await wallet.ethereum?.request({
				method: 'personal_sign',
				params: [
					`Welcome to CBETWORLD! \n Click to sign in and accept the Terms of Service. \n This request will not trigger a blockchain transaction or cost any gas fees. \n Wallet address: ${wallet.account}`,
					wallet.account,
				],
			})
			return signature
		} catch (err) {
			console.log(err)
		}
	}

	React.useEffect(() => {
		detect()
	}, [])


	const logOut = () => {
		update({
			currentAccountMail: '',
			currentAccountName: '',
			currentAccountAddress: '',
			token: '',
			logined: false,
			lasttime: 0,
		})
		updateStatus({showWalletModal: false, showMenuModal: false})
		wallet.reset()
	}

	React.useEffect(() => {
		// if (!wallet.ethereum && logined ) return logOut()
		if (wallet.status != 'connected') {
			wallet.connect()
			updateStatus({ walletStatus: 1 })
			return
		}
		if (
			wallet.account &&
			!logined &&
			Number(wallet.chainId) === config.CHAINID
		) {
			updateStatus({ walletStatus: 2 })
		}
		if ((!logined && status.walletStatus == 1)) {
			if (Number(wallet.chainId) !== config.CHAINID) {
				updateStatus({ walletStatus: 3 })
			}
		}
	}, [wallet.chainId, wallet.status, status.walletStatus])

	return (
		<StyledHeader>
			<header>
				<Link className="logo" to={"/"}>
					<img src= {logo} />
					<h2>CBETWORLD</h2>
				</Link>
				<div className="container">
					<div className="justify">
						<div></div>
						{
							!logined && <div></div>
						}
						{
							logined && <div className='balance' style={{display: window.innerWidth > 1280 ? 'flex': 'none'}}>
								<div className="flex middle coin">
									-0.343223 
									<img src={bnb} alt='coin' style={{marginLeft: '8px'}}/>
								</div>
								<div className="wallet" onClick={() => {updateStatus({showWalletModal: true})}}>Wallet</div>
							</div>
						}
						{
							logined &&
								<div className="flex middle">
									<div className="search">
										<div className="icon">
											<Icon icon = "Search" height={18}></Icon>
										</div>
										<input type="text" placeholder='Search'/>
									</div>
									<div className="menus">
										<Link to ="/profile" className='mr3'> <Icon icon = "User" /> </Link>
										<Link to ="/chat" className='ml1 mr3'> <Icon icon = "Chat" size={19}/> </Link>
										<div className='cursor ml1 mr3' style={{color: '#7c7c7c'}} onClick={() => {logOut()}}> 
											<Icon icon = "Logout" size={24}/>
										</div>
									</div>
								</div>
						}
						{
							!logined && <div className="flex center" style={{display: window.innerWidth > 768 ? 'flex': 'none'}}>
								<div className='sign-in' onClick={() => {updateStatus({showLoginModal: true})}}>SIGN IN</div>
								<div className='sign-up'  onClick={() => {updateStatus({showRegisterModal: true})}}>REGISTER</div>
							</div>
						}
					</div>
				</div>
				
				<div className='pointer' style={{display: window.innerWidth < 768 ? 'flex': 'none'}} onClick={() => {updateStatus({showMenuModal: true})}}>
					<Icon icon='Menu' size={20} margin={14}></Icon>
				</div>
			</header>
			{
				status.showMenuModal && <StyledModal>
					<div className="overlay" onClick={() => {updateStatus({showMenuModal: false})}}></div>
					<div className="modal-container">
						<div className='cursor' style={{position: 'fixed', right: '1rem', top: '1rem'}} onClick={() => {updateStatus({showMenuModal: false})}}>
							<Icon icon="Close" marginLeft={10} size={22}/>
						</div>
						<StyledMenubar>
							<Link className="menu" to = "/casino" onClick={() => {updateStatus({showMenuModal: false})}}>
								<div className="icon" >
									<Icon icon="Casino" size={20}/>
								</div>
								<p className='p0 m0'>Casino</p>
							</Link>
							<Link className="menu" to = "/farm" onClick={() => {updateStatus({showMenuModal: false})}}> 
								<div className="icon" >
									<Icon icon="Sport" size={20}/>
								</div>
								<p className='p0 m0'>Sport</p>
							</Link>
							<Link className="menu" to = "/promotion" onClick={() => {updateStatus({showMenuModal: false})}}>
								<div className="icon" >
									<Icon icon="Promotion" size={17} height={20}/>
								</div>
								<p className='p0 m0'>Promotions</p>
							</Link>
							<Link className="menu" to = "/affiliate" onClick={() => {updateStatus({showMenuModal: false})}}>
								<div className="icon" >
									<Icon icon="Sport" size={20}/>
								</div>
								<p className='p0 m0'>Sponsership</p>
							</Link>
							<Link className="menu" to = "/blog" onClick={() => {updateStatus({showMenuModal: false})}}>
								<div className="icon" >
									<Icon icon="Blog" size={20}/>
								</div>
								<p className='p0 m0'>Blog</p>
							</Link>
							<Link className="menu" to = "/support" onClick={() => {updateStatus({showMenuModal: false})}}>
								<div className="icon" >
									<Icon icon="Support" size={20}/>
								</div>
								<p className="p0 m0">Live Support</p>
							</Link>
						</StyledMenubar>
						<div className='mt3'>
							{
								logined && <div className="flex middle center mt3 mb3">
									<Link to ="/" className='mr3'> <Icon icon = "User" /> </Link>
									<Link to ="/" className='ml1 mr3'> <Icon icon = "Chat" size={19}/> </Link>
									<div className='cursor ml1 mr3' style={{color: '#7c7c7c'}} onClick={() => {logOut()}}> 
										<Icon icon = "Logout" size={24}/>
									</div>
								</div>
							}
							<div className="search" style={{width: '100%', margin: '1rem 0'}}>
								<div className="icon">
									<Icon icon = "Search" height={18}></Icon>
								</div>
								<input type="text" placeholder='Search'/>
							</div>
							{
								logined && <div className='balance'>
									<div className="flex middle coin">
										-0.343223 
										<img src={bnb} alt='coin' style={{marginLeft: '8px'}}/>
									</div>
									<div className="wallet" onClick={() => {updateStatus({showWalletModal: true})}}>Wallet</div>
								</div>
							}
						</div>
						{
							!logined && <div className="flex center mt1" >
								<div className='sign-in' onClick={() => {updateStatus({showLoginModal: true})}}>SIGN IN</div>
								<div className='sign-up'  onClick={() => {updateStatus({showRegisterModal: true})}}>REGISTER</div>
							</div>
						}
					</div>	
				</StyledModal>
			}
			<Modal onClose = {() => {updateStatus({showRegisterModal: false})}} show={status.showRegisterModal} >
				<div style={{position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer'}} onClick={() => {updateStatus({showRegisterModal: false})}}>
					<Icon icon = "Close" size={22}/>
				</div>
				<h1 className='text-center mt3'>REGISTER</h1>
				<p className='mt3 mb1'>Email</p>
				<input type="text" style={{width: '100%', fontSize: '18px'}} value={status.signupmail} onChange={(v) => {updateStatus({signupmail: v.target.value})}}/>
				<p className='mt3 mb1'>Username</p>
				<input type="text" style={{width: '100%', fontSize: '18px'}} value={status.signupname} onChange={(v) => {updateStatus({signupname: v.target.value})}}/>
				<button className="btn mt3" style={{backgroundColor: '#1F8A00'}} onClick={signup}>
					{
						status.walletStatus === 0 && "Install metamask"
					}
					{
						status.walletStatus === 1 && "Connect metamask"
					}
					{
						status.walletStatus === 2 && "Sign"
					}
					{
						status.walletStatus === 3 && "Change network"
					}
				</button>
				<p className='text-center'>Already have an account? <span style={{color: '#1F8A00', cursor: 'pointer'}} onClick={() => {updateStatus({showLoginModal: true, showRegisterModal: false})}}>Sign In</span></p>
			</Modal>
			
			<Modal onClose = {() => {updateStatus({showLoginModal: false})}} show={status.showLoginModal} >
				<div style={{position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer'}} onClick={() => {updateStatus({showLoginModal: false})}}>
					<Icon icon = "Close" size={22}/>
				</div>
				<h1 className='text-center mt3'>SIGN IN</h1>
				<button className="btn mt3" style={{backgroundColor: '#1F8A00'}} onClick={login}>
					{
						status.walletStatus === 0 && "Install metamask"
					}
					{
						status.walletStatus === 1 && "Connect metamask"
					}
					{
						status.walletStatus === 2 && "Sign"
					}
					{
						status.walletStatus === 3 && "Change network"
					}
				</button>

				<p className='text-center'>Forgot Password?</p>
				<p className='text-center'>New user? <span style={{color: '#1F8A00', cursor: 'pointer'}} onClick={() => {updateStatus({showLoginModal: false, showRegisterModal: true})}}>Sign UP Now</span></p>
			</Modal>

			<Modal onClose = {() => {updateStatus({showWalletModal: false})}} show={status.showWalletModal} >
				<div className="flex center mt1">
					<StyledTab>
						<div className={`menu ${status.walletTab === 1 ? 'active' : ''}`} onClick={() => {updateStatus({walletTab: 1})}}>
							Deposit
						</div>
						<div className={`menu ${status.walletTab === 2 ? 'active' : ''}`} onClick={() => {updateStatus({walletTab: 2})}}>
							Withdraw
						</div>
					</StyledTab>
				</div>
				{
					status.walletTab === 1 && <>
						<p className='mt3 mb1'>Address</p>
						 <input type="text" style={{width: '100%', fontSize: '18px'}} value={currentAccountAddress} readOnly/>
						<button className="btn mt3 mb5" style={{backgroundColor: '#1F8A00'}} onClick={() => {copyToClipboard(currentAccountAddress)}}>COPY ADDRESS</button>
					</>
				}
				{ 
					status.walletTab === 2 && <>
						 <p className='mt3 mb1'>Target address</p>
						 <input type="text" style={{width: '100%', fontSize: '18px'}} value={status.withdrawAddress} onChange={(v) => {updateStatus({withdrawAddress: v.target.value})}}/>

						 <p className='mt3 mb1'>Withdraw Amount</p>
						 <input type="number" style={{width: '100%', fontSize: '18px'}} value={status.withdrawAmount} onChange={(v) => {updateStatus({withdrawAmount: v.target.value})}}/>
						
						<button className="btn mt3 mb5" style={{backgroundColor: '#1F8A00'}}>WITHDRAW</button>
					</>
				}
			</Modal>
			
		</StyledHeader>
	) 
};
 
export default Header;

const StyledMenubar = styled.div`
	.menu{
		display: flex;
		align-items: center;
		color:  ${({ theme }) => (theme.white)};
		text-decoration: none;
		.icon{
			padding: 8px;
			border-radius: 8px;
			display: flex;
			align-items: center;
			color: #2072b7;
			background-color:  ${({ theme }) => (theme.menuiconbg)};
			margin-right: 1rem;
			transition: 0.2s;
		}
		cursor: pointer;
		padding: 4px 0;
		min-width: 250px;
		font-size: 1.2rem;
		transition: 0.2s;
		&:hover {
			.icon {
				color: #2491ed;
				background-color:  #1c527e;
			}
		}
	}
`


const StyledModal = styled.div`
	display: flex;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 10001;
	top: 0;
	left: 0;
	flex-direction: row;

	justify-content: flex-end;
	-webkit-animation: fadein 0.2s; /* Safari, Chrome and Opera > 12.1 */
	   -moz-animation: fadein 0.2s; /* Firefox < 16 */
		-ms-animation: fadein 0.2s; /* Internet Explorer */
		 -o-animation: fadein 0.2s; /* Opera < 12.1 */
			animation: fadein 0.2s;
	@keyframes fadein {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
	.overlay{
		position: fixed;
		background-color: ${({theme}) => theme.modalOverlay};
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		opacity: ${({theme}) => theme.modalOpacity};
	}
	.modal-container{
		display: block;
		height: 100vh;
		background-color:#1c1c1c;
		color: ${({theme}) => theme.text};
		padding: 5rem 2rem 2rem;
		position: absolute;
		max-width: 600px;
		min-width: 300px;
		margin-left: auto;
		width: 50%;
		z-index: 10002;
		max-height: 100vh;
		overflow-y: auto;
		@media (max-width: 768px) {
			margin: 0;
			width: 100%;
			max-width: 100vw;
			border-radius: 0;
			position: fixed;
			bottom: 0;
			left: 0;
			max-height: 100vh;
			padding: 5rem 1rem;
		}
	}

	
	.btn {
		display: block;
		cursor: pointer;
		border-radius: 8px;
		padding:  1rem;
		width: 100%;
		text-align: center;
		color: ${({ theme }) => (theme.white)};
		border: none;
		font-weight: bold;
		font-size: 1rem;
		&:hover {
			filter: brightness(0.9);
		}
	}

	.menus {
		display: flex;
		align-items: center;
	}
	.search {
		border-color: #7c7c7c;
		border-width: 1px;
		border-style: solid;
		border-radius: 35px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 2rem;
		.icon{
			margin: 0 0 0 1rem;
		}
		input {
			border: none;
			outline: none;
			background-color: transparent;
			width: 100px;
			margin: 0;
			padding: 8px 1rem;
			font-size: 1rem;
			@media (max-width: 768px) {
				width: 100%;
			}
		}
	}

	.balance {
		border-color: #16436a;
		border-width: 1px;
		border-style: solid;
		border-radius: 35px;
		display: flex;
		justify-content: space-between;
		.coin{
			margin: 0 1rem;
		}
		.wallet {
			right: 0;
			top: 0;
			cursor: pointer;
			background: #17a3c4;
			background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
			border-radius: 35px;
			padding: 8px 1rem;
			border-width: 1px;
			border-style: solid;
			border-color:   ${({ theme }) => (theme.header)};
			color:   ${({ theme }) => (theme.white)};
			min-width: 120px;
			text-align: center;
			&:hover {
				background: linear-gradient(36deg, #17a3c4 0.00%, #0a5096 100.00%);
			}
		}
	}
	.sign-in{
		cursor: pointer;
		background: #17a3c4;
		background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
		border-radius: 35px;
		padding: 8px 1rem;
		margin: 8px;
		border-width: 1px;
		border-style: solid;
		border-color:   ${({ theme }) => (theme.header)};
		color:   ${({ theme }) => (theme.white)};
		min-width: 120px;
		text-align: center;
		&:hover {
			background: linear-gradient(36deg, #17a3c4 0.00%, #0a5096 100.00%);
		}
	}
	.sign-up{
		cursor: pointer;
		background: #17a3c4;
		background: transparent;
		border-radius: 35px;
		padding: 8px 1rem;
		margin: 8px;
		border-width: 1px;
		border-style: solid;
		border-color: #39caff;
		color:   ${({ theme }) => (theme.white)};
		min-width: 120px;
		text-align: center;
		&:hover {
			border-color: #44ddff;
		}
	}
`

const StyledTab = styled.div`
	background-color: #021321;
	padding: 4px 2rem;
	display: flex;
	align-items: center;
	border-radius: 45px;
	.menu{
		cursor: pointer;
		margin: 0 4px;
		border-radius: 45px;
		background-color: transparent;
		color:  ${({ theme }) => (theme.grey)};
		padding: 10px 1rem;
		&.active {
			background-color: #154269;
			color: white;
		}
		&:hover {
			background-color: #054269;
			color: white;
		}
	}
`
const StyledHeader = styled.div`
	background-color:  ${({ theme }) => (theme.header)};
	padding: 8px 1rem;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10000;
	width: 100%;
	@media (max-width: 768px) {
		padding: 0.5rem 0;
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.sign-in{
			cursor: pointer;
			background: #17a3c4;
			background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
			border-radius: 35px;
			padding: 8px 1rem;
			margin: 8px;
			border-width: 1px;
			border-style: solid;
			border-color:   ${({ theme }) => (theme.header)};
			color:   ${({ theme }) => (theme.white)};
			min-width: 120px;
			text-align: center;
			&:hover {
				background: linear-gradient(36deg, #17a3c4 0.00%, #0a5096 100.00%);
			}
		}
		.sign-up{
			cursor: pointer;
			background: #17a3c4;
			background: transparent;
			border-radius: 35px;
			padding: 8px 1rem;
			margin: 8px;
			border-width: 1px;
			border-style: solid;
			border-color: #39caff;
			color:   ${({ theme }) => (theme.white)};
			min-width: 120px;
			text-align: center;
			&:hover {
				border-color: #44ddff;
			}
		}
	}
	.logo{
		display: flex;
		align-items: center;
		margin: 0 1rem;
		img {
			width: 60px;
		}
		text-decoration: none;
		color: ${({ theme }) => (theme.white)};
		@media (max-width: 768px) {
			img {
				width: 60px;
			}
			h2 {
				font-size: 1.4rem;
			}
		}
	}

	.btn {
		display: block;
		cursor: pointer;
		border-radius: 8px;
		padding:  1rem;
		width: 100%;
		text-align: center;
		color: ${({ theme }) => (theme.white)};
		border: none;
		font-weight: bold;
		font-size: 1rem;
		&:hover {
			filter: brightness(0.9);
		}
	}

	.menus {
		display: flex;
		align-items: center;
		@media (max-width: 768px) {
			display: none;
		}
	}
	.search {
		border-color: #7c7c7c;
		border-width: 1px;
		border-style: solid;
		border-radius: 35px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 2rem;
		.icon{
			margin: 0 0 0 1rem;
		}
		input {
			border: none;
			outline: none;
			background-color: transparent;
			width: 100px;
			margin: 0;
			padding: 8px 1rem;
			font-size: 1rem;
			@media (max-width: 768px) {
				width: 100%;
			}
		}
		@media (max-width: 768px) {
			display: none;
		}
	}

	.balance {
		border-color: #16436a;
		border-width: 1px;
		border-style: solid;
		border-radius: 35px;
		display: flex;
		justify-content: space-between;
		.coin{
			margin: 0 1rem;
		}
		.wallet {
			right: 0;
			top: 0;
			cursor: pointer;
			background: #17a3c4;
			background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
			border-radius: 35px;
			padding: 8px 1rem;
			border-width: 1px;
			border-style: solid;
			border-color:   ${({ theme }) => (theme.header)};
			color:   ${({ theme }) => (theme.white)};
			min-width: 120px;
			text-align: center;
			&:hover {
				background: linear-gradient(36deg, #17a3c4 0.00%, #0a5096 100.00%);
			}
		}
	}
`
