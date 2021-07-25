import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Constants from "expo-constants";
import { globalStyle } from "../shared/styles";

const CustomSidebarMenu = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => {
  const windowWidth = Dimensions.get("window").width;
  //since width of sidenav is 60%
  const imgWidth = (windowWidth * 60) / 100 - 50;
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
      </DrawerContentScrollView>
      <Text style={styles.textVersion}>
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
    ...globalStyle.yellowText,
  },
});

export default CustomSidebarMenu;
