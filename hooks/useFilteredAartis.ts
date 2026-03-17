import { useMemo } from "react";
import type { singleItemType } from "../shared/types";
import { useDataStore } from "../store/store";

export function useFilteredAartis(
	aartis: singleItemType[],
	searchValue: string,
	favoritesKeys?: string[],
	/** When provided, returns aartis in this key order (recently viewed — skips deity/sort) */
	orderedKeys?: string[],
): singleItemType[] {
	const selectedDeity = useDataStore((s) => s.selectedDeity);
	const sortOrder = useDataStore((s) => s.sortOrder);

	return useMemo(() => {
		let base: singleItemType[];

		if (orderedKeys) {
			// Recently viewed: preserve insertion order, skip global filters
			base = orderedKeys
				.map((key) => aartis.find((x) => x.key === key))
				.filter((x): x is singleItemType => x !== undefined);
		} else {
			base = favoritesKeys ? aartis.filter((x) => favoritesKeys.includes(x.key)) : aartis;

			// Deity filter (data has deity field; custom aartis won't — they're omitted)
			if (selectedDeity) {
				base = base.filter((x) => (x as { deity?: string }).deity === selectedDeity);
			}

			// Sort
			if (sortOrder === "az") {
				base = [...base].sort((a, b) => a.title.original.localeCompare(b.title.original));
			} else if (sortOrder === "deity") {
				base = [...base].sort((a, b) => {
					const da = (a as { deity?: string }).deity ?? "z";
					const db = (b as { deity?: string }).deity ?? "z";
					return da.localeCompare(db);
				});
			}
		}

		if (!searchValue) return base;

		const query = searchValue.toLowerCase();
		return base.filter(
			(x) =>
				x.title.original.includes(searchValue) ||
				x.body.original.includes(searchValue) ||
				x.title.transliteration.toLowerCase().includes(query) ||
				x.body.transliteration.toLowerCase().includes(query),
		);
	}, [aartis, searchValue, favoritesKeys, orderedKeys, selectedDeity, sortOrder]);
}
