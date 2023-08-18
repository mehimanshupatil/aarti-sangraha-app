import React from 'react';
import { SafeAreaView, StyleSheet, Image, Dimensions, Text, Share } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../shared/types';
import { useData } from '../store/context';
import { useAppTheme } from '../../App';

const CustomSidebarMenu = (props: DrawerContentComponentProps) => {
  const { colors } = useAppTheme();
  const { state, dispatch } = useData();

  const windowWidth = Dimensions.get('window').width;
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
      // @ts-ignore
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        resizeMode='contain'
        source={require('../../assets/icon.png')}
        style={[styles.sideMenuProfileIcon, { width: imgWidth, height: imgWidth }]}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          {...props}
          labelStyle={{ color: colors.text }}
          label={`${state.isDarkMode === 'light' ? 'Light' : 'Dark'} Theme`}
          icon={() => (
            <IconButton
            iconColor={colors.primary}
              style={styles.drawerIcon}
              icon='theme-light-dark'
              size={28}
            />
          )}
          onPress={() => {
            const dark = state.isDarkMode === 'light' ? 'dark' : 'light';
            AsyncStorage.setItem(StorageKey.darkMode, dark);
            dispatch({ type: 'ISDARK', data: dark });
          }}
        />
        <DrawerItem
          {...props}
          labelStyle={{ color: colors.text }}
          label='Share App'
          icon={({}) => (
            <IconButton
            iconColor={colors.primary}
              style={styles.drawerIcon}
              icon='share-variant'
              size={28}
            />
          )}
          onPress={onShare}
        />
      </DrawerContentScrollView>
      <Text style={{ ...styles.textVersion, color: colors.primary }}>
        version {Constants.expoConfig?.version}.{Constants.expoConfig?.android?.versionCode}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: 50,
  },
  textVersion: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 13,
  },
  drawerIcon: {
    margin: 0,
  },
});

export default CustomSidebarMenu;
