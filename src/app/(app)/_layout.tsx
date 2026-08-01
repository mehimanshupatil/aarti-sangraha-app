import { Stack } from "expo-router";
import React from "react";
import { useAppTheme } from "../../shared/types";

export default function AppLayout() {
	const { colors } = useAppTheme();
	return (
		<Stack screenOptions={{ animation: "slide_from_right", contentStyle: { backgroundColor: colors.background } }}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
			<Stack.Screen name="aarti-view/[slug]" options={{ headerShown: false }} />
			<Stack.Screen name="add-aarti/[key]" options={{ headerShown: false }} />
		</Stack>
	);
}
