import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { singleItemType } from "../shared/types";
import { ColorSchemeName } from "react-native";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "./data";
import { shallow } from "zustand/shallow";
import { create } from "zustand";

interface DataState {
	aartis: singleItemType[];
	favoritesKeys: string[];
	toggleFav: (id: singleItemType["key"]) => void;
	initializeAarti: () => void;
	addAarti: (item: singleItemType) => void;
	updateAarti: (item: singleItemType) => void;
	deleteAarti: (id: singleItemType["key"]) => void;
	displayMode: NonNullable<ColorSchemeName>;
	setDisplayMode: (mode: NonNullable<ColorSchemeName>) => void;
	fontSize: number;
	setFontSize: (size: number) => void;
	showSearch: boolean;
	setShowSearch: (arg: boolean) => void;
	searchValue: string;
	setSearchValue: (text: string) => void;
	translate: TextDisplayType,
	setTranslate: (arg0: TextDisplayType) => void,
}

export type TextDisplayType = 'original' | 'transliteration';

export const useDataStore = create<DataState>()(
	devtools(
		persist(
			immer((set) => ({
				aartis: data,
				favoritesKeys: [] as DataState["favoritesKeys"],
				fontSize: 20,
				searchValue: "",
				translate: 'original',
				setTranslate: (arg0) => set((state) => {
					state.translate = arg0;
				}),
				displayMode: "light" as NonNullable<ColorSchemeName>,
				showSearch: false,
				setShowSearch: (arg) =>
					set((state) => {
						state.showSearch = arg;
					}),
				toggleFav: (key) =>
					set((state) => {
						const index = state.favoritesKeys.indexOf(key);

						if (index === -1) {
							// Key is not in the array, so add it
							state.favoritesKeys.push(key);
						} else {
							// Key is in the array, so remove it
							state.favoritesKeys.splice(index, 1);
						}
					}),
				initializeAarti: () => {
					set((state) => {
						state.aartis = data;
					});
				},
				addAarti: (aarti) =>
					set((state) => {
						state.aartis.push(aarti);
					}),
				updateAarti: (aarti) =>
					set((state) => {
						const index = state.aartis.findIndex((x) => x.key === aarti.key);
						if (index !== -1) state.aartis[index] = aarti;
					}),
				deleteAarti: (key) =>
					set((state) => {
						const index = state.aartis.findIndex((x) => x.key === key);
						if (index !== -1) state.aartis.splice(index, 1);
					}),
				setFontSize: (size) =>
					set((state) => {
						state.fontSize = size;
					}),
				setSearchValue: (text) =>
					set((state) => {
						state.searchValue = text;
					}),
				setDisplayMode: (mode) =>
					set((state) => {
						state.displayMode = mode;
					}),
			})),
			{
				name: "aarti-storage",
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);

export const useDataStoreActions = () =>
	useDataStore((s) => ({
		toggleFav: s.toggleFav,
		initializeAarti: s.initializeAarti,
		addAarti: s.addAarti,
		updateAarti: s.updateAarti,
		deleteAarti: s.deleteAarti,
		setDisplayMode: s.setDisplayMode,
		setFontSize: s.setFontSize,
		setShowSearch: s.setShowSearch,
		setSearchValue: s.setSearchValue,
		setTranslate: s.setTranslate,
	}));
