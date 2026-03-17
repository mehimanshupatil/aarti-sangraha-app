import React, { useMemo, useState } from "react";
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { router } from "expo-router";
import Head from "expo-router/head";
import SingleItem from "../../../components/SingleItem";
import { globalStyle, spacing } from "../../../shared/styles";
import { useAppTheme } from "../../../shared/types";
import { useDataStore, useUIStoreActions } from "../../../store/store";
import { useFilteredAartis } from "../../../hooks/useFilteredAartis";
import type { SortOrder } from "../../../store/store";

const DEITY_LABELS: Record<string, string> = {
	ganesh: "गणपती",
	shiva: "शिव",
	vishnu: "विष्णू",
	hanuman: "हनुमान",
	devi: "देवी",
	lakshmi: "लक्ष्मी",
	dattatreya: "दत्तात्रेय",
	vitthala: "विठ्ठल",
	saibaba: "साई बाबा",
	ram: "राम",
	sant: "संत",
	general: "सर्व",
};

const Home: React.FC = () => {
	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const selectedDeity = useDataStore((s) => s.selectedDeity);
	const sortOrder = useDataStore((s) => s.sortOrder);
	const { setSelectedDeity, setSortOrder } = useUIStoreActions();

	const [sortMenuVisible, setSortMenuVisible] = useState(false);

	// Unique deities present in the data
	const deities = useMemo(() => {
		const set = new Set<string>();
		aartis.forEach((x) => {
			const d = (x as { deity?: string }).deity;
			if (d) set.add(d);
		});
		return [...set];
	}, [aartis]);

	// Deterministic aarti of the day
	const todayAarti = useMemo(() => {
		const start = new Date(new Date().getFullYear(), 0, 0).getTime();
		const dayOfYear = Math.floor((Date.now() - start) / 86_400_000);
		return aartis[dayOfYear % aartis.length];
	}, [aartis]);

	const filteredAartis = useFilteredAartis(aartis, searchValue);

	const sortLabels: Record<SortOrder, string> = {
		default: "Default",
		az: "A → Z",
		deity: "By Deity",
	};

	return (
		<View style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}>
			<Head>
				<title>आरती संग्रह</title>
				<meta name="description" content="आरती संग्रह" />
			</Head>

			{/* Aarti of the Day — hidden during search */}
			{!searchValue && todayAarti && (
				<TouchableOpacity
					style={[styles.todayCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}
					onPress={() => router.push(`/aarti-view/${todayAarti.metadata.slug}`)}
				>
					<Text style={[styles.todayLabel, { color: colors.primary }]}>
						✨ आजची आरती
					</Text>
					<Text
						style={[styles.todayTitle, { color: colors.text }]}
						numberOfLines={1}
					>
						{todayAarti.title.original}
					</Text>
				</TouchableOpacity>
			)}

			{/* Deity chips + sort button */}
			{deities.length > 0 && (
				<View style={styles.filterRow}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.chipsContainer}
					>
						<TouchableOpacity
							style={[
								styles.chip,
								{
									backgroundColor: selectedDeity === null ? colors.primary : colors.surface,
									borderColor: colors.primary,
								},
							]}
							onPress={() => setSelectedDeity(null)}
						>
							<Text style={[styles.chipText, { color: selectedDeity === null ? colors.background : colors.primary }]}>
								सर्व
							</Text>
						</TouchableOpacity>
						{deities.map((deity) => (
							<TouchableOpacity
								key={deity}
								style={[
									styles.chip,
									{
										backgroundColor: selectedDeity === deity ? colors.primary : colors.surface,
										borderColor: colors.primary,
									},
								]}
								onPress={() => setSelectedDeity(selectedDeity === deity ? null : deity)}
							>
								<Text style={[styles.chipText, { color: selectedDeity === deity ? colors.background : colors.primary }]}>
									{DEITY_LABELS[deity] ?? deity}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<Menu
						visible={sortMenuVisible}
						onDismiss={() => setSortMenuVisible(false)}
						contentStyle={{ backgroundColor: colors.surface }}
						anchor={
							<IconButton
								icon="sort"
								size={22}
								iconColor={sortOrder !== "default" ? colors.accent : colors.text}
								onPress={() => setSortMenuVisible(true)}
								style={styles.sortButton}
							/>
						}
					>
						{(["default", "az", "deity"] as SortOrder[]).map((order) => (
							<Menu.Item
								key={order}
								title={sortLabels[order]}
								titleStyle={{ color: colors.text }}
								trailingIcon={sortOrder === order ? "check" : undefined}
								onPress={() => {
									setSortOrder(order);
									setSortMenuVisible(false);
								}}
							/>
						))}
					</Menu>
				</View>
			)}

			<View style={globalStyle.homecontainer}>
				<FlatList
					data={filteredAartis}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) => <SingleItem item={item} />}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={() => (
						<IconButton
							icon="plus"
							style={{
								...styles.addButton,
								borderColor: colors.primary,
								backgroundColor: colors.background,
								shadowColor: colors.background,
							}}
							onPress={() => router.push("/add-aarti/0")}
							iconColor={colors.primary}
							size={50}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	todayCard: {
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		marginBottom: spacing.sm,
		padding: spacing.md,
		borderRadius: 10,
		borderWidth: 1,
	},
	todayLabel: {
		fontSize: 11,
		fontWeight: "bold",
		letterSpacing: 0.5,
		marginBottom: 4,
	},
	todayTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	filterRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: spacing.lg,
	},
	chipsContainer: {
		gap: spacing.sm,
		paddingRight: spacing.sm,
		paddingVertical: spacing.sm,
	},
	chip: {
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 20,
		borderWidth: 1,
	},
	chipText: {
		fontSize: 13,
		fontWeight: "600",
	},
	sortButton: {
		marginRight: 4,
	},
	addButton: {
		marginVertical: 16,
		marginHorizontal: 0,
		alignItems: "center",
		width: "100%",
		borderWidth: 1,
		borderRadius: 10,
		elevation: 3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
});
