import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { FreeMode, Pagination, Autoplay } from "swiper";
import Layout from '../components/Layout/Layout'
import Progress from '../components/Progress'
import Icon from '../components/Icon'
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';

import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/pagination/pagination.min.css";
import '../assets/style/slider.css'

import casino from '../assets/img/casinoback.png'
import line from '../assets/img/backline.webp'
import mine from '../assets/img/mine.webp'
import hilo from '../assets/img/hilo.webp'
import diamond from '../assets/img/diamond.webp'
import shootout from '../assets/img/shootout.webp'
import limbo from '../assets/img/limbo.webp'
import bitcoin from '../assets/img/bnb.svg'
import vip from '../assets/img/vip.webp'
import bonusDiamond from '../assets/img/diamon.png'
import button from '../assets/img/button.webp'
import bonus from '../assets/img/bonus.webp'
import star from '../assets/img/star.png'


interface HomeInterface {
	sortType: string
	selectedTab: number
	showVIPModal: boolean
	selectedProgressModal: number
}

const Home = () => {
	// @ts-ignore
	const theme = useContext(ThemeContext)

	const [status, setStatus] = React.useState<HomeInterface>({
		sortType: "popular",
		selectedTab: 1,
		showVIPModal: false,
		selectedProgressModal: 2
	})
	const updateStatus = (params: Partial<HomeInterface>) => setStatus({ ...status, ...params })
	
	return (
		<Layout>
			<StyledAbout>
				<div className="backimg">
					<img src= {line} alt="line-back" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-sm-12" onClick={() => {updateStatus({showVIPModal: true})}}>
							<h2>Welcome back, <span className='blue'>Loganworld</span></h2>
							<div className="justify middle">
								<p>Your VIP Progress</p>
								<p className='blue'>4.10%</p>
							</div>
							<Progress value={50} />
							<div className="justify mt3">
								<div className='grey'>
									<Icon icon = "Star" size={24}/>
								</div>
								<div style={{color: '#C7B318' }}>
									<Icon icon = "Star" size={24}/>
								</div>
							</div>
							<div className="justify">
								<p className='m0 grey'>None</p>
								<p className='m0 grey'>Bronze</p>
							</div>
						</div>
						<div className="col-lg-8 col-sm-12 flex center middle">
							<img src = {casino} alt = "casino" className='casino-img'/>
						</div>
					</div>
				</div>
			</StyledAbout>
			<StyledCardPanel>
				<div className="container">
					<div className="search-bar mb3">
						<div className="search-input">
							<div className="icon">
								<Icon icon = "Search" size={20} height={22} marginLeft={20} />
							</div>
							<input type="text" placeholder='Search your game' />
							<button>VIEW ALL</button>
						</div>
						<div className="flex middle sort right">
							<div className="flex middle mr3">
								<Icon icon = "Sort" height={25} size={16} margin={10} marginLeft={10}/>
								<p>Sort By</p>
							</div>
							<Dropdown
								selectedKey={status.sortType}
								values={ 
									[
										{name: "Popular", key: "popular"},
										{name: "Latest", key: "Latest"}
									]
								}
								onChange={(key) => {updateStatus({sortType: key})}}
								// props={{style: {height: '100%', border: '1px solid' + theme.boxColor}}}
							></Dropdown>
						</div>	
					</div>
					<Swiper
							slidesPerView={window.innerWidth / 300}
							spaceBetween={10}
							freeMode={true}
							pagination={{
								clickable: true
							}}
							navigation={true}
							modules={[FreeMode, Pagination, Autoplay]}
							className="mySwiper"
							loop={true}
							autoplay={{
								delay: 2000,
								disableOnInteraction: false
							}}
						>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/">
									<img src={mine} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/">
									<img src={hilo} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/">
									<img src={diamond} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/">
									<img src={shootout} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/">
									<img src={limbo} alt="card" />
								</Link>
							</SwiperSlide>
					</Swiper>
				</div>
			</StyledCardPanel>
			<StyledBetPanel>
				<div className="container">
					<div className="panel">
						<div className="tab-list">
							<div className={`tab-menu ${status.selectedTab === 1 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 1})}}>Casino Bets</div>
							<div className={`tab-menu ${status.selectedTab === 2 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 2})}}>Casino Bets</div>
							<div className={`tab-menu ${status.selectedTab === 3 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 3})}}>Race Leaderboard</div>
						</div>
						<div className="table mt3">
							<div className="tr th">
								<div className="td">Game</div>
								<div className="td">User</div>
								<div className="td">Time</div>
								<div className="td">Bet Amount</div>
								<div className="td">Multiplier</div>
								<div className="td">Payout</div>
							</div>
							<div className="tbody">
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='' >-0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
								<div className="tr">
									<div className="td">Dice</div>
									<div className="td">KKKKKK</div>
									<div className="td">2:45 PM</div>
									<div className="td">0.34342 <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
									<div className="td">0.00x</div>
									<div className="td"><span className='green' >0.34342</span> <img src = {bitcoin} alt = "coin-img" style={{margin: '0 8px'}} /> </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</StyledBetPanel>
			<Modal onClose = {() => {updateStatus({showVIPModal: false})}} show={status.showVIPModal} >
				<div className="flex center mt1">
					<StyledVIPTab>
						<div className={`menu ${status.selectedProgressModal === 1 ? 'active' : ''}`} onClick={() => {updateStatus({selectedProgressModal: 1})}}>
							How it work
						</div>
						<div className={`menu ${status.selectedProgressModal === 2 ? 'active' : ''}`} onClick={() => {updateStatus({selectedProgressModal: 2})}}>
							VIP progress
						</div>
						<div className={`menu ${status.selectedProgressModal === 3 ? 'active' : ''}`} onClick={() => {updateStatus({selectedProgressModal: 3})}}>
							Daily Bonous
						</div>
					</StyledVIPTab>
				</div>
				{
					status.selectedProgressModal === 1 && <>
						<div style={{padding: '0 0 0 1rem', borderLeft: '1px solid rgba(255,255,255, 0.3)', position: 'relative'}} className='mt3'>
							<div style={{position: 'absolute', left: '-11px', top: '-1px', backgroundColor: theme.modalBg, width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255, 0.3)'}}></div>
							<h4 style={{color: '#cfcfcf'}} className='m0 '>Step 1</h4>
							<p style={{color: '#cfcfcf'}} className='m0 p0 pb3'>Your progress is a sum accumulated through your wager on both our casino and sportsbook. Increasing through the tiers entitles you to bigger rewards and exclusive VIP treatment.</p>
						</div>
						<div style={{padding: '0 0 0 1rem', borderLeft: '1px solid rgba(255,255,255, 0.3)', position: 'relative'}}>
							<div style={{position: 'absolute', left: '-11px', top: '-1px', backgroundColor: theme.modalBg, width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255, 0.3)'}}></div>
							<h4 style={{color: '#cfcfcf'}} className='m0 '>Step 2</h4>
							<p style={{color: '#cfcfcf'}} className='m0 p0 pb3'>Your progress is a sum accumulated through your wager on both our casino and sportsbook. Increasing through the tiers entitles you to bigger rewards and exclusive VIP treatment.</p>
						</div>
						<div style={{padding: '0 0 0 1rem', borderLeft: '1px solid rgba(255,255,255, 0.3)', position: 'relative'}}>
							<div style={{position: 'absolute', left: '-11px', top: '-1px', backgroundColor: theme.modalBg, width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255, 0.3)'}}></div>
							<h4 style={{color: '#cfcfcf'}} className='m0'>Step 3</h4>
							<p style={{color: '#cfcfcf'}} className='m0 p0 mb5'>Your progress is a sum accumulated through your wager on both our casino and sportsbook. Increasing through the tiers entitles you to bigger rewards and exclusive VIP treatment.</p>
						</div>
					</>
				}
				{
					status.selectedProgressModal === 2 && <>
						<div className="flex center mt1">
							<img src={vip} alt="vip" style={{width: '250px', objectFit: 'cover'}}/>
						</div>
						<div className="justify middle">
							<p className='m0'>Your VIP Progress</p>
							<p  className='blue m0'>4.10%</p>
						</div>
						<Progress value={50} />
						<div className="justify mt3">
							<div className='grey'>
								<Icon icon = "Star" size={24}/>
							</div>
							<div style={{color: '#C7B318' }}>
								<Icon icon = "Star" size={24}/>
							</div>
						</div>
						<div className="justify">
							<p className='m0 grey'>None</p>
							<p className='m0 grey'>Bronze</p>
						</div>
						<p style={{color: '#cfcfcf'}}>
							Your progress is a sum accumulated through your wager on both our casino and sportsbook. Increasing through the tiers entitles you to bigger rewards and exclusive VIP treatment.
						</p>
					</>
				}
				{
					status.selectedProgressModal === 3 && <> 
						<StyledBonusPanel className='mt3'>
							<div className="header">
								<div className="flex middle center">
									<div className="flex wrap">
										<img src = {star} alt = "star" style={{width: '30px', margin: '2px'}} />
										<img src = {star} alt = "star" style={{width: '30px', margin: '2px'}} />
										<img src = {star} alt = "star" style={{width: '30px', margin: '2px'}} />
									</div>
									<img src= {bonus} alt="bonus" style={{width: '150px', height: '100px', objectFit: 'cover'}}/>
									<div className="flex wrap right">
										<img src = {star} alt = "star" style={{width: '30px', margin: '2px'}} />
										<img src = {star} alt = "star" style={{width: '30px', margin: '2px'}} />
										<img src = {star} alt = "star" style={{width: '30px', margin: '2px'}} />
									</div>
								</div>
							</div>
							<div className="card-panel">
								<div className="card">
									<p>1 Day</p>
									<div className="diamond">
										<img src={bonusDiamond} alt="diamond" />
									</div>
									<div className="bonus" style={{backgroundImage: ` url(${button})`, backgroundSize: '100% 100%'}}>100</div>
								</div>
								<div className="card">
									<p>2 Day</p>
									<div className="diamond">
										<img src={bonusDiamond} alt="diamond" />
									</div>
									<div className="bonus" style={{backgroundImage: ` url(${button})`, backgroundSize: '100% 100%'}}>200</div>
								</div>
								<div className="card">
									<p>3 Day</p>
									<div className="diamond">
										<img src={bonusDiamond} alt="diamond" />
									</div>
									<div className="bonus" style={{backgroundImage: ` url(${button})`, backgroundSize: '100% 100%'}}>300</div>
								</div>
								<div className="card">
									<p>4 Day</p>
									<div className="diamond">
										<img src={bonusDiamond} alt="diamond" />
									</div>
									<div className="bonus" style={{backgroundImage: ` url(${button})`, backgroundSize: '100% 100%'}}>400</div>
								</div>
								<div className="card">
									<p>5 Day</p>
									<div className="diamond">
										<img src={bonusDiamond} alt="diamond" />
									</div>
									<div className="bonus" style={{backgroundImage: ` url(${button})`, backgroundSize: '100% 100%'}}>500</div>
								</div>
							</div>
						</StyledBonusPanel>
					</>
				}
			</Modal>
		</Layout>
	)
}

export default Home;

const StyledBonusPanel = styled.div`
	border-radius: 2rem;
	background: #ff7e32;
	background: linear-gradient(180deg, #ff7e32 0.00%, #fb345b 100.00%);
	padding: 1rem 0;
	.card-panel{
		display: grid;
		grid-template-columns: auto auto auto auto auto;
		grid-gap: 4px;
		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.2);
		padding: 8px;
		margin: 8px 4px;
		@media (max-width: 768px) {
			grid-template-columns: auto auto auto;
		}
		.card {
			background: #ff7e32;
			background: linear-gradient(180deg, #ff7e32 0.00%, #fb345b 100.00%);
			border-radius: 1rem  1rem 1px 1px;
			text-align: center;
			cursor: pointer;
			.diamond{
				margin: 1rem auto;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.2);
				padding: 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					width: 40px;
					object-fit: cover;
				}
			}
			p{
				font-weight: bold;
			}
			.bonus{
				font-weight: bold;
				text-align: center;
				cursor: pointer;
				padding: 6px;
			}
			transition: 0.2s;
			&:hover {
				transform: translateY(-2px);
				box-shadow: 0 1px 3px #000000ab;
			}
		}
	}
