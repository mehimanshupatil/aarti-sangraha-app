import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { singleItemType, useAppTheme } from "../shared/types";
import { IconButton, TouchableRipple } from "react-native-paper";
import { useDataStore, useDataStoreActions } from "../store/store";
import { fontStyle } from "../shared/styles";
import { Link } from "expo-router";

const SingleItem: React.FC<{
	item: singleItemType;
}> = ({ item }) => {
	const { colors } = useAppTheme();
	const translate = useDataStore((s) => s.translate);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);
	const { toggleFav } = useDataStoreActions();

	const iconPress = (item: singleItemType) => {
		// ToastAndroid.show(
		//   !favoritesKeys.includes(item.key) ? "Added to Favorites" : "Removed from Favorites",
		//   ToastAndroid.SHORT
		// );
		toggleFav(item.key);
	};

	return (
		<View
			style={{
				...styles.container,
				borderColor: colors.primary,
				backgroundColor: colors.background,
				shadowColor: colors.background,
			}}
		>
			<Link href={`/aarti-view/${item.metadata.slug}`} asChild>
				<TouchableRipple borderless style={styles.ripple}>
					<View>
						<View style={styles.firstLine}>
							<Text
								style={[
									{ ...styles.title, color: colors.primary },
									fontStyle[translate === 'original' ? 'fontOriginal' : 'fontItalic'],

								]}
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{item.title[translate]}
							</Text>
							<IconButton
								icon={
									favoritesKeys.includes(item.key) ? "heart" : "heart-outline"
								}
								size={30}
								style={styles.unsetbuttonStyle}
								iconColor={colors.primary}
								onPress={() => iconPress(item)}
							/>
						</View>
						<View style={styles.firstLine}>
							<Text
								style={[
									{
										flex: 1,
										color: colors.primary,
									},
									fontStyle[translate === 'original' ? 'fontOriginal' : 'fontItalic'],

								]}
								ellipsizeMode="tail"
								numberOfLines={1}
							>
								{item.body[translate].split("\n")[0]}
							</Text>
							<Text
								style={{
									paddingLeft: 5,
									paddingRight: 15,
									color: colors.primary,
								}}
							>
								{item.key}
							</Text>
						</View>
					</View>
				</TouchableRipple>
			</Link>
		</View>
	);
};

export default SingleItem;

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
		borderWidth: 1,
		borderRadius: 10,
		elevation: 3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	ripple: {
		borderRadius: 10,
		padding: 12,
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
	firstLine: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		flex: 1,
		flexWrap: "wrap",
		fontSize: 30,
	},
	unsetbuttonStyle: {
		margin: 0,
	},
});
