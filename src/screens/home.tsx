import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import SingleItem from "../components/SingleItem";
import { globalStyle } from "../shared/styles";
import { homeNav, singleItemType } from "../shared/types";
import { useData } from "../store/context";

const Home: React.FC<homeNav> = ({ navigation }) => {
  const { colors } = useTheme();

  const { state } = useData();
  const { aartis, searchValue } = state;
  const pressHandler = (item: singleItemType, index: number) => {
    navigation.push("CommonComponent", {
      key: item.key,
      index,
    });
  };
  const addNew = () => {
    navigation.push("addNew", { item: {} as any });
  };

  const [localData, setLocalData] = useState(aartis);

  useEffect(() => {
    setLocalData(
      aartis.filter(
        (x: any) =>
          !searchValue ||
          x.title.includes(searchValue) ||
          x.body.includes(searchValue)
      )
    );
  }, [aartis, searchValue]);

  return (
    <View
      style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}
    >
      <View style={globalStyle.homecontainer}>
        <FlatList
          data={localData}
          renderItem={({ item, index }) => (
            <SingleItem item={item} index={index} pressHandler={pressHandler} />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{
                ...styles.dummyConatiner,
                borderColor: colors.primary,
                backgroundColor: colors.background,
                shadowColor: colors.background,
              }}
              onPress={() => addNew()}
            >
              <Text
                style={{
                  fontSize: 50,
                  color: colors.primary,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  dummyConatiner: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,

    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
