import { Stack } from 'expo-router';


import React from 'react';
import 'react-native-gesture-handler';
import { MD3DarkTheme, DefaultTheme, Provider as PaperProvider, useTheme, IconButton } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { useDataStore } from '../src/store/store';
import Header from '../src/shared/Header';
import { onShare } from '../src/routes/HomeStack';
import { useAppTheme } from '../src/shared/types';

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


export default function RootLayout() {
    const displayMode = useDataStore(s => s.displayMode)

    return (
        <PaperProvider theme={displayMode === 'dark' ? dark : light} >
            <Stack screenOptions={{
                statusBarStyle: displayMode === 'dark' ? 'dark' : 'light',
                statusBarColor: displayMode === 'dark' ? '#FFE065' : '#181C3F'
            }}
            >
                <Stack.Screen
                    name="(home)"
                    options={{
                        title: 'Home Screen', headerShown: !false,
                        header: () => <Header title='आरती संग्रह' showSearchButton />,
                    }}
                />
                <Stack.Screen
                    options={{
                        header: () => (
                            <Header title='About' showSearchButton={false} />
                        ),
                    }}
                    name='about'
                />
                <Stack.Screen name='aarti-view/[key]' />
                <Stack.Screen name='add-aarti/[key]' />
            </Stack>
        </PaperProvider>
    );
}
