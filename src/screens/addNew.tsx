import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function AddNew({ navigation, route, setLocalAartiData }) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addItem = () => {
        if (!title || !body)
            return
        Alert.alert(
            "Alert",
            `The data is stored Locally on your Device. So clearing or uninstalling app will remove data.
            Also verify title and body before saving`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => { setLocalAartiData(title, body); navigation.goBack() } }
            ])
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInput style={styles.input} placeholder='Title' value={title} onChangeText={(text) => setTitle(text)} />
                <TextInput style={styles.input} placeholder='Body' value={body}
                    onChangeText={(text) => setBody(text)} numberOfLines={20} multiline={true} />
                <TouchableOpacity style={styles.buttonText} onPress={addItem}>
                    <Text style={{ color: 'rgb(24,28,63)', fontWeight: 'bold', fontSize: 15 }}> Add </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginTop: 20,
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 1,
        textAlignVertical: 'top',
        padding: 10,
        borderColor: 'rgb(24,28,63)',
        color: 'rgb(24,28,63)'
    },
    buttonText: {
        alignItems: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: 'rgb(255,224,101)',
    },
});

