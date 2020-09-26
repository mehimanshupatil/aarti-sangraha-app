import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './aboutStack';
import HomeStack from './homeStack';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoritesNavigation from './FavoritesStack';
import { globalStyle } from '../shared/styles';
import { Alert, BackHandler, StyleSheet, ToastAndroid } from 'react-native';
const { Navigator, Screen } = createDrawerNavigator();
let backPressed = 0
export default function MyDrawer() {

    useEffect(() => {
        console.log("Screen", Screen)
        const backAction = () => {
            if (backPressed > 0) {
                BackHandler.exitApp();
                backPressed = 0;
            } else {
                backPressed++;
                ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT);
                setTimeout(() => { backPressed = 0 }, 2000);
                return true;
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <Navigator drawerStyle={{
            ...globalStyle.blueBack
        }} drawerContentOptions={{ inactiveTintColor: 'rgb(255,224,101)' }}>
            <Screen name="HomeStack" options={() => ({
                title: 'आरती संग्रह',
                drawerIcon: () => <MaterialIcons style={styles.icon} name='home' size={28} />
            })}
                component={HomeStack} />
            <Screen name="favorites" options={() => ({
                title: 'Favorites',
                drawerIcon: () => <MaterialIcons style={styles.icon} name='favorite' size={28} />
            })} component={FavoritesNavigation} />
            <Screen name="AboutStack" options={() => ({
                title: 'About',
                drawerIcon: () => <MaterialIcons style={styles.icon} name='info' size={28} />
            })} component={AboutNavigation} />
        </Navigator>
    );
}


const styles = StyleSheet.create({
    icon: {
        ...globalStyle.yellowText
    },
});