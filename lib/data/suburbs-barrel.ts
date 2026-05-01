// AASTACLEAN — Suburb Data Barrel
// Re-exports merged (curated + expanded) data as default
// 3,365 suburbs across all 8 states/territories

export type { State, Suburb } from "./suburbs";
// Also export curated and expanded for reference
export {
	allSuburbsCurated as curatedSuburbs,
	getSuburbBySlug,
	getSuburbsByState as getCuratedSuburbsByState,
	states,
	suburbsByStateCurated as curatedByState,
	totalSuburbCountCurated as curatedCount,
} from "./suburbs";
export type { SuburbExpanded } from "./suburbs-expanded";
export {
	allSuburbsExpanded,
	expandedSuburbCounts,
	suburbsByStateExpanded,
} from "./suburbs-expanded";
export {
	allSuburbsMerged as allSuburbs,
	mergedStats,
	suburbsByStateMerged as suburbsByState,
} from "./suburbs-merged";
