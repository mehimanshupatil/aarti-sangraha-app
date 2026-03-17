import React, { forwardRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { singleItemType } from "../shared/types";
import { fontStyle } from "../shared/styles";
import { domainUrl } from "../shared/const";

const CARD_WIDTH = 380;

const LIGHT = {
	primary: "#b5451b",
	accent: "#ffde5b",
	bg: "#fffbf0",
	text: "#2d1a0e",
	muted: "#9b7b5e",
	onPrimary: "#fffbf2",
};

const DARK = {
	primary: "#DDAA55",
	accent: "#DDAA55",
	bg: "#1C1812",
	text: "#E8D9BC",
	muted: "#9b8b6e",
	onPrimary: "#1C1812",
};

type Props = {
	item: singleItemType;
	translate: "original" | "transliteration";
	fontSize: number;
	isDark?: boolean;
};

const AartiShareCard = forwardRef<View, Props>(({ item, translate, fontSize, isDark = false }, ref) => {
	const C = isDark ? DARK : LIGHT;
	const title = item.title[translate];
	const body = item.body[translate];

	return (
		<View ref={ref} style={[styles.card, { backgroundColor: C.bg }]} collapsable={false}>
			{/* Header */}
			<View style={[styles.header, { backgroundColor: C.primary }]}>
				<Image
					source={require("../assets/icon.png")}
					style={[styles.logo, { borderColor: C.accent }]}
					resizeMode="contain"
				/>
				<View>
					<Text style={[styles.appName, { color: C.onPrimary }]}>आरती संग्रह</Text>
					<Text style={[styles.appSub, { color: `${C.onPrimary}99` }]}>Aarti Sangrah</Text>
				</View>
			</View>

			{/* Divider with om symbol */}
			<View style={styles.ornamentRow}>
				<View style={[styles.ornamentLine, { backgroundColor: C.primary }]} />
				<Text style={[styles.ornamentText, { color: C.primary }]}>  ॐ  </Text>
				<View style={[styles.ornamentLine, { backgroundColor: C.primary }]} />
			</View>

			{/* Title */}
			<Text style={[styles.title, { color: C.primary }, fontStyle[translate === "original" ? "fontOriginal" : "fontItalic"]]}>
				{title}
			</Text>

			{/* Body */}
			<Text
				style={[
					styles.body,
					{ fontSize: Math.min(fontSize, 20), color: C.text },
					fontStyle[translate === "original" ? "fontOriginal" : "fontItalic"],
				]}
			>
				{body}
			</Text>

			{/* Footer */}
			<View style={styles.ornamentRow}>
				<View style={[styles.ornamentLine, { backgroundColor: C.primary }]} />
				<Text style={[styles.ornamentText, { color: C.primary }]}>  ✦  </Text>
				<View style={[styles.ornamentLine, { backgroundColor: C.primary }]} />
			</View>
			<Text style={[styles.footer, { color: C.muted }]}>{domainUrl}</Text>
		</View>
	);
});

AartiShareCard.displayName = "AartiShareCard";

export default AartiShareCard;

const styles = StyleSheet.create({
	card: {
		width: CARD_WIDTH,
		borderRadius: 16,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 6,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 14,
		gap: 12,
	},
	logo: {
		width: 44,
		height: 44,
		borderRadius: 10,
		borderWidth: 2,
	},
	appName: {
		fontSize: 20,
		fontWeight: "bold",
		letterSpacing: 0.5,
	},
	appSub: {
		fontSize: 12,
		letterSpacing: 1,
	},
	ornamentRow: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 12,
	},
	ornamentLine: {
		flex: 1,
		height: 1,
		opacity: 0.25,
	},
	ornamentText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: 20,
		marginBottom: 12,
	},
	body: {
		lineHeight: 28,
		marginHorizontal: 20,
		marginBottom: 4,
	},
	footer: {
		fontSize: 11,
		textAlign: "center",
		paddingBottom: 16,
		letterSpacing: 0.3,
	},
});
