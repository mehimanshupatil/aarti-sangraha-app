import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useAppTheme } from "../shared/types";
import { fontStyle } from "../shared/styles";
import { useDataStore, useUIStoreActions } from "../store/store";
import Search from "./Search";

const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;

const Header: React.FC<{
	title: string;
	showSearchButton: boolean;
}> = ({ title, showSearchButton }) => {
	const { top } = useSafeAreaInsets();
	const STATUSBAR_HEIGHT = top || 8;

	const { colors } = useAppTheme();
	const translate = useDataStore((s) => s.translate);
	const showSearch = useDataStore((s) => s.showSearch);
	const { setShowSearch } = useUIStoreActions();

	return (
		<View
			style={{
				...styles.header,
				paddingTop: STATUSBAR_HEIGHT,
				height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
				backgroundColor: colors.primary,
			}}
		>
			{!showSearch ? (
				<Animated.View
					key="title-bar"
					entering={FadeIn.duration(200)}
					exiting={FadeOut.duration(100)}
					style={styles.titleRow}
				>
					<View style={styles.placeholder} />
					<Text
						style={[
							{ ...styles.headerText, color: colors.onPrimary },
							fontStyle[translate === "original" ? "fontOriginal" : "fontItalic"],
						]}
					>
						{title}
					</Text>
					{showSearchButton ? (
						<IconButton
							icon="text-box-search-outline"
							onPress={() => setShowSearch(true)}
							size={28}
							iconColor={colors.onPrimary}
							style={styles.searchIcon}
						/>
					) : (
						<View style={styles.placeholder} />
					)}
				</Animated.View>
			) : (
				<Animated.View
					key="search-bar"
					entering={SlideInRight.duration(250)}
					exiting={SlideOutRight.duration(200)}
					style={styles.titleRow}
				>
					<Search />
				</Animated.View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		justifyContent: "center",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 20,
		letterSpacing: 1,
	},
	placeholder: {
		width: 44,
		height: 44,
	},
	searchIcon: {},
});

export default Header;
