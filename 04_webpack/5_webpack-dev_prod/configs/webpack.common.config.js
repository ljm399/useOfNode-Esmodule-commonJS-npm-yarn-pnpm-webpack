const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename : 'index.js',
    path: path.resolve(__dirname, '../build'),
    // clean: true,
  },
  resolve: {
    extensions: ['.js', ".json", ".vue", ".jsx", ".ts"],
    //起别名配置
    alias: {
      utils: path.resolve(__dirname, "../src/utils")
    }
  },
  module: {
    rules: [
      {
        //告诉webpack匹配什么文件
        test: /\.css$/,        
        use: ['style-loader','css-loader','postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader','postcss-loader']
      },
      {
        test:/\.(png|jpe?g|svg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 2//这里单位是字节

          }
        },
        generator: {
          filename: 'images/[name]_[hash:8][ext]'

        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '电商项目',
      template: './index.html',
    }),
    new DefinePlugin({
      BASE_URL: "'../'",
      mjlcode: "'123444code'",
      iam: "'mjlcode'"
    })
  ]
}