import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "react-native-paper";
import About from "../screens/About";
import Header from "../shared/Header";

const { Navigator, Screen } = createStackNavigator();

export default function AboutNavigation() {
  const { colors } = useTheme();

  return (
    <Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Screen
        name="About"
        options={({ route, navigation }) => ({
          headerTitle: () => (
            <Header
              title="About"
              navigation={navigation}
              showSearchButton={false}
            />
          ),
          headerTitleStyle: { fontWeight: "bold", alignSelf: "center" },
        })}
        component={About}
      />
    </Navigator>
  );
}
