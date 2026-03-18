import React, { useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	ScrollView,
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
		<View className="flex-grow h-full bg-app-bg">
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
					className="mt-5 text-[20px] rounded-[5px] border p-[10px] border-app-primary text-app-primary bg-app-bg"
					style={{ textAlignVertical: 'top' }}
					placeholder="Title"
					value={title}
					onChangeText={setTitle}
				/>
				<TextInput
					placeholderTextColor={colors.primary}
					className="mt-5 text-[20px] rounded-[5px] border p-[10px] border-app-primary text-app-primary bg-app-bg"
					style={{ textAlignVertical: 'top' }}
					placeholder="Body"
					value={body}
					onChangeText={setBody}
					numberOfLines={20}
					multiline={true}
				/>
				<TouchableOpacity
					className="items-center p-[10px] mt-[10px] rounded-[5px] border border-app-primary"
					onPress={addItem}
				>
					<Text className="text-app-text font-bold text-[15px]">
						{selectedItem ? "Update" : "Add"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default AddNew;
