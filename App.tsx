import { NavigationContainer } from '@react-navigation/native';
import Axios from 'axios';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import MyDrawer from './routes/drawer'
import moment from 'moment';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [fontSize, setFontSize] = useState(20);

  const getData = async () => {
    try {
      const refreshDate = await AsyncStorage.getItem('refreshDate');
      if (refreshDate !== null) {// after 30 days refresh the data
        let days = moment().diff(moment(refreshDate), 'days')
        if (days > 30)
          await fetchData(null)
      } else {
        await fetchData(null)
      }

      const data = await AsyncStorage.getItem('aartiData');
      const localdata = await AsyncStorage.getItem('localAartiData');

      await fetchData(data, localdata)

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

  const fetchData = async (data, localdata = '[]') => {
    let localParse = JSON.parse(localdata)
    if (data == null) {
      await Axios.get('https://api.jsonbin.io/b/5f5ca28e302a837e9564c179/latest', {
        headers: { 'secret-key': '$2b$10$jQMfRI73zHSDNOquzSk8eeLsivUvrwFxP0ZAyVYMSZ2WUkPbgtf9C' }
      })
        .then(async x => {
          let newArray = localdata ? [...localParse, ...x.data] : x.data
          setApiData(newArray)
          await AsyncStorage.setItem('aartiData', JSON.stringify(x.data));
          await AsyncStorage.setItem('refreshDate', moment().format());
        })
    } else {
      let newArray = localdata ? [...localParse, ...JSON.parse(data)] : JSON.parse(data)
      setApiData(newArray)
    }
  }

  const setLocalAartiData = async (title, body) => {
    const localdata = await AsyncStorage.getItem('localAartiData') ?? '[]';
    let obj = [{ title, body }, ...JSON.parse(localdata)]
    await AsyncStorage.setItem('localAartiData', JSON.stringify(obj));
    setApiData([{ title, body }, ...apiData])
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
        <MyDrawer apiData={apiData} fontSize={fontSize} setLocalAartiData={setLocalAartiData} setFontSize={setFontSize} />
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
