import { useMemo } from 'react'
import {ThemeProvider as StyledComponentsThemeProvider,	css, DefaultTheme } from 'styled-components'
import { Colors } from './styled'

const MEDIA_WIDTHS = {
	upToExtraSmall: 500,
	upToSmall: 720,
	upToMedium: 960,
	upToLarge: 1280,
}

const mediaWidthTemplates: {
	[width in keyof typeof MEDIA_WIDTHS]: typeof css
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
	;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
		@media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
			${css(a, b, c)}
		}
	`
	return accumulator
}, {}) as any

export function colors(darkMode: boolean): Colors {
	return {
		white: "#FFFFFF",
		black: '#040404',
		grey : '#989898',
		link : '#6b9beb',
		header: '#010f1c',
		sidebar: '#051c2f',
		background: '#154269',
		bg1: '#03080d',
		input: '#011c33',
		borderColor: '#707070',
		dropdown: '#0f4b80',
		gradient1: '#154269',
		gradient2: '#010305',
		text: '#F9F9F9',
		bluetext: '#17A3C4',
		darkgrey: '#7c7c7c',
		menuicon: '#2072B7',
		menuiconbg: '#073358',
		modalOverlay: 'rgba(0,0,0,0.5)',
		modalBg: '#0d3e67'

	}
}

export function theme(darkMode: boolean): DefaultTheme {
	return {
		...colors(darkMode),

		grids: {
			sm: 8,
			md: 12,
			lg: 24,
		},

		//shadows
		shadow1: darkMode ? '#000' : '#2F80ED',

		modalOpacity: 0.74,

		// media queries
		mediaWidth: mediaWidthTemplates,

		// css snippets
		flexColumnNoWrap: css`
			display: flex;
			flex-flow: column nowrap;
		`,
		flexRowNoWrap: css`
			display: flex;
			flex-flow: row nowrap;
		`,
	}
}

export default function ThemeProvider({ children }: { children: any }) {
	const darkMode  = true;
	const themeObject = useMemo(() => theme(darkMode), [darkMode])
	return (
		<StyledComponentsThemeProvider theme={themeObject}>
			{children}
		</StyledComponentsThemeProvider>
	)
}
