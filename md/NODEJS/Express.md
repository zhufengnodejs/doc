## Express介绍
Express是一个简洁、灵活的node.js Web应用开发框架, 它提供一系列强大的功能，比如：模板解析、静态文件服务、中间件、路由控制等等,并且还可以使用插件或整合其他模块来帮助你创建各种 Web和移动设备应用,是目前最流行的基于Node.js的Web开发框架，并且支持Ejs、jade等多种模板，可以快速地搭建一个具有完整功能的网站。

## 安装
```
$ npm install express
```

## 创建应用
```javascript
var express = require('express');//引入express
var app = express();
app.get('/',function(req,res){
    res.send('Hello World');
});
app.listen(3000);
```

## get请求
根据请求路径来处理客户端发出的GET请求
```javascript
app.get(path,function(request, response));
```
- path为请求的路径
- 第二个参数为处理请求的回调函数，有两个参数分别是request和response，代表请求信息和响应信息

```javascript
var express = require('express');//引入express
var app = express();
app.get('/',function(req,res){
    res.end('welcome to  homepage');
});
app.get('/about',function(req,res){
 res.end('welcome to about page');
})
app.get("*",function(req,res){
 res.end("404");
})
app.listen(3000);
```

## 中间件
中间件就是处理HTTP请求的函数，用来完成各种特定的任务，比如检查用户是否登录以及其他在需要最终将数据发送给用户之前完成的任务。 它最大的特点就是，一个中间件处理完，可以把相应数据再传递给下一个中间件。
### 记录日志的
```javascript
function filter(req,res,next){
 next();
}
app.use('/',filter);
```


