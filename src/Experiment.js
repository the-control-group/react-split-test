import React, { Component } from 'react';
import PropTypes from 'prop-types';

const variationPromiseCache = new Map();

export default class Experiment extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		id: PropTypes.string.isRequired,
		session: PropTypes.bool,
		onParticipate: PropTypes.func,
		variationDecider: PropTypes.func
	};

	static defaultProps = {
		onParticipate: () => {},
		/**
		 * Stub A/B decider
		 * @param  {React.node} experimentChildren - React children nodes of the experiment
		 * @return {Promise<variation id>} Selected variation ID
		 */
		variationDecider: experimentChildren => {
			const variations = [];
			React.Children.forEach(experimentChildren, c => {
				if(c.props.isVariation) variations.push(c.props.id);
			});

			return Promise.resolve(variations[Math.floor(Math.random() * variations.length)]);
		}
	};

	constructor(props) {
		super(props);

		this.cacheKey = `@tcg-split-test:${this.props.id}`;
		this.storage = this.props.session ? sessionStorage : localStorage;

		this.state = {
			selectedVariation: this.chooseVariation()
		};
	}

	chooseVariation() {
		let cachedData;
		try {
			cachedData = JSON.parse(this.storage.getItem(this.cacheKey));
		} catch (e) {
			// No/invalid cache
		}

		if(cachedData) {
			return cachedData.selectedVariation;
		} else {
			// Cache promises so only one decision is made per experiment ID
			let variationDecider;
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
					try {
						raceData = JSON.parse(this.storage.getItem(this.cacheKey));
					} catch(e) {
						// No/invalid data
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
			if(child.props.isVariation && child.props.id !== selectedVariation) return;

			return child;
		});
	}
}
