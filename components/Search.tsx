import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppTheme } from "../shared/types";
import { useDataStore, useDataStoreActions } from "../store/store";

const Search: React.FC = () => {
	const { colors } = useAppTheme();
	const searchValue = useDataStore((s) => s.searchValue);
	const { setSearchValue, setShowSearch } = useDataStoreActions();
	const searchInput = (data: string) => {
		setSearchValue(data);
	};

	return (
		<View
			style={{
				flexGrow: 1,
				margin: 10,
				justifyContent: "center",
			}}
		>
			<TextInput
				style={{
					...styles.inputStyle,
					color: colors.surface,
					borderColor: colors.surface,
				}}
				placeholder="Type here Search"
				placeholderTextColor={colors.text}
				autoFocus={true}
				onChangeText={(text) => searchInput(text)}
				value={searchValue}
			/>
			<IconButton
				icon="close"
				onPress={() => {
					setShowSearch(false);
					searchInput("");
				}}
				size={24}
				iconColor={colors.surface}
				style={styles.searchIcon}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		paddingRight: 40,
		height: 40,
		borderRadius: 5,
		borderWidth: 1,
		textAlign: "center",
	},
	searchIcon: {
		position: "absolute",
		right: 12,
	},
});

export default Search;
