import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MyDrawer from '../routes/drawer';
import { connect } from 'react-redux';
import { initializeState } from '../redux/action';
import { singleItemType } from '../shared/types';
function EntryComponent({ state, initializeState }) {
    const [dataLoaded, setDataLoaded] = useState(false);

    const getData = async () => {
        try {
            if (!state.aartis) {
                const data: singleItemType[] = require("../shared/data.json");
                initializeState(data)
            }
        } catch (error) {
        }
    }


    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={getData}
                onFinish={() => setDataLoaded(true)}
                onError={()=> console.log('error')}
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
