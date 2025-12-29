const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//这个插件webpack5中已经内置了，不需要手动安装
const { DefinePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename : 'index.js',
    path: path.resolve(__dirname, './build'),
    clean: true,
  },
  devServer: {
    hot: true,//默认就是开的
    port: 5000,
    open: true,
    host: "127.0.0.1"
  },
  resolve: {
    extensions: ['.js', ".json", ".vue", ".jsx", ".ts"],
    //起别名配置
    alias: {
      utils: path.resolve(__dirname, "./src/utils")
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
        // type: 'asset/resource',
        // type: "asset/inline"
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 2//这里单位是字节

          }
        },
        generator: {
          //占位符
          //name:指向原来图片的名称
          //ext:图片的扩展名
          //hash: webpack生成的hash值
          filename: 'images/[name]_[hash:8][ext]'

        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          //方式一
          // options: {
          //   plugins: [
          //     "@babel/plugin-transform-arrow-functions",
          //     "@babel/plugin-transform-block-scoping"
          //   ] 
          // }
          
          //方式二
          // options: {
          //   presets: ['@babel/preset-env']
          // }  

          //方式三:提取到单独文件中
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
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '电商项目',
      //自己定义模板
      template: './index.html',
    }),
    new DefinePlugin({
      //注意这里所有值(不单只BASE_URL)的值是eval包裹的字符串,所有要用单引号包裹,不然会当做个变量处理
      BASE_URL: "'../'",
      mjlcode: "'123444code'",
      iam: "'mjlcode'"
    })
  ]
}