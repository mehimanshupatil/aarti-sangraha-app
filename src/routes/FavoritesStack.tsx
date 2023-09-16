import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Header from '../shared/Header';
import Favorites from '../screens/---Favorites';
import CommonTemplate from '../screens/--CommonTemplate';
import addNew from '../screens/--AddNew';
import { IconButton } from 'react-native-paper';
import { RootParamList, useAppTheme } from '../shared/types';
import { onShare } from './HomeStack';
import { useDataStore } from '../store/store';

const { Navigator, Screen } = createStackNavigator<RootParamList>();

export default function FavoritesNavigation() {
  const { colors } = useAppTheme();
  const [aartis] = useDataStore(s=>[ s.aartis])

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
          headerRight: () => (
            <IconButton
              icon='share-variant'
              size={24}
              iconColor={colors.background}
              style={{ marginRight: 10 }}
              onPress={() => 
                onShare(aartis.find((x) => x.key === route.params?.key))
              }
            />
          ),
        })}
        component={CommonTemplate}
      />
      <Screen name='addNew' options={{ title: 'Add New' }} component={addNew} />
    </Navigator>
  );
}
