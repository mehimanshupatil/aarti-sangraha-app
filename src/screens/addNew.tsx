import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import * as Linking from 'expo-linking';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { globalStyle } from '../shared/styles';
import { connect } from 'react-redux';
import { addCustom } from '../redux/action';

function AddNew({ navigation, route, addCustom }) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const onOkPress = () => {
        const item = {
            title, body,
            "key": (Math.random() * (900) + 100).toString(),//key between 100 to 1k
            "favorite": true,
            "tags": []
        }
        addCustom(item)
        ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
        navigation.goBack()
    }

    const addItem = () => {
        if (!title || !body)
            return
        Alert.alert(
            "Alert",
            `The data is stored Locally on your Device. So clearing or uninstalling app will remove customized data.`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: onOkPress }
            ])
    }

    return (
        <View style={globalStyle.homeRoot}>
            <ScrollView style={globalStyle.homecontainer}>
                <TextInput placeholderTextColor="rgb(255,224,101)" style={styles.input} placeholder='Title' value={title} onChangeText={(text) => setTitle(text)} />
                <TextInput placeholderTextColor="rgb(255,224,101)" style={styles.input} placeholder='Body' value={body}
                    onChangeText={(text) => setBody(text)} numberOfLines={20} multiline={true} />
                <TouchableOpacity style={styles.buttonText} onPress={addItem}>
                    <Text style={{ ...globalStyle.yellowText, fontWeight: 'bold', fontSize: 15 }}> Add </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        aartis: state.aartis
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCustom: (item) => (dispatch(addCustom(item)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNew)

const styles = StyleSheet.create({

    input: {
        marginTop: 20,
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlignVertical: 'top',
        padding: 10,
        borderColor: 'rgb(255,224,101)',
        ...globalStyle.blueBack,
        ...globalStyle.yellowText
    },
    buttonText: {
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(255,224,101)',
        ...globalStyle.blueBack
    },
});

