

import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import CommonTemplate from '../screens/commonTemplate';
import React, { useState } from 'react';
import Header from '../shared/header';
import AddNew from '../screens/addNew';
import { connect } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

function HomeStack({ state, fontSize, setFontSize, setLocalAartiData }) {

  const [localData, setLocalData] = useState(state.aartis)

  const searchInput = (text) => {
    let data = state.aartis.filter((x: any) => (x.title.includes(text) || x.body.includes(text)))
    setLocalData(data)
  }

  const updateFav = (item, operation) => {
    if (operation == 'add') {
      let obj = localData.map(obj => obj.title == item.title ? ({ ...item, favorite: true }) : obj);
      setLocalData(obj)
    } else {
      let obj = localData.map(obj => obj.title == item.title ? ({ ...item, favorite: true }) : obj);
      setLocalData(obj)
    }
  }



  const LocalCommonTemplate = ({ navigation, route }) => {
    return (
      <CommonTemplate navigation={navigation} route={route} fontSize={fontSize} setFontSize={setFontSize} />
    )
  }

  const LocalAddNew = ({ navigation, route }) => {
    return (
      <AddNew navigation={navigation} route={route} setLocalAartiData={setLocalAartiData} />
    )
  }

  return (
    // <Text>gjgj</Text>
    // <NavigationContainer>
    <Navigator headerMode="screen" screenOptions={{
      headerStyle: { backgroundColor: 'rgb(24,28,63)' }, headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Screen name="Home" options={({ route, navigation }) => ({
        headerTitle: () => <Header title='आरती संग्रह' navigation={navigation} showSearchButton searchInput={searchInput} />
      })} component={Home}
      />
      <Screen name="CommonComponent"
        options={({ route }) => ({ title: route.params.data?.title, headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTintColor: 'rgb(24,28,63)' })}
        component={LocalCommonTemplate} />
      <Screen name="addNew" options={{ title: 'Add New', headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTintColor: 'rgb(24,28,63)' }}

        component={LocalAddNew} />
    </Navigator>
    // </NavigationContainer>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeStack)