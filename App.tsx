import React from 'react';
import 'react-native-gesture-handler';
import EntryComponent from './src/components/EntryComponent';
import { MD3DarkTheme, DefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { useDataStore } from './src/store/store';

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

export default function App() {
  const displayMode = useDataStore(s => s.displayMode)
  return (<PaperProvider
    theme={displayMode === 'dark' ? dark : light}
  >
    <StatusBar
      barStyle={displayMode === 'dark' ? 'dark-content' : 'light-content'}
      backgroundColor={displayMode === 'dark' ? '#FFE065' : '#181C3F'}
    />
    <EntryComponent />
  </PaperProvider>
  );
}
