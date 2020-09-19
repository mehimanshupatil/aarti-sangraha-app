import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './aboutStack';
import HomeStack from './homeStack';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Favorites from '../screens/favorites';
import FavoritesNavigation from './FavoritesStack';
const { Navigator, Screen } = createDrawerNavigator();

export default function MyDrawer({ apiData, fontSize, favorites: fav, setFontSize, setLocalAartiData }) {

    const [favorites, setFavorites] = useState(fav);

    const removeFav = (index, operation) => {

        if (operation === 'add') {
            setFavorites([...favorites, index])
        } else {
            console.log(index)
            setFavorites(favorites.filter(x => x != index))
        }
    }

    const LocalHomeStack = () => {
        return (
            <HomeStack apiData={apiData} removeFav={removeFav} fontSize={fontSize} favorites={favorites} setFontSize={setFontSize} setLocalAartiData={setLocalAartiData} />
        )
    }

    const FavoritesStack = ({ navigation }) => {
        return (
            <FavoritesNavigation apiData={apiData} removeFav={removeFav} navigation={navigation} favorites={favorites} />
        )
    }

    return (
        <Navigator >
            <Screen name="HomeStack" options={() => ({
                title: 'आरती संग्रह',
                drawerIcon: () => <MaterialIcons name='home' color='#1c3f18' size={28} />
            })}
                component={LocalHomeStack} />
            <Screen name="favorites" options={() => ({
                title: 'Favorites',
                drawerIcon: () => <MaterialIcons name='favorite' color='#1c3f18' size={28} />
            })} component={FavoritesStack} />
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