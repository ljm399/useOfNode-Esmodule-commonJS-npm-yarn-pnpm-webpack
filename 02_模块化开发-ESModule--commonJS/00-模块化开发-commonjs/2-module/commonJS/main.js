//方式一
const util = require('./util.js')
console.log(util.UTIL_name);
console.log(util.formatCount());
console.log(util.formatData());

//方式二:解构
console.log('=========方式二===============');
const { UTIL_name, formatCount, formatData } = require('./util.js')
console.log(UTIL_name);
console.log(formatCount());
console.log(formatData());
