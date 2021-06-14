const path = require('path');
const { merge }  = require('webpack-merge');
const commonConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = () => merge(commonConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  optimization:{
    splitChunks:{
      name: "vendor",
      minChunks: Infinity
    },
    minimize:true,
    minimizer:[
      new TerserWebpackPlugin({
        terserOptions:{
          warnings: false,
          output: {
            comments: false
          },
          ie8: false
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.html'
    })
  ]
})