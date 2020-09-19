import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import MyDrawer from './routes/drawer'

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [apiData, setApiData] = useState([] as any);
  const [fontSize, setFontSize] = useState(20);
  const [favorites, setFavorites] = useState(20);



  const getData = async () => {
    try {
      const data = require('./shared/data.json')
      const localdata = await AsyncStorage.getItem('customAarti') ?? '[]';
      setApiData([...data, ...JSON.parse(localdata)])

      const fav = await AsyncStorage.getItem('favorites') ?? '[]';
      setFavorites(JSON.parse(fav))

      const value = await AsyncStorage.getItem('fontSize');
      if (value !== null) {
        setFontSize(+value)
      } else {
        setFontSize(20)
        await AsyncStorage.setItem('fontSize', '20');
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  const setLocalAartiData = async (title, body) => {
    const localdata = await AsyncStorage.getItem('customAarti') ?? '[]';
    let obj = [...JSON.parse(localdata), { title, body }]
    await AsyncStorage.setItem('customAarti', JSON.stringify(obj));
    setApiData([...apiData, { title, body }])
  }

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={getData}
        onFinish={() => setDataLoaded(true)}
      />
    );
  } else {
    return (
      <NavigationContainer>
        <MyDrawer apiData={apiData} fontSize={fontSize} favorites={[1]} setLocalAartiData={setLocalAartiData} setFontSize={setFontSize} />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
