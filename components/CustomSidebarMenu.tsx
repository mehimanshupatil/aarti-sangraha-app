import React from "react";
import {
	SafeAreaView,
	StyleSheet,
	Image,
	Dimensions,
	Text,
	Share,
	Platform,
	View,
} from "react-native";
import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import Constants from "expo-constants";
import { Icon, IconButton } from "react-native-paper";
import { useAppTheme } from "../shared/types";
import { useDataStore, useDataStoreActions } from "../store/store";
import * as Clipboard from "expo-clipboard";
import { domainUrl } from "../shared/const";

const CustomSidebarMenu = (props: DrawerContentComponentProps) => {
	const { colors } = useAppTheme();
	const displayMode = useDataStore((s) => s.displayMode);
	const { setDisplayMode } = useDataStoreActions();
	const windowWidth = Dimensions.get("window").width;
	//since width of sidenav is 60%
	const imgWidth = (windowWidth * 60) / 100 - 50;

	const onShare = async () => {
		try {
			const message = `\`\`\`Hey there get Aarti Sangrah from Play Store / Samsung Galaxy Store.

    https://galaxy.store/aarti
    
    https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha 
    
    or view web Version ${domainUrl}\`\`\``;

			if (Platform.OS === "web") {
				await Clipboard.setStringAsync(message);
				alert(
					`The following message was copied to your clipboard.\n\n${message}`,
				);
				return;
			}

			Share.share({ message });
		} catch (error) {
			// @ts-ignore
			alert(error.message);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Image
				resizeMode="contain"
				source={require("../assets/icon.png")}
				style={[
					styles.sideMenuProfileIcon,
					{ width: imgWidth, height: imgWidth, maxWidth: 200, maxHeight: 200 },
				]}
			/>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<DrawerItem
					{...props}
					labelStyle={{ color: colors.primary }}
					label={`${displayMode === "light" ? "Light" : "Dark"} Theme`}
					icon={() => (
						<View style={styles.drawerIcon}>
							<Icon
								color={colors.primary}
								source="theme-light-dark"
								size={28}
							/>
						</View>
					)}
					onPress={() => {
						const mode = displayMode === "light" ? "dark" : "light";
						setDisplayMode(mode);
					}}
				/>
				<DrawerItem
					{...props}
					labelStyle={{ color: colors.primary }}
					label="Share App"
					icon={() => (
						<View style={styles.drawerIcon}>
							<Icon color={colors.primary} source="share-variant" size={28} />
						</View>
					)}
					onPress={onShare}
				/>
			</DrawerContentScrollView>
			<Text style={{ ...styles.textVersion, color: colors.text }}>
				version {Constants.expoConfig?.version}.
				{Constants.expoConfig?.android?.versionCode}
			</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	sideMenuProfileIcon: {
		borderRadius: 100 / 2,
		alignSelf: "center",
		marginTop: 50,
	},
	textVersion: {
		textAlign: "center",
		marginBottom: 20,
		fontSize: 13,
	},
	drawerIcon: {
		margin: 0,
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CustomSidebarMenu;
