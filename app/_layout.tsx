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

const lightModeC = [
	{
		primary: "#181C3F",
		text: "#181C3F",
		accent: "#181C3F",
		background: "#FFE065",
		surface: "#FFE065",
	},
	{
		"primary": "#003366",
		"text": "#000000",
		"accent": "#FFCC00",
		"background": "#F0F0F0",
		"surface": "#FFFFFF"
	},
	{
		"primary": "#004d99",
		"text": "#333333",
		"accent": "#ff6600",
		"background": "#ffffff",
		"surface": "#f5f5f5"
	},
	{
		"primary": "#005073",
		"text": "#000000",
		"accent": "#7d8c8d",
		"background": "#e0f7fa",
		"surface": "#ffffff"
	},
	{
		"primary": "#0a3d62",
		"text": "#333333",
		"accent": "#6ab04c",
		"background": "#d6eaf8",
		"surface": "#ffffff"
	}
].map(x => ({
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...x,
		// blue: "#FFE065",
		// yellow: "#181C3F",
	},

}))

const darkModeC = [
	{
		primary: "#FFE065", //yellow
		text: "#FFE065",
		accent: "#FFE065",
		background: "#181C3F", //blue
		surface: "#181C3F",
	},
	{
		"primary": "#FFFFFF",
		"text": "#EAEAEA",
		"accent": "#EAEAEA",
		"background": "#181C3F",
		"surface": "#2C2C2C"
	},
	{
		"primary": "#FFCC00",
		"text": "#F0F0F0",
		"accent": "#003366",
		"background": "#000000",
		"surface": "#1A1A1A"
	},
	{
		"primary": "#004d99",
		"text": "#f0f0f0",
		"accent": "#ff6600",
		"background": "#1a1a1a",
		"surface": "#333333"
	},
	{
		"primary": "#005073",
		"text": "#e0f7fa",
		"accent": "#7d8c8d",
		"background": "#121212",
		"surface": "#1c1c1c"
	},
	{
		"primary": "#0a3d62",
		"text": "#f5f5f5",
		"accent": "#6ab04c",
		"background": "#1e1e1e",
		"surface": "#2a2a2a"
	}
].map(x => ({
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		...x,
		// blue: "#FFE065",
		// yellow: "#181C3F",
	},

}))

SplashScreen.preventAutoHideAsync();

let backPressed = 0;

const selectedINd = 4

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
		<PaperProvider theme={displayMode === "dark" ? darkModeC[selectedINd] : lightModeC[selectedINd]}>
			<Stack
				screenOptions={{
					statusBarStyle: displayMode === "dark" ? "dark" : "light",
					statusBarColor: displayMode === "dark" ? darkModeC[selectedINd].colors.primary : lightModeC[selectedINd].colors.primary,
					headerShown: false,
				}}
			>
				<Stack.Screen name="(app)" />
			</Stack>
		</PaperProvider>
	);
}
