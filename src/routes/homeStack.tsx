

import Home from '../screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import CommonTemplate from '../screens/commonTemplate';
import React, { useState } from 'react';
import Header from '../shared/header';
import AddNew from '../screens/addNew';
import { connect } from 'react-redux';

const { Navigator, Screen } = createStackNavigator();

function HomeStack({ state }) {

  const [localData, setLocalData] = useState(state.aartis)

  const searchInput = (text) => {
    let data = state.aartis.filter((x: any) => (x.title.includes(text) || x.body.includes(text)))
    setLocalData(data)
  }

  return (
    // <Text>gjgj</Text>
    // <NavigationContainer>
    <Navigator headerMode="screen" screenOptions={{
      headerStyle: { backgroundColor: 'rgb(255,224,101)' }, headerTintColor: 'rgb(24,28,63)',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Screen name="Home" options={({ route, navigation }) => ({
        headerTitle: () => <Header title='आरती संग्रह' navigation={navigation} showSearchButton searchInput={searchInput} />
      })} component={Home}
      />
      <Screen name="CommonComponent"
        options={({ route }) => ({ title: route.params.data?.title })}
        component={CommonTemplate} />
      <Screen name="addNew" options={{ title: 'Add New' }}

        component={AddNew} />
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