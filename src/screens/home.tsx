import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SingleItem from '../components/singleItem';

function Home({ navigation, updateFav, state }) {
  const pressHandler = (item) => {
    navigation.push('CommonComponent', {
      data: item
    });
  };
  const addNew = () => {
    navigation.push('addNew');
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <FlatList
          data={state.aartis}
          renderItem={({ item, index }) => (
            <SingleItem item={item} index={index} updateFav={updateFav} pressHandler={pressHandler} />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            <TouchableOpacity style={styles.dummyConatiner} onPress={() => addNew()}>
              <Text style={styles.dummyText}>+</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgb(255,224,101)'
  },
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
    backgroundColor: 'rgb(24,28,63)',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgb(24,28,63)',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dummyText: {
    fontSize: 50,
    color: 'rgb(255,224,101)'
  }
});
