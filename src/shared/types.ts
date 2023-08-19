import { StackScreenProps } from "@react-navigation/stack";
import { useTheme } from 'react-native-paper';
import { light } from '../../App';
 
export type singleItemType = {
  key: string;
  title: string;
  body: string;
  tags: string[];
  isRemovable: boolean | undefined;
  isFavorite: boolean | undefined;
};

export type RootParamList = {
  Home: undefined;
  Favorites: undefined;
  CommonComponent: { key: string };
  addNew: { item: singleItemType };
  About: undefined;
  HomeStack: undefined;
};

export type aboutNav = StackScreenProps<RootParamList, "About">;
export type homeNav = StackScreenProps<RootParamList, "Home">;
export type addNewNav = StackScreenProps<RootParamList, "addNew">;
export type favNav = StackScreenProps<RootParamList, "Favorites">;
export type commmonTempNav = StackScreenProps<RootParamList, "CommonComponent">;


export type AppTheme = typeof light;

export const useAppTheme = () => useTheme<AppTheme>();
