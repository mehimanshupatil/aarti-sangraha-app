import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import About from '../screens/about';
import Header from '../shared/header';
import Favorites from '../screens/favorites';
import CommonTemplate from '../screens/commonTemplate';

const { Navigator, Screen } = createStackNavigator();

export default function FavoritesNavigation({ apiData, fontSize, setFontSize }) {
    let data = apiData

    const FavoritesCompo = ({ navigation }) => <Favorites apiData={data} navigation={navigation} />

    const LocalCommonTemplate = ({ navigation, route }) => {
        return (
            <CommonTemplate navigation={navigation} route={route} fontSize={fontSize} setFontSize={setFontSize} />
        )
    }

    return (
        <Navigator headerMode="screen" screenOptions={{
            headerStyle: { backgroundColor: 'rgb(24,28,63)' }, headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Screen name="Favorites"
                options={({ route, navigation }) => ({
                    headerTitle: () => <Header title='Favorites' navigation={navigation} showSearchButton={false} />,
                    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
                })} component={FavoritesCompo} />
            <Screen name="CommonComponent"
                options={({ route }) => ({ title: route.params.data?.title })}
                component={LocalCommonTemplate} />

        </Navigator>
    )
}