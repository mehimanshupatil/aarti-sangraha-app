import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import SingleItem from '../../../../components/SingleItem';
import { globalStyle } from '../../../../shared/styles';
import { singleItemType, useAppTheme } from '../../../../shared/types';
import { useDataStore } from '../../../../store/store';
import { router } from 'expo-router';
import Head from 'expo-router/head';

const Home: React.FC = () => {
  const { colors } = useAppTheme();
  const [aartis, searchValue] = useDataStore(s => [s.aartis, s.searchValue])

  const pressHandler = (item: singleItemType) => {
    router.push(`/aarti-view/${item.slug}`);
    
  };
  const addNew = () => {
    router.push(`/add-aarti/0`);
  };

  const [localData, setLocalData] = useState(aartis);

  useEffect(() => {
    setLocalData(
      aartis.filter(
        (x) => !searchValue || x.title.includes(searchValue) || x.body.includes(searchValue)
      )
    );
  }, [aartis, searchValue]);

  return (
    <View style={{ ...globalStyle.homeRoot, backgroundColor: colors.background }}>
     <Head>
        <title>आरती संग्रह</title>
        <meta name="description" content="आरती संग्रह" />
      </Head>
      <View style={globalStyle.homecontainer}>
        <FlatList
          data={localData}
          renderItem={({ item }) => <SingleItem item={item} pressHandler={pressHandler} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <IconButton
              icon='plus'
              style={{
                ...styles.dummyContainer,
                borderColor: colors.primary,
                backgroundColor: colors.background,
                shadowColor: colors.background,
              }}
              onPress={() => addNew()}
              iconColor={colors.primary}
              size={50}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  dummyContainer: {
    marginVertical: 16,
    marginHorizontal: 0,
    alignItems: 'center',
    width: '100%',

    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
