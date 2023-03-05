const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  // context: path.resolve(__dirname, 'src'),    ?????
  mode: "development",
  entry: {
    main: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    clean: true,              
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // new CopyWebpackPlugin({ 
    //   patterns : [
    //     {
    //       from : path.resolve(__dirname, 'src/img/hacker-news-logo.png'),
    //       to: path.resolve(__dirname, 'dist') 
    //     }, 
    //   ], 
    // }),
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
				use: ["style-loader", "css-loader"]
			},

      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,   // ??????
        loader: "ts-loader",
      },

      {
				test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource'
			},
    ],
  },
  devServer: {
    port: 3000
  },
};





// npm install --save-dev webpack
// npm install --save-dev webpack-cli

// npm install -D webpack-dev-server           

// npm install --save-dev html-webpack-plugin

// npm install --save-dev style-loader
// npm install --save-dev css-loader

// npm install ts-loader --save-dev

// npm i -D copy-webpack-plugin