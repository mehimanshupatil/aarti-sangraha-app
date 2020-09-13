import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SingleItem from '../components/singleItem';

export default function Home({ navigation, apiData }) {
  const pressHandler = (item) => {
    navigation.push('CommonComponent', {
      data: item
    });
  };
  const addNew = () => {
    navigation.push('addNew');
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={apiData}
        renderItem={({ item }) => (
          <SingleItem item={item} pressHandler={pressHandler} />
        )}
        keyExtractor={item => item.title}
      />
      <TouchableOpacity style={styles.dummyConatiner} onPress={() => addNew()}>
        <Text style={styles.dummyText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 0,
    marginBottom: 0
  },
  dummyConatiner: {
    padding: 16,
    marginTop: 16,
    borderColor: 'rgb(24,28,63)',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: 'center',
  },
  dummyText: {
    fontSize: 50,
    color: 'rgb(24,28,63)'
  }
});
