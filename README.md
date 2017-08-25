# datek基于Angular2的前端开发工程配置指南

在日常项目开发中，前端的重要性越来越强，使用范围也越来越广。pc端、微信站、m站、甚至hybrid形式的app及windows客户端都可以通过html+css+js技术来完成开发。

由于web技术（html、css、js）灵活性强、结构较松散，在团队开发中往往存在多种代码风格和工程结构，对代码复用和提升团队能力不利。
因此，在前端团队内部建议使用一致的开发模式。本文所推荐的是采用Angular2为framework，boostrap作为css框架，采用vscode作为开发环境，以webpack作为构建工具的方式进行开发。

## 在vscode中执行package.json中的scripts指令

vscode内置了识别npm scripts中的指令的功能，可以快速在IDE环境中直接执行scripts中包含的指令。下面我们来看看怎么让vscode找到scripts中的指令。

使用npm进行依赖管理的前端项目中，在工程根目录下存在一个名为package.json的文件。文件中包含下面一些主要信息：

```js
{
  "name": "苍石前端工程",
  "version": "1.0.0",
  "description": "e-learning前端工程，通过rest与服务器端进行交互。\
    前端采用轻量级风格，包含route、layout和component层，不特别定义service和model，在component层直接进行http请求。",
  "scripts": {
    "start": "webpack-dev-server --inline --hot --progress --port 8080",
    "build": "rimraf dist && webpack --config config/webpack.prod.js --progress --profile --bail"
  },
  ...
}
```
在上例中，scripts片段定义了两个指令。build指令用于构建工程，start指令用于在本地启动一个支持热部署的http server。

要在vscode中执行这两个指令，需要在工程的根目录建一个名为.vscode的目录，并在这个目录下创建一个名为tasks.json的文件。文件中包含下面一些主要信息：

```js
{
	"version": "0.1.0",
	"command": "npm",
	"isShellCommand": true,
	"args": [
		"run"
	],
	"echoCommand": true,
	"tasks": [
		{"taskName": "build"},
		{"taskName": "start"}
	]
}
```
接下来，我们就可以在vscode的IDE环境中直接执行build和start指令了。按下ctrl(CMD)+p，IDE会显示一个输入框，在输入框中输入task+space，
会列出我们定义好的build和start两个task，选中我们需要执行的task，并按回车确认。在vscode的console中就可以看到task执行的情况了。

## 工程结构说明

1. config文件夹
用于存放项目的配置文件，如引用那些库等。

2. doc文件
存放工程相关资料

3. src文件夹
存放项目主要程序 (主模板,项目路由), src文件夹下分多个目录，说明如下:
	* src/assets文件夹
	存放静态文件 (font,img,第三方js库,icon等)
	* src/components文件夹
	存放与业务相关的公用组件
	* src/layout文件夹
	存放与业务无关的公用组件
	* src/pages文件夹
	存放项目页面代码, 一个组件对应三个文件（.ts, .html, .css), 同页面的组件需放在同一个文件夹中，不用页面有各自的文件夹。
4. services文件夹
存放与后台通讯的封装接口

5. package.json
工程配置文件

6. readme.md
工程简介

7. tsconfig.json
ts编译配置文件

8. webpack.config.js
webpack配置文件，主要用于转换ts文件。

