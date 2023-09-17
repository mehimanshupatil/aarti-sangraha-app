import React from 'react';
import { SafeAreaView, StyleSheet, Image, Dimensions, Text, Share, Platform } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '../shared/types';
import { useDataStore } from '../store/store';
import * as Clipboard from 'expo-clipboard';

const CustomSidebarMenu = (props: DrawerContentComponentProps) => {
  const { colors } = useAppTheme();
  const [displayMode, setDisplayMode] = useDataStore(s => [s.displayMode, s.setDisplayMode])

  const windowWidth = Dimensions.get('window').width;
  //since width of sidenav is 60%
  const imgWidth = (windowWidth * 60) / 100 - 50;

  const onShare = async () => {

    try {

    const message = `\`\`\`Hey there get Aarti Sangrah from Play Store / Samsung Galaxy Store.

    https://galaxy.store/aarti
    
    https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha 
    
    or view web Version https://aarti-sangraha.himanshupatil.dev/\`\`\``
   
    if (Platform.OS === "web") {
      await Clipboard.setStringAsync(message)
      alert(`The following message was copied to your clipboard.\n\n${message}`)
      return
    }
 
      Share.share({ message });
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        resizeMode='contain'
        source={require('../assets/icon.png')}
        style={[styles.sideMenuProfileIcon, { width: imgWidth, height: imgWidth, maxWidth: 200, maxHeight: 200 }]}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          {...props}
          labelStyle={{ color: colors.text }}
          label={`${displayMode === 'light' ? 'Light' : 'Dark'} Theme`}
          icon={() => (
            <IconButton
              iconColor={colors.primary}
              style={styles.drawerIcon}
              icon='theme-light-dark'
              size={28}
            />
          )}
          onPress={() => {
            const mode = displayMode === 'light' ? 'dark' : 'light';
            setDisplayMode(mode);
          }}
        />
        <DrawerItem
          {...props}
          labelStyle={{ color: colors.text }}
          label='Share App'
          icon={({ }) => (
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
