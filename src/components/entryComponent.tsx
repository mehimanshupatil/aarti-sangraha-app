import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import MyDrawer from "../routes/drawer";
import { connect } from "react-redux";
import { initializeState } from "../redux/action";
import { singleItemType } from "../shared/types";
import AppLoading from "expo-app-loading";

function EntryComponent({ state, initializeState }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        if (!state.aartis) {
          const data: singleItemType[] = require("../shared/data.json");
          initializeState(data);
        }
      } catch (error) {}
    };
    getData().then((x) => {
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initializeState: (data) => dispatch(initializeState(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryComponent);
