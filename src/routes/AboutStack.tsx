import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import About from '../screens/About';
import Header from '../shared/Header';

const { Navigator, Screen } = createStackNavigator();

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
