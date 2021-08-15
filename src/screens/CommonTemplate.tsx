import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  ToastAndroid,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { commmonTempNav, singleItemType, StorageKey } from "../shared/types";
import { IconButton, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useData } from "../store/context";

const CommonTemplate: React.FC<commmonTempNav> = ({ navigation, route }) => {
  const { key, index } = route.params;
  useKeepAwake();

  const { colors } = useTheme();

  const { state, dispatch } = useData();
  const { fontSize, aartis } = state;

  const [selectedItem, setSelectedItem] = useState(
    aartis.find((x) => x.key == key)
  );

  useEffect(() => {
    const single = aartis.find((x) => x.key == key);
    setSelectedItem(single);
    navigation.setOptions({
      title: single?.title,
    });
  }, [aartis]);

  const deletePress = () => {
    Alert.alert(
      "Alert",
      `आपणास खात्री आहे की आपण ${selectedItem?.title} हटवू इच्छिता. ही क्रिया पूर्ववत करणे शक्य नाही`,
      [
        {
          text: "रद्द करा",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "ठीक आहे",
          onPress: () => {
            dispatch({ type: "DELETEITEM", key: selectedItem?.key ?? "" });
            ToastAndroid.show("यशस्वीरित्या हटविले", ToastAndroid.SHORT);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const iconPress = (
    item: singleItemType | undefined,
    action: "add" | "remove"
  ) => {
    if (!item) return;

    ToastAndroid.show(
      action === "add" ? "Added to Favorites" : "Removed from Favorites",
      ToastAndroid.SHORT
    );
    dispatch({ type: "UPDATEFAV", key: key, operation: action });
  };
  const addNew = () => {
    if (!selectedItem) return;
    navigation.push("addNew", {
      item: selectedItem,
    });
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.background,
        paddingTop: 5,
      }}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.fontButton}>
          {selectedItem?.favorite ? (
            <IconButton
              icon="heart"
              size={30}
              style={styles.unsetbuttonStyle}
              color={colors.primary}
              onPress={() => iconPress(selectedItem, "remove")}
            />
          ) : (
            <IconButton
              icon="heart-outline"
              size={30}
              style={styles.unsetbuttonStyle}
              color={colors.primary}
              onPress={() => iconPress(selectedItem, "add")}
            />
          )}
          {selectedItem?.isRemovable && (
            <IconButton
              icon="delete-forever"
              size={30}
              style={styles.unsetbuttonStyle}
              color={colors.primary}
              onPress={deletePress}
            />
          )}
        </View>
        <View style={[styles.fontButton, { alignItems: "center" }]}>
          <Text style={{ color: colors.primary, fontSize: 25 }}>
            {index + 1}
          </Text>
          {selectedItem?.isRemovable && (
            <IconButton
              icon="file-document-edit-outline"
              size={30}
              style={styles.unsetbuttonStyle}
              color={colors.primary}
              onPress={addNew}
            />
          )}
        </View>
        <View style={styles.fontButton}>
          <IconButton
            icon="plus-circle"
            size={30}
            style={styles.unsetbuttonStyle}
            color={colors.primary}
            onPress={() => {
              if (fontSize < 40) {
                AsyncStorage.setItem(
                  StorageKey.fontSize,
                  (fontSize + 3).toString()
                );
                dispatch({ type: "UPDATEFONTSIZE", fontSize: fontSize + 3 });
              }
            }}
          />

          <IconButton
            icon="minus-circle"
            size={30}
            style={styles.unsetbuttonStyle}
            color={colors.primary}
            onPress={() => {
              if (fontSize > 15) {
                AsyncStorage.setItem(
                  StorageKey.fontSize,
                  (fontSize - 3).toString()
                );
                dispatch({ type: "UPDATEFONTSIZE", fontSize: fontSize - 3 });
              }
            }}
          />
        </View>
      </View>
      <ScrollView>
        <Text style={{ color: colors.primary, fontSize: fontSize }}>
          {selectedItem?.body}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fontButton: {
    flexDirection: "row",
  },
  unsetbuttonStyle: {
    margin: 0,
  },
});

export default CommonTemplate;
