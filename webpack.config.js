const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');


module.exports = {
  entry: {
    main: './src/main.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'devdist'),
    filename: '[name].bundle.js'

  }
  ,
  devServer: {
    writeToDisk: true
  },
  devtool: 'source-map'
};
