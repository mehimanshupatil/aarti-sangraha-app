import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";
import { singleItemType } from "../shared/types";
import data from "./data";

export type TextDisplayType = "original" | "transliteration";
export type SortOrder = "default" | "az" | "deity";

// --- Data slice: aarti list + favourites + recently viewed ---
interface DataSlice {
	aartis: singleItemType[];
	favoritesKeys: string[];
	recentlyViewed: string[]; // aarti keys, most-recent-first, max 20
	toggleFav: (id: singleItemType["key"]) => void;
	initializeAarti: () => void;
	addAarti: (item: singleItemType) => void;
	updateAarti: (item: singleItemType) => void;
	deleteAarti: (id: singleItemType["key"]) => void;
	addToRecentlyViewed: (key: string) => void;
}

// --- UI slice: display preferences ---
interface UISlice {
	displayMode: NonNullable<ColorSchemeName>;
	setDisplayMode: (mode: NonNullable<ColorSchemeName>) => void;
	fontSize: number;
	setFontSize: (size: number) => void;
	showSearch: boolean;
	setShowSearch: (arg: boolean) => void;
	searchValue: string;
	setSearchValue: (text: string) => void;
	translate: TextDisplayType;
	setTranslate: (arg: TextDisplayType) => void;
	selectedDeity: string | null;
	setSelectedDeity: (deity: string | null) => void;
	sortOrder: SortOrder;
	setSortOrder: (order: SortOrder) => void;
}

type DataState = DataSlice & UISlice;

export const useDataStore = create<DataState>()(
	devtools(
		persist(
			immer((set) => ({
				// Data slice
				aartis: data,
				favoritesKeys: [] as string[],
				recentlyViewed: [] as string[],
				toggleFav: (key) =>
					set((state) => {
						const index = state.favoritesKeys.indexOf(key);
						if (index === -1) state.favoritesKeys.push(key);
						else state.favoritesKeys.splice(index, 1);
					}),
				initializeAarti: () =>
					set((state) => {
						state.aartis = data;
					}),
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
						state.recentlyViewed = state.recentlyViewed.filter((k) => k !== key);
					}),
				addToRecentlyViewed: (key) =>
					set((state) => {
						const existing = state.recentlyViewed.indexOf(key);
						if (existing !== -1) state.recentlyViewed.splice(existing, 1);
						state.recentlyViewed.unshift(key);
						if (state.recentlyViewed.length > 20) state.recentlyViewed.pop();
					}),

				// UI slice
				displayMode: "light" as NonNullable<ColorSchemeName>,
				fontSize: 20,
				showSearch: false,
				searchValue: "",
				translate: "original" as TextDisplayType,
				selectedDeity: null,
				sortOrder: "default" as SortOrder,
				setDisplayMode: (mode) =>
					set((state) => {
						state.displayMode = mode;
					}),
				setFontSize: (size) =>
					set((state) => {
						state.fontSize = size;
					}),
				setShowSearch: (arg) =>
					set((state) => {
						state.showSearch = arg;
					}),
				setSearchValue: (text) =>
					set((state) => {
						state.searchValue = text;
					}),
				setTranslate: (arg) =>
					set((state) => {
						state.translate = arg;
					}),
				setSelectedDeity: (deity) =>
					set((state) => {
						state.selectedDeity = deity;
					}),
				setSortOrder: (order) =>
					set((state) => {
						state.sortOrder = order;
					}),
			})),
			{
				name: "aarti-storage",
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);

/** Actions for aarti data management */
export const useDataStoreActions = () =>
	useDataStore(
		useShallow((s) => ({
			toggleFav: s.toggleFav,
			initializeAarti: s.initializeAarti,
			addAarti: s.addAarti,
			updateAarti: s.updateAarti,
			deleteAarti: s.deleteAarti,
			addToRecentlyViewed: s.addToRecentlyViewed,
		})),
	);

/** Actions for UI/display preferences */
export const useUIStoreActions = () =>
	useDataStore(
		useShallow((s) => ({
			setDisplayMode: s.setDisplayMode,
			setFontSize: s.setFontSize,
			setShowSearch: s.setShowSearch,
			setSearchValue: s.setSearchValue,
			setTranslate: s.setTranslate,
			setSelectedDeity: s.setSelectedDeity,
			setSortOrder: s.setSortOrder,
		})),
	);
