import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Alert,
	Keyboard,
	ScrollView,
	TextInput,
} from "react-native";
import { globalStyle } from "../../../../shared/styles";
import { useAppTheme, singleItemType } from "../../../../shared/types";
import { useDataStore, useDataStoreActions } from "../../../../store/store";
import { Stack, router, useLocalSearchParams } from "expo-router";

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
			title: {
				original: title,
				transliteration: "",
			},
			body: {
				original: body,
				transliteration: "",
			},
			key: (aartis.length + 1).toString(), //key between 100 to 1k
			metadata: {
				tags: [],
				slug: title.replace(/\s+/g, "-"),
			},
		};
		addAarti(item);
		// ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
		router.back();
	};

	const update = () => {
		if (!selectedItem) return;
		const data: singleItemType = {
			...selectedItem,
			title: {
				original: title,
				transliteration: "",
			},
			body: {
				original: body,
				transliteration: "",
			},
		};
		updateAarti(data);
		// ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT);
		router.back();
	};

	const addItem = () => {
		if (!title || !body) return;
		Alert.alert(
			"Alert",
			`The data is stored Locally on your Device. So clearing or uninstalling app will remove customized data.`,
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => {
						selectedItem ? update() : onOkPress();
						Keyboard.dismiss();
					},
				},
			],
		);
	};

	return (
		<View
			style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}
		>
			<Stack.Screen
				options={{
					title: selectedItem ? "Update" : "Add",
					headerTintColor: colors.background,
					headerStyle: {
						backgroundColor: colors.primary,
					},
				}}
			/>
			<ScrollView
				style={globalStyle.homecontainer}
				keyboardShouldPersistTaps="handled"
			>
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
					onChangeText={(text) => setTitle(text)}
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
					onChangeText={(text) => setBody(text)}
					numberOfLines={20}
					multiline={true}
				/>
				<TouchableOpacity
					style={{ ...styles.buttonText, borderColor: colors.primary }}
					onPress={addItem}
				>
					<Text
						style={{
							color: colors.primary,
							fontWeight: "bold",
							fontSize: 15,
						}}
					>
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
	buttonText: {
		alignItems: "center",
		padding: 10,
		marginTop: 10,
		borderRadius: 5,
		borderWidth: 1,
	},
});
