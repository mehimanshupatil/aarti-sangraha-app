import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import About from '../screens/about';
import Header from '../shared/header';
import Favorites from '../screens/favorites';

const { Navigator, Screen } = createStackNavigator();

export default function FavoritesNavigation({ navigation, removeFav, apiData, favorites }) {
    let data = apiData.filter((x, i) => favorites.includes(i))

    const FavoritesCompo = () => <Favorites apiData={data} removeFav={removeFav} favorites={favorites} navigation={navigation} />


    return (
        <Navigator headerMode="screen" screenOptions={{
            headerStyle: { backgroundColor: 'rgb(255,224,101)' },
            headerTintColor: 'rgb(24,28,63)', headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Screen name="Favorites"
                options={({ route, navigation }) => ({
                    headerTitle: () => <Header title='Favorites' navigation={navigation} showSearchButton={false} />,
                    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
                })} component={FavoritesCompo} />

        </Navigator>
    )
}