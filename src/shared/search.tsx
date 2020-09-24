import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SingleItem from '../components/singleItem';
import { globalStyle } from '../shared/styles';
import { MaterialIcons } from '@expo/vector-icons';

function Search({ text, setText, setShowSearchInput }) {

    return (
        <View style={{ marginTop: 10, justifyContent: "center" }}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Type here Search"
                placeholderTextColor="rgb(255,224,101)"
                autoFocus={true}
                onChangeText={text => setText(text)}
                defaultValue={text}
            />
            <MaterialIcons name='close' onPress={() => { setShowSearchInput(false); setText("") }} size={28} style={styles.searchIcon} />
        </View>
    );
}


export default Search

const styles = StyleSheet.create({
    inputStyle: {
        height: 40, borderRadius: 5, borderWidth: 1, textAlign: 'center',
        borderColor: 'rgb(255,224,101)',
        ...globalStyle.yellowText
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        ...globalStyle.yellowText

    },
});
