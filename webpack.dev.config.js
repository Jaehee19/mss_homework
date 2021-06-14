const { merge }  = require('webpack-merge');
const commonConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    publicPath: '/',
    inline: true,
    hot: false,
    disableHostCheck: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html'
    })
  ]
})