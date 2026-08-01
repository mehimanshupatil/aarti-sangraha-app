export type { AppColors } from './themes';
export { themes, DEFAULT_THEME } from './themes';
import { themes } from './themes';

// Convenience exports for the default (parchment) theme
export const lightColors = themes.parchment.light;
export const darkColors = themes.parchment.dark;

export function hexToRgb(hex: string): string {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `${r} ${g} ${b}`;
}
