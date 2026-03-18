import React from "react";
import { View, Text, ScrollView } from "react-native";
import * as Linking from "expo-linking";
import { domainUrl } from "../../../shared/const";

const About: React.FC = () => {
	const handlePress = (url: string) => {
		Linking.openURL(url);
	};

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", padding: 20 }}
			className="bg-app-bg"
		>
			<View className="flex-1">
				<Text className="text-app-text text-[20px]">
					If you're enjoying the app, please consider sharing your feedback with
					a 5-star rating
					<Text
						className="text-green-600"
						onPress={() =>
							handlePress(
								"https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha",
							)
						}
					>
						{" "}
						Play Store{" "}
					</Text>
					/
					<Text
						className="text-green-600"
						onPress={() => handlePress("https://galaxy.store/aarti")}
					>
						{" "}
						Samsung Store{" "}
					</Text>
					also web Version of app is available at
					<Text className="text-green-600" onPress={() => handlePress(domainUrl)}>
						{" "}
						{domainUrl}
					</Text>
					{"\n"}
					{"\n"}
					If you have suggestions, questions, or encounter any issues, don't
					hesitate to reach out:{"\n"}
					<Text
						className="text-green-600"
						onPress={() => handlePress("mailto:mailhimanshupatil@gmail.com")}
					>
						dev@himanshupatil.dev
					</Text>
					{"\n"}
					{"\n"}
					<Text>Credits:</Text>
					{"\n"}
					Application Icon and Splash Icon Image by
					<Text
						className="text-green-600"
						onPress={() =>
							handlePress(
								"https://pixabay.com/users/AdventureTravelTrip-7440487/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353",
							)
						}
					>
						{" "}
						Hitesh Sharma{" "}
					</Text>
					from
					<Text
						className="text-green-600"
						onPress={() =>
							handlePress(
								"https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353",
							)
						}
					>
						{" "}
						Pixabay{" "}
					</Text>
				</Text>
			</View>
			<View className="items-center">
				<Text className="text-app-text text-[20px]">
					{"🧑‍💻 with ♥️ in 🇮🇳"}
				</Text>
			</View>
		</ScrollView>
	);
};

export default About;
