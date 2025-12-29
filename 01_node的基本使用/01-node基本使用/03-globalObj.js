//1,全局对象
//node是golbal不是window
// console.log(global);
// console.log(window);//window is not defined

//2,特殊的全局对象
//_dirname当前文件所在目录(重要)
console.log(__dirname);
//_filename当前目录+文件名
console.log(__filename);
/* 
  D:\Desktop\JavaScript\06node-webpack-git\node
  D:\Desktop\JavaScript\06node-webpack-git\node\03-globalObj.js
*/

//3,模块化是具体学习(重要)
// console.log(module);
// console.log(exports);
// console.log(require);


//4,常见的全局d对象(了解)
// console.log(process);//更多消息可以去官网:https://nodejs.org/docs/latest/api/process.html
// console.log(process.argv);

// 5,定时器
// setInterval(() => {
//   console.log('setInterval');
//   clearInterval();
// },1000);//setInterval 用于定期重复执行一个函数，直到调用 clearInterval 停止它
// //上面停不下来

//正确做法
const interval = setInterval(() => {
  console.log('interval');
},1000);
setTimeout(() => {
  console.log('clearInterval');
  clearInterval(interval);
},2000);


setTimeout(() => {
  console.log('setTimeout');
  clearInterval();
},2000);//setTimeout 用于延迟一次性执行某个函数，执行完一次后就结束，不会再执行

//6,nextTick和setImmediate(这两者谁先执行不一定)
setImmediate(() => {
  console.log('setImmediate');
});
process.nextTick(() => {
  console.log('process.nextTick');
});


//7,为了方便记住,所有window和global可以用globalthis代替
console.log(globalThis);
console.log(globalThis === global);