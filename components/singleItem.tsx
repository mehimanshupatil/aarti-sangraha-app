import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function SingleItem({ pressHandler, item }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => pressHandler(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body.split("\n")[0]}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
    padding: 16,
    marginTop: 16,
    borderColor: 'rgb(24,28,63)',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10
  },
  title:{
fontSize: 30,
color: 'rgb(24,28,63)'
  },
  body:{
    color: 'rgb(24,28,63)'

  }
});