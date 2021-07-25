import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyle } from "../shared/styles";
import { useKeepAwake } from "expo-keep-awake";
import Context from "../store/context";
import { commmonTempNav, singleItemType } from "../shared/types";

const CommonTemplate: React.FC<commmonTempNav> = ({ navigation, route }) => {
  const { key, index } = route.params;
  useKeepAwake();

  const { state, dispatch } = useContext(Context);
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
    <View style={{ ...styles.container, paddingTop: 5 }}>
      <View style={styles.buttonContainer}>
        <View style={styles.fontButton}>
          {selectedItem?.favorite ? (
            <MaterialIcons
              style={styles.icon}
              name="favorite"
              onPress={() => iconPress(selectedItem, "remove")}
            />
          ) : (
            <MaterialIcons
              style={styles.icon}
              name="favorite-border"
              onPress={() => iconPress(selectedItem, "add")}
            />
          )}
          {selectedItem?.isRemovable && (
            <MaterialIcons
              style={{ ...styles.icon, paddingLeft: 10 }}
              name="delete-forever"
              onPress={deletePress}
            />
          )}
        </View>
        <View style={[styles.fontButton, { alignItems: "center" }]}>
          <Text style={[styles.icon]}>{index + 1}</Text>
          {selectedItem?.isRemovable && (
            <MaterialIcons
              style={[styles.icon, { paddingLeft: 10 }]}
              name="edit"
              onPress={addNew}
            />
          )}
        </View>
        <View style={styles.fontButton}>
          <MaterialIcons
            style={styles.icon}
            name="add-circle"
            onPress={() =>
              dispatch({ type: "UPDATEFONTSIZE", fontSize: fontSize + 3 })
            }
          />
          <MaterialIcons
            style={{ ...styles.icon, paddingLeft: 10 }}
            name="remove-circle"
            onPress={() =>
              fontSize > 15 &&
              dispatch({ type: "UPDATEFONTSIZE", fontSize: fontSize - 3 })
            }
          />
        </View>
      </View>
      <ScrollView>
        <Text style={[styles.text, { fontSize: fontSize }]}>
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
    backgroundColor: "rgb(24,28,63)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  fontButton: {
    flexDirection: "row",
  },
  text: {
    color: "rgb(255,224,101)",
  },
  icon: {
    fontSize: 30,
    ...globalStyle.yellowText,
  },
});

export default CommonTemplate;
