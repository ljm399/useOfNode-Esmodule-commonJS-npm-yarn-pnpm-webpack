//为什么是commonjs,因为你有时用的是node加载,而webpack运行在node的环境下
//node可以加载ESModule,但要设置下东西,很麻烦

module.exports = {
  plugins: [
    'postcss-preset-env'
    // 'autoprefixer'
  ] 
}