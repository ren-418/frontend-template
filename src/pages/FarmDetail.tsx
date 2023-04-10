import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Layout from '../components/Layout/Layout'
import Icon from '../components/Icon';
import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/pagination/pagination.min.css";
import '../assets/style/slider.css'

import line from '../assets/img/backline.webp'
import mine from '../assets/img/mine.webp'


interface FarmDetailInterface {
	selectedTab: number
}

const FarmDetail = () => {
	// @ts-ignore
	const theme = useContext(ThemeContext)

	const [status, setStatus] = React.useState<FarmDetailInterface>({
		selectedTab: 1
	})
	const updateStatus = (params: Partial<FarmDetailInterface>) => setStatus({ ...status, ...params })
	
	return (
		<Layout>
			<StyledFarmPanel>
				<div className="backimg" style={{zIndex: -1}}>
					<img src= {line} alt="line-back" />
				</div>
				<div className="container">
					<h1>Stacking game</h1>
					<StyledPanel style={{zIndex: 100}}>
						<div className="row">
							<div className="col-lg-3 col-md-6 col-sm-12">
								<div className="flex center">
									<img src= {mine} alt="img" />
								</div>
							</div>
							<div className="col-lg-9 col-md-6 col-sm-12">
								<div className="row">
									<div className="col-lg-6 col-sm-12">
										<p>Game Address</p>
										<div className="flex blue middle" >
											<p className='blue m0'>0x3983453453455345345345</p>
											<div className='pointer'><Icon icon = "Copy" marginLeft={12} height={20} /></div>
										</div>
									</div>
									<div className="col-lg-6 col-sm-12">
										<p>Name</p>
										<p className='m0'>Loganworld</p>
									</div>
								</div>
								<div className="hr"></div>
								<div className="row">
									<div className="col-lg-3 col-6">
										<p>Staking amount</p>
										<p className='m0'>0 CBT</p>
									</div>
									<div className="col-lg-3 col-6">
										<p>Total Stack</p>
										<p className='m0'>0 CBT</p>
									</div>
									<div className="col-lg-3 col-6">
										<p>Pool Balance</p>
										<p className='m0'>0 CBT</p>
									</div>
									<div className="col-lg-3 col-6">
										<p>My Balance</p>
										<p className='m0'>0 CBT</p>
									</div>
								</div>
								<div className="row mt5">
									<div className="col-lg-6 col-sm-12">
										<div style={{borderRadius: '1rem', backgroundColor: '#0d2a43', padding: '1rem'}}>
											<div className="flex">
												<StyledVIPTab>
													<div className={`menu ${status.selectedTab === 1 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 1})}}>
														Manual
													</div>
													<div className={`menu ${status.selectedTab === 2 ? 'active' : ''}`} onClick={() => {updateStatus({selectedTab: 2})}}>
														Auto
													</div>
												</StyledVIPTab>
											</div>
											<div className="flex middle mt3">
												<div style={{width: '100%'}}>
													<input type="text" style = {{border: '1px solid ' + theme.borderColor, width: '100%'}}/>
												</div>
												<button className="btn ml2" style={{backgroundColor: '#1F8A00'}}>Stacking</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</StyledPanel>
				</div>
			</StyledFarmPanel>
		</Layout>
	)
}

export default FarmDetail;


const StyledVIPTab = styled.div`
	background-color: #021321;
	padding: 4px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 45px;
	@media (max-width: 768px) {
		width: 100%;
	}
	.menu{
		cursor: pointer;
		margin: 0 4px;
		border-radius: 45px;
		background-color: transparent;
		color:  ${({ theme }) => (theme.grey)};
		padding: 10px 1rem;
		min-width: 80px;
		text-align: center;
		&.active {
			background-color: #154269;
			color: white;
		}
		&:hover {
			background-color: #054269;
			color: white;
		}
		@media (max-width: 768px) {

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
		padding: 1rem;
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
		z-index: 0;
		img {
			width: 700px;
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