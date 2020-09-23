import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import MyDrawer from '../routes/drawer';
import { connect } from 'react-redux';
import { initializeState } from '../redux/action';
function EntryComponent({ state, initializeState }) {
    const [dataLoaded, setDataLoaded] = useState(false);

    const getData = async () => {
        try {
            let data = require('../shared/data.json')
            if (!state.aartis) {
                console.warn("This happen first time in presistant ")
                initializeState(data)
            }
        } catch (error) {
            // Error retrieving data
        }
    }


    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={getData}
                onFinish={() => setDataLoaded(true)}
            />
        );
    } else {
        return (
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initializeState: (data) => (dispatch(initializeState(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryComponent)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
