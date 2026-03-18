import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { singleItemType, useAppTheme } from '../shared/types';
import { useDataStore, useDataStoreActions } from '../store/store';
import { fontStyle } from '../shared/styles';
import { router } from 'expo-router';
import IconBtn from './ui/IconBtn';

const SingleItem: React.FC<{
	item: singleItemType;
}> = ({ item }) => {
	const { colors } = useAppTheme();
	const translate = useDataStore((s) => s.translate);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);
	const { toggleFav } = useDataStoreActions();

	return (
		<View
			className="mt-4 border border-app-primary bg-app-bg rounded-lg"
			style={{
				shadowColor: colors.primary,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.3,
				shadowRadius: 4,
				elevation: 5,
			}}
		>
			<Pressable
				className="rounded-[10px] p-3 pb-4 px-4"
				onPress={() => router.push(`/aarti-view/${item.metadata.slug}`)}
				android_ripple={{ color: `${colors.primary}22`, borderless: true }}
			>
				<View>
					<View className="flex-row justify-between">
						<Text
							className="text-app-text flex-1 flex-wrap text-[30px]"
							style={[
								fontStyle[translate === 'original' ? 'fontOriginal' : 'fontItalic'],
							]}
							ellipsizeMode="tail"
							numberOfLines={1}
						>
							{item.title[translate]}
						</Text>
						<IconBtn
							icon={favoritesKeys.includes(item.key) ? 'heart' : 'heart-outline'}
							size={30}
							iconColor={favoritesKeys.includes(item.key) ? colors.accent : colors.text}
							onPress={() => toggleFav(item.key)}
						/>
					</View>
					<View className="flex-row justify-between">
						<Text
							className="text-app-text flex-1"
							style={[
								fontStyle[translate === 'original' ? 'fontOriginal' : 'fontItalic'],
							]}
							ellipsizeMode="tail"
							numberOfLines={1}
						>
							{item.body[translate].split('\n')[0]}
						</Text>
						<Text className="text-app-text pl-[5px] pr-[15px]">
							{item.key}
						</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
};

export default SingleItem;
