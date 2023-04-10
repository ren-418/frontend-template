import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

interface SwitchInterface{
	values?: any
	selectedKey?: string
	onChange: Function
	props?: any
}


export default function Dropdown({values, selectedKey, props, onChange}: SwitchInterface) {
	// @ts-ignore
	
	const [status, setStatus] = React.useState({
		selectedKey: selectedKey	
	})
	const [showMenu, setShowMenu] = React.useState(false)

	const panelRef = React.useRef(null)

	return (
		<StyledDropdownPanel {...props} onMouseUp={() => { setShowMenu(true) }} onBlur={() => {setShowMenu(false)}}>
			{status.selectedKey}
			<div className="drop-icon">
				<Icon icon="Down" />
			</div>
			<div className="menu-panel"  ref={panelRef} style={{display: showMenu ? 'block' : 'none'}}>
				{
					values && values.map((item, index) => {
						return <div key={index} className="item flex middle" onBlur={() => {setShowMenu(false) }} onClick={() => {setStatus({selectedKey: item.symbol || item.name}); onChange(item.key || item.symbol); setShowMenu(false)}}>
							{item.symbol || item.name }
						</div>		
					})
				}
			</div>
			{
				showMenu && <div className="background" onClick={() => {setShowMenu(false)}}/>
			}
		</StyledDropdownPanel>
	);
}

const StyledDropdownPanel = styled.div`
	background-color: ${({theme}) => theme.dropdown};
	color: ${({theme}) => theme.text};
	padding: 10px 1rem;
	border-radius: 25px;
	cursor: pointer;
	position: relative;
	min-width: 140px;
	font-size: 1rem;
	.background{
		width: 100vw;
		height: 100vh;
		background-color: transparent;
		position: fixed;
		left: 0;
		top: 0;
	}
	.drop-icon{
		position: absolute;
		right: 1rem;
		top: 0.6rem;
	}
	.menu-panel{
		position: absolute;
		top: 101%;
		left: 5%;
		display: none;
		overflow: hidden;
		width: 90%;
		z-index: 1001;
        border-radius: 8px;
		.item{
			width: 100%;
            background: #0f4d88;
			padding: 1rem;
			transition: 0.2s all;
			color: white;
			&:hover{
				background-color: #011c33;
				color: ${({theme}) => theme.text}!important;
			}
		}
	}
`
