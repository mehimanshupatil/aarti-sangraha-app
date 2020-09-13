import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

export default function About() {

    return (
        <View style={styles.container}>
            <Text> about </Text>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonText: {
        padding: 10,
        margin: 5,
        backgroundColor: 'rgb(255,224,101)',
    },
    text: {
        fontSize: 20,
        color: 'rgb(24,28,63)'

    }
});

