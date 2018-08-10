export { default as Experiment } from './Experiment';
export { default as Variation } from './Variation';

export function clearExperimentCache() {
	Object.keys(localStorage).forEach(k => /^@tcg-split-test:/.test(k) && localStorage.removeItem(k));
}
