import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SingleItem from "../../../components/SingleItem";
import { globalStyle } from "../../../shared/styles";
import { useDataStore } from "../../../store/store";
import { useAppTheme } from "../../../shared/types";
import { useFilteredAartis } from "../../../hooks/useFilteredAartis";

const Favorites: React.FC = () => {
	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);

	const filteredAartis = useFilteredAartis(aartis, searchValue, favoritesKeys);

	return (
		<View style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}>
			<View style={globalStyle.homecontainer}>
				{filteredAartis.length > 0 ? (
					<FlatList
						data={filteredAartis}
						keyExtractor={(item) => item.key}
						renderItem={({ item }) => <SingleItem item={item} />}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text style={{ ...styles.emptyText, color: colors.text }}>
						No Favorites Found.
					</Text>
				)}
			</View>
		</View>
	);
};

export default Favorites;

const styles = StyleSheet.create({
	emptyText: {
		padding: 20,
		fontWeight: "bold",
		fontSize: 20,
	},
});
