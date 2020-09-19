

import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import CommonTemplate from '../screens/commonTemplate';
import React, { useState } from 'react';
import Header from '../shared/header';
import AddNew from '../screens/addNew';

const { Navigator, Screen } = createStackNavigator();

export default function HomeStack({ apiData, fontSize, favorites, setFontSize, removeFav, setLocalAartiData }) {

  const [localData, setLocalData] = useState(apiData)

  const searchInput = (text) => {
    let data = apiData.filter((x: any) => (x.title.includes(text) || x.body.includes(text)))
    setLocalData(data)
  }

  const LocalHome = ({ navigation }) => {
    return (
      <Home navigation={navigation} apiData={localData} favorites={favorites} removeFav={removeFav} />
    )
  }

  const LocalCommonTemplate = ({ navigation, route }) => {
    return (
      <CommonTemplate navigation={navigation} route={route} fontSize={fontSize} setFontSize={setFontSize} />
    )
  }

  const LocalAddNew = ({ navigation, route }) => {
    return (
      <AddNew navigation={navigation} route={route} setLocalAartiData={setLocalAartiData} />
    )
  }

  return (
    // <Text>gjgj</Text>
    // <NavigationContainer>
    <Navigator headerMode="screen" screenOptions={{
      headerStyle: { backgroundColor: 'rgb(255,224,101)' },
      headerTintColor: 'rgb(24,28,63)', headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Screen name="Home" options={({ route, navigation }) => ({
        headerTitle: () => <Header title='आरती संग्रह' navigation={navigation} showSearchButton searchInput={searchInput} />
      })} component={LocalHome}
      />
      <Screen name="CommonComponent"
        options={({ route }) => ({ title: route.params.data?.title })}
        component={LocalCommonTemplate} />
      <Screen name="addNew" options={{ title: 'Add New' }}
        component={LocalAddNew} />
    </Navigator>
    // </NavigationContainer>
  )
}