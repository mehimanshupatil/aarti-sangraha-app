import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import MyDrawer from "../routes/drawer";
import { StorageKey } from "../shared/types";
import AppLoading from "expo-app-loading";
import Context from "../store/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EntryComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { dispatch } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      try {
        const fontSize = await AsyncStorage.getItem(StorageKey.fontSize);
        if (fontSize)
          dispatch({
            type: "UPDATEFONTSIZE",
            fontSize: parseInt(fontSize),
          });
        const value = await AsyncStorage.getItem(StorageKey.aartis);
        if (!value) return;
        dispatch({ type: "ADDLOCAL", data: JSON.parse(value) });
      } catch (error) {}
    };
    getData().then((x) => {
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DefaultTheme.colors,
          background: "rgb(24,28,63)",
        },
      }}
    >
      <MyDrawer />
    </NavigationContainer>
  );
}

export default EntryComponent;
