import React from "react";
import EntryComponent from "./src/components/EntryComponent";
import Context, { DataProvider } from "./src/store/context";
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StatusBar } from "react-native";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      blue: string;
      yellow: string;
    }
  }
}

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#181C3F",
    accent: "#181C3F",
    text: "#181C3F",
    background: "#FFE065",
    surface: "#FFE065",
    blue: "#FFE065",
    yellow: "#181C3F",
  },
};
const dark = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFE065", //yellow
    accent: "#FFE065",
    text: "#FFE065",
    background: "#181C3F", //blue
    surface: "#181C3F",
    blue: "#FFE065",
    yellow: "#181C3F",
  },
};

export default function App() {
  return (
    <DataProvider>
      <Context.Consumer>
        {(state) => {
          const { isDarkMode } = state.state;
          return (
            <PaperProvider theme={isDarkMode === "dark" ? dark : light}>
              <StatusBar
                barStyle={
                  isDarkMode === "dark" ? "dark-content" : "light-content"
                }
                backgroundColor={isDarkMode === "dark" ? "#FFE065" : "#181C3F"}
              />
              <EntryComponent />
            </PaperProvider>
          );
        }}
      </Context.Consumer>
    </DataProvider>
  );
}
