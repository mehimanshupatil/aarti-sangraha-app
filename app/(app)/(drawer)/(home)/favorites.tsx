import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SingleItem from "../../../../components/SingleItem";
import { globalStyle } from "../../../../shared/styles";
import { useDataStore } from "../../../../store/store";
import { singleItemType, useAppTheme } from "../../../../shared/types";

const Favorites: React.FC = () => {
	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);

	const [localData, setLocalData] = useState<singleItemType[]>([]);

	useEffect(() => {
		if (searchValue)
			setLocalData(
				aartis.filter(
					(x) =>
						favoritesKeys.includes(x.key) &&
						(x.title.original.includes(searchValue) ||
							x.body.original.includes(searchValue) ||
							x.title.transliteration.toLowerCase().includes(searchValue) ||
							x.body.transliteration.toLowerCase().includes(searchValue)),
				),
			);
		else setLocalData(aartis.filter((x) => favoritesKeys.includes(x.key)));
	}, [aartis, searchValue, favoritesKeys.length]);

	return (
		<View
			style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}
		>
			<View style={globalStyle.homecontainer}>
				{localData?.length ? (
					<FlatList
						data={localData}
						renderItem={({ item }) => <SingleItem item={item} />}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text style={{ ...styles.text, color: colors.text }}>
						No Favorites Found.
					</Text>
				)}
			</View>
		</View>
	);
};

export default Favorites;

const styles = StyleSheet.create({
	text: {
		padding: 20,
		fontWeight: "bold",
		fontSize: 20,
	},
});
