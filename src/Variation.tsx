import React from 'react';

type VariationProps = {
	children: React.ReactNode;
	// eslint-disable-next-line react/no-unused-prop-types
	id: string;
}

const Variation = ({ children }: VariationProps) => (
	<>{children}</>
);

Variation.defaultProps = {
	isVariation: true
};

export default Variation;
