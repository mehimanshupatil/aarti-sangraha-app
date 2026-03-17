import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SingleItem from "../../../components/SingleItem";
import { globalStyle } from "../../../shared/styles";
import { useAppTheme } from "../../../shared/types";
import { useDataStore } from "../../../store/store";
import { useFilteredAartis } from "../../../hooks/useFilteredAartis";

const Recent: React.FC = () => {
	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const recentlyViewed = useDataStore((s) => s.recentlyViewed);

	const filteredAartis = useFilteredAartis(aartis, searchValue, undefined, recentlyViewed);

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
					<Text style={[styles.emptyText, { color: colors.text }]}>
						No recently viewed aartis.
					</Text>
				)}
			</View>
		</View>
	);
};

export default Recent;

const styles = StyleSheet.create({
	emptyText: {
		padding: 20,
		fontWeight: "bold",
		fontSize: 20,
	},
});
