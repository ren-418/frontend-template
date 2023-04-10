import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Icon from '../Icon';
import styled, { ThemeContext } from 'styled-components'

const Sidebar = () => {
    const theme = useContext(ThemeContext)
    return <StyledSidebar>
        <Link className="menu" to = "/casino">
            <div className="icon" >
                <Icon icon="Casino" size={20}/>
            </div>
            <p className='p0 m0'>Casino</p>
        </Link>
        <Link className="menu" to = "/farm"> 
            <div className="icon" >
                <Icon icon="Sport" size={20}/>
            </div>
            <p className='p0 m0'>Sport</p>
        </Link>
        <Link className="menu" to = "/promotion">
            <div className="icon" >
                <Icon icon="Promotion" size={17} height={20}/>
            </div>
            <p className='p0 m0'>Promotions</p>
        </Link>
        <Link className="menu" to = "/affiliate">
            <div className="icon" >
                <Icon icon="Sport" size={20}/>
            </div>
            <p className='p0 m0'>Sponsership</p>
        </Link>
        <Link className="menu" to = "/blog">
            <div className="icon" >
                <Icon icon="Blog" size={20}/>
            </div>
            <p className='p0 m0'>Blog</p>
        </Link>
        <Link className="menu" to = "/support">
            <div className="icon" >
                <Icon icon="Support" size={20}/>
            </div>
            <p className="p0 m0">Live Support</p>
        </Link>
    </StyledSidebar>
}

export default Sidebar;


const StyledSidebar = styled.div`
	background-color:  ${({ theme }) => (theme.sidebar)};
    overflow: hidden;
	max-height: 100vh;
    position: fixed;
    min-height: 100vh;
    left: 0;
    top: 0;
    padding-top: 100px;
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
        padding: 1rem 2rem;
        min-width: 250px;
        font-size: 1.2rem;
        transition: 0.2s;
        &:hover {
            background-color:  #002544;
            .icon {
                color: #2491ed;
                background-color:  #1c527e;
            }
        }
        @media (max-width: 1280px) {
            width: 100px;
            min-width: 100px;
            p {
                display: none;
            }
        }
        @media (max-width: 768px) {
            width: 100vw;
            min-width: 100vw;
            p {
                display: block;
            }
            display: none;
        }
    }
`
