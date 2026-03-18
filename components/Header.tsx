import React from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
	FadeIn,
	FadeOut,
	SlideInRight,
	SlideOutRight,
} from 'react-native-reanimated';
import { useAppTheme } from '../shared/types';
import { fontStyle } from '../shared/styles';
import { useDataStore, useUIStoreActions } from '../store/store';
import Search from './Search';
import IconBtn from './ui/IconBtn';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;

const Header: React.FC<{
	title: string;
	showSearchButton: boolean;
}> = ({ title, showSearchButton }) => {
	const { top } = useSafeAreaInsets();
	const STATUSBAR_HEIGHT = top || 8;

	const { colors } = useAppTheme();
	const translate = useDataStore((s) => s.translate);
	const showSearch = useDataStore((s) => s.showSearch);
	const { setShowSearch } = useUIStoreActions();

	return (
		<View
			className="bg-app-primary w-full justify-center overflow-hidden pr-[10px]"
			style={{
				paddingTop: STATUSBAR_HEIGHT,
				height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
			}}
		>
			{!showSearch ? (
				<Animated.View
					key="title-bar"
					entering={FadeIn.duration(200)}
					exiting={FadeOut.duration(100)}
					className="flex-row items-center justify-between flex-1"
				>
					<View className="w-11 h-11" />
					<Text
						className="text-app-on-primary font-bold text-[20px] tracking-[1px]"
						style={[
							fontStyle[
								translate === 'original' ? 'fontOriginal' : 'fontItalic'
							],
						]}
					>
						{title}
					</Text>
					{showSearchButton ? (
						<IconBtn
							icon="text-box-search-outline"
							onPress={() => setShowSearch(true)}
							size={28}
							iconColor={colors.onPrimary}
						/>
					) : (
						<View className="w-11 h-11" />
					)}
				</Animated.View>
			) : (
				<Animated.View
					key="search-bar"
					entering={SlideInRight.duration(250)}
					exiting={SlideOutRight.duration(200)}
					className="flex-row items-center justify-between flex-1"
				>
					<Search />
				</Animated.View>
			)}
		</View>
	);
};

export default Header;
