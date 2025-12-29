# 一. 包管理工具

## npm

### 代码共享方案

1. 放入github官网
   - 缺点:当别人更新,还有去删除然后重新下载
2. 放入npm的registry仓库中



### 配置文件(package.json)

- 创建文件先思考要不要先创建个package文件
  - ![](D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\02_模块化开发-ESModule--commonJS\创建新项目先创建package.png)

- 生成方式
  - 方式一:npm init -y
    - 没有-y则基本信息您可以选择填入
  - 方式二:CLI脚手架(如vue创建),里面自己会帮你创建





#### 相关属性

- 必填能属性:name,verson
  - verson
    - x(主版本号):当你做了不兼容之前API修改,则要改这
    - Y:但兼容之前版本,且更新功能
    - Z:没有新功能,但修复bug
      - x.y.z: 表示明确的版本号(固定不会变)
      - ^x.y.z : x保持不变,y和z永远最新
      - ~x.y.z : x和y不变,z永远最新

- description:描述项目名字
- author
- license:开源协议(如MIT)
- private:是否私有,当为true是npm不能发布
- main:默认是index.js
  - 当你使用axios模块:require('axios'),则他会拿到axios的index.js
  - 调用文件是: node ./src/main.js而不是node main.js
    - 因为配置文件package不是和main同列



- scripts: {"start":"node ./src/main.js"}相当于快捷键
  - npm run start
  - 对与常用的start,test,stop,restart可以省去run,直接npm start

- keywords:[]  -----往数组里面添加你希望用户可以搜索到你的关键字
- dependencies:{..} -------开发和生成都需要
  - npm i axios
  - npm install axios
- devDependencies: {...} --------只在开放需要,生成(production)不需要
  - npm i webpack --save-dev
  - npm i webpack -D
- peerDependencies:{} -------下载的包它所依赖的另一个包--去比如axios的package里面看

- 了解
  - engines -- 用于指定Node和NPM的版本号
  - browsersList------浏览器兼容情况





#### 全局和局部安装

- npm install webpack -g (全局)
  - 原理: 把调用的路径放到window的全局环境变量中
  - 但你导出需要里面的命令行才用
- 局部:npm install webpack
  - 如axios这个包,即使安装全局,里面的功能也不是到处可以



#### npm install作用和原理

- npm install
  - 这样同事就不用照着package里面的Dependencies一一下载
  - 原理
    - ![](D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\02_模块化开发-ESModule--commonJS\npm-install原理.png)



#### package.lock.js文件作用

1. 同事下载包时,回去该文件看有无缓存,无则才去服务器下载
2. 锁定下载包的版本号,以防自己的版本和同事的版本不同而带来项目功能的差异

##### 属性

- name
- verson:你创建项目(比如codecau)的版本
- lockfileVersion: lock文件的版本
- requires:true/false ----------true:使用requires来跟踪模块的依赖关系
- Dependencies : 项目的依赖(如axios)
  - {
    - "axios": {
      - version:固定的版本('1.1.1') -------没有~或^
      - resolve: 记录下载的地址------registry仓库地址
      - integrity:缓存
      - requires/dipendencis--------记录axios的依赖
    - }
  - }



#### 其他命令

- 卸载末个依赖包

  - npm uninstall package
  - npm uninstall package -D

  - npm uninstall package --save-dev



- 强制重新下载依赖-build
  - npm rebuild



- 清除缓存--是把所有依赖包都删了,不是只删没有引用的
  - npm cache clean



- 更多命令--看官网https://docs.npmjs.com/cli-documentation/cli



### yarn

- 历史
  - 为了弥补之前npm的缺陷而来,先在npm已经修复了

- 使用
  - ![](D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\02_模块化开发-ESModule--commonJS\yarn.png)
  - 



### cnpm的使用(镜像服务器)

- 查看npm镜像
  - npm config get registry
  - 原本镜像是: https://registry.npmjs.org/
- 设置镜像(为淘宝镜像)
  - npm config set registry https://registry.npm.taobao.org
- 但要是那条淘宝不维护了又要修改回来太麻烦就有了cnpm
- 给cnpm设置镜像为淘宝那个就行
  - npm install -g cnpm --registry=https://registry.npm.taobao.org
  - cnpm config get registry



# 二. 包管理工具

## 1.1. npx的使用

-  window执行一句命令

  - 先去当前目录找

  - 再去环境变量中找
-  安装node时默认安装了npx
- 当局部和全局都有yard的不同版本
  - 问题:非node_modules不会主动去node_modules下找node,所有返回全局的webpack
  - 解决方式一:
    - ./node_modules/.bin/webpack  --version(一层层去找)	
    - 问题:window系统会把./ 的.当命令,所有要一层层进入如不断cd ./xx直到文件中有webpack
  - 方式二
    - 修改package.json的scripts
      - "webpack": "webpack --version"
      - 这里会优先去node_modules
  - 方式三
    - 使用npx
    - npx webpack --version 或npx webpack -v
    - 原理和方式二一样




## 1.2. 在npm发布自己的包

- 注册账号: npmjs.com
- 在命令行登录:
  - npm login
- 配置package.json
- 发布
  - npm publish
- 更新包
  - 更新功能
  - 修改package.json版本号
  - npm publish
  - 已经导入的包更新
    - 再来一次npm i 包名

- 删除
  - npm unpublish
- 让发布的包过期	
  - npm deprecate


#### 使用包

- 由于导入时ESmodule

  - 所以要么把包改为commonjs,然后用node执行

  - 要么用浏览器

    - ​	src>index.js

      - ```
        // 使用webpack打包
        // import {mjl, sum} from '01_mjlcode_utils'
        
        
        // 不使用webpack打包
        import { sum, mjl } from '../node_modules/01_mjlcode_utils/sum.js';
        //必须这样因为他不会去node_modules下找,而是在index.html当前文件夹下找(按window系统查找文件那样)
        
        console.log(mjl)
        console.log(sum(3, 2),mjl)
        ```

    - index.html

      - ```
          <!-- 不使用webpack打包 -->
          <script src="./src/index.js" type="module"></script>
          
          <!-- 使用webpack打包 -->
          <!-- <script src="./dist/main.js" ></script> -->
        ```







- node可以执行ESModule代码,但要做一些配置很麻烦
  - 所以node执行commonjs代码







## 1.3. pnpm

![](D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\03_ 包管理工具\pnpm.png)

### 1.3.1. 对pnpm介绍

- 最大优势
  - 不同项目的依赖包都指向同一个磁盘空间
  - 最大的节省了磁盘空间

- 第二个作用
  - 不可以引用非自己安装的包如axios
  - ![](D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\03_ 包管理工具\不能引用非自己安装的依赖包.png)
  - 这里下载了bar包,不可以在引用bar的依赖包如foo


​	





### 1.3.2. 硬链接/软连接/文件拷贝

![](D:\Desktop\JavaScript\06_node-Esmodule-webpack-git\03_ 包管理工具\硬链接软连接.png)

- 注意软连接的文件就是快捷方式,点击它就会跳到目的文件,不可以编辑



### 1.3.3. pnpm的node_modules是非扁平化的结构

- 即上面的优势二

- 让自己的项目不会随便引入非自己安装的依赖
- 软连接和硬链接结合



### 1.3.4. pnpm的安装和使用

- pnpm install
- pnpm add pkg
- pnpm remove pkg
- pnpm build



### 1.3.5. store的存储

- pnpm store path(获取pnpm存储的地址--里面还是通过算法得出磁盘位置的索引)
- pnpm store prune(清理未引用的内存,npm是全部都删了无论是否引用)







