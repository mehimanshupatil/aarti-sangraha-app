import React from "react";
import { StyleSheet, View, Text, ToastAndroid, Alert } from "react-native";
import * as Linking from "expo-linking";
import { ScrollView } from "react-native-gesture-handler";
import { aboutNav, singleItemType } from "../shared/types";
import { useData } from "../store/context";
import { useTheme } from "react-native-paper";

const About: React.FC<aboutNav> = ({ navigation }) => {
  const { colors } = useTheme();
  const { dispatch } = useData();

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  const reset = async () => {
    Alert.alert(
      "Alert",
      `ही क्रिया सानुकूलित आणि सुधारित आरती हटवेल. ही क्रिया पूर्ववत करणे शक्य नाही`,
      [
        {
          text: "रद्द करा",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "ठीक आहे",
          onPress: () => {
            try {
              const data: singleItemType[] = require("../shared/data.json");
              dispatch({ type: "INITIALIZE", data });
              ToastAndroid.show(
                "Data Cleared Successfully",
                ToastAndroid.SHORT
              );
              navigation.navigate("HomeStack");
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
          Thanks for using app. Please rate 5 ⭐️ on
          <Text
            style={styles.texturl}
            onPress={() =>
              handlePress(
                "https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha"
              )
            }
          >
            {" "}
            Play Store{" "}
          </Text>
          /
          <Text
            style={styles.texturl}
            onPress={() => handlePress("https://galaxy.store/aarti")}
          >
            {" "}
            Samsung Store
          </Text>
          {"\n"}
          {"\n"}
          <Text onPress={reset}>Click here to reset customised data</Text>
          {"\n"}
          {"\n"}
          For suggestion 📧 at{"\n"}
          <Text
            style={styles.texturl}
            onPress={() => handlePress("mailto:mailhimanshupatil@gmail.com")}
          >
            mailhimanshupatil@gmail.com
          </Text>
          {"\n"}
          {"\n"}
          <Text>Credits:</Text>
          {"\n"}
          Application Icon and Splash Icon Image by
          <Text
            style={styles.texturl}
            onPress={() =>
              handlePress(
                "https://pixabay.com/users/AdventureTravelTrip-7440487/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353"
              )
            }
          >
            {" "}
            Hitesh Sharma{" "}
          </Text>
          from
          <Text
            style={styles.texturl}
            onPress={() =>
              handlePress(
                "https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4341353"
              )
            }
          >
            {" "}
            Pixabay{" "}
          </Text>
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, color: colors.primary }}>
          {"🧑‍💻 with ♥️ in 🇮🇳"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  container: {
    flex: 1,
    fontSize: 30,
  },

  texturl: {
    color: "green",
  },
});
