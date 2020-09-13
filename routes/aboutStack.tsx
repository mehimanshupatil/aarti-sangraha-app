

import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import CommonTemplate from '../screens/commonTemplate';
import React from 'react';
import About from '../screens/about';
import Header from '../shared/header';

const { Navigator, Screen } = createStackNavigator();

export default function AboutNavigation() {

    return (
        <Navigator headerMode="screen" screenOptions={{
            headerStyle: { backgroundColor: 'rgb(255,224,101)' },
            headerTintColor: 'rgb(24,28,63)', headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Screen name="About"
                options={({ route, navigation }) => ({
                    headerTitle: () => <Header title='About' navigation={navigation} showSearchButton={false} />,
                    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
                })} component={About} />

        </Navigator>
    )
}