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

export const globalStyle = StyleSheet.create({
	homeRoot: {
		flexGrow: 1,
		height: "100%",
	},
	homecontainer: {
		margin: spacing.lg,
		marginTop: 0,
		marginBottom: 0,
		flex: 1,
	},
});

export const fontStyle = StyleSheet.create({
	fontOriginal: {
		fontFamily: "nono_devanagari",
	},
	fontItalic: {
		fontFamily: "Roboto_400Regular_Italic",
		fontStyle: "italic",
	},
});

/** Reusable style for react-native-paper IconButton to reset default margins */
export const iconButtonReset = { margin: 0 } as const;
