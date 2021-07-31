import React, { useReducer } from "react";
import EntryComponent from "./src/components/EntryComponent";
import Context from "./src/store/context";
import initialState from "./src/store/initialState";
import reducer from "./src/store/reducer";
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#181C3F", //yellow
    accent: "#181C3F",
    text: "#181C3F",
    background: "#FFE065", //blue
    surface: "#FFE065",
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
  },
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Context.Consumer>
        {(state) => {
          const { isDarkMode } = state.state;
          return (
            <PaperProvider theme={!isDarkMode ? dark : light}>
              <EntryComponent />
            </PaperProvider>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
