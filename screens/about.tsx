import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import * as Linking from 'expo-linking';

export default function About() {

    const handlePress = (url) => {
        Linking.openURL(url);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Thanks for using app. Please rate on Play Store{"\n"}{"\n"}
                 Source code of app is available at
                <Text style={styles.texturl} onPress={() => handlePress('https://github.com/mehimanshupatil/aarti-sangraha-app')}> github</Text>

                {"\n"}{"\n"}
                   For suggestion mail at{"\n"}
                <Text style={styles.texturl} onPress={() => handlePress('mailto:mailhimanshupatil@gmail.com')}>mailhimanshupatil@gmail.com</Text>
                {"\n"}{"\n"}<Text>Credits:</Text>{"\n"}
            Application Icon and Splash Icon Image by
          <Text style={styles.texturl} onPress={() => handlePress('https://pixabay.com/users/AdventureTravelTrip-7440487/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353')}> Hitesh Sharma </Text>
                from
          <Text style={styles.texturl} onPress={() => handlePress('https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353')}> Pixabay </Text>
            </Text>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        fontSize: 30,
    },
    text: {
        fontSize: 20,
        color: 'rgb(24,28,63)'
    },
    texturl: {
        color: 'blue'
    }
});

