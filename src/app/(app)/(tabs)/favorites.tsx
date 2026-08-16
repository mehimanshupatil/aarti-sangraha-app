import React from "react";
import { Text, View, FlatList } from "react-native";
import SingleItem from "../../../components/SingleItem";
import { useFavoriteAartis } from "../../../hooks/useFilteredAartis";
import { useAppTheme } from "../../../shared/types";

const Favorites: React.FC = () => {
	const { colors } = useAppTheme();
	const filteredAartis = useFavoriteAartis();

	return (
		<View className="flex-grow h-full" style={{ backgroundColor: colors.background }}>
			<View className="m-5 mt-0 mb-0 flex-1">
				{filteredAartis.length > 0 ? (
					<FlatList
						data={filteredAartis}
						keyExtractor={(item) => item.key}
						renderItem={({ item }) => <SingleItem item={item} />}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text className="p-5 font-bold text-[20px]" style={{ color: colors.text }}>
						No Favorites Found.
					</Text>
				)}
			</View>
		</View>
	);
};

export default Favorites;
