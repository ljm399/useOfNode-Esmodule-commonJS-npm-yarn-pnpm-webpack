//不用加后缀,因为用webpack打包时,会自动加上后缀.
//这里不是Esmodule或commonjs模块
// import "./component/div_cpn"
import {sum, mjl} from './utils/math'
import {createApp} from 'vue'
import hello from "./vue-demo/hellow"
import "../src/abc/cba/nba/aaa"

console.log(sum(1, 2))
console.log(mjl)

const bar = () => {
  console.log('bar function')
}
bar()
bar()

createApp(hello).mount('#app')
