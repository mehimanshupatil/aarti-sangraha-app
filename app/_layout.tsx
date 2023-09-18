import React, { useCallback, useEffect, useRef } from 'react';
import 'react-native-gesture-handler';
import { MD3DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useDataStore } from '../store/store';
import { SplashScreen, Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { BackHandler } from 'react-native';

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            blue: string;
            yellow: string;
        }
    }
}

export const light = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#181C3F',
        accent: '#181C3F',
        text: '#181C3F',
        background: '#FFE065',
        surface: '#FFE065',
        blue: '#FFE065',
        yellow: '#181C3F',
    },
};
const dark = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#FFE065', //yellow
        accent: '#FFE065',
        text: '#FFE065',
        background: '#181C3F', //blue
        surface: '#181C3F',
        blue: '#FFE065',
        yellow: '#181C3F',
    },
};

SplashScreen.preventAutoHideAsync();

let backPressed = 0;

export default function RootLayout2() {
    const [fontsLoaded, fontError] = useFonts({
        'nono_devanagari': require('../assets/fonts/NotoSansDevanagari.ttf')
    });

    const [aartis, initializeAarti] = useDataStore(s => [s.aartis, s.initializeAarti])

    useEffect(() => {
        if (aartis.length === 0 || !aartis[0].slug) {
            initializeAarti()
        }
    }, [aartis])

    const [showSearch, setShowSearch, setSearchValue, displayMode] = useDataStore(s => [
        s.showSearch,
        s.setShowSearch,
        s.setSearchValue,
        s.displayMode
    ])

    const showSearchRef = useRef<boolean>()

    useEffect(() => {
        showSearchRef.current = showSearch
    }, [showSearch])

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
                    setShowSearch(false)
                    setSearchValue('');
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
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
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
        <PaperProvider theme={displayMode === 'dark' ? dark : light}  >

            <Stack screenOptions={{
                statusBarStyle: displayMode === 'dark' ? 'dark' : 'light',
                statusBarColor: displayMode === 'dark' ? '#FFE065' : '#181C3F',
                headerShown: false
            }}
            >
                <Stack.Screen name='(app)' />
            </Stack>
        </PaperProvider>
    );
}
