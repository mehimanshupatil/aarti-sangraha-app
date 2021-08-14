import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutNavigation from "./AboutStack";
import HomeStack from "./HomeStack";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FavoritesNavigation from "./FavoritesStack";
import { BackHandler, ToastAndroid } from "react-native";
import CustomSidebarMenu from "../components/CustomSidebarMenu";
import { useTheme } from "react-native-paper";
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
        ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT);
        setTimeout(() => {
          backPressed = 0;
        }, 2000);
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
        backgroundColor: colors.background,
        width: "60%",
      }}
      drawerContentOptions={{ inactiveTintColor: colors.primary }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Screen
        name="HomeStack"
        options={() => ({
          title: "आरती संग्रह",
          drawerIcon: () => (
            <MaterialIcons
              style={{ color: colors.primary }}
              name="home"
              size={28}
            />
          ),
        })}
        component={HomeStack}
      />
      <Screen
        name="favorites"
        options={() => ({
          title: "Favorites",
          drawerIcon: () => (
            <MaterialIcons
              style={{ color: colors.primary }}
              name="favorite"
              size={28}
            />
          ),
        })}
        component={FavoritesNavigation}
      />
      <Screen
        name="AboutStack"
        options={() => ({
          title: "About",
          drawerIcon: () => (
            <MaterialIcons
              style={{ color: colors.primary }}
              name="info"
              size={28}
            />
          ),
        })}
        component={AboutNavigation}
      />
    </Navigator>
  );
}
