const { merge } = require('webpack-merge');
const commonconfig = require('./webpack.common.config')
module.exports = merge(commonconfig, {
  mode: 'development',
  devServer: {
    hot: true,
    compress: true
  }
})