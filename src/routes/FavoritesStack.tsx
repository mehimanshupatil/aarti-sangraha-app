import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../shared/header';
import Favorites from '../screens/favorites';
import CommonTemplate from '../screens/commonTemplate';
import addNew from '../screens/addNew';

const { Navigator, Screen } = createStackNavigator();

export default function FavoritesNavigation({ }) {
    return (
        <Navigator headerMode="screen" screenOptions={{
            headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Screen name="Favorites"
                options={({ route, navigation }) => ({
                    headerTitle: () => <Header title='Favorites' navigation={navigation} showSearchButton />,
                    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
                })} component={Favorites} />
            <Screen name="CommonComponent"
                options={({ route }) => ({ title: route.params.data?.title, headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTintColor: 'rgb(24,28,63)' })}
                component={CommonTemplate} />
            <Screen name="addNew" options={{ title: 'Add New' }}
                component={addNew} />
        </Navigator>
    )
}