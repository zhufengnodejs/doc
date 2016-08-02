## 1. Express介绍
Express是一个简洁、灵活的node.js Web应用开发框架, 它提供一系列强大的功能，比如：模板解析、静态文件服务、中间件、路由控制等等,并且还可以使用插件或整合其他模块来帮助你创建各种 Web和移动设备应用,是目前最流行的基于Node.js的Web开发框架，并且支持Ejs、jade等多种模板，可以快速地搭建一个具有完整功能的网站。

## 2. 使用express
安装
```
$ npm install express
```

获取、引用
通过变量`app`我们就可以调用`express`的各种方法
```
var express = require('express');
var app = express();
app.listen(3000);
```

## 3. get请求
根据请求路径来处理客户端发出的GET请求
语法
```javascript
app.get(path,function(request, response));
```
- 第一个参数`path`为请求的路径
- 第二个参数为处理请求的回调函数，有两个参数分别是
    - request 代表请求信息
    - response 代表响应信息

```javascript
var express = require('express');
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

## 4. all
app.all()函数可以匹配所有的HTTP动词
语法
``` 
app.all(path,function(request, response));
```

示例
```
var express = require('express');//引入express
var app = express();
app.all("*",function(req,res){
 res.send("404");
})
app.listen(3000);
```

## 5. 中间件
中间件就是处理HTTP请求的函数，用来完成各种特定的任务
比如检查用户是否登录、检测用户是否有权限访问等，它的特点是:
- 一个中间件处理完请求和响应可以把相应数据再传递给下一个中间件
- 回调函数的`next`参数,表示接受其他中间件的调用，函数体中的next(),表示将请求数据传递给下一个中间件
- 还可以根据路径来区分进行返回执行不同的中间件

```javascript
var express = require('express');
var app = express();
var path = require('path');
function filter(req,res,next){
 console.log('filter');
 next();
}
app.use('/',filter);

app.listen(3000);
```

## 6. 获取参数
- req.host 返回请求头里取的主机名(不包含端口号)
- req.path 返回请求的URL的路径名

```javascript
app.get('/',function(req,res){
   res.end('欢迎来到首页'+req.host+" "+req.path);
});
```

## 7.获得查询字符串
```javascript
//http://localhost:3000/?a=1&b=2&c=3
app.get('/',function(req,res){
   res.send(req.query);
});
```

## 8. params
req.params可以用来获取请求URL中的参数值

```javascript
app.get('/:id/:name',function(req,res){
   res.send(req.params.id+" "+req.params.name);
});
```

## 9. send
`send`方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据
并在输出响应时会自动进行一些设置，比如HEAD信息、HTTP缓存支持等等。
语法
```javascript
res.send([body|status], [body])
```
示例
1.当参数为一个String时，Content-Type默认设置为"text/html"。
```javascript
res.send('Hello World'); //Hello World
```

2.当参数为Array或Object时，Express会返回一个JSON
```javascript
res.send({ user: 'tobi' }); //{"user":"tobi"}
res.send([1,2,3]); //[1,2,3]
```

3.当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"
```javascript
res.send(200); // OK
res.send(404); // Not Found
res.send(500); // Internal Server Error
```

## 10.模板
在nodejs中使用express框架，它默认的是ejs和jade渲染模板
### 10.1 安装模板
```javascript
npm install ejs
```

### 10.2 使用模板
使用ejs模板
```javascript
//指定渲染模板文件的后缀名为ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
res.render('index');
```

模板使用html后缀
```javascript
// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
app.set('views',path.join(__dirname,'views'));
// 运行ejs模块
app.engine( '.html', require( 'ejs' ).__express ); //__express是ejs模块的一个公共属性，表示要渲染的文件扩展名
```

### 10.3 渲染视图
语法
- 参数`view`就是模板的文件名
- 在渲染模板时`locals`可为其模板传入变量值
- `callback`用来处理返回的渲染后的字符串

```javascript
res.render(view, [locals], callback);
```

### 10.4 模板原理
```javascript
var tmpl = '<h1>{{name}}</h1><h1>{{age}}</h1>';
var data = {name:'zfpx',age:30};
var html= tmpl.replace(/\{\{(\w+)\}\}/g,function(input,group){
    return data[group];
})

console.log(html);
```

## 11. 静态文件服务器
如果要在网页中加载静态文件（css、js、img），就需要另外指定一个存放静态文件的目录，当浏览器发出非HTML文件请求时，服务器端就会到这个目录下去寻找相关文件
```javascript
app.use(express.static(path.join(__dirname,'/')));
```

## 12. 重定向
redirect方法允许网址的重定向，跳转到指定的url并且可以指定status，默认为302方式。
语法
```javascript
res.redirect([status], url);
```

示例
```
res.redirect("http://www.baidu.com");
```

## 13. post请求
post方法 根据请求路径来处理客户端发出的Post请求
语法
```
app.post(path,function(req, res));
```

示例
```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.post('/login',function(req,res){
        console.log(req.body.username);
});
```

## 14. 注册登陆实战





## 资源 
[从express源码中探析其路由机制](https://cnodejs.org/topic/545720506537f4d52c414d87)