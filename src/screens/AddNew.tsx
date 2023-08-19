import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Keyboard,
  ScrollView,
  TextInput,
} from 'react-native';
import { globalStyle } from '../shared/styles';
import { addNewNav, useAppTheme } from '../shared/types';
import { useDataStore } from '../store/store';

const AddNew: React.FC<addNewNav> = ({ navigation, route }) => {
  const { colors } = useAppTheme();
  const { item } = route.params;
  const [addAarti, updateAarti] = useDataStore(s => [s.addAarti, s.updateAarti])

  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  useEffect(() => {
    navigation.setOptions({
      title: item.title ? 'Update' : 'Add New',
    });
  }, []);

  const onOkPress = () => {
    const item = {
      title,
      body,
      key: (Math.random() * 900 + 100).toString(), //key between 100 to 1k
      isFavorite: true,
      tags: [],
      isRemovable: true,
    };
    addAarti(item);
    ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
    navigation.goBack();
  };

  const update = () => {
    const data = {
      ...item,
      title: title,
      body: body,
    };
    updateAarti(data);
    ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT);
    navigation.goBack();
  };

  const addItem = () => {
    if (!title || !body) return;
    Alert.alert(
      'Alert',
      `The data is stored Locally on your Device. So clearing or uninstalling app will remove customized data.`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            item.title ? update() : onOkPress();
            Keyboard.dismiss();
          },
        },
      ]
    );
  };

  return (
    <View style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}>
      <ScrollView style={globalStyle.homecontainer} keyboardShouldPersistTaps='handled'>
        <TextInput
          placeholderTextColor={colors.primary}
          style={{
            ...styles.input,
            color: colors.primary,
            backgroundColor: colors.background,
            borderColor: colors.primary,
          }}
          placeholder='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholderTextColor={colors.primary}
          style={{
            ...styles.input,
            color: colors.primary,
            backgroundColor: colors.background,
            borderColor: colors.primary,
          }}
          placeholder='Body'
          value={body}
          onChangeText={(text) => setBody(text)}
          numberOfLines={20}
          multiline={true}
        />
        <TouchableOpacity
          style={{ ...styles.buttonText, borderColor: colors.primary }}
          onPress={addItem}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            {item.title ? 'Update' : 'Add'}
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
    textAlignVertical: 'top',
    padding: 10,
  },
  buttonText: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
