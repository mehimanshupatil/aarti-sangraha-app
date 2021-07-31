import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import CommonTemplate from "../screens/CommonTemplate";
import React from "react";
import Header from "../shared/Header";
import AddNew from "../screens/AddNew";
import { useTheme } from "react-native-paper";

const { Navigator, Screen } = createStackNavigator();

function HomeStack() {
  const { colors } = useTheme();

  return (
    <Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
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
        name="CommonComponent" // @ts-ignore
        options={({ route }) => ({ title: route.params.data?.title })}
        component={CommonTemplate}
      />
      <Screen name="addNew" options={{ title: "Add New" }} component={AddNew} />
    </Navigator>
  );
}

export default HomeStack;
