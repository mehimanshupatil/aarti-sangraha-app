import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { deleteItem, updateFontSize } from '../redux/action';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyle } from '../shared/styles';

function CommonTemplate({ navigation, route, fontSize, updateFontSize, deleteItem }) {
  const { data } = route.params
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'rgb(24,28,63)'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    },
    fontButton: {
      flexDirection: 'row',
    },
    text: {
      fontSize: fontSize,
      color: 'rgb(255,224,101)'
    },
    icon: {
      fontSize: 35,
      ...globalStyle.yellowText
    }
  });

  const deletePress = () => {
    Alert.alert(
      "Alert",
      `आपणास खात्री आहे की आपण ${data.title} हटवू इच्छिता. ही क्रिया पूर्ववत करणे शक्य नाही`,
      [
        {
          text: "रद्द करा",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "ठीक आहे", onPress: () => { deleteItem(data.key); ToastAndroid.show('यशस्वीरित्या हटविले', ToastAndroid.SHORT); navigation.goBack() } }
      ])

  }

  return (
    <View style={{ ...styles.container, paddingTop: 5 }}>
      <View style={styles.buttonContainer}>
        <MaterialIcons style={styles.icon} name='delete-forever' onPress={deletePress} />
        <View style={styles.fontButton}>
          <MaterialIcons style={styles.icon} name='add-circle' onPress={() => updateFontSize(fontSize + 3)} />
          <MaterialIcons style={{ ...styles.icon, paddingLeft: 10 }} name='remove-circle' onPress={() => ((fontSize > 15) && updateFontSize(fontSize - 3))} />
        </View>
      </View>
      <ScrollView >
        <Text style={styles.text}>{data.body}</Text>
      </ScrollView>
    </View>
  );


}

const mapStateToProps = (state, ownProps) => {
  return {
    fontSize: state.fontSize
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateFontSize: (newFontSize) => dispatch(updateFontSize(newFontSize)),
    deleteItem: (key) => dispatch(deleteItem(key))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonTemplate)
