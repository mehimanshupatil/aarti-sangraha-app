import React, { useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { globalStyle } from "../../../shared/styles";
import { singleItemType, useAppTheme } from "../../../shared/types";
import { useDataStore, useDataStoreActions } from "../../../store/store";

const AddNew: React.FC = () => {
	const { colors } = useAppTheme();
	const { key } = useLocalSearchParams();

	const aartis = useDataStore((s) => s.aartis);
	const { addAarti, updateAarti } = useDataStoreActions();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [selectedItem, setSelectedItem] = useState(
		aartis.find((x) => x.key === key),
	);

	useEffect(() => {
		const single = aartis.find((x) => x.key === key);
		if (!single) return;
		setSelectedItem(single);
		setTitle(single.title.original);
		setBody(single.body.original);
	}, [aartis, key]);

	const onOkPress = () => {
		const item: singleItemType = {
			title: { original: title, transliteration: "" },
			body: { original: body, transliteration: "" },
			key: `custom-${Date.now()}`,
			metadata: {
				tags: [],
				slug: `custom-${Date.now()}`,
			},
		};
		addAarti(item);
		router.back();
	};

	const onUpdatePress = () => {
		if (!selectedItem) return;
		updateAarti({
			...selectedItem,
			title: { original: title, transliteration: "" },
			body: { original: body, transliteration: "" },
		});
		router.back();
	};

	const addItem = () => {
		if (!title || !body) return;
		Alert.alert(
			"Confirm",
			"Data is stored locally. Clearing app data or uninstalling will remove it.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "OK",
					onPress: () => {
						selectedItem ? onUpdatePress() : onOkPress();
						Keyboard.dismiss();
					},
				},
			],
		);
	};

	return (
		<View style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}>
			<Stack.Screen
				options={{
					title: selectedItem ? "Update" : "Add",
					headerTintColor: colors.background,
					headerStyle: { backgroundColor: colors.primary },
					headerShown: true,
				}}
			/>
			<ScrollView style={globalStyle.homecontainer} keyboardShouldPersistTaps="handled">
				<TextInput
					placeholderTextColor={colors.primary}
					style={{
						...styles.input,
						color: colors.primary,
						backgroundColor: colors.background,
						borderColor: colors.primary,
					}}
					placeholder="Title"
					value={title}
					onChangeText={setTitle}
				/>
				<TextInput
					placeholderTextColor={colors.primary}
					style={{
						...styles.input,
						color: colors.primary,
						backgroundColor: colors.background,
						borderColor: colors.primary,
					}}
					placeholder="Body"
					value={body}
					onChangeText={setBody}
					numberOfLines={20}
					multiline={true}
				/>
				<TouchableOpacity
					style={{ ...styles.button, borderColor: colors.primary }}
					onPress={addItem}
				>
					<Text style={{ color: colors.text, fontWeight: "bold", fontSize: 15 }}>
						{selectedItem ? "Update" : "Add"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default AddNew;

const styles = StyleSheet.create({
	input: {
		marginTop: 20,
		fontSize: 20,
		borderRadius: 5,
		borderWidth: 1,
		textAlignVertical: "top",
		padding: 10,
	},
	button: {
		alignItems: "center",
		padding: 10,
		marginTop: 10,
		borderRadius: 5,
		borderWidth: 1,
	},
});
