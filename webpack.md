title: webpack
theme: blue

[slide]

# Webpack简介
Webpack是一款用户<span class="text-danger">打包</span>前端模块的工具。
- 可以实现模块加载和打包 {:&.moveIn}
- 支持各种模块化AMD/CMD/CommonJS等的写法
- 可以处理依赖关系，解析出模块间的依赖，将各种资源打包成模块来使用,如css less 图片等  
 
[webpack官网](http://webpack.github.io)

<img src="http://7xjf2l.com1.z0.glb.clouddn.com/webpack.png" class="img-responsive">

[slide]
#环境准备
- 安装nodejs
	https://nodejs.org/en/
- npm
	NodeJS包管理和分发工具
	http://npmjs.org/
- npm 常用命令
```
    npm init 创建项目配置文件`package.json`文件
	npm install <modulename> -g/--save-dev/--save  安装模块/全局安装/保存到开发依赖/保存到生产依赖
	npm update <modulename>  更新模块
	npm uninstall <modulename> 卸载模块
```

[slide]
# Webpack的安装
- 初始化`package.json` {:&.moveIn}
- 全局安装
  安装后就在命令行中使用 webpack命令

  ```
    npm install -g webpack
  ```
- 本地安装
  安装到本地的node_modules文件夹并将依赖关系写入`package.json`中的开发依赖中
  ```
    npm install webpack --save-dev
  ```

[slide]
#在命令行中使用命令
- webpack命令 {:&.moveIn}

  ```
    webpack index.js bundle.js
  ```
  index.js 打包的入口文件路径
  bundle.js 打包后的输出文件名

[slide]
# webpack其它命令

- webpack <span class="text-danger">开发环境</span>下编译 {:&.moveIn}
- webpack -p <span class="text-danger">生产环境</span>下编译，会压缩生成后的文件
- webpack -w 开发环境下持续的<span class="text-danger">监听文件</span>变动来进行编译
- webpack -d 生成map映射文件,会在控制台的Sources页签中出现存放打包前原始文件的webpack://目录，可以打断点，帮助<span class="text-danger">调试</span>
    ```webpack index.js bundle.js -d'``
- webpack --progress 显示构建<span class="text-danger">百分比进度</span>
- webpack --display-error-details 显示打包过程中的<span class="text-danger">出错信息</span>(比如 webpack寻找模块的过程)
- webpack --profile 输出性能数据，可以看到每一步的<span class="text-danger">耗时</span>


[slide]
# 使用webpack配置文件

[slide]
# loader
各种不同文件类型的资源,webpack有对应的模块`loader`
- 安装加载器
````
		npm install xxx-loader --save-dev
```
   > 例如：`css-loader`和`style-loader`用来处理css文件和样式
- 加载器列表
		http://webpack.github.io/docs/using-loaders.html

[slide]
# devServer
它是一个Web服务器,可以预览项目，并且当修改源码后可以实时刷新页面

[slide]
# resolve解析
指定`extension`之后可以不用在`require`或是`import`的时候加文件扩展名,会依次尝试添加扩展名进行匹配

[slide]
# 解析less样式文件

[slide]
# 资源文件的加载
实现CSS、图标、图片等资源文件加载 

[slide]
# 源码修改后自动刷新

[slide]
# 自动产出html

[slide]
# 自动打开浏览器

[slide]
# 区分环境标识

[slide]
# 暴露全局对象

[slide]
# css文件单独加载

[slide]
# 提取公共的代码

[slide]
# 添加哈希值

[slide]
# 压缩资源