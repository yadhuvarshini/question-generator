const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  },
  devServer:{
    static: {
      directory: path.resolve(__dirname,'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  externals: {
    "fs": "require('fs-extra')",
 },
  plugins: 
  [
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: 'src/index.html'
    }),
  ]
};