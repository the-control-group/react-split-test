import React from 'react';

type VariationProps = {
	children: React.ReactNode;
	id: string;
}

const Variation = ({ children }: VariationProps) => (
	<>{children}</>
);

Variation.defaultProps = {
	isVariation: true
};

export default Variation;
