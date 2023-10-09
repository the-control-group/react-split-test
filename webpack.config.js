/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env = {}, argv) => ({
	entry: {
		app: './example.tsx'
	},
	output: {
		filename: '[name].[contenthash].js',
		// This defaults using process.cwd, which is usually identical but not as stable as __dirname
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	resolve: {
		// Required to import .ts and .tsx files
		extensions: ['.ts', '.tsx', '.js', '.json']
	},
	devServer: {
		historyApiFallback: true
	},
	watchOptions: {
		ignored: ['**/node_modules']
	},
	devtool: 'eval-cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(),
		// This runs the TypeScript typechecking in a separate process from the bundling, greatly increasing build speed
		new ForkTsCheckerWebpackPlugin()
	]
});
