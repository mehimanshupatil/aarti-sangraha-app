import React from "react";
import { SafeAreaView, StyleSheet, Image, Dimensions } from "react-native"; 
import {
    DrawerContentComponentProps,
    DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomSidebarMenu = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => { 
    const windowWidth = Dimensions.get("window").width;
    //since width of sidenav is 60%
    const imgWidth = ((windowWidth * 60)/100) - 50 ; 
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    borderRadius: 100 / 2,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default CustomSidebarMenu;
