var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';
var basePath =  process.cwd();
var distPath = basePath + '/dist/';
var bootstrapEntryPoints = require('./src/app/webpack.bootstrap.config');
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;


module.exports = {
	
	// For development server
	devServer: {
	  contentBase: distPath,
	  compress: true,
	  port: 9000
	},

	// App entry points
	entry: {
		bootstrap: bootstrapConfig,
		app : './src/app_init.js',
	},

	// Output
	output: {
		path: basePath + '/dist/',
		filename: '[name].bundle.js'
	},

	// Loaders
	module: {
		loaders: [{
			exclude: /(node_modules|bower_components)/,
		}],
		rules: [


			// For separate html files
			{
				test: /\.html$/,
				use: ['file-loader?name=[path][name].[ext]&context=src', 'extract-loader', 'html-loader'],
				exclude: [/index\.html$/, /\.tpl\.html$/]
			},


			// For separate jade ==> html files
			{
				test: /\.jade$/,
				use: ['file-loader?name=[path][name].[ext]&context=src', 'extract-loader', 'html-loader', 'jade-html-loader'],
				exclude: [/\.tpl\.jade$/]
			},						


			// For angular template cache -- jade
			{
				test: /\.tpl\.jade$/,
				use: ['angular-templatecache-loader', 'extract-loader', 'html-loader', 'jade-html-loader']
			},

			// For angular template cache -- html
			{
				test: /\.tpl\.html$/,
				use: ['angular-templatecache-loader']
			},

			
			// For css
			{	
				test: /\.css$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},

			// For scss 
			{	
				test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			
            
            // APP static files
            // For images and fonts
			{
				test: /\.jpg|png|jpeg|svg|gif|eot|woff|woff2|ttf$/,
				use: ['file-loader?name=[path][name].[ext]&limit=25000&context=src'],
				exclude: [/vendors\\/, /node_modules\\/]
			},


			// Node module static files
			// For node module images
			{
				test: /\.jpg|png|jpeg|svg|gif|eot|woff|woff2|ttf$/,
				use: ['file-loader?name=vendors/[path][name].[ext]&limit=25000&context=node_modules&publicPath=../'],
				include: /node_modules\\/
			},

			// Bower component static files
			// For vendor bower components
			// For node module images
			{
				test: /\.jpg|png|jpeg|svg|gif|eot|woff|woff2|ttf$/,
				use: ['file-loader?name=vendors/[path][name].[ext]&limit=25000&context=src/app/vendors/bower_components&publicPath=../'],
				include: /bower_components\\/
			},

			// Not required as provider plugin is used
            // Bootstrap 3 
            //{ test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' },
            //{ test:/jquery-ui.js/, use: 'imports-loader?$=jQuery' },
            //{ test:/angular-ui-router.js/, use: 'imports-loader?angular=angular' },
            
            // For app yaml
			{
				test: /app\.yaml$/,
				use: ['file-loader?name=[name].[ext]&context=src&useRelativePath=true&limit=1']
			}, 
		
		]
	},
	plugins: [ 
		
		// For index html
		new HtmlWebpackPlugin({
		 title: '',
		 minify: {
		 	collapseWhitespace: true
		 },
		 hash: true,
      	 template: './src/index.html',
      	 publicPath: './dist/'
		}),


		// For app CSS
		new ExtractTextPlugin({
			filename: "css/[name].css",
			allChunks: true,
			disable: false 	
		}),

		// Global providers
		new webpack.ProvidePlugin({
		   	$: "jquery",
		    jQuery: "jquery",
		    "window.jQuery": "jquery"
		    //angular: "angular"
		})
	]
}