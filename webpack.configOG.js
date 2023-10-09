const path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['react-devtools', './example.js'],
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'example.[hash].js',
		publicPath: '/'
	},
	devServer: {
		contentBase: './lib',
		historyApiFallback: {
			disableDotRule: true
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
};
