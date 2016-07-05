#babel
Babel 是一个 JavaScript 的编译工具，它可以把一种形式的 JavaScript 转换成另一种形式的 JavaScript 。
比如它可以把 es6 的 JavaScript 编译成现在主要浏览器使用的 es5 的 JavaScript,另外 Babel 还支持 JSX

#安装babel

```
$ npm install --save-dev babel-cli
$ babel --help
$ npm install babel-core --save-dev
```

#配置babel

```
$ npm install --save-dev babel-preset-es2015
$ touch .babelrc
{
  presets: ["es2015"]
}

```

#命令行中使用babel
```
babel script.js
--source-maps 生成映射文件
--watch 监视文件的变化，然后自动为你编译有变化的文件
--out-file 输出文件
--out-dir 输出目录
```




#资源链接
* https://babeljs.io/
* https://www.npmjs.com/package/babel-core
* https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md