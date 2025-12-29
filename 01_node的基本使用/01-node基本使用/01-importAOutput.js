//输出
const num1 = 100
const num2 = 200
console.log(num1 + num2)

//输入
console.log(process.argv)
//node 01-importAOutput.js num1=10 num2=20他会把num1=10 num2=20这两个整个放于argv数组中
//如
const arg1 = process.argv[2]//num1=10而不是10
const arg2 = process.argv[3]//num2=20
console.log(arg1, arg2)
//所有计算和是直接是10而不是num1=10

// console.log(process.argc)//undefined
//在c/c++程序的main函数中argc(argument count)是参数的个数，argv(argument vector向量)是参数的数组
//argv在c,java有专门的数据结构,在node中只是数组,里面存参数信息


