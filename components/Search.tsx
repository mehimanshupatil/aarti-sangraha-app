import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { IconButton } from "react-native-paper";
import { useAppTheme } from "../shared/types";
import { useDataStore, useUIStoreActions } from "../store/store";

const Search: React.FC = () => {
	const { colors } = useAppTheme();
	const searchValue = useDataStore((s) => s.searchValue);
	const { setSearchValue, setShowSearch } = useUIStoreActions();

	return (
		<View style={styles.container}>
			<TextInput
				style={{
					...styles.inputStyle,
					color: colors.surface,
					borderColor: colors.surface,
				}}
				placeholder="Type here to search"
				placeholderTextColor={colors.text}
				autoFocus={true}
				onChangeText={setSearchValue}
				value={searchValue}
			/>
			<IconButton
				icon="close"
				onPress={() => {
					setShowSearch(false);
					setSearchValue("");
				}}
				size={24}
				iconColor={colors.surface}
				style={styles.searchIcon}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		margin: 10,
		justifyContent: "center",
	},
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
