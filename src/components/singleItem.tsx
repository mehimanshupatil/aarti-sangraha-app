import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyle } from '../shared/styles';
import { connect } from 'react-redux';
import { updateFav } from '../redux/action';


function SingleItem({ pressHandler, item, updateFav, index }) {

  const iconPress = (item, action) => {
    ToastAndroid.show(action === 'add' ? 'Added to Favorites' : 'Removed from Favorites', ToastAndroid.SHORT);
    updateFav(item, action)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => pressHandler({ ...item, index })}>
      <View>
        <View style={styles.firstLine}>
          <Text style={styles.title}>{item.title}</Text>
          {(item.favorite ?
            <MaterialIcons style={styles.icon} name='favorite' onPress={() => iconPress(item, "remove")} />
            : <MaterialIcons style={styles.icon} name='favorite-border' onPress={() => iconPress(item, "add")} />)}
        </View>
        <View style={styles.firstLine}>
          <Text style={[globalStyle.yellowText, {
            flex: 1,
            flexWrap: "wrap",
          }]}>{item.body.split("\n")[0]}</Text>
          <Text style={[globalStyle.yellowText, { paddingRight: 8 }]}>{index + 1}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateFav: (item, operation) => (dispatch(updateFav(item, operation)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    borderColor: 'rgb(255,224,101)',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgb(24,28,63)',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'rgb(255,224,101)',
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
    ...globalStyle.yellowText
  },
  icon: {
    fontSize: 30,
    ...globalStyle.yellowText
  }
});