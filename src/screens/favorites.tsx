import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SingleItem from '../components/singleItem';

export default function Favorites({ navigation, apiData }) {
    const pressHandler = (item) => {
        navigation.push('CommonComponent', {
            data: item
        });
    };

    return (
        apiData.length ? <View style={styles.container}>
            <FlatList
                data={apiData}
                renderItem={({ item, index }) => (
                    <SingleItem favView index={index} item={item} pressHandler={pressHandler} />
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.title}
            />
        </View> :
            <Text style={styles.text}>No Favorites Found.</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 0,
        marginBottom: 20
    },
    text: {
        padding: 20,
        fontSize: 20,
        color: 'rgb(24,28,63)'

    }
});
