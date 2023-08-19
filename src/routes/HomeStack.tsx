import Home from '../screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import CommonTemplate from '../screens/CommonTemplate';
import React from 'react';
import Header from '../shared/Header';
import AddNew from '../screens/AddNew';
import { IconButton } from 'react-native-paper';
 import { Share } from 'react-native';
import { RootParamList, singleItemType, useAppTheme } from '../shared/types';
import { useDataStore } from '../store/store';

const { Navigator, Screen } = createStackNavigator<RootParamList>();

export const onShare = (aarti: singleItemType | undefined) => {
  try {
    if (!aarti) return;
    Share.share({
      message: `*${aarti.title}*

${aarti.body}

\`\`\`Download Aarti Sangrah from Play Store / Samsung Galaxy Store.

https://galaxy.store/aarti

https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha \`\`\``,
    });
  } catch (error) {
    alert(error);
  }
};

function HomeStack() {
  const { colors } = useAppTheme();
    const [aartis] = useDataStore(s=> [s.aartis])

  return (
    <Navigator
      screenOptions={{
        headerMode: 'screen',
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Screen
        name='Home'
        options={({ route, navigation }) => ({
          header: () => <Header title='आरती संग्रह' navigation={navigation} showSearchButton />,
        })}
        component={Home}
      />
      <Screen
        name='CommonComponent'
        options={({ route }) => ({
          // @ts-ignore
          title: route.params.data?.title,
          headerRight: () => (
            <IconButton
              icon='share-variant'
              size={24}
              iconColor={colors.background}
              style={{ marginRight: 10 }}
              onPress={() => 
                onShare(aartis.find((x) => x.key === route.params?.key))
              }
            />
          ),
        })}
        component={CommonTemplate}
      />
      <Screen name='addNew' options={{ title: 'Add New' }} component={AddNew} />
    </Navigator>
  );
}

export default HomeStack;
