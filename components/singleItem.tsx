import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function SingleItem({ pressHandler, item, index, favorites, favView, removeFav }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => pressHandler(item)}>
      <View style={styles.firstLine}>
        <Text style={styles.title}>{item.title}</Text>
        {!favView && (favorites.includes(index) ?
          <MaterialIcons style={styles.icon} name='favorite' color='rgb(24,28,63)' onPress={() => removeFav(index, "remove")} />
          : <MaterialIcons style={styles.icon} name='favorite-border' color='rgb(24,28,63)' onPress={() => removeFav(index, "add")} />)}
      </View>
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgb(24,28,63)',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 30,
    color: 'rgb(24,28,63)'
  },
  body: {
    color: 'rgb(24,28,63)'
  },
  icon: {
    fontSize: 30,
  }
});