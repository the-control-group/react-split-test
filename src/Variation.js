import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Variation = ({ children }) => (
	<Fragment>{children}</Fragment>
);

Variation.propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired
};

export default Variation;
