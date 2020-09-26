import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SingleItem from '../components/singleItem';
import { globalStyle } from '../shared/styles';
import { MaterialIcons } from '@expo/vector-icons';
import Search from '../shared/search';

function Home({ navigation, state, searchValue }) {
  const pressHandler = (item) => {
    navigation.push('CommonComponent', {
      data: item
    });
  };
  const addNew = () => {
    navigation.push('addNew');
  }

  const [localData, setLocalData] = useState(state.aartis)

  useEffect(() => {
    setLocalData(state.aartis.filter((x: any) => !searchValue || (x.title.includes(searchValue) || x.body.includes(searchValue))))
  }, [state.aartis, searchValue])

  return (
    <View style={globalStyle.homeRoot}>
      <View style={globalStyle.homecontainer}>
        <FlatList
          data={localData}
          renderItem={({ item, index }) => (
            <SingleItem item={item} index={index} pressHandler={pressHandler} />
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
    state,
    searchValue: state.searchValue
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  dummyConatiner: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderColor: 'rgb(255,224,101)',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgb(24,28,63)',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgb(255,224,101)',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dummyText: {
    fontSize: 50,
    color: 'rgb(255,224,101)'
  }
});
