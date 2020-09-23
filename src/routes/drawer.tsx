import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './aboutStack';
import HomeStack from './homeStack';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoritesNavigation from './FavoritesStack';
import { globalStyle } from '../shared/styles';
import { StyleSheet } from 'react-native';
const { Navigator, Screen } = createDrawerNavigator();

export default function MyDrawer() {

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