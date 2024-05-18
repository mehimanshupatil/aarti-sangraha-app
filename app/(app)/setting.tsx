import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { singleItemType, useAppTheme } from '../../shared/types';
 
const setting: React.FC = () => {
  const { colors } = useAppTheme();
 
  const reset = async () => {
    Alert.alert(
      'Alert',
      "This action will delete customized and modified Aarti. This action cannot be undone",
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
          <Text onPress={reset}>Click here to reset customised data</Text>
        </Text>
      </View>

    </ScrollView>
  );
};

export default setting;

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