`

const StyledVIPTab = styled.div`
	background-color: #021321;
	padding: 4px 0;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border-radius: 45px;
	@media (max-width: 768px) {
		justify-content: center;
		padding: 8px;
	}
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

const StyledBetPanel = styled.div`
	background: #081623;
	padding: 3rem;

	.panel {
		background-color: #072d4e;
		border-radius: 30px;
		padding: 1rem;
		.green {
			color: #33E24E;
		}
		.table{
			.tbody{
				max-height: 700px;
				overflow: auto;
			}
			.tr{
				display: flex;
				transition: 0.1s;
				cursor: pointer;
				padding: 1rem 0;
				border-radius: 8px;
				&:hover {
					background-color: #00466e!important;
				}
				.td {
					padding: 0 1rem;
					display: flex;
					min-width: 100px;
					align-items: center;
					&:nth-child(1) { flex:2;}
					&:nth-child(2) { flex:2;}
					&:nth-child(3) { flex:2;}
					&:nth-child(4) { flex:2;}
					&:nth-child(5) { flex:2;}
					&:nth-child(6) { flex:2;}
					@media (max-width: 768px) {
						padding: 0;
					}
				}
				&.th {
					color: #a3a3a3;
					@media (max-width: 768px) {
						display: none;
					}
				}
				&:nth-child(2n) {
					background-color: #002443;
				}
			}
		}
	}
	.tab-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.tab-menu {
			transition: 0.2s;
			cursor: pointer;
			background: #02223d;
			border-radius: 1rem;
			padding: 1rem 2rem;
			margin-right: 1rem;
			border: none;
			color:   ${({ theme }) => (theme.white)};
			min-width: 120px;
			text-align: center;
			&:hover {
				&.active {
					background: linear-gradient(36deg, #17a3c4 0.00%, #0a5096 100.00%);
				}
				background: #0c3c64;
			}
			&.active {
				background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
			}
			@media (max-width: 768px) {
				padding: 10px;
				margin: 4px auto;
			}
		}
	}
	@media (max-width: 768px) {
		padding: 3rem 8px;	
	}
`

const StyledCardPanel = styled.div`
	background: #03080d;
	padding: 3rem;
	.search-bar{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.search-input {
			flex: 9;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			background-color: #011c33;
			border: 1px solid none;
			border-radius: 40px;
			padding: 0;
			input {
				font-size: 1.2rem;
				color: ${({ theme }) => (theme.white)};
				border: none;
				background: none;
				width: 100%;
				margin: 0 1rem;
				outline: none;
				@media (max-width: 768px) {
					margin: 0;
				}
			}
			button {
				cursor: pointer;
				background: #17a3c4;
				background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
				border-radius: 35px;
				padding: 8px 1rem;
				margin: 8px;
				color:   ${({ theme }) => (theme.white)};
				border: none;
				min-width: 120px;
				text-align: center;
				&:hover {
					background: linear-gradient(36deg, #17a3c4 0.00%, #0a5096 100.00%);
				}
			}
		}
		.sort {
			flex: 3;
			@media (max-width: 768px) {
				justify-content: center;
			}
		}
		@media (max-width: 768px) {
			display: block;	
		}
	}
	.card{
		cursor: pointer;
		border-radius: 1rem;
		overflow: hidden;
		img {
			width: 100%;
			transition: 0.2s;
			border-radius: 1rem;
			max-width: 250px;
			&:hover {
				transform: scale(1.06);
				filter: 
			}
		}
	}
	@media (max-width: 768px) {
		padding: 3rem 8px;
	}
`

const StyledAbout = styled.div`
	background: #154269;
	background: linear-gradient(143deg, #154269 0.00%, #010305 100.00%);
	width: 100%;
	padding: 3rem;
	position: relative;
	overflow: hidden;
	.blue {
		color: ${({ theme }) => (theme.bluetext)};
	}
	.grey {
		color: ${({ theme }) => (theme.grey)};
	}
	.backimg {
		img {
			width: 700px;
			position: absolute;
			top: 0;
			right: 0;
			z-index: 0;
			-webkit-animation: line-animation 3s infinite; /* Safari, Chrome and Opera > 12.1 */
			-moz-animation: line-animation 3s infinite; /* Firefox < 16 */
			-ms-animation: line-animation 3s infinite; /* Internet Explorer */
			-o-animation: line-animation 3s infinite; /* Opera < 12.1 */
				animation: line-animation 3s infinite;
		}	
		@keyframes line-animation {
			0% { opacity: 0.6;  }
			25% { opacity: 0.7; }
			50% { opacity: 0.9; }
			75%   { opacity: 1; }
			100%   { opacity: 0.6; }
		}
	}
	.casino-img {
		-webkit-animation: img-animation 16s infinite; /* Safari, Chrome and Opera > 12.1 */
			-moz-animation: img-animation 16s infinite; /* Firefox < 16 */
			-ms-animation: img-animation 16s infinite; /* Internet Explorer */
			-o-animation: img-animation 16s infinite; /* Opera < 12.1 */
				animation: img-animation 16s infinite;
		@keyframes img-animation {
			0% { 
				transform: translateY(-2px);
			}
			15% {
				transform: translateY(5px) translateX(-2px) translateZ(3px);
			}
			30% {
				transform: translateY(5px) translateX(5px) translateZ(-3px);
			}
			50% {
				transform: translateY(-3px) translateX(-3px) translateZ(-5px);
			}
			65% {
				transform: translateY(6px) translateX(2px) translateZ(5px);
			}
			80% {
				transform: translateY(5px) translateX(2px) translateZ(3px);
			}
			100% {
				transform: none;
			}
		}
        @media (max-width: 768px) {
			width: 250px;
		}
	}
	@media (max-width: 768px) {
		h2 {
			font-size: 1.1rem;
		}
		padding: 3rem 8px;
	}
`