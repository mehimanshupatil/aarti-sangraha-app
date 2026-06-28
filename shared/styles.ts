import { StyleSheet } from "react-native";

export const spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 20,
	xl: 24,
} as const;

export const radius = {
	sm: 5,
	md: 8,
	lg: 10,
} as const;

export const fontStyle = StyleSheet.create({
	fontOriginal: {
		fontFamily: "nono_devanagari",
	},
	fontItalic: {
		fontFamily: "Roboto_400Regular_Italic",
		fontStyle: "italic",
	},
});

/** Padding reset for icon buttons */
export const iconButtonReset = { padding: 6 } as const;

export function getFontStyle(translate: 'original' | 'transliteration') {
	return fontStyle[translate === 'original' ? 'fontOriginal' : 'fontItalic'];
}
