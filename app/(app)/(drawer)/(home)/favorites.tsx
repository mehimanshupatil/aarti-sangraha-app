import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import SingleItem from "../../../../components/SingleItem";
import { globalStyle } from "../../../../shared/styles";
import { useDataStore } from '../../../../store/store';
import { singleItemType, useAppTheme } from "../../../../shared/types";
import { router } from 'expo-router';

const Favorites: React.FC = () => {
  const { colors } = useAppTheme();
  const [aartis, searchValue, favoritesKeys] = useDataStore(s => [s.aartis, s.searchValue, s.favoritesKeys])

  const pressHandler = (item: singleItemType) => {
    router.push(`/aarti-view/${item.key}`);
    
  };

  const [localData, setLocalData] = useState<singleItemType[]>([]);

  useEffect(() => {
    if (searchValue)
      setLocalData(
        aartis.filter(
          (x) =>
          favoritesKeys.includes(x.key)  &&
            (x.title.includes(searchValue) || x.body.includes(searchValue))
        )
      );
    else setLocalData(aartis.filter((x) => favoritesKeys.includes(x.key)));
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
