import type { singleItemType } from './types';

/** Reads the optional deity field. Cast lives here; remove when data type gains it. */
export function getDeity(item: singleItemType): string | undefined {
	return (item as { deity?: string }).deity;
}

/** Returns the index of the aarti matching the given slug, or -1 if not found. */
export function findAartiBySlug(aartis: singleItemType[], slug: string): number {
	return aartis.findIndex((x) => x.metadata.slug === decodeURI(slug));
}

/** Returns a deterministic aarti for today based on day-of-year. */
export function getDailyAarti(aartis: singleItemType[]): singleItemType | undefined {
	if (aartis.length === 0) return undefined;
	const start = new Date(new Date().getFullYear(), 0, 0).getTime();
	const dayOfYear = Math.floor((Date.now() - start) / 86_400_000);
	return aartis[dayOfYear % aartis.length];
}
