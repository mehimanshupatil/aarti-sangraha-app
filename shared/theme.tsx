import { useColorScheme } from 'nativewind';

export const lightColors = {
	primary: '#B84512',
	onPrimary: '#FFFBF2',
	text: '#3A2B1A',
	accent: '#C47A3A',
	background: '#FAF4E8',
	surface: '#F3EAD5',
	border: '#C4A47A',
};

export const darkColors = {
	primary: '#DDAA55',
	onPrimary: '#1C1812',
	text: '#E8D9BC',
	accent: '#CC7A3A',
	background: '#1C1812',
	surface: '#262018',
	border: '#DDAA55',
};

export type AppColors = typeof lightColors;

export const useAppTheme = () => {
	const { colorScheme } = useColorScheme();
	const colors = colorScheme === 'dark' ? darkColors : lightColors;
	return { colors };
};
