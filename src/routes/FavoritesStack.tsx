import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../shared/Header';
import Favorites from '../screens/Favorites';
import CommonTemplate from '../screens/CommonTemplate';
import addNew from '../screens/AddNew';
import { useTheme } from 'react-native-paper';

const { Navigator, Screen } = createStackNavigator();

export default function FavoritesNavigation() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerMode: 'screen',
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Screen
        name='Favorites'
        options={({ route, navigation }) => ({
          header: () => <Header title='Favorites' navigation={navigation} showSearchButton />,
        })}
        component={Favorites}
      />
      <Screen
        name='CommonComponent'
        options={({ route }) => ({
          // @ts-ignore
          title: route.params.data?.title,
        })}
        component={CommonTemplate}
      />
      <Screen name='addNew' options={{ title: 'Add New' }} component={addNew} />
    </Navigator>
  );
}
