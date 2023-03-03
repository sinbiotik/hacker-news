const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
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
       options: {                 // ??????
        compilerOptions: {
          noEmit: false,
        },
      },
      },

    ],
  },
};





// npm install --save-dev webpack
// npm install --save-dev webpack-cli

// npm install -D webpack-dev-server           // команды совпадают????

// npm install --save-dev html-webpack-plugin

// npm install --save-dev style-loader
// npm install --save-dev css-loader

// npm install ts-loader --save-dev
