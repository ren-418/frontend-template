import React from 'react'
import styled from 'styled-components'

interface ModalInterface {
	show: boolean
	onClose?: Function
	closeOverlay?: boolean
	children?: any
}

export default function Modal({show, onClose, closeOverlay= true, children}: ModalInterface) {
	// @ts-ignore
	
	return <>
		{
			show && <StyledModal>
				<div className="overlay" onClick={() => {closeOverlay && onClose()}}></div>
				<div className="modal-container">
					{
						children
					}
					<div style={{zIndex: -1, backgroundColor: '#17a3c4', width: '50px', height: '50px', borderRadius: '50%', position: 'absolute', left: '-20px', top: '-20px'}}></div>
					<div style={{zIndex: -1, width: '150px', height: '80px', position: 'absolute', left: '0', bottom: '0', overflow: 'hidden'}}>
						<div style={{zIndex: -1, backgroundColor: '#072a48', width: '150px', height: '150px', borderRadius: '50%', position: 'absolute', left: '-50px', bottom: '-90px'}}></div>
					</div>
					<div style={{zIndex: -1, backgroundColor: '#072a48', width: '20px', height: '20px', borderRadius: '50%', position: 'absolute', left: '100px',bottom: '40px'}}></div>
				</div>
			</StyledModal>
		}
	</>
}

const StyledModal = styled.div`
	display: flex;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 10001;
	top: 0;
	left: 0;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	-webkit-animation: modal-animation 0.2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: modal-animation 0.2s; /* Firefox < 16 */
        -ms-animation: modal-animation 0.2s; /* Internet Explorer */
         -o-animation: modal-animation 0.2s; /* Opera < 12.1 */
            animation: modal-animation 0.2s;
	@keyframes modal-animation {
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
		border-radius: 1rem;
		background-color: ${({theme}) => theme.modalBg};
		color: ${({theme}) => theme.text};
		padding: 1rem 2rem 2rem;
		position: absolute;
		max-width: 500px;
		min-width: 300px;
		margin-left: auto;
		width: 50%;
		z-index: 10002;
		max-height: 90vh;
		overflow-y: auto;
		@media (max-width: 768px) {
			margin: 0 auto;
			width: 90%;
			max-width: 100vw;
			position: fixed;
			max-height: 80vh;
			padding: 0.5rem 1rem 1rem;
		}
	}
`