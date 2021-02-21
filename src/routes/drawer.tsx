import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutNavigation from './aboutStack';
import HomeStack from './homeStack';
import React, { useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoritesNavigation from './FavoritesStack';
import { globalStyle } from '../shared/styles';
import { BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
const { Navigator, Screen } = createDrawerNavigator();
let backPressed = 0
export default function MyDrawer() {

    useEffect(() => {
        const backAction = () => {
            if (backPressed > 0) {
                BackHandler.exitApp();
                backPressed = 0;
            } else {
                backPressed++;
                ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT);
                setTimeout(() => { backPressed = 0 }, 2000);
                return true;
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
      <Navigator
        drawerStyle={{
          ...globalStyle.blueBack,
          width:'60%'
        }}
        drawerContentOptions={{ inactiveTintColor: "rgb(255,224,101)" }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Screen
          name="HomeStack"
          options={() => ({
            title: "आरती संग्रह",
            drawerIcon: () => (
              <MaterialIcons style={styles.icon} name="home" size={28} />
            ),
          })}
          component={HomeStack}
        />
        <Screen
          name="favorites"
          options={() => ({
            title: "Favorites",
            drawerIcon: () => (
              <MaterialIcons style={styles.icon} name="favorite" size={28} />
            ),
          })}
          component={FavoritesNavigation}
        />
        <Screen
          name="AboutStack"
          options={() => ({
            title: "About",
            drawerIcon: () => (
              <MaterialIcons style={styles.icon} name="info" size={28} />
            ),
          })}
          component={AboutNavigation}
        />
      </Navigator>
    );
}


const styles = StyleSheet.create({
    icon: {
        ...globalStyle.yellowText
    },
});