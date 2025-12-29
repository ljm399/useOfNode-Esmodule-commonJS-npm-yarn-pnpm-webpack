//不用加后缀,因为用webpack打包时,会自动加上后缀.
//这里不是Esmodule或commonjs模块
import "./component/div_cpn"
import {sum, mjl} from './utils/math'

console.log(sum(1, 2))
console.log(mjl)