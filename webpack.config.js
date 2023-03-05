const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash]${ext}`
const optimization = () => {	
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new CssMinimizerWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config
}

module.exports = {
  mode: "development",
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('.js'),
    clean: true,              
  },
  performance: {
    hints: false,
    maxEntrypointSize: 460000,
    maxAssetSize: 460000
  },
  optimization: optimization(),
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: filename('.css'),
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
     ".js": [".js", ".ts"],
     ".cjs": [".cjs", ".cts"],
     ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      {
				test: /\.css$/,
				use: [{
            loader: MiniCssExtractPlugin.loader,
          },					
          'css-loader',]
			},
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
				test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource'
			},
    ],
  },
  devServer: {
    port: 3000,
    hot: isDev
  },
};





// npm install --save-dev webpack
// npm install --save-dev webpack-cli
// npm install -D webpack-dev-server
// npm install --save-dev html-webpack-plugin
// npm install --save-dev style-loader
// npm install --save-dev css-loader
// npm install ts-loader --save-dev
// npm install css-minimizer-webpack-plugin --save-dev
// npm install --save-dev cross-env
// npm install terser-webpack-plugin --save-dev
// npm i --save lodash



