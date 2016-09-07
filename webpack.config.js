var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

module.exports = {
	entry: {
		vendor: path.resolve('src', 'vendor.js'),
		app: path.resolve('src', 'index.js')
	},
	devtool: 'source-map',
	output: {
		path: path.resolve('www'),
		filename: path.join('assets', '[name].bundle.[chunkhash:6].js')
	},
	module: {
		loaders: [
			{
				// JS LOADER
				// Reference: https://github.com/babel/babel-loader
				// Transpile .js files using babel-loader
				// Compiles ES6 and ES7 into ES5 code
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!less-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.html$/,
				loader: "raw"
			},
			{
				test: /\.(png|jpg|jpeg|gif)([\?]?.*)$/,
				loader: 'file?name=assets/img/[name].[hash:6].[ext]'
			},
			{
				test: /\.(svg)([\?]?.*)$/,
				loader: 'file?name=assets/svg/[name].[hash:6].[ext]'
			},
			{
				test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
				loader: 'file?name=assets/font/[name].[ext]'
			}
		],
		noParse: [
			/\/node_modules\/(angular\/angular)/,
			path.resolve('/lib/ionic')
		]
	},
	resolve: {
		extensions: ['', '.js'],
		moduleDirectories: 'node_modules',
		alias: {
			"ionic$": path.join(__dirname, '/lib/ionic/js/ionic.js'),
			"ionic.css": path.join(__dirname, '/lib/ionic/css/ionic.css'),
			"ionic-angular": path.join(__dirname, '/lib/ionic/js/ionic-angular.js')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('src', 'index.html'),
			inject: 'body'
		}),
		new ExtractTextPlugin('/assets/css/bundle.[contenthash].css'),

		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor']
		})

		//минификация JS
		/*		new webpack.optimize.UglifyJsPlugin({
		 compress: {
		 warnings: false
		 }
		 })*/
	],
	devServer: {
		contentBase: './www',
		historyApiFallback: true,
		stats: 'minimal'
	},
	profile: true
};

if (NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			}
		})
	)
}

/*postcss-loader*/
