import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SingleItem from "../components/SingleItem";
import { globalStyle } from "../shared/styles";
import { favNav, singleItemType } from "../shared/types";
import Context from "../store/context";

const Favorites: React.FC<favNav> = ({ navigation }) => {
  const pressHandler = (item: singleItemType, index: number) => {
    navigation.push("CommonComponent", {
      key: item.key,
      index,
    });
  };

  const { state } = useContext(Context);
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
    <View style={globalStyle.homeRoot}>
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
          <Text style={styles.text}>No Favorites Found.</Text>
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
    color: "rgb(255,224,101)",
  },
});
