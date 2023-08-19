import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { singleItemType } from '../shared/types';
import { ColorSchemeName } from "react-native";
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DataState {
    aartis: singleItemType[];
    favorites: string[];
    fontSize: number;
    searchValue: string;
    displayMode: NonNullable<ColorSchemeName>;
    setDisplayMode: (mode: NonNullable<ColorSchemeName>) => void
}

export const useDataStore = create<DataState>()(
    devtools(
        persist(
            immer(
                (set) => ({
                    aartis: [] as DataState['aartis'],
                    favorites: [] as DataState['favorites'],
                    fontSize: 12,
                    searchValue: '',
                    displayMode: 'light',
                    setDisplayMode: (mode) =>
                        set(state => { state.displayMode = mode })
                    ,

                }),
            ),
            {
                name: 'aarti-storage',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)