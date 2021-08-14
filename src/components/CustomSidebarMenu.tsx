import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  Share,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Constants from "expo-constants";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKey } from "../shared/types";
import { useData } from "../store/context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const CustomSidebarMenu = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => {
  const { colors } = useTheme();
  const { state, dispatch } = useData();

  const windowWidth = Dimensions.get("window").width;
  //since width of sidenav is 60%
  const imgWidth = (windowWidth * 60) / 100 - 50;

  const onShare = () => {
    try {
      Share.share({
        message: `\`\`\`Hey there get Aarti Sangrah from Play Store / Samsung Galaxy Store.

https://galaxy.store/aarti

https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha \`\`\``,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        resizeMode="contain"
        source={require("../../assets/icon.png")}
        style={[
          styles.sideMenuProfileIcon,
          { width: imgWidth, height: imgWidth },
        ]}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          {...props}
          label={`Theme ${state.isDarkMode === "light" ? "Light" : "Dark"}`}
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={28}
              style={{ color: colors.primary }}
            />
          )}
          onPress={() => {
            const dark = state.isDarkMode === "light" ? "dark" : "light";
            AsyncStorage.setItem(StorageKey.darkMode, dark);
            dispatch({ type: "ISDARK", data: dark });
          }}
        />
        <DrawerItem
          {...props}
          label="Share App"
          icon={({ focused, color, size }) => (
            <MaterialIcons
              name="share"
              size={28}
              style={{ color: colors.primary }}
            />
          )}
          onPress={onShare}
        />
      </DrawerContentScrollView>
      <Text style={{ ...styles.textVersion, color: colors.primary }}>
        version {Constants.manifest?.version}.
        {Constants.manifest?.android?.versionCode}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    borderRadius: 100 / 2,
    alignSelf: "center",
    marginTop: 50,
  },
  textVersion: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 13,
  },
});

export default CustomSidebarMenu;
