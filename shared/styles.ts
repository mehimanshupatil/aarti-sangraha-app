import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
	homeRoot: {
		flexGrow: 1,
		height: "100%",
	},
	homecontainer: {
		margin: 20,
		marginTop: 0,
		marginBottom: 20,
		flex: 1,
	},
});

export const fontStyle = StyleSheet.create({
	fontOriginal: {
		fontFamily: "nono_devanagari",
	},
	fontItalic: {
		fontFamily: "Roboto_400Regular_Italic",
		fontStyle: 'italic'
	},
});
