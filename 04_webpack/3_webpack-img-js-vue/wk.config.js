const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
  entry: './src/main.js',
  output: {
    filename : 'index.js',
    path: path.resolve(__dirname, './build')
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
    new VueLoaderPlugin()
  ]
}