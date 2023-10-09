export { default as Experiment } from './Experiment';
export { default as Variation } from './Variation';

// These only work for persisted variations
export function getCachedVariation(id: string) {
	const cachedVariation = localStorage.getItem(`@tcg-split-test:${id}`);
	if(cachedVariation) {
		try {
			return JSON.parse(cachedVariation);
		} catch(e) {
			console.error('Invalid variation data', e);
		}
	}
}

export function clearExperimentCache(id: string) {
	localStorage.removeItem(`@tcg-split-test:${id}`);
}

export function clearAllExperimentCaches() {
	Object.keys(localStorage).forEach(k => /^@tcg-split-test:/.test(k) && localStorage.removeItem(k));
}
