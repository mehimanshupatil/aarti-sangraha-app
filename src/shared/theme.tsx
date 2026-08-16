import { appColors } from './themes';
import { useDataStore } from '../store/store';

export function useAppTheme() {
	const displayMode = useDataStore((s) => s.displayMode);
	const colors = displayMode === 'dark' ? appColors.dark : appColors.light;
	return { colors };
}
