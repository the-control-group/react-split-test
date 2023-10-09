module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	plugins: ['react', 'react-hooks'],
	globals: {
		API_HOST: false,
		fetch: false
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
	env: {
		browser: true,
		node: false,
		es6: true
	},
	rules: {
		camelcase: 2,
		'class-methods-use-this': [2, { exceptMethods: ['componentDidCatch'] }],
		'dot-notation': 2,
		eqeqeq: 2,
		'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
		'no-alert': 2,
		'no-console': [2, { allow: ['error'] }],
		'no-extra-boolean-cast': 'off',
		'no-shadow': 2,
		'no-unneeded-ternary': [2, { defaultAssignment: false }],
		'no-unused-expressions': 2,
		'no-restricted-globals': ['error', 'event', 'fdescribe'],
		'no-var': 2,
		'object-shorthand': 2,
		'prefer-const': 0,
		'prefer-arrow-callback': 0,
		'prefer-object-spread': 2,
		quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: false }],
		'require-await': 2,
		strict: 2,
		yoda: 2,
		'jsx-quotes': 2,
		'react/jsx-curly-brace-presence': [2, 'never'],
		'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
		'react/no-unused-prop-types': 2,
		'react/no-unused-state': 2,
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1
	}
};
