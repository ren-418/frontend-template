import styled from 'styled-components'

interface ProgressInterface {
	value: number
}

export default function Progress({value}: ProgressInterface) {
	// @ts-ignore
	
	const StyledProgress = styled.div`
		width: 100%;
		background-color: #001629;
		border-radius: 35px;
		height: 20px;
		position: relative;
		.line {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			border-radius: 35px;
			background: #17a3c4;
			background: linear-gradient(96deg, #17a3c4 0.00%, #0a5096 100.00%);
			-webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
			-moz-animation: fadein 1s; /* Firefox < 16 */
				-ms-animation: fadein 1s; /* Internet Explorer */
				-o-animation: fadein 1s; /* Opera < 12.1 */
					animation: fadein 1s;
		}
		@keyframes fadein {
			from { width: 0; }
			to   { opacity: 1; }
		}
		@media (max-width: 768px) {
			height: 10px
		}
`


	return <>
		{
			<StyledProgress>
				<div className="line" style={{width: value + "%"}}></div>
			</StyledProgress>
		}
	</>
	
}