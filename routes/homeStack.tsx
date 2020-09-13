

import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import CommonTemplate from '../screens/commonTemplate';
import React from 'react';
import { Text } from 'react-native';
import AboutNavigation from './aboutStack';

const { Navigator, Screen } = createStackNavigator();

export default function HomeStack({apiData,fontSize}) {
// console.log(apiData)
  const LocalHome=({navigation})=> {
    return (
    <Home navigation={navigation} apiData={apiData}/>
  )}

  const LocalCommonTemplate=({navigation,route})=> {
    return (
    <CommonTemplate navigation={navigation} route={route} fontSize={fontSize}/>
  )}

  return (
    // <Text>gjgj</Text>
    // <NavigationContainer>
  <Navigator headerMode="screen"  screenOptions={{headerStyle: { backgroundColor: 'rgb(255,224,101)' },
  headerTintColor: 'rgb(24,28,63)', headerTitleStyle: {
    fontWeight: 'bold',
  },}}>
    <Screen name="Home" options={{title:'आरती संग्रह',headerTitleStyle: {
      fontWeight: 'bold',    alignSelf: 'center'  }}}  component={LocalHome}/>
      <Screen name="CommonComponent" 
      options={({ route }) => ({ title: route.params.data?.title})} 
      component={LocalCommonTemplate} />
  </Navigator>
  // </NavigationContainer>
)}