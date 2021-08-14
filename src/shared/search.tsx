import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useData } from "../store/context";
import { useTheme } from "react-native-paper";

const Search: React.FC<{ setShowSearchInput: (arg0: boolean) => void }> = ({
  setShowSearchInput,
}) => {
  const { colors } = useTheme();
  const { state, dispatch } = useData();

  const searchInput = (data: string) => {
    dispatch({ type: "SEARCHINPUT", value: data });
  };

  return (
    <View style={{ marginTop: 10, justifyContent: "center" }}>
      <TextInput
        style={{
          ...styles.inputStyle,
          color: colors.background,
          borderColor: colors.background,
        }}
        placeholder="Type here Search"
        placeholderTextColor={colors.background}
        autoFocus={true}
        onChangeText={(text) => searchInput(text)}
        value={state.searchValue}
      />
      <MaterialIcons
        name="close"
        onPress={() => {
          setShowSearchInput(false);
          searchInput("");
        }}
        size={28}
        color={colors.background}
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    paddingRight: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "center",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
  },
});

export default Search;
