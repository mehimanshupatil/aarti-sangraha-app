import '../global.css';
import React, { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	useDataStore,
	useDataStoreActions,
	useUIStoreActions,
} from '../store/store';
import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { BackHandler } from 'react-native';
import { Roboto_400Regular_Italic } from '@expo-google-fonts/roboto';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		nono_devanagari: require('../assets/fonts/NotoSansDevanagari.ttf'),
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
					setSearchValue('');
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
			'hardwareBackPress',
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
		<GluestackUIProvider mode={displayMode === 'dark' ? 'dark' : 'light'}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack
					screenOptions={{
						statusBarStyle: displayMode === 'dark' ? 'light' : 'dark',
						headerShown: false,
					}}
				>
					<Stack.Screen name="(app)" />
				</Stack>
			</GestureHandlerRootView>
		</GluestackUIProvider>
	);
}
