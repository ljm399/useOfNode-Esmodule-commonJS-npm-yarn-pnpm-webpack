const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename : 'mjlcode.js',
    path: path.resolve(__dirname, './mjl')
  }
}