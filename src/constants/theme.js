// src/constants/theme.js
export const COLORS = {
	primary: '#5440e1',
	primaryContainer: '#6d5dfb',
	onPrimary: '#ffffff',
	secondary: '#0061a6',
	secondaryContainer: '#61acff',
	tertiary: '#7c5600',
	tertiaryContainer: '#9b6e08',
	yellow: '#f6bd59',
	background: '#fbf9f5',
	surface: '#ffffff',
	surfaceDim: '#dbdad6',
	surfaceVariant: '#e4e2de',
	onSurface: '#1b1c1a',
	onSurfaceVariant: '#474555',
	outline: '#c8c4d8',
	error: '#ba1a1a',
	overlay: 'rgba(27, 28, 26, 0.4)',
	glass: 'rgba(251, 249, 245, 0.7)',
};

export const TYPOGRAPHY = {
	displayLg: {
		fontFamily: 'Quicksand-Bold',
		fontSize: 40,
		lineHeight: 48,
		letterSpacing: -0.8,
	},
	displayLgMobile: {
		fontFamily: 'Quicksand-Bold',
		fontSize: 32,
		lineHeight: 38,
		letterSpacing: -0.6,
	},
	headlineMd: {
		fontFamily: 'Quicksand-SemiBold',
		fontSize: 24,
		lineHeight: 32,
	},
	headlineSm: {
		fontFamily: 'Quicksand-SemiBold',
		fontSize: 20,
		lineHeight: 28,
	},
	bodyLg: { fontFamily: 'Quicksand-Medium', fontSize: 18, lineHeight: 28 },
	bodyMd: { fontFamily: 'Quicksand-Medium', fontSize: 16, lineHeight: 24 },
	labelCaps: {
		fontFamily: 'Quicksand-Bold',
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0.6,
		textTransform: 'uppercase',
	},
};

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 64,
	gutter: 16,
	cardGap: 20,
};

export const RADIUS = {
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	pill: 9999,
};

export const SHADOWS = {
	soft: {
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.15,
		shadowRadius: 16,
		elevation: 8,
	},
	card: {
		shadowColor: '#1b1c1a',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 12,
		elevation: 4,
	},
};
