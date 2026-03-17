import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
	return (
		<Stack screenOptions={{ animation: "slide_from_right" }}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
			<Stack.Screen name="aarti-view/[slug]" options={{ headerShown: false }} />
			<Stack.Screen name="add-aarti/[key]" options={{ headerShown: false }} />
		</Stack>
	);
}
