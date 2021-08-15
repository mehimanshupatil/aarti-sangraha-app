import React from "react";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import { useData } from "../store/context";
import { singleItemType } from "../shared/types";
import { IconButton, TouchableRipple, useTheme } from "react-native-paper";

const SingleItem: React.FC<{
  pressHandler: (arg0: singleItemType, index: number) => void;
  item: singleItemType;
  index: number;
}> = ({ pressHandler, item, index }) => {
  const { colors } = useTheme();

  const { dispatch } = useData();

  const iconPress = (item: singleItemType, action: "add" | "remove") => {
    ToastAndroid.show(
      action === "add" ? "Added to Favorites" : "Removed from Favorites",
      ToastAndroid.SHORT
    );
    dispatch({ type: "UPDATEFAV", key: item.key, operation: action });
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: colors.primary,
        backgroundColor: colors.background,
        shadowColor: colors.background,
      }}
    >
      <TouchableRipple
        borderless
        style={styles.ripple}
        onPress={() => pressHandler(item, index)}
      >
        <View>
          <View style={styles.firstLine}>
            <Text
              style={{ ...styles.title, color: colors.text }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {item.favorite ? (
              <IconButton
                icon="heart"
                size={30}
                style={styles.unsetbuttonStyle}
                color={colors.primary}
                onPress={() => iconPress(item, "remove")}
              />
            ) : (
              <IconButton
                icon="heart-outline"
                size={30}
                style={styles.unsetbuttonStyle}
                color={colors.primary}
                onPress={() => iconPress(item, "add")}
              />
            )}
          </View>
          <View style={styles.firstLine}>
            <Text
              style={{
                flex: 1,
                color: colors.text,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.body.split("\n")[0]}
            </Text>
            <Text
              style={{
                paddingLeft: 5,
                paddingRight: 15,
                color: colors.primary,
              }}
            >
              {index + 1}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default SingleItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  ripple: {
    borderRadius: 10,
    padding: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 30,
  },
  unsetbuttonStyle: {
    margin: 0,
  },
});
