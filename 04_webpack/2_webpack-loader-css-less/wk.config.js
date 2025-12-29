const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename : 'index.js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        //告诉webpack匹配什么文件
        test: /\.css$/,        
        // use: [//use中多个loader是从后向前,从右向左执行
        //   {loader: "style-loader"},
        //   {loader: "css-loader"}
        // ]
        //简写一:如果loader只有一个
        // loader: 'css-loader'
        //简写二:多个
        use: [
          'style-loader', 
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         'autoprefixer'
          //       ]
          //     }
          //   }
          // }
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader','postcss-loader']
      }
    ]
  }
}