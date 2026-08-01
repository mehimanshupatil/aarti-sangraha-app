import React from "react";
import { FlatList, Text, View } from "react-native";
import SingleItem from "../../../components/SingleItem";
import { useRecentAartis } from "../../../hooks/useFilteredAartis";

const Recent: React.FC = () => {
	const filteredAartis = useRecentAartis();

	return (
		<View className="bg-app-bg flex-grow h-full">
			<View className="m-5 mt-0 mb-0 flex-1">
				{filteredAartis.length > 0 ? (
					<FlatList
						data={filteredAartis}
						keyExtractor={(item) => item.key}
						renderItem={({ item }) => <SingleItem item={item} />}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text className="text-app-text p-5 font-bold text-[20px]">
						No recently viewed aartis.
					</Text>
				)}
			</View>
		</View>
	);
};

export default Recent;
