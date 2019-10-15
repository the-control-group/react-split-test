export { default as Experiment } from './Experiment';
export { default as Variation } from './Variation';

// These only work for persisted variations
export function getCachedVariation(id) {
	return JSON.parse(localStorage.getItem(`@tcg-split-test:${id}`));
}

export function clearExperimentCache(id) {
	localStorage.removeItem(`@tcg-split-test:${id}`);
}

export function clearAllExperimentCaches() {
	Object.keys(localStorage).forEach(k => /^@tcg-split-test:/.test(k) && localStorage.removeItem(k));
}
