import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Experiment extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		id: PropTypes.string.isRequired,
		session: PropTypes.bool,
		onParticipate: PropTypes.func
	};

	static defaultProps = {
		onParticipate: () => {}
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

		let selectedVariation;
		if(cachedData) {
			selectedVariation = cachedData.selectedVariation;
		} else {
			const variations = [];
			React.Children.forEach(this.props.children, c => {
				if(c.props.isVariation) variations.push(c.props.id);
			});

			selectedVariation = variations[Math.floor(Math.random() * variations.length)];

			const experimentData = {
				id: this.props.id,
				selectedVariation
			};

			this.props.onParticipate(experimentData);

			this.storage.setItem(this.cacheKey, JSON.stringify(experimentData));
		}

		return selectedVariation;
	}

	render() {
		const { selectedVariation } = this.state;

		return React.Children.map(this.props.children, child => {
			if(child.props.isVariation && child.props.id !== selectedVariation) return;

			return child;
		});
	}
}
