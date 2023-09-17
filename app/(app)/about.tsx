import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { singleItemType, useAppTheme } from '../../shared/types';

const About: React.FC = () => {
  const { colors } = useAppTheme();

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  const reset = async () => {
    Alert.alert(
      'Alert',
      `This action will delete customized and modified Aarti. This action cannot be undone`,
      [
        {
          text: 'रद्द करा',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ठीक आहे',
          onPress: () => {
            try {
              const data: singleItemType[] = require('../shared/data.json');
              //  dispatch({ type: 'INITIALIZE', data });
              // ToastAndroid.show('Data Cleared Successfully', ToastAndroid.SHORT);

            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.root,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: colors.primary }}>
          If you're enjoying the app, please consider sharing your feedback with a 5-star rating
          <Text
            style={styles.texturl}
            onPress={() =>
              handlePress(
                'https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha'
              )
            }
          >
            {' '}
            Play Store{' '}
          </Text>
          /
          <Text style={styles.texturl} onPress={() => handlePress('https://galaxy.store/aarti')}>
            {' '}
            Samsung Store
          </Text>
          {'\n'}
          {'\n'}
          {/* <Text onPress={reset}>Click here to reset customised data</Text> */}
          {/* {'\n'}
          {'\n'} */}
          If you have suggestions, questions, or encounter any issues, don't hesitate to reach out:{'\n'}
          <Text
            style={styles.texturl}
            onPress={() => handlePress('mailto:mailhimanshupatil@gmail.com')}
          >
            dev@himanshupatil.dev
          </Text>
          {'\n'}
          {'\n'}
          <Text>Credits:</Text>
          {'\n'}
          Application Icon and Splash Icon Image by
          <Text
            style={styles.texturl}
            onPress={() =>
              handlePress(
                'https://pixabay.com/users/AdventureTravelTrip-7440487/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353'
              )
            }
          >
            {' '}
            Hitesh Sharma{' '}
          </Text>
          from
          <Text
            style={styles.texturl}
            onPress={() =>
              handlePress(
                'https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353'
              )
            }
          >
            {' '}
            Pixabay{' '}
          </Text>
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: colors.primary }}>{'🧑‍💻 with ♥️ in 🇮🇳'}</Text>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    flex: 1,
    fontSize: 30,
  },

  texturl: {
    color: 'green',
  },
});
