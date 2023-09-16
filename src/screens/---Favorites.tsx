import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native"; 
import SingleItem from "../components/SingleItem";
import { globalStyle } from "../shared/styles";
import { favNav, singleItemType, useAppTheme } from "../shared/types";
import { useDataStore } from '../store/store';
  
const Favorites: React.FC<favNav> = ({ navigation }) => {
  const { colors } = useAppTheme();
  const [aartis, searchValue] = useDataStore(s => [s.aartis,s.searchValue ])

  const pressHandler = (item: singleItemType) => {
    navigation.push("CommonComponent", {
      key: item.key,
    });
  };
 
  const [localData, setLocalData] = useState<singleItemType[]>([]);

  useEffect(() => {
    if (searchValue)
      setLocalData(
        aartis.filter(
          (x) =>
          x.isFavorite &&
            (x.title.includes(searchValue) || x.body.includes(searchValue))
        )
      );
    else setLocalData(aartis.filter((x) => x.isFavorite));
  }, [aartis, searchValue]);

  return (
    <View
      style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}
    >
      <View style={globalStyle.homecontainer}>
        {localData?.length ? (
          <FlatList
            data={localData}
            renderItem={({ item }) => (
              <SingleItem item={item} pressHandler={pressHandler} />
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
