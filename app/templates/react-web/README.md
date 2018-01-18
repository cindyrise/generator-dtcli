**本项目升级到wepack3最新版，测试通过，快来体验吧！**
#### 使用技术
```text
 热更新、ES6/7、LESS、Router3、redux、webpack3、async／await、前端node服务器，按需加载...
```
#### 客户端渲染
```
本项目是客户端渲染版本
对于 HTTP/1.1 客户端，由 webpack 打包你的应用程序会尤其强大，因为在浏览器发起一个新请求时，
它能够减少应用程序必须等待的时间。对于 HTTP/2，你还可以使用代码拆分(Code Splitting)以及通过 
webpack 打包来实现最佳优化。
```

==========================

#### 安装教程

1、 安装依赖包。
```
npm install 或者cnpm install 或者yarn(推荐)

```

2、运行脚手架。
 ```
 npm start

 ```

3、将会开启8080端口.
```
http://127.0.0.1:8080

```

4、打包发布: 默认打包后的文件统一放到dist文件夹下  

```
npm run build

```

===========================================

#### 项目结构

```text
├── build //webpack各种环境打包配置
├── mock //测试数据，模拟api接口
├── dist //打包后文件存放文件夹
├── src //项目的主要目录
│     │     ├── public //全局公共资源
│     │     │     ├── config //全局应用配置信息
│     │     │     ├── fonts //全局字体目录
│     │     │     ├── img //全局静态图片目录
│     │     │     ├── lib //全局js类库地址
│     │     │     ├── page //应用模版文件存放地址
│     │     │     └──  index.html //开发环境更改初始路由
│     │     └── webapp //webapp目录
│     │     │     ├── api //功能模块对应ajax请求方法
│     │     │     ├── assets //此应用对应的静态资源
│     │     │     ├── config //应用根据系统环境选择不同配置文件
│     │     │     ├── features //应用组件功能集合
│     │     │     ├── utils //提供一些小工具
│     │     │     ├── app.js //应用的入口
│     │     │     └── interceptor.js //发出异步请求拦截器

├── .babelrc //babel相关配置
└── package.json //node相关环境的配置文件


```
==============================================
### 使用技巧
1.新建组件技巧
```
 npm run newCom -- comName [-- d]（组件目录）
```
1.新建页面技巧
```
 运行 npm run newPage -- pageName
 
 你会惊奇得发现，与页面相关得actions,redux,routers,contants,api,type 都自动帮你生成

```
