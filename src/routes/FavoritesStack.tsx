import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import About from '../screens/about';
import Header from '../shared/header';
import Favorites from '../screens/favorites';
import CommonTemplate from '../screens/commonTemplate';

const { Navigator, Screen } = createStackNavigator();

export default function FavoritesNavigation({ apiData }) {

    const FavoritesCompo = ({ navigation }) => <Favorites apiData={apiData} navigation={navigation} />

    const LocalCommonTemplate = ({ navigation, route }) => {
        return (
            <CommonTemplate navigation={navigation} route={route} />
        )
    }

    return (
        <Navigator headerMode="screen" screenOptions={{
            headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Screen name="Favorites"
                options={({ route, navigation }) => ({
                    headerTitle: () => <Header title='Favorites' navigation={navigation} showSearchButton={false} />,
                    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
                })} component={FavoritesCompo} />
            <Screen name="CommonComponent"
                options={({ route }) => ({ title: route.params.data?.title, headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTintColor: 'rgb(24,28,63)' })}
                component={LocalCommonTemplate} />

        </Navigator>
    )
}