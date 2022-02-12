import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import SingleItem from '../components/SingleItem';
import { globalStyle } from '../shared/styles';
import { homeNav, singleItemType } from '../shared/types';
import { useData } from '../store/context';

const Home: React.FC<homeNav> = ({ navigation }) => {
  const { colors } = useTheme();

  const { state } = useData();
  const { aartis, searchValue } = state;
  const pressHandler = (item: singleItemType) => {
    navigation.push('CommonComponent', {
      key: item.key,
    });
  };
  const addNew = () => {
    navigation.push('addNew', { item: {} as any });
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
      <View style={globalStyle.homecontainer}>
        <FlatList
          data={localData}
          renderItem={({ item }) => <SingleItem item={item} pressHandler={pressHandler} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <IconButton
              icon='plus'
              style={{
                ...styles.dummyConatiner,
                borderColor: colors.primary,
                backgroundColor: colors.background,
                shadowColor: colors.background,
              }}
              onPress={() => addNew()}
              color={colors.primary}
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
  dummyConatiner: {
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
