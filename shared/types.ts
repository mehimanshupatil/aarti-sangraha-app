import { useTheme } from "react-native-paper";
import data from "../store/data";
import { light } from "../app/_layout";

export type singleItemType = (typeof data)[number];

export type AppTheme = typeof light;

export const useAppTheme = () => useTheme<AppTheme>();
