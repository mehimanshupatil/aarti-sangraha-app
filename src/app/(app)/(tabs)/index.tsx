import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Menu, MenuItem, MenuItemLabel } from '../../../components/ui/menu';
import IconBtn from '../../../components/ui/IconBtn';
import { router } from 'expo-router';
import Head from 'expo-router/head';
import SingleItem from '../../../components/SingleItem';
import { useAppTheme } from '../../../shared/types';
import { useDataStore, useUIStoreActions } from '../../../store/store';
import { useAartiList } from '../../../hooks/useFilteredAartis';
import { getDailyAarti, getDeity } from '../../../shared/aarti';
import { DEITY_LABELS } from '../../../shared/const';
import type { SortOrder } from '../../../store/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Home: React.FC = () => {
	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const selectedDeity = useDataStore((s) => s.selectedDeity);
	const sortOrder = useDataStore((s) => s.sortOrder);
	const { setSelectedDeity, setSortOrder } = useUIStoreActions();

	// Unique deities present in the data
	const deities = useMemo(() => {
		const set = new Set<string>();
		aartis.forEach((x) => {
			const d = getDeity(x);
			if (d) set.add(d);
		});
		return [...set];
	}, [aartis]);

	const todayAarti = getDailyAarti(aartis);

	const filteredAartis = useAartiList();

	const sortLabels: Record<SortOrder, string> = {
		default: 'Default',
		az: 'A → Z',
		deity: 'By Deity',
	};

	return (
		<View className="flex-grow h-full bg-app-bg">
			<Head>
				<title>आरती संग्रह</title>
				<meta name="description" content="आरती संग्रह" />
			</Head>

			{/* Aarti of the Day — hidden during search */}
			{!searchValue && todayAarti && (
				<TouchableOpacity
					className="mx-5 mt-4 mb-2 p-4 rounded-[10px] border border-app-primary bg-app-surface"
					onPress={() => router.push(`/aarti-view/${todayAarti.metadata.slug}`)}
				>
					<Text className="text-[11px] font-bold tracking-[0.5px] mb-1 text-app-primary">
						✨ आजची आरती
					</Text>
					<Text
						className="text-[18px] font-bold text-app-text"
						numberOfLines={1}
					>
						{todayAarti.title.original}
					</Text>
				</TouchableOpacity>
			)}

			{/* Deity chips + sort button */}
			{deities.length > 0 && (
				<View className="flex-row items-center pl-5">
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerClassName="gap-2 pr-2 py-2"
					>
						<TouchableOpacity
							className={clsx('px-[14px] py-[6px] rounded-[20px] border border-app-primary', selectedDeity === null ? 'bg-app-primary' : 'bg-app-surface')}
							onPress={() => setSelectedDeity(null)}
						>
							<Text className={clsx('text-[13px] font-semibold', selectedDeity === null ? 'text-app-bg' : 'text-app-primary')}>
								सर्व
							</Text>
						</TouchableOpacity>
						{deities.map((deity) => (
							<TouchableOpacity
								key={deity}
								className={clsx('px-[14px] py-[6px] rounded-[20px] border border-app-primary', selectedDeity === deity ? 'bg-app-primary' : 'bg-app-surface')}
								onPress={() => setSelectedDeity(selectedDeity === deity ? null : deity)}
							>
								<Text className={clsx('text-[13px] font-semibold', selectedDeity === deity ? 'text-app-bg' : 'text-app-primary')}>
									{DEITY_LABELS[deity] ?? deity}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<Menu
						trigger={(triggerProps) => (
							<IconBtn
								{...triggerProps}
								icon="sort"
								size={22}
								iconColor={
									sortOrder !== 'default' ? colors.accent : colors.text
								}
								className="mr-1"
							/>
						)}
						placement="bottom right"
						useRNModal
						offset={4}
						className="bg-app-surface"
						closeOnSelect
					>
						{(['default', 'az', 'deity'] as SortOrder[]).map((order) => (
							<MenuItem
								key={order}
								textValue={sortLabels[order]}
								onPress={() => setSortOrder(order)}
							>
								{sortOrder === order && (
									<MaterialCommunityIcons
										name="check"
										size={18}
										color={colors.accent}
										className="mr-3"
									/>
								)}
								<MenuItemLabel className="text-app-text">
									{sortLabels[order]}
								</MenuItemLabel>
							</MenuItem>
						))}
					</Menu>
				</View>
			)}

			<View className="mx-5 mt-0 mb-0 flex-1">
				<FlatList
					data={filteredAartis}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) => <SingleItem item={item} />}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={() => (
						<IconBtn
							icon="plus"
							className="my-4 mx-0 items-center w-full border rounded-[10px] border-app-primary bg-app-bg"
							style={{
								elevation: 3,
								shadowColor: colors.background,
								shadowOffset: { width: 1, height: 1 },
								shadowOpacity: 0.3,
								shadowRadius: 2,
							}}
							onPress={() => router.push('/add-aarti/0')}
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
