import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import MyDrawer from '../routes/drawer';
export default function EntryComponent() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [apiData, setApiData] = useState([] as any);
    const [fontSize, setFontSize] = useState(20);

    const getData = async () => {
        try {
            let data = require('../shared/data.json')
            const aarti = await AsyncStorage.getItem('aarti')
            if (aarti) {
                data = JSON.parse(aarti)
            } else {
                await AsyncStorage.setItem('aarti', JSON.stringify(data));
            }
            const localdata = await AsyncStorage.getItem('customAarti') ?? '[]';
            setApiData([...data, ...JSON.parse(localdata)])

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
