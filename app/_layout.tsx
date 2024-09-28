import React, { useCallback, useEffect, useRef } from "react";
import "react-native-gesture-handler";
import {
	MD3DarkTheme,
	DefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import { useDataStore, useDataStoreActions } from "../store/store";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { BackHandler } from "react-native";
import { Roboto_400Regular_Italic } from '@expo-google-fonts/roboto';

declare global {
	namespace ReactNativePaper {
		interface ThemeColors {
			blue: string;
			yellow: string;
		}
	}
}

// export const light = {
// 	...DefaultTheme,
// 	colors: {
// 		...DefaultTheme.colors,
// 		primary: "#181C3F",
// 		text: "#181C3F",
// 		accent: "#181C3F",
// 		background: "#FFE065",
// 		surface: "#FFE065",
// 		// blue: "#FFE065",
// 		// yellow: "#181C3F",
// 	},
// };
// const dark = {
// 	...MD3DarkTheme,
// 	colors: {
// 		...MD3DarkTheme.colors,
// 		primary: "#FFE065", //yellow
// 		text: "#FFE065",
// 		accent: "#FFE065",
// 		background: "#181C3F", //blue
// 		surface: "#181C3F",
// 		// blue: "#FFE065",
// 		// yellow: "#181C3F",
// 	},
// };



export const light = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#8D99AE", // Soft grayish-blue
		text: "#2B2D42",    // Charcoal gray for text
		accent: "#D8D8D8",  // Light gray for accents
		background: "#F8F9FA", // Very light gray background
		surface: "#FFFFFF",   // White for content areas
		border: "#B0B0B0",    // Medium gray for borders
	},
};
const dark = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: "#F1FA8C", // Soft pastel yellow
		text: "#FFFFFF",     // Pure white for high contrast
		accent: "#FF6F61",   // Coral for accents
		background: "#2D2A32", // Deep gray for background
		surface: "#4A4E69",   // Muted slate gray for surface areas
		border: "#F1FA8C",    // Matches primary color for borders
	},
};

SplashScreen.preventAutoHideAsync();

let backPressed = 0;

export default function RootLayout2() {
	const [fontsLoaded, fontError] = useFonts({
		nono_devanagari: require("../assets/fonts/NotoSansDevanagari.ttf"),
		Roboto_400Regular_Italic
	});

	const aartis = useDataStore((s) => s.aartis);
	const showSearch = useDataStore((s) => s.showSearch);
	const displayMode = useDataStore((s) => s.displayMode);
	const { initializeAarti, setShowSearch, setSearchValue } =
		useDataStoreActions();

	useEffect(() => {
		if (aartis.length === 0 || !aartis[0].metadata.slug) {
			initializeAarti();
		}
	}, [aartis]);

	const showSearchRef = useRef<boolean>();

	useEffect(() => {
		showSearchRef.current = showSearch;
	}, [showSearch]);

	useEffect(() => {
		const backAction = () => {
			if (backPressed > 0) {
				BackHandler.exitApp();
				backPressed = 0;
			} else {
				if (router.canGoBack()) {
					router.back();
					return true;
				} else if (showSearchRef.current) {
					setShowSearch(false);
					setSearchValue("");
					return true;
				}

				backPressed++;
				// ToastAndroid.show('Press Again To Exit', ToastAndroid.SHORT);
				setTimeout(() => {
					backPressed = 0;
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
			// Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	// Prevent rendering until the font has loaded or an error was returned
	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<PaperProvider theme={displayMode === "dark" ? dark : light}>
			<Stack
				screenOptions={{
					statusBarStyle: displayMode === "dark" ? "dark" : "light",
					statusBarColor: displayMode === "dark" ? dark.colors.primary : light.colors.primary,
					headerShown: false,
				}}
			>
				<Stack.Screen name="(app)" />
			</Stack>
		</PaperProvider>
	);
}
