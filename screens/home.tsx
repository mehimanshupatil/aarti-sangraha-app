import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SingleItem from '../components/singleItem';

export default function Home({ navigation, apiData, favorites, removeFav }) {
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
        renderItem={({ item, index }) => (
          <SingleItem item={item} index={index} favorites={favorites} removeFav={removeFav} pressHandler={pressHandler} />
        )}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() =>
          <TouchableOpacity style={styles.dummyConatiner} onPress={() => addNew()}>
            <Text style={styles.dummyText}>+</Text>
          </TouchableOpacity>
        }
      />
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
    marginBottom: 16,
    borderColor: 'rgb(24,28,63)',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgb(24,28,63)',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dummyText: {
    fontSize: 50,
    color: 'rgb(24,28,63)'
  }
});
