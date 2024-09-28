import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Search from "./Search";
import { IconButton } from "react-native-paper";
import {
	useSafeAreaFrame,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useAppTheme } from "../shared/types";
import { fontStyle } from "../shared/styles";
import { useDataStore, useDataStoreActions } from "../store/store";

const Header: React.FC<{
	title: string;
	navigation?: any;
	showSearchButton: boolean;
}> = ({ title, navigation, showSearchButton }) => {
	const frame = useSafeAreaFrame();
	const insets = useSafeAreaInsets();

	const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

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
				height: headerHeight,
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

								fontStyle[translate === 'original' ? 'fontOriginal' : 'fontItalic'],

							]}
						>
							{title}
						</Text>
					</View>
					{showSearchButton && (
						<IconButton
							icon="text-box-search-outline"
							onPress={() => setShowSearch(true)}
							size={28}
							iconColor={colors.surface}
							style={styles.searchIcon}
						/>
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
		height: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 20,
		letterSpacing: 1,
	},
	menuIcon: {
		position: "absolute",
		left: 12,
	},
	searchIcon: {
		position: "absolute",
		right: 12,
	},
});

export default Header;
