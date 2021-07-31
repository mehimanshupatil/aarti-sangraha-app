import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import About from "../screens/About";
import Header from "../shared/Header";

const { Navigator, Screen } = createStackNavigator();

export default function AboutNavigation() {
  return (
    <Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: "rgb(255,224,101)" },
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
