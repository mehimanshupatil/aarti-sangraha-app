import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyle } from "../shared/styles";
import { MaterialIcons } from "@expo/vector-icons";
import Context from "../store/context";

const Search: React.FC<{ setShowSearchInput: (arg0: boolean) => void }> = ({
  setShowSearchInput,
}) => {
  const { state, dispatch } = useContext(Context);

  const searchInput = (data: string) => {
    dispatch({ type: "SEARCHINPUT", value: data });
  };

  return (
    <View style={{ marginTop: 10, justifyContent: "center" }}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Type here Search"
        placeholderTextColor="rgb(24,28,63)"
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
    borderColor: "rgb(24,28,63)",
    ...globalStyle.blueText,
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    ...globalStyle.blueText,
  },
});

export default Search;
