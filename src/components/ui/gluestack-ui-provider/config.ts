'use client';
import { vars } from 'nativewind';
import { appColors, type AppColors } from '../../../shared/themes';
import { hexToRgb } from '../../../shared/colors';

function makeVars(c: AppColors) {
	return vars({
		'--app-primary':    hexToRgb(c.primary),
		'--app-on-primary': hexToRgb(c.onPrimary),
		'--app-text':       hexToRgb(c.text),
		'--app-accent':     hexToRgb(c.accent),
		'--app-bg':         hexToRgb(c.background),
		'--app-surface':    hexToRgb(c.surface),
		'--app-border':     hexToRgb(c.border),
	});
}

export const config = {
	light: makeVars(appColors.light),
	dark:  makeVars(appColors.dark),
};
