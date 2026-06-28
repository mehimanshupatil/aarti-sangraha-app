import { useColorScheme } from 'nativewind';
import { themes, DEFAULT_THEME } from './themes';
import { useDataStore } from '../store/store';

export function useAppTheme() {
	const { colorScheme } = useColorScheme();
	const selectedTheme = useDataStore((s) => s.selectedTheme);
	const theme = themes[selectedTheme ?? DEFAULT_THEME];
	const colors = colorScheme === 'dark' ? theme.dark : theme.light;
	return { colors, theme };
}
