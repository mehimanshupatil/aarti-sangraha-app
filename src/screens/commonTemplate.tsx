import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import { deleteItem, updateFav, updateFontSize } from "../redux/action";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyle } from "../shared/styles";
import { useKeepAwake } from "expo-keep-awake";
function CommonTemplate({
  navigation,
  route,
  aartis,
  fontSize,
  updateFontSize,
  deleteItem,
  updateFav,
}) {
  const { data } = route.params;
  useKeepAwake();

  const [selectedItem, setSelectedItem] = useState(
    aartis.find((x) => x.key == data.key)
  );

  useEffect(() => {
    const item = aartis.find((x) => x.key == data.key) ?? {};
    setSelectedItem(item);
    navigation.setOptions({
      title: item.title,
    });
  }, [aartis]);

  const deletePress = () => {
    Alert.alert(
      "Alert",
      `आपणास खात्री आहे की आपण ${selectedItem.title} हटवू इच्छिता. ही क्रिया पूर्ववत करणे शक्य नाही`,
      [
        {
          text: "रद्द करा",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "ठीक आहे",
          onPress: () => {
            deleteItem(selectedItem.key);
            ToastAndroid.show("यशस्वीरित्या हटविले", ToastAndroid.SHORT);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const iconPress = (item, action) => {
    ToastAndroid.show(
      action === "add" ? "Added to Favorites" : "Removed from Favorites",
      ToastAndroid.SHORT
    );
    updateFav(item, action);
  };
  const addNew = () => {
    navigation.push("addNew", {
      data: selectedItem,
    });
  };

  return (
    <View style={{ ...styles.container, paddingTop: 5 }}>
      <View style={styles.buttonContainer}>
        <View style={styles.fontButton}>
          {selectedItem.favorite ? (
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
          <MaterialIcons
            style={{ ...styles.icon, paddingLeft: 10 }}
            name="delete-forever"
            onPress={deletePress}
          />
        </View>
        <View style={[styles.fontButton, { alignItems: "center" }]}>
          <Text style={[styles.icon]}>{data.index + 1}</Text>
          <MaterialIcons
            style={[styles.icon, { paddingLeft: 10 }]}
            name="edit"
            onPress={addNew}
          />
        </View>
        <View style={styles.fontButton}>
          <MaterialIcons
            style={styles.icon}
            name="add-circle"
            onPress={() => updateFontSize(fontSize + 3)}
          />
          <MaterialIcons
            style={{ ...styles.icon, paddingLeft: 10 }}
            name="remove-circle"
            onPress={() => fontSize > 15 && updateFontSize(fontSize - 3)}
          />
        </View>
      </View>
      <ScrollView>
        <Text style={[styles.text, { fontSize: fontSize }]}>
          {selectedItem.body}
        </Text>
      </ScrollView>
    </View>
  );
}

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

const mapStateToProps = (state, ownProps) => {
  return {
    fontSize: state.fontSize,
    aartis: state.aartis,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateFontSize: (newFontSize) => dispatch(updateFontSize(newFontSize)),
    deleteItem: (key) => dispatch(deleteItem(key)),
    updateFav: (item, operation) => dispatch(updateFav(item, operation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonTemplate);
