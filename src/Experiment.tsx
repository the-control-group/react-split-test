import React, { Component, PropsWithChildren } from 'react';

const variationPromiseCache = new Map();

type ExperimentProps = PropsWithChildren<{
	id: string;
	session?: boolean;
	onParticipate: (experimentData: {id: string; selectedVariation: string;}) => void;
	variationDecider: (experimentChildren: React.ReactNode) => Promise<string>;
}>;

export default class Experiment extends Component<ExperimentProps, {selectedVariation: string | null}> {
	private storage: Storage;
	private cacheKey: string;

	static defaultProps = {
		onParticipate: () => {},
		/**
		 * Stub A/B decider
		 * @param  {React.node} experimentChildren - React children nodes of the experiment
		 * @return {Promise<variation id>} Selected variation ID
		 */
		variationDecider: (experimentChildren: React.ReactNode): Promise<string> => {
			const variations: string[] = [];
			React.Children.forEach(experimentChildren, c => {
				if(React.isValidElement(c) && c.props.isVariation) variations.push(c.props.id);
			});

			return Promise.resolve(variations[Math.floor(Math.random() * variations.length)]);
		}
	};

	constructor(props: ExperimentProps) {
		super(props);

		this.cacheKey = `@tcg-split-test:${this.props.id}`;
		this.storage = this.props.session ? sessionStorage : localStorage;

		this.state = {
			selectedVariation: this.chooseVariation()
		};
	}

	chooseVariation(): string | null {
		let cachedData;
		const cachedString = this.storage.getItem(this.cacheKey);
		if(cachedString) {
			try {
				cachedData = JSON.parse(cachedString);
			} catch (e) {
				console.error('Invalid experiment cache data', e);
			}
		}

		if(cachedData) {
			return cachedData.selectedVariation;
		} else {
			// Cache promises so only one decision is made per experiment ID
			let variationDecider: ReturnType<ExperimentProps['variationDecider']>;
			if(variationPromiseCache.has(this.props.id)) {
				variationDecider = variationPromiseCache.get(this.props.id);
			} else {
				variationDecider = this.props.variationDecider(this.props.children);
				variationPromiseCache.set(this.props.id, variationDecider);
			}

			variationDecider
				.then(selectedVariation => {
					const experimentData = {
						id: this.props.id,
						selectedVariation
					};

					// Since this is async, we need to check if another component with the same experiment
					// has already made this decision in a potential race condition
					let raceData;
					const cachedRaceString = this.storage.getItem(this.cacheKey);
					if(cachedRaceString) {
						try {
							raceData = JSON.parse(cachedRaceString);
						} catch(e) {
							console.error('Invalid experiment race cache data', e);
						}
					}

					if(!raceData) {
						this.storage.setItem(this.cacheKey, JSON.stringify(experimentData));
						this.props.onParticipate(experimentData);
						// Remove the initial promise from the cache since subsequent renders/mounts will work off of the cache
						variationPromiseCache.delete(this.props.id);
					}

					this.setState({
						selectedVariation: raceData ? raceData.selectedVariation : selectedVariation
					});
				});

			return null;
		}
	}

	render() {
		const { selectedVariation } = this.state;

		return React.Children.map(this.props.children, child => {
			if(React.isValidElement(child) && child.props.isVariation && child.props.id !== selectedVariation) return;

			return child;
		});
	}
}
