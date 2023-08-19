import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import About from '../screens/About';
import Header from '../shared/Header';
import { RootParamList } from '../shared/types';

const { Navigator, Screen } = createStackNavigator<RootParamList>();

export default function AboutNavigation() {
  return (
    <Navigator>
      <Screen
        options={{
          header: ({ navigation }) => (
            <Header title='About' navigation={navigation} showSearchButton={false} />
          ),
        }}
        name='About'
        component={About}
      />
    </Navigator>
  );
}
