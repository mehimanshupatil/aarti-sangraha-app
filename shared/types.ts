import { useTheme } from 'react-native-paper';
import { light } from '../app/_layout';
  
export type singleItemType = {
  key: string;
  title: string;
  body: string;
  tags: string[];
  isRemovable: boolean | undefined;
  isFavorite: boolean | undefined;
};

export type AppTheme = typeof light;

export const useAppTheme = () => useTheme<AppTheme>();
