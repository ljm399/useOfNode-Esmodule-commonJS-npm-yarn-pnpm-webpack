//每个文件都有其他模块,但在同一个文件引用(不是导入)则没有其作用域
//solve:IIFE(immediate invoked Function Expression)立刻执行函数使得每个文件都有自己的作用域
(function() {
  let a = 1;
  console.log(a);
}())//记得要加多加个()

//缺点:没名字
//solve
const moduleA = (function() {
  let a = 1;
  console.log(a);

  return {
    a
  }
}())

//缺点:
//1,虽然实现了模块化,但公司里面可能出现命名相同,
//2,同时包裹在匿名函数中,代码多时就混轮
//3,同时必须要记住每个模块返回的对象的命名
//4,没有规范导致很难维护

//sovle:
//当时node是没有模块化,后来ES6才有了模块化
//这之前社区比较流行的做法是AMD和CMD,CommonJS,现在出CommonsJS外,AMD和CMD都是已经淘汰了

//vue之所以可以模块化(不同于index.html),是因为vue-> webapck而webpack打包工具支持commomjs