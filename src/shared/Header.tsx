import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './Search';
import { IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getDefaultHeaderHeight } from '@react-navigation/elements';

const Header: React.FC<{
  title: string;
  navigation: any;
  showSearchButton: boolean;
}> = ({ title, navigation, showSearchButton }) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const { colors } = useTheme();

  const openMenu = () => {
    navigation.openDrawer();
  };

  const [showSearch, setLocalData] = useState(true);

  return (
    <View style={{ ...styles.header, height: headerHeight, backgroundColor: colors.primary }}>
      {showSearch ? (
        <>
          <IconButton
            icon='menu'
            size={28}
            onPress={openMenu}
            color={colors.background}
            style={styles.menuIcon}
          />
          <View>
            <Text style={{ ...styles.headerText, color: colors.background }}>{title}</Text>
          </View>
          {showSearchButton && (
            <IconButton
              icon='text-box-search-outline'
              onPress={() => setLocalData(!showSearch)}
              size={28}
              color={colors.background}
              style={styles.searchIcon}
            />
          )}
        </>
      ) : (
        <Search setShowSearchInput={() => setLocalData(!showSearch)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
  },
  menuIcon: {
    position: 'absolute',
    left: 12,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
  },
});

export default Header;
