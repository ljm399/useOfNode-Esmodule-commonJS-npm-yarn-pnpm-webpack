const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const commonconfig = require('./webpack.common.config');

module.exports = merge(commonconfig, {
  mode: 'production',
  output: {
    // clean: true
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})