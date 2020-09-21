import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './aboutStack';
import HomeStack from './homeStack';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoritesNavigation from './FavoritesStack';
const { Navigator, Screen } = createDrawerNavigator();

export default function MyDrawer() {

    return (
        <Navigator >
            <Screen name="HomeStack" options={() => ({
                title: 'आरती संग्रह',
                drawerIcon: () => <MaterialIcons name='home' color='#1c3f18' size={28} />
            })}
                component={HomeStack} />
            <Screen name="favorites" options={() => ({
                title: 'Favorites',
                drawerIcon: () => <MaterialIcons name='favorite' color='#1c3f18' size={28} />
            })} component={FavoritesNavigation} />
            <Screen name="AboutStack" options={() => ({
                title: 'About',
                drawerIcon: () => <MaterialIcons name='info' color='#1c3f18' size={28} />
            })} component={AboutNavigation} />
        </Navigator>
    );
}

// const DrawerIcon=()=>{
//     return(<MaterialIcons  name="menu" size={30} style={{ width: 24 }} 
//     color="#000" />)
// }