import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import CommonTemplate from "../screens/CommonTemplate";
import React from "react";
import Header from "../shared/Header";
import AddNew from "../screens/AddNew";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useData } from "../store/context";
import { Share } from "react-native";
import { singleItemType } from "../shared/types";

const { Navigator, Screen } = createStackNavigator();

function HomeStack() {
  const { colors } = useTheme();
  const { state } = useData();
  const { aartis } = state;

  const onShare = (aarti: singleItemType | undefined) => {
    try {
      if (!aarti) return;
      Share.share({
        message: `*${aarti.title}*

${aarti.body}

\`\`\`Download Aarti Sangrah from Play Store / Samsung Galaxy Store.

https://galaxy.store/aarti

https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha \`\`\``,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Screen
        name="Home"
        options={({ route, navigation }) => ({
          headerTitle: () => (
            <Header
              title="आरती संग्रह"
              navigation={navigation}
              showSearchButton
            />
          ),
        })}
        component={Home}
      />
      <Screen
        name="CommonComponent"
        options={({ route }) => ({
          // @ts-ignore
          title: route.params.data?.title,
          headerRight: () => (
            <MaterialIcons
              size={20}
              style={{ color: colors.background, paddingRight: 20 }}
              name="share"
              onPress={() =>
                // @ts-ignore
                onShare(aartis.find((x) => x.key === route.params?.key))
              }
            />
          ),
        })}
        component={CommonTemplate}
      />
      <Screen name="addNew" options={{ title: "Add New" }} component={AddNew} />
    </Navigator>
  );
}

export default HomeStack;
