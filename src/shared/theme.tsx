import { useColorScheme } from 'nativewind';
import { appColors } from './themes';

export function useAppTheme() {
	const { colorScheme } = useColorScheme();
	const colors = colorScheme === 'dark' ? appColors.dark : appColors.light;
	return { colors };
}
