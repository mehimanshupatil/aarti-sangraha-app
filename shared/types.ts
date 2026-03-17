import { useTheme } from "react-native-paper";
import { light } from "../app/_layout";
import data from "../store/data";

export type singleItemType = (typeof data)[number];

export type AppTheme = typeof light;

export const useAppTheme = () => useTheme<AppTheme>();
