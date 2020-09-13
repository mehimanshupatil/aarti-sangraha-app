import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './aboutStack';
import HomeStack from './homeStack';
import React from 'react';
import { Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../shared/header';
const { Navigator, Screen } = createDrawerNavigator();

export default function MyDrawer({ apiData, fontSize }) {

    const LocalHomeStack = () => {
        return (
            <HomeStack apiData={apiData} fontSize={fontSize} />
        )
    }



    return (
        <Navigator >
            <Screen name="HomeStack" options={() => ({
                title: 'आरती संग्रह',
                drawerIcon: () => <MaterialIcons name='home' color='#1c3f18' size={28} />
            })}
                component={LocalHomeStack} />
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