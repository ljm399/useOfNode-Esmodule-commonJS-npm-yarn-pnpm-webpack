# node概念

## 作用

-  node是基于v8引擎的javascript运行环境,v8引擎可以解析javascript代码

   但node和浏览器都不只有v8引擎,node也有其他来文件系统读/写,网络io,加密,压缩解压文件

   浏览器一样:还有解析,渲染HTML,css等相关渲染引擎,以及提供支持浏览器操作的API



## node.js架构

### 这里描述一个文件如何通过架构被解析的

 1,文件在应用中被调用

 2,然后v8引擎解析文件,并把文件中的内容通过node.js的API传给LIBUV

 3,LIBUV通过系统调用,把文件内容传给操作系统

 4,操作系统开进程的线程来处理文件内容

 5,然后把处理文件通过上面步骤传回如 fs.read('res.text'调用函数,(res) => {拿到返回值(即5步处理好的文件内容)})





##  node.应用

 1,目前前端开发的库都是以node包的形式管理

 2,npm,yarn,pnpm等包管理工具

 3,以node.js作为web服务器,中间件,代理服务器

 4,大量项目借助node完成前后端渲染的同构应用

 5,资深前端工程师以node来为项目编写脚本,而不是python

 6,企业以使用Electron来开发桌面应用





## 版本知识:

- LTS(long term support)长期支持版本,当前稳定版
- Current(最新版,不稳定)

 

## nvm

- node的版本管理器:nvm,n但这俩个工具不支持windows

  

####   nvm-windows操作:

- nvm list 查看所有已安装的node版本

- nvm install 版本号 安装指定版本的node(nvm install lts,nvm install latest(最新版))

- nvm use 版本号 使用指定版本的node



- - 

