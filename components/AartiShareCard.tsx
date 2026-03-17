import React, { forwardRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { singleItemType } from "../shared/types";
import { fontStyle } from "../shared/styles";
import { domainUrl } from "../shared/const";

const CARD_WIDTH = 380;
const PRIMARY = "#b5451b";
const ACCENT = "#ffde5b";
const BG = "#fffbf0";
const TEXT = "#2d1a0e";
const MUTED = "#9b7b5e";

type Props = {
	item: singleItemType;
	translate: "original" | "transliteration";
	fontSize: number;
};

const AartiShareCard = forwardRef<View, Props>(({ item, translate, fontSize }, ref) => {
	const title = item.title[translate];
	const body = item.body[translate];

	return (
		<View ref={ref} style={styles.card} collapsable={false}>
			{/* Header */}
			<View style={styles.header}>
				<Image
					source={require("../assets/icon.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
				<View>
					<Text style={styles.appName}>आरती संग्रह</Text>
					<Text style={styles.appSub}>Aarti Sangrah</Text>
				</View>
			</View>

			{/* Divider with om symbol */}
			<View style={styles.ornamentRow}>
				<View style={styles.ornamentLine} />
				<Text style={styles.ornamentText}>  ॐ  </Text>
				<View style={styles.ornamentLine} />
			</View>

			{/* Title */}
			<Text style={[styles.title, fontStyle[translate === "original" ? "fontOriginal" : "fontItalic"]]}>
				{title}
			</Text>

			{/* Body */}
			<Text
				style={[
					styles.body,
					{ fontSize: Math.min(fontSize, 20) },
					fontStyle[translate === "original" ? "fontOriginal" : "fontItalic"],
				]}
			>
				{body}
			</Text>

			{/* Footer */}
			<View style={styles.ornamentRow}>
				<View style={styles.ornamentLine} />
				<Text style={styles.ornamentText}>  ✦  </Text>
				<View style={styles.ornamentLine} />
			</View>
			<Text style={styles.footer}>{domainUrl}</Text>
		</View>
	);
});

AartiShareCard.displayName = "AartiShareCard";

export default AartiShareCard;

const styles = StyleSheet.create({
	card: {
		width: CARD_WIDTH,
		backgroundColor: BG,
		borderRadius: 16,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOpacity: 0.15,
		shadowRadius: 8,
		elevation: 6,
	},
	header: {
		backgroundColor: PRIMARY,
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
		borderColor: ACCENT,
	},
	appName: {
		color: ACCENT,
		fontSize: 20,
		fontWeight: "bold",
		letterSpacing: 0.5,
	},
	appSub: {
		color: "rgba(255,222,91,0.7)",
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
		backgroundColor: PRIMARY,
		opacity: 0.25,
	},
	ornamentText: {
		color: PRIMARY,
		fontSize: 16,
		fontWeight: "bold",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: PRIMARY,
		textAlign: "center",
		marginHorizontal: 20,
		marginBottom: 12,
	},
	body: {
		color: TEXT,
		lineHeight: 28,
		marginHorizontal: 20,
		marginBottom: 4,
	},
	footer: {
		color: MUTED,
		fontSize: 11,
		textAlign: "center",
		paddingBottom: 16,
		letterSpacing: 0.3,
	},
});
