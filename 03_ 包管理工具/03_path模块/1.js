const path = require('path');

const filepath = 'C://abc//def//ghi.txt';

// 1.可以从一个路径中得到信息
console.log(path.dirname(filepath));//C:\abc\def
console.log(path.basename(filepath));//ghi.txt
console.log(path.extname(filepath));//.txt


// 2. join 将两个路径拼接(注意看是一个.还是..)
const path1 = '/abc/def';
const path2 = '../why/ghi.txt';
console.log(path.join(path1, path2));//..\abc\why\ghi.txt


// 3. resolve 将两个路径拼接，并且会将相对路径转换为绝对路径
console.log(path.resolve(path1, path2));//D:\abc\why\ghi.txt

console.log(path.resolve())//D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\03_ 包管理工具-webpack\03_path模块
//和上面一样
console.log(__dirname)//D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\03_ 包管理工具-webpack\03_path模块







