import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './AboutStack';
import HomeStack from './HomeStack';
import React, { useEffect } from 'react';
import FavoritesNavigation from './FavoritesStack';
import { BackHandler, ToastAndroid, StyleSheet } from 'react-native';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import { IconButton, useTheme } from 'react-native-paper';
const { Navigator, Screen } = createDrawerNavigator();
let backPressed = 0;

export default function MyDrawer() {
  const { colors } = useTheme();

  useEffect(() => {
    const backAction = () => {
      if (backPressed > 0) {
        BackHandler.exitApp();
        backPressed = 0;
      } else {
        backPressed++;
        ToastAndroid.show('Press Again To Exit', ToastAndroid.SHORT);
        setTimeout(() => {
          backPressed = 0;
        }, 2000);
        return true;
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.background,
          width: '60%',
        },
        drawerInactiveTintColor: colors.primary,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Screen
        name='HomeStack'
        options={() => ({
          headerShown: false,
          drawerLabel: 'Home',
          drawerIcon: () => (
            <IconButton color={colors.primary} style={styles.drawerIcon} icon='home' size={28} />
          ),
        })}
        component={HomeStack}
      />
      <Screen
        name='favorites'
        options={() => ({
          headerShown: false,
          drawerLabel: 'Favorites',
          drawerIcon: () => (
            <IconButton
              color={colors.primary}
              style={styles.drawerIcon}
              icon='cards-heart'
              size={28}
            />
          ),
        })}
        component={FavoritesNavigation}
      />
      <Screen
        name='AboutStack'
        options={() => ({
          headerShown: false,
          drawerLabel: 'About',
          drawerIcon: () => (
            <IconButton
              color={colors.primary}
              style={styles.drawerIcon}
              icon='information'
              size={28}
            />
          ),
        })}
        component={AboutNavigation}
      />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    margin: 0,
  },
});
