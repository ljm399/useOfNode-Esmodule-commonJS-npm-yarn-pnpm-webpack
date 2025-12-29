//不用加后缀,因为用webpack打包时,会自动加上后缀.
//这里不是Esmodule或commonjs模块
import "./component/div_cpn"
import {sum, mjl} from './utils/math'
import {createApp} from 'vue'
import hello from "./vue-demo/hellow"
import "../src/abc/cba/nba/aaa"
import "./utils/HMR"

console.log(sum(1, 2))
console.log(mjl)

const bar = () => {
  console.log('bar function')
}
bar()
bar()

createApp(hello).mount('#app')

console.log(iam)
console.log(mjlcode)
console.log("当前开发模式", process.env.NODE_ENV)

// 指定一个模块需要HMR热更新
if(module.hot) {
  module.hot.accept("./utils/HMR.js", ()=> {
    console.log("HMR更新了模块内容")
  })
}

