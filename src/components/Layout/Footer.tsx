import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components'

import logo from '../../assets/img/logo.webp'

const Footer = () => {
    const theme = useContext(ThemeContext)
    return <StyledFooter>
        <div className="container">
            <div className="info">
               <Link className="logo" to={"/"}>
                    <img src= {logo} />
                    <h2>CBETWORLD</h2>
                </Link>
                <p className='mr3'>© 2023 CBETWORLD | All Rights Reserved.</p>
            </div>
            <p className='about'>
                CBETWORLD is owned and operated by Medium Rare N.V., registration number: 145353, registered address: Fransche Bloemweg, 4 Willemstad Curaçao. Contact us at support@stake.com. Payment agent company is Medium Rare Limited with address 7-9 Riga Feraiou, LIZANTIA COURT, Office 310, Agioi Omologites, 1087 Nicosia, Cyprus and Registration number: HE 410775 Stake is authorized and regulated by the Government of Curacao and operates under License No. 8048/JAZ issued to Antillephone. Stake has passed all compliance and is legally authorized to conduct gaming operations for all games of chance and wagering.
            </p>
        </div>
    </StyledFooter>
}

export default Footer;


const StyledFooter = styled.div`
    background: #154269;
    background: linear-gradient(143deg, #154269 0.00%, #010305 100.00%);
    width: 100%;
    padding: 3rem;
    @media (max-width: 768px) {
        padding: 3rem 8px;
    }
    .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 768px) {
            display: block;
        }
    }
    .logo{
        display: flex;
        align-items: center;
        img {
            width: 60px;
        }
        text-decoration: none;
        color: ${({ theme }) => (theme.white)};
    }
    .about {
        width: 98%;
    }
`