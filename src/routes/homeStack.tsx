import Home from "../screens/home";
import { createStackNavigator } from "@react-navigation/stack";
import CommonTemplate from "../screens/commonTemplate";
import React from "react";
import Header from "../shared/header";
import AddNew from "../screens/addNew";

const { Navigator, Screen } = createStackNavigator();

function HomeStack() {
  return (
    <Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: { backgroundColor: "rgb(255,224,101)" },
        headerTintColor: "rgb(24,28,63)",
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
