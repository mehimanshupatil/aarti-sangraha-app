import { StackScreenProps } from "@react-navigation/stack";

export enum StorageKey {
  aartis = "aartis",
  fontSize = "fontSize",
  darkMode = "darkMode",
  favList = "favList",
}

export type singleItemType = {
  key: string;
  title: string;
  body: string;
  tags: string[];
  isRemovable: boolean | undefined;
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
