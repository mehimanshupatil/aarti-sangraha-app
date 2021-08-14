import { StackScreenProps } from "@react-navigation/stack";

export enum StorageKey {
  aartis = "aartis",
  fontSize = "fontSize",
  darkMode = "darkMode",
}

export type singleItemType = {
  key: string;
  title: string;
  body: string;
  favorite: boolean;
  tags: string[];
  isRemovable: boolean | undefined;
};

export type RootParamList = {
  Home: undefined;
  Favorites: undefined;
  CommonComponent: { key: string; index: number };
  addNew: { item: singleItemType };
  About: undefined;
  HomeStack: undefined;
};

export type aboutNav = StackScreenProps<RootParamList, "About">;
export type homeNav = StackScreenProps<RootParamList, "Home">;
export type addNewNav = StackScreenProps<RootParamList, "addNew">;
export type favNav = StackScreenProps<RootParamList, "Favorites">;
export type commmonTempNav = StackScreenProps<RootParamList, "CommonComponent">;
