import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useData } from "../store/context";
import { singleItemType } from "../shared/types";
import { useTheme } from "react-native-paper";

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
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: colors.primary,
        backgroundColor: colors.background,
        shadowColor: colors.background,
      }}
      onPress={() => pressHandler(item, index)}
    >
      <View>
        <View style={styles.firstLine}>
          <Text style={{ ...styles.title, color: colors.text }}>
            {item.title}
          </Text>
          {item.favorite ? (
            <MaterialIcons
              size={30}
              color={colors.primary}
              name="favorite"
              onPress={() => iconPress(item, "remove")}
            />
          ) : (
            <MaterialIcons
              size={30}
              color={colors.primary}
              name="favorite-border"
              onPress={() => iconPress(item, "add")}
            />
          )}
        </View>
        <View style={styles.firstLine}>
          <Text
            style={{
              flex: 1,
              flexWrap: "wrap",
              color: colors.text,
            }}
          >
            {item.body.split("\n")[0]}
          </Text>
          <Text style={{ paddingRight: 8, color: colors.primary }}>
            {index + 1}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
});
