import React from 'react';
import { TextInput, View } from 'react-native';
import { useAppTheme } from '../shared/types';
import { useDataStore, useUIStoreActions } from '../store/store';
import IconBtn from './ui/IconBtn';

const Search: React.FC = () => {
	const { colors } = useAppTheme();
	const searchValue = useDataStore((s) => s.searchValue);
	const { setSearchValue, setShowSearch } = useUIStoreActions();

	return (
		<View className="flex-1 flex-row items-center mx-2 gap-1">
			<TextInput
				className="flex-1 h-[38px] rounded-md border border-app-on-primary text-app-on-primary px-3"
				placeholder="Search…"
				placeholderTextColor={`${colors.onPrimary}99`}
				autoFocus
				onChangeText={setSearchValue}
				value={searchValue}
			/>
			<IconBtn
				icon="close"
				onPress={() => {
					setShowSearch(false);
					setSearchValue('');
				}}
				size={22}
				iconColor={colors.onPrimary}
			/>
		</View>
	);
};

export default Search;
