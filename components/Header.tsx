import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Search from "./Search";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../shared/types";
import { fontStyle } from "../shared/styles";
import { useDataStore, useDataStoreActions } from "../store/store";

const APPBAR_HEIGHT = Platform.OS === "ios" ? 50 : 56;

const Header: React.FC<{
	title: string;
	navigation?: any;
	showSearchButton: boolean;
}> = ({ title, navigation, showSearchButton }) => {
	// https://github.com/expo/expo/blob/c3a83979d5e1103d3d259ea537823a3ec3972fa6/apps/native-component-list/src/screens/SearchScreen.tsx#L89
	const { top } = useSafeAreaInsets();
	// @todo: this is static and we don't know if it's visible or not on iOS.
	// need to use a more reliable and cross-platform API when one exists, like
	// LayoutContext. We also don't know if it's translucent or not on Android
	// and depend on react-native-safe-area-context to tell us.
	const STATUSBAR_HEIGHT = top || 8;

	// const frame = useSafeAreaFrame();
	// const insets = useSafeAreaInsets();

	// const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

	const { colors } = useAppTheme();
	const translate = useDataStore((s) => s.translate);
	const showSearch = useDataStore((s) => s.showSearch);
	const { setShowSearch } = useDataStoreActions();

	const openMenu = () => {
		navigation.openDrawer();
	};

	return (
		<View
			style={{
				...styles.header,
				...{
					paddingTop: STATUSBAR_HEIGHT,
					height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
				},
				backgroundColor: colors.primary,
			}}
		>
			{!showSearch ? (
				<>
					<IconButton
						icon="menu"
						size={28}
						onPress={openMenu}
						iconColor={colors.surface}
						style={styles.menuIcon}
					/>
					<View>
						<Text
							style={[
								{ ...styles.headerText, color: colors.surface },
								fontStyle[
									translate === "original" ? "fontOriginal" : "fontItalic"
								],
							]}
						>
							{title}
						</Text>
					</View>
					{showSearchButton ? (
						<IconButton
							icon="text-box-search-outline"
							onPress={() => setShowSearch(true)}
							size={28}
							iconColor={colors.surface}
							style={styles.searchIcon}
						/>
					) : (
						<IconButton icon="" size={28} style={styles.searchIcon} />
					)}
				</>
			) : (
				<Search />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 20,
		letterSpacing: 1,
	},
	menuIcon: {},
	searchIcon: {},
});

export default Header;
