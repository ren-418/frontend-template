import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

export type Color = string
export interface Colors {
	white: Color
	black: Color
	grey: Color
	link: Color
	header: Color
	sidebar: Color
	background: Color
	bg1: Color
	input: Color
	borderColor: Color
	dropdown: Color
	gradient1: Color
	gradient2: Color
	text: Color
	bluetext: Color
	darkgrey: Color
	menuicon: Color
	menuiconbg: Color
	modalOverlay: Color
	modalBg: Color
}

export interface Grids {
	sm: number
	md: number
	lg: number
}

declare module 'styled-components' {
	export interface DefaultTheme extends Colors {
		grids: Grids

		// shadows
		shadow1: string
		modalOpacity: number

		// media queries
		mediaWidth: {
			upToExtraSmall: ThemedCssFunction<DefaultTheme>
			upToSmall: ThemedCssFunction<DefaultTheme>
			upToMedium: ThemedCssFunction<DefaultTheme>
			upToLarge: ThemedCssFunction<DefaultTheme>
		}

		// css snippets
		flexColumnNoWrap: FlattenSimpleInterpolation
		flexRowNoWrap: FlattenSimpleInterpolation
	}
}
