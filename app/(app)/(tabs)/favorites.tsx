import React from "react";
import { Text, View, FlatList } from "react-native";
import SingleItem from "../../../components/SingleItem";
import { globalStyle } from "../../../shared/styles";
import { useDataStore } from "../../../store/store";
import { useFilteredAartis } from "../../../hooks/useFilteredAartis";

const Favorites: React.FC = () => {
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);

	const filteredAartis = useFilteredAartis(aartis, searchValue, favoritesKeys);

	return (
		<View className="bg-app-bg" style={globalStyle.homeRoot}>
			<View style={globalStyle.homecontainer}>
				{filteredAartis.length > 0 ? (
					<FlatList
						data={filteredAartis}
						keyExtractor={(item) => item.key}
						renderItem={({ item }) => <SingleItem item={item} />}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text className="text-app-text p-5 font-bold text-[20px]">
						No Favorites Found.
					</Text>
				)}
			</View>
		</View>
	);
};

export default Favorites;
