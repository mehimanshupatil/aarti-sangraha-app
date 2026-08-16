export type AppColors = {
	primary: string;
	onPrimary: string;
	text: string;
	accent: string;
	background: string;
	surface: string;
	border: string;
};

export const appColors: { light: AppColors; dark: AppColors } = {
	light: {
		primary: '#8A2E0A', onPrimary: '#FFF8ED', text: '#2E2013',
		accent: '#7A5206', background: '#FBF6EC', surface: '#EDE0C5', border: '#B08A55',
	},
	dark: {
		primary: '#E8A05C', onPrimary: '#1A1108', text: '#F0E2C4',
		accent: '#F2C34A', background: '#15100C', surface: '#241A10', border: '#5C4520',
	},
};
