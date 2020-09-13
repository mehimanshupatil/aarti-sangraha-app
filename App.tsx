import { NavigationContainer } from '@react-navigation/native';
import Axios from 'axios';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import HomeStack from './routes/homeStack';
import MyDrawer from './routes/drawer'

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [fontSize, setFontSize] = useState(20);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('aartiData');
      if (data !== null) {
        setApiData(JSON.parse(data))
      } else {
        await Axios.get('https://api.jsonbin.io/b/5f5ca28e302a837e9564c179/latest', {
          headers: { 'secret-key': '$2b$10$jQMfRI73zHSDNOquzSk8eeLsivUvrwFxP0ZAyVYMSZ2WUkPbgtf9C' }
        })
          .then(async x => {
            setApiData(x.data)
            await AsyncStorage.setItem('aartiData', JSON.stringify(x.data));
          })
      }

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
        <MyDrawer apiData={apiData} fontSize={fontSize} />
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
