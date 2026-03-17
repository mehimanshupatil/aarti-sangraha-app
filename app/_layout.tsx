import React, { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	MD3DarkTheme,
	DefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import { useDataStore, useDataStoreActions, useUIStoreActions } from "../store/store";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { BackHandler } from "react-native";
import { Roboto_400Regular_Italic } from "@expo-google-fonts/roboto";

declare global {
	namespace ReactNativePaper {
		interface ThemeColors {
			onPrimary: string;
			blue: string;
			yellow: string;
		}
	}
}

export const light = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#B84512",    // Rich saffron-terracotta — vibrant, warm
		onPrimary: "#FFFBF2",  // Cream white — text/icons on primary header
		text: "#3A2B1A",       // Warm dark brown — easy on eyes, not pure black
		accent: "#C47A3A",     // Muted amber — favorites, icons
		background: "#FAF4E8", // Warm parchment — reduced blue light
		surface: "#F3EAD5",    // Soft tan — cards, slightly distinct from bg
		border: "#C4A47A",     // Soft golden tan — gentle card borders
	},
};
const dark = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: "#DDAA55",    // Muted warm gold — headers, NOT harsh yellow
		onPrimary: "#1C1812",  // Dark brown — text/icons on gold header
		text: "#E8D9BC",       // Warm cream — reduced contrast, not pure white
		accent: "#CC7A3A",     // Muted warm orange — favorites, icons
		background: "#1C1812", // Warm very dark brown — not pure black
		surface: "#262018",    // Slightly lighter warm dark — cards
		border: "#DDAA55",     // Matches primary gold
	},
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout2() {
	const [fontsLoaded, fontError] = useFonts({
		nono_devanagari: require("../assets/fonts/NotoSansDevanagari.ttf"),
		Roboto_400Regular_Italic,
	});

	const aartis = useDataStore((s) => s.aartis);
	const showSearch = useDataStore((s) => s.showSearch);
	const displayMode = useDataStore((s) => s.displayMode);
	const { initializeAarti } = useDataStoreActions();
	const { setShowSearch, setSearchValue } = useUIStoreActions();

	useEffect(() => {
		if (aartis.length === 0 || !aartis[0].metadata.slug) {
			initializeAarti();
		}
	}, [aartis]);

	const showSearchRef = useRef<boolean>(false);
	const backPressedRef = useRef(0);

	useEffect(() => {
		showSearchRef.current = showSearch;
	}, [showSearch]);

	useEffect(() => {
		const backAction = () => {
			if (backPressedRef.current > 0) {
				BackHandler.exitApp();
				backPressedRef.current = 0;
			} else {
				if (router.canGoBack()) {
					router.back();
					return true;
				} else if (showSearchRef.current) {
					setShowSearch(false);
					setSearchValue("");
					return true;
				}

				backPressedRef.current++;
				setTimeout(() => {
					backPressedRef.current = 0;
				}, 2000);
				return true;
			}
			return true;
		};
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction,
		);
		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PaperProvider theme={displayMode === "dark" ? dark : light}>
				<Stack
					screenOptions={{
						statusBarStyle: displayMode === "dark" ? "light" : "dark",
						headerShown: false,
					}}
				>
					<Stack.Screen name="(app)" />
				</Stack>
			</PaperProvider>
		</GestureHandlerRootView>
	);
}
