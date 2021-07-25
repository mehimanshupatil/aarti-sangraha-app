import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Keyboard,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { globalStyle } from "../shared/styles";
import { addNewNav } from "../shared/types";
import Context from "../store/context";

const AddNew: React.FC<addNewNav> = ({ navigation, route }) => {
  const { item } = route.params;

  const { dispatch } = useContext(Context);

  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  useEffect(() => {
    navigation.setOptions({
      title: item.title ? "Update" : "Add New",
    });
  }, []);

  const onOkPress = () => {
    const item = {
      title,
      body,
      key: (Math.random() * 900 + 100).toString(), //key between 100 to 1k
      favorite: true,
      tags: [],
      isRemovable: true,
    };
    dispatch({ type: "ADDCUSTOM", item });
    ToastAndroid.show("Added Successfully", ToastAndroid.SHORT);
    navigation.goBack();
  };

  const update = () => {
    const data = {
      ...item,
      title: title,
      body: body,
    };
    dispatch({ type: "UPDATEDATA", data });
    ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
    navigation.goBack();
  };

  const addItem = () => {
    if (!title || !body) return;
    Alert.alert(
      "Alert",
      `The data is stored Locally on your Device. So clearing or uninstalling app will remove customized data.`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            item.title ? update() : onOkPress();
            Keyboard.dismiss();
          },
        },
      ]
    );
  };

  return (
    <View style={globalStyle.homeRoot}>
      <ScrollView
        style={globalStyle.homecontainer}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          placeholderTextColor="rgb(255,224,101)"
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholderTextColor="rgb(255,224,101)"
          style={styles.input}
          placeholder="Body"
          value={body}
          onChangeText={(text) => setBody(text)}
          numberOfLines={20}
          multiline={true}
        />
        <TouchableOpacity style={styles.buttonText} onPress={addItem}>
          <Text
            style={{
              ...globalStyle.yellowText,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {item.title ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    fontSize: 20,
    borderRadius: 5,
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 10,
    borderColor: "rgb(255,224,101)",
    ...globalStyle.blueBack,
    ...globalStyle.yellowText,
  },
  buttonText: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(255,224,101)",
    ...globalStyle.blueBack,
  },
});
