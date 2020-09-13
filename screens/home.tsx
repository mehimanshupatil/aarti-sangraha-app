import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,FlatList, Alert } from 'react-native';
import SingleItem from '../components/singleItem';

export default function Home({ navigation,apiData }) {
  const pressHandler = (item) => {
    navigation.push('CommonComponent', {
      data:item
    });
  };

  const [items, setItems]= useState(apiData)

  return (
    <View style={styles.container}>
      <FlatList
              data={items}
              renderItem={({ item }) => (
                <SingleItem item={item} pressHandler={pressHandler} />
              )}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgb(255,224,101)',
    flex: 1,
    alignSelf:"stretch",
    margin:20,
    marginTop:0,
    marginBottom:0
  },
});
