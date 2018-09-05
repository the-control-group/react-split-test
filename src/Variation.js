import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Variation = ({ children }) => (
	<Fragment>{children}</Fragment>
);

Variation.propTypes = {
	children: PropTypes.node.isRequired,
	isVariation: PropTypes.bool,
	id: PropTypes.string.isRequired
};

Variation.defaultProps = {
	isVariation: true
};

export default Variation;
