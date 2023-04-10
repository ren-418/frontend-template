import React from 'react'
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';



const Layout = ({children }: any) => {
	// @ts-ignore
	
	return (
		<StyledMain>
            <Header />
			<StyledBody>
				<Sidebar />
				<div className='body'>
					{children}
            		<Footer />
				</div>
			</StyledBody>
        </StyledMain>
	) 
};
 
export default Layout;

const StyledBody = styled.div`
    padding-top: 80px;
    min-height: 100vh;
	.body {
		margin-left: 250px;
		width: calc(100vw - 250px);
		@media (max-width: 1280px) {
			margin-left: 100px;
			width: calc(100vw - 100px);
		}
        @media (max-width: 768px) {
			margin-left: 0;
			width: 100vw;
		}
	}
	.blue {
		color: ${({ theme }) => (theme.bluetext)};
	}
	.grey {
		color: ${({ theme }) => (theme.grey)};
	}
`

const StyledMain = styled.div`
	background-color:  ${({ theme }) => (theme.background)};
	color:  ${({ theme }) => (theme.text)};
	display: flex;
	min-height: 100vh;
	flex-direction: row;
`