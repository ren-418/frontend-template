import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Layout from '../components/Layout/Layout'
import Icon from '../components/Icon';
import Dropdown from '../components/Dropdown';

import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/pagination/pagination.min.css";
import '../assets/style/slider.css'

import line from '../assets/img/backline.webp'


interface AffiliateInterface {
	selectedTab: number
	filter: string
}

const Affiliate = () => {
	// @ts-ignore
	const theme = useContext(ThemeContext)

	const [status, setStatus] = React.useState<AffiliateInterface>({
		selectedTab: 1,
		filter: 'deposit'
	})
	const updateStatus = (params: Partial<AffiliateInterface>) => setStatus({ ...status, ...params })
	
	return (
		<Layout>
			<StyledFarmPanel>
				<div className="backimg">
					<img src= {line} alt="line-back" />
				</div>
				<div className="container">
					<h1>Affiliate program</h1>
					<StyledPanel style={{zIndex: 100}}>
						<StyledTab>
							<div className={`menu ${status.selectedTab === 1 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 1})}}>
								How it works
							</div>
							<div className={`menu ${status.selectedTab === 2 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 2})}}>
								Referred Users
							</div>
						</StyledTab>
						{
							status.selectedTab === 1 && <>
								<p className='mt3'>
								CBETWORLD is owned and operated by Medium Rare N.V., registration number: 145353, registered address: Fransche Bloemweg, 4 Willemstad Curaçao. Contact us at support@stake.com. Payment agent company is Medium Rare Limited with address 7-9 Riga Feraiou, LIZANTIA COURT, Office 310, Agioi Omologites, 1087 Nicosia, Cyprus and Registration number: HE 410775 Stake is authorized and regulated by the Government of Curacao and operates under License No. 8048/JAZ issued to Antillephone. Stake has passed all compliance and is legally authorized to conduct gaming operations for all games of chance and wagering.
								</p>
								<h4 className='m0 mt3'>Referral Link</h4>
								<div className="justify flex">
									<div style={{backgroundColor: '#213648', borderRadius: '8px', margin: '8px 0', padding: '1rem'}} className='flex middle'>
										<p className='m0 mr3'>Stack.com/234234234</p>
										<span style={{color: theme.bluetext, cursor: 'pointer'}}><Icon icon = "Copy" height={22}></Icon></span>
									</div>
									<div style={{backgroundColor: '#213648', borderRadius: '8px', margin: '8px 0', padding: '1rem', cursor:'pointer'}} className='flex middle'>
										Download Banners
									</div>
								</div>
							</>
						}
						{
							status.selectedTab ===2 && <>
								<p>Compaign Name</p>
								<div className="row">
									<div className="col-lg-4 col-sm-6">
									<Dropdown
										selectedKey={status.filter}
										values={ 
											[
												{name: "Deposit Count", key: "deposit"},
												{name: "Latest", key: "Latest"}
											]
										}
										onChange={(key) => {updateStatus({filter: key})}}
										// props={{style: {height: '100%', border: '1px solid' + theme.boxColor}}}
									></Dropdown>
									</div>
								</div>
								<div className="table mt3">
									<div className="tr th">
										<div className="td">Username</div>
										<div className="td">Registred</div>
										<div className="td">Total Deposits</div>
										<div className="td">Last Seposits</div>
										<div className="td">Wagered</div>
										<div className="td">Commission</div>
									</div>
									<div className="tbody">
										<div className="tr">
											<div className="td">Dice</div>
											<div className="td">KKKKKK</div>
											<div className="td">4534</div>
											<div className="td">aaa</div>
											<div className="td">fewrrw</div>
											<div className="td">45345</div>
										</div>
									</div>
								</div>
							</>
						}
					</StyledPanel>
				</div>
			</StyledFarmPanel>
		</Layout>
	)
}

export default Affiliate;


const StyledTab = styled.div`
	padding: 4px 0;
	display: flex;
	align-items: center;
	.menu{
		cursor: pointer;	
		border-color: #343434;
		border-width: 2px;
		border-bottom-style: solid;
		color:  ${({ theme }) => (theme.grey)};
		padding: 10px 1rem;
		min-width: 80px;
		user-select: none;
		&.active {
			color: white;
			border-bottom: 2px solid #20d4ff;
		}
		&:hover {
			border-bottom: 2px solid #054269;
			color: white;
		}
		@media (max-width: 768px) {
			padding: 8px;
		}
	}
`
const StyledPanel = styled.div`
	border-radius: 30px;
	background: #021626;
	padding: 3rem 2rem;
	margin: 2rem auto;
	z-index: 100;
	@media (max-width: 768px) {
		padding: 3rem 8px;
	}
    .btn {
        display: block;
        cursor: pointer;
        border-radius: 8px;
        padding: 12px;
        text-align: center;
        color: ${({ theme }) => (theme.white)};
        border: none;
        font-weight: bold;
        font-size: 1rem;
        &:hover {
            filter: brightness(0.9);
        }
    }
	.table{
		border-radius: 8px;
		border: 1px solid  ${({ theme }) => (theme.borderColor)};
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
			.td {
				padding: 0 1rem;
				display: flex;
				align-items: center;
				&:nth-child(1) { flex:2;}
				&:nth-child(2) { flex:2;}
				&:nth-child(3) { flex:2;}
				&:nth-child(4) { flex:2;}
				&:nth-child(5) { flex:2;}
				&:nth-child(6) { flex:2;}
				@media (max-width: 768px) {
					min-width: 120px;
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
`

const StyledFarmPanel = styled.div`
	background: #154269;
	background: linear-gradient(143deg, #154269 0.00%, #010305 100.00%);
	width: 100%;
	padding: 3rem;
	position: relative;
	overflow: hidden;
	@media (max-width: 768px) {
		padding: 3rem 8px;
	}
	.hr {
		border-bottom: 0.2px solid #2b4e70 ;
		margin: 1rem 0;
	}
	.blue {
		color: ${({ theme }) => (theme.bluetext)};
	}
	.grey {
		color: ${({ theme }) => (theme.grey)};
	}
	.backimg {
		img {
			width: 700px;
			z-index: 0;
			position: absolute;
			top: -150px;
			right: -400px;
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
`