import { useMemo } from "react";
import type { singleItemType } from "../shared/types";
import type { SortOrder } from "../store/store";
import { useDataStore } from "../store/store";
import { getDeity } from "../shared/aarti";

function applySearch(list: singleItemType[], searchValue: string): singleItemType[] {
	if (!searchValue) return list;
	const query = searchValue.toLowerCase();
	return list.filter(
		(x) =>
			x.title.original.includes(searchValue) ||
			x.body.original.includes(searchValue) ||
			x.title.transliteration.toLowerCase().includes(query) ||
			x.body.transliteration.toLowerCase().includes(query),
	);
}

function applyDeityAndSort(
	list: singleItemType[],
	selectedDeity: string | null,
	sortOrder: SortOrder,
): singleItemType[] {
	let base = selectedDeity
		? list.filter((x) => getDeity(x) === selectedDeity)
		: list;

	if (sortOrder === "az") {
		base = [...base].sort((a, b) => a.title.original.localeCompare(b.title.original));
	} else if (sortOrder === "deity") {
		base = [...base].sort((a, b) =>
			(getDeity(a) ?? "z").localeCompare(getDeity(b) ?? "z"),
		);
	}
	return base;
}

/** Home — all aartis with deity filter, sort, and search applied. */
export function useAartiList(): singleItemType[] {
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const selectedDeity = useDataStore((s) => s.selectedDeity);
	const sortOrder = useDataStore((s) => s.sortOrder);

	return useMemo(
		() => applySearch(applyDeityAndSort(aartis, selectedDeity, sortOrder), searchValue),
		[aartis, searchValue, selectedDeity, sortOrder],
	);
}

/** Favorites — filtered by saved keys, then deity/sort/search applied. */
export function useFavoriteAartis(): singleItemType[] {
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);
	const selectedDeity = useDataStore((s) => s.selectedDeity);
	const sortOrder = useDataStore((s) => s.sortOrder);

	return useMemo(() => {
		const favorites = aartis.filter((x) => favoritesKeys.includes(x.key));
		return applySearch(applyDeityAndSort(favorites, selectedDeity, sortOrder), searchValue);
	}, [aartis, searchValue, favoritesKeys, selectedDeity, sortOrder]);
}

/** Recently viewed — preserves insertion order, applies search only (no deity/sort). */
export function useRecentAartis(): singleItemType[] {
	const aartis = useDataStore((s) => s.aartis);
	const searchValue = useDataStore((s) => s.searchValue);
	const recentlyViewed = useDataStore((s) => s.recentlyViewed);

	return useMemo(() => {
		const ordered = recentlyViewed
			.map((key) => aartis.find((x) => x.key === key))
			.filter((x): x is singleItemType => x !== undefined);
		return applySearch(ordered, searchValue);
	}, [aartis, searchValue, recentlyViewed]);
}
