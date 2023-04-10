import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { FreeMode, Pagination, Autoplay } from "swiper";
import Layout from '../components/Layout/Layout'

import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/pagination/pagination.min.css";
import '../assets/style/slider.css'

import line from '../assets/img/backline.webp'
import mine from '../assets/img/mine.webp'
import hilo from '../assets/img/hilo.webp'
import diamond from '../assets/img/diamond.webp'
import shootout from '../assets/img/shootout.webp'
import limbo from '../assets/img/limbo.webp'


interface FarmInterface {
}

const Farm = () => {
	// @ts-ignore
	const theme = useContext(ThemeContext)

	const [status, setStatus] = React.useState<FarmInterface>({
	})
	const updateStatus = (params: Partial<FarmInterface>) => setStatus({ ...status, ...params })
	
	return (
		<Layout>
			<StyledFarmPanel>
				<div className="backimg">
					<img src= {line} alt="line-back" />
				</div>
				<div className="container">
					<h1>CBC <span className='blue'>Staking</span></h1>
					<div className="justify mt3 ">
						<h3>Pick the gaming</h3>
						<div className='flex' style={{borderRadius: '8px', zIndex: 100}}>
							<h4 style={{color: 'white', backgroundColor: '#02060A', padding: '1rem 1.2rem', borderRadius: '8px 0 0 8px', border: '1px solid #60ceff', borderRight: 'none'}}>
								Total Stack
							</h4>
							<h4 style={{color: 'white', backgroundColor: theme.dropdown, padding: '1rem 1.2rem', borderRadius: '0 8px 8px 0'}}>
								0.00 <span className='blue'>CBT</span>
							</h4>
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
								<Link className="card" to ="/farm-detail">
									<img src={mine} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/farm-detail">
									<img src={hilo} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/farm-detail">
									<img src={diamond} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/farm-detail">
									<img src={shootout} alt="card" />
								</Link>
							</SwiperSlide>
							<SwiperSlide style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
								<Link className="card" to ="/farm-detail">
									<img src={limbo} alt="card" />
								</Link>
							</SwiperSlide>
					</Swiper>
					<p className='grey mt3 mb5'>You can stack for each games and receive more gifts</p>
				</div>
			</StyledFarmPanel>
		</Layout>
	)
}

export default Farm;


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