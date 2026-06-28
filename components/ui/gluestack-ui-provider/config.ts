'use client';
import { vars } from 'nativewind';
import { themes, DEFAULT_THEME, type ThemeId, type AppColors } from '../../../shared/themes';
import { hexToRgb } from '../../../shared/colors';

function makeVars(c: AppColors) {
	return vars({
		'--color-app-primary':    hexToRgb(c.primary),
		'--color-app-on-primary': hexToRgb(c.onPrimary),
		'--color-app-text':       hexToRgb(c.text),
		'--color-app-accent':     hexToRgb(c.accent),
		'--color-app-bg':         hexToRgb(c.background),
		'--color-app-surface':    hexToRgb(c.surface),
		'--color-app-border':     hexToRgb(c.border),
	});
}

export function buildConfig(themeId: ThemeId = DEFAULT_THEME) {
	const theme = themes[themeId];
	return {
		light: makeVars(theme.light),
		dark:  makeVars(theme.dark),
	};
}

// Static default config used as fallback
export const config = buildConfig(DEFAULT_THEME);
