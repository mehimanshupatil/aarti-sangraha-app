import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function CommonTemplate({ navigation, route, fontSize, setFontSize }) {
  const { data } = route.params
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'rgb(24,28,63)'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    buttonText: {
      padding: 10,
      margin: 5,
      backgroundColor: 'rgb(255,224,101)',
    },
    text: {
      fontSize: fontSize,
      color: 'rgb(255,224,101)'
    }
  });

  const updateFontSize = async (newSize: number) => {
    await AsyncStorage.setItem('fontSize', newSize.toString());
    setFontSize(newSize)
  }


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonText} onPress={() => updateFontSize(fontSize + 3)} >
          <Text> + </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonText} onPress={() => ((fontSize > 3) ? updateFontSize(fontSize - 3) : <></>)}>
          <Text> - </Text>
        </TouchableOpacity>
      </View>
      <ScrollView >
        <Text style={styles.text}>{data.body}</Text>
      </ScrollView>
    </View>
  );


}

