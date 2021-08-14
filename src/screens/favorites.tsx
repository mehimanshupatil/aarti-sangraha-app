import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import SingleItem from "../components/SingleItem";
import { globalStyle } from "../shared/styles";
import { favNav, singleItemType } from "../shared/types";
import { useData } from "../store/context";

const Favorites: React.FC<favNav> = ({ navigation }) => {
  const { colors } = useTheme();

  const pressHandler = (item: singleItemType, index: number) => {
    navigation.push("CommonComponent", {
      key: item.key,
      index,
    });
  };

  const { state } = useData();
  const { aartis, searchValue } = state;

  const [localData, setLocalData] = useState<singleItemType[]>([]);

  useEffect(() => {
    if (searchValue)
      setLocalData(
        aartis.filter(
          (x) =>
            x.favorite &&
            (x.title.includes(searchValue) || x.body.includes(searchValue))
        )
      );
    else setLocalData(aartis.filter((x: any) => x.favorite));
  }, [aartis, searchValue]);

  return (
    <View
      style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}
    >
      <View style={globalStyle.homecontainer}>
        {localData?.length ? (
          <FlatList
            data={localData}
            renderItem={({ item, index }) => (
              <SingleItem
                index={index}
                item={item}
                pressHandler={pressHandler}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={{ ...styles.text, color: colors.primary }}>
            No Favorites Found.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
});
