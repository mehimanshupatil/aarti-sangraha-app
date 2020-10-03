import React from 'react';
import { StyleSheet, View, Text, Share } from 'react-native';
import * as Linking from 'expo-linking';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyle } from '../shared/styles';
import { MaterialIcons } from '@expo/vector-icons';

export default function About() {

    const handlePress = (url) => {
        Linking.openURL(url);
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Hey there download aarti Sangrah from playstore/samsung store.
Click the link below to download the app.

https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha

https://galaxy.store/aarti`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <ScrollView style={styles.root}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Thanks for using app. Please rate 5<MaterialIcons name='star' size={20} /> on
                <Text style={styles.texturl} onPress={() => handlePress('https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha')}> Play Store </Text>/
                    <Text style={styles.texturl} onPress={() => handlePress('https://galaxy.store/aarti')}> Samsung Store</Text>
                    {"\n"}{"\n"}
                    <Text onPress={onShare}>Click here to <MaterialIcons name='share' size={20} /> app with <MaterialIcons name='group' size={22} /></Text>
                    {"\n"}{"\n"}
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
        </ScrollView>
    );


}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'rgb(24,28,63)'
    },
    container: {
        flex: 1,
        padding: 20,
        fontSize: 30,
    },
    text: {
        fontSize: 20,
        ...globalStyle.yellowText
    },
    texturl: {
        color: 'yellow'
    }
});

