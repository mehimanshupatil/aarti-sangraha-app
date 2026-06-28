import React, { forwardRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { singleItemType } from "../shared/types";
import { getFontStyle } from "../shared/styles";
import { domainUrl } from "../shared/const";
import { useAppTheme } from "../shared/types";
import { useDataStore } from "../store/store";

const CARD_WIDTH = 380;

type Props = {
	item: singleItemType;
};

const AartiShareCard = forwardRef<View, Props>(({ item }, ref) => {
	const { colors } = useAppTheme();
	const translate = useDataStore((s) => s.translate);
	const fontSize = useDataStore((s) => s.fontSize);
	const title = item.title[translate];
	const body = item.body[translate];

	return (
		<View ref={ref} style={[styles.card, { backgroundColor: colors.background }]} collapsable={false}>
			{/* Header */}
			<View style={[styles.header, { backgroundColor: colors.primary }]}>
				<Image
					source={require("../assets/icon.png")}
					style={[styles.logo, { borderColor: colors.accent }]}
					resizeMode="contain"
				/>
				<View>
					<Text style={[styles.appName, { color: colors.onPrimary }]}>आरती संग्रह</Text>
					<Text style={[styles.appSub, { color: `${colors.onPrimary}99` }]}>Aarti Sangrah</Text>
				</View>
			</View>

			{/* Divider with om symbol */}
			<View style={styles.ornamentRow}>
				<View style={[styles.ornamentLine, { backgroundColor: colors.primary }]} />
				<Text style={[styles.ornamentText, { color: colors.primary }]}>  ॐ  </Text>
				<View style={[styles.ornamentLine, { backgroundColor: colors.primary }]} />
			</View>

			{/* Title */}
			<Text style={[styles.title, { color: colors.primary }, getFontStyle(translate)]}>
				{title}
			</Text>

			{/* Body */}
			<Text
				style={[
					styles.body,
					{ fontSize: Math.min(fontSize, 20), color: colors.text },
					getFontStyle(translate),
				]}
			>
				{body}
			</Text>

			{/* Footer */}
			<View style={styles.ornamentRow}>
				<View style={[styles.ornamentLine, { backgroundColor: colors.primary }]} />
				<Text style={[styles.ornamentText, { color: colors.primary }]}>  ✦  </Text>
				<View style={[styles.ornamentLine, { backgroundColor: colors.primary }]} />
			</View>
			<Text style={[styles.footer, { color: colors.border }]}>{domainUrl}</Text>
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
