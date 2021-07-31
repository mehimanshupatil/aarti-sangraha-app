import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Search from "./Search";
import { useTheme } from "react-native-paper";

const Header: React.FC<{
  title: string;
  navigation: any;
  showSearchButton: boolean;
}> = ({ title, navigation, showSearchButton }) => {
  const { colors } = useTheme();

  const openMenu = () => {
    navigation.openDrawer();
  };

  const [showSearch, setLocalData] = useState(true);

  return showSearch ? (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={{ ...styles.menuIcon, color: colors.primary }}
      />
      <View>
        <Text style={{ ...styles.headerText, color: colors.primary }}>
          {title}
        </Text>
      </View>
      {showSearchButton && (
        <MaterialIcons
          name="search"
          onPress={() => setLocalData(!showSearch)}
          size={28}
          style={{ ...styles.searchIcon, color: colors.primary }}
        />
      )}
    </View>
  ) : (
    <Search setShowSearchInput={() => setLocalData(!showSearch)} />
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  menuIcon: {
    position: "absolute",
    left: 12,
  },
  searchIcon: {
    position: "absolute",
    right: 12,
  },
});

export default Header;
