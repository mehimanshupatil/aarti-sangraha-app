

import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import CommonTemplate from '../screens/commonTemplate';
import React, { useState } from 'react';
import Header from '../shared/header';
import AddNew from '../screens/addNew';
import { connect } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

function HomeStack({ state }) {

  const [showSearchInput, setShowSearchInput] = useState(false)

  const localHome = ({ navigation }) => {

    return <Home navigation={navigation} showSearchInput={showSearchInput} setShowSearchInput={setShowSearchInput} />
  }

  return (
    <Navigator headerMode="screen" screenOptions={{
      headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTintColor: 'rgb(24,28,63)',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Screen name="Home" options={({ route, navigation }) => ({
        headerTitle: () => <Header title='आरती संग्रह' navigation={navigation} showSearchInput={showSearchInput} setShowSearchInput={setShowSearchInput} showSearchButton />
      })} component={localHome}
      />
      <Screen name="CommonComponent"
        options={({ route }) => ({ title: route.params.data?.title })}
        component={CommonTemplate} />
      <Screen name="addNew" options={{ title: 'Add New' }}

        component={AddNew} />
    </Navigator>
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