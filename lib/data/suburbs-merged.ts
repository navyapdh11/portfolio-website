// AASTACLEAN — Merged Suburb Database (original + expanded)
// Combines curated suburbs with comprehensive ABS coverage
// Total: 3,365 suburbs (895 curated + 2,470 expanded)

import type { Suburb } from "./suburbs";
import { allSuburbsCurated, suburbsByStateCurated } from "./suburbs";
import { allSuburbsExpanded, suburbsByStateExpanded } from "./suburbs-expanded";

// Merge: curated first, expanded fills gaps (no duplicates)
const curatedSlugs = new Set(allSuburbsCurated.map((s: Suburb) => `${s.state}:${s.slug}`));
const newExpanded = allSuburbsExpanded.filter((s) => !curatedSlugs.has(`${s.state}:${s.slug}`));

// Type-safe merge
const allMerged: Suburb[] = [
	...allSuburbsCurated,
	...newExpanded.map(
		(e) => ({ name: e.name, slug: e.slug, postcode: e.postcode, state: e.state }) as Suburb,
	),
];

// By state — sorted alphabetically
const allByState: Record<string, Suburb[]> = {};
for (const suburb of allMerged) {
	if (!allByState[suburb.state]) allByState[suburb.state] = [];
	allByState[suburb.state]?.push(suburb);
}
for (const state of Object.keys(allByState)) {
	allByState[state]?.sort((a, b) => a.name.localeCompare(b.name));
}

// Merged exports
export const allSuburbsMerged = allMerged;
export const suburbsByStateMerged = allByState;

// Also export originals for reference
export { allSuburbsCurated, allSuburbsExpanded, suburbsByStateCurated, suburbsByStateExpanded };

// Stats
export const mergedStats = {
	curated: allSuburbsCurated.length,
	expanded: allSuburbsExpanded.length,
	merged: allMerged.length,
	newFromExpanded: newExpanded.length,
};
