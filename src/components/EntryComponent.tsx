import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MyDrawer from '../routes/Drawer';
import { StorageKey } from '../shared/types';
import AppLoading from 'expo-app-loading';
import { useData } from '../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

function EntryComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { state, dispatch } = useData();

  let colorScheme = useColorScheme();

  useEffect(() => {
    const getData = async () => {
      try {
        const fontSize = await AsyncStorage.getItem(StorageKey.fontSize);
        if (fontSize)
          dispatch({
            type: 'UPDATEFONTSIZE',
            fontSize: parseInt(fontSize),
          });
        const darkmode = await AsyncStorage.getItem(StorageKey.darkMode);
        dispatch({
          type: 'ISDARK',
          data: darkmode ? (darkmode as 'light' | 'dark') : colorScheme ? colorScheme : 'light',
        });
        const favList = await AsyncStorage.getItem(StorageKey.favList);
        dispatch({
          type: 'ADDFAVLIST',
          favList: favList ? JSON.parse(favList) : [],
        });
        const value = await AsyncStorage.getItem(StorageKey.aartis);
        if (!value) return;
        dispatch({ type: 'ADDLOCAL', data: JSON.parse(value) });
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
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default EntryComponent;
