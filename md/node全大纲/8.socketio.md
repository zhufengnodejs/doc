## 1. socket.io
Socket.IO是一个WebSocket库，包括了客户端的js和服务器端的nodejs，它的目标是构建可以在不同浏览器和移动设备上使用的实时应用。

## 2. socket.io的特点
- 易用性：socket.io封装了服务端和客户端，使用起来非常简单方便。
- 跨平台：socket.io支持跨平台，这就意味着你有了更多的选择，可以在自己喜欢的平台下开发实时应用。
- 自适应：它会自动根据浏览器从WebSocket、AJAX长轮询、Iframe流等等各种方式中选择最佳的方式来实现网络实时应用，非常方便和人性化，而且支持的浏览器最低达IE5.5。

## 3. 初步使用
### 3.1 安装部署
使用npm安装socket.io
```javascript
$ npm install socket.io
```

### 3.2 启动服务
创建 `app.js` 文件
```javascript
var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('客户端已经连接');
    socket.on('message', function (msg) {
        console.log(msg);
        socket.send('sever:' + msg);
    });
});
server.listen(80);
```

### 3.3 客户端引用
服务端运行后会在根目录动态生成socket.io的客户端js文件 
客户端可以通过固定路径`/socket.io/socket.io.js`添加引用  
客户端加载socket.io文件后会得到一个全局的对象io  
`connect`函数可以接受一个`url`参数，url可以socket服务的http完整地址，也可以是相对路径，如果省略则表示默认连接当前路径
创建index.html文件
```html
<script src="/socket.io/socket.io.js"></script>
 window.onload = function(){
    var socket = io.connect('/');
    //监听与服务器端的连接成功事件
    socket.on('connect',function(){
        console.log('连接成功');
    });
    //监听与服务器端断开连接事件
    socket.on('disconnect',function(){
       console.log('断开连接');
    });
 };
```

### 3.4 发送消息
成功建立连接后，我们可以通过`socket`对象的`send`函数来互相发送消息
修改index.html
```javascript
var socket = io.connect('/');
socket.on('connect',function(){
   //客户端连接成功后发送消息'welcome'
   socket.send('welcome');
});
//客户端收到服务器发过来的消息后触发
socket.on('message',function(message){
   console.log(message);
});
```
修改app.js
```javascript
var io = require('scoket.io');
io.on('connection',function(socket){
  //向客户端发送消息
  socket.send('欢迎光临');
  //接收到客户端发过来的消息时触发
  socket.on('message',function(data){
      console.log(data);
  });
});
```

## 4. 深入分析
### 4.1 send方法
`send`函数只是`emit`的封装
```javascript
function send(){
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
}
```
`emit`函数有两个参数
- 第一个参数是自定义的事件名称,发送方发送什么类型的事件名称,接收方就可以通过对应的事件名称来监听接收
- 第二个参数是要发送的数据

### 4.2 服务端事件
|事件名称|含义|
|:----|:----|
|connection|客户端成功连接到服务器|
|message|接收到客户端发送的消息|
|disconnect|客户端断开连接|
|error|监听错误|

### 4.3 客户端事件
|事件名称|含义|
|:----|:----|
|connect|成功连接到服务器|
|message|接收到服务器发送的消息|
|disconnect|客户端断开连接|
|error|监听错误|

## 5. 划分房间
### 5.1 命名空间
可以在服务器端进入不同的房间,在房间里的广播和通信都不会影响到房间以外的客户端
```javascript
socket.join('chat');//进入chat房间
socket.leave('chat');//离开chat房间
```

### 5.2 广播
全局广播就是所有连接到服务器的客户端都会受到广播的信息
```javascript
io.emit('message','全局广播');
```

也可以只在某个房间内发送广播
```javascript
io.in('room').emit('message','房间内广播');
```

### 5.3 聊天室
app.js
```javascript
var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    var inRoom;
    socket.on('message', function (msg) {
        if(inRoom){
            io.in(inRoom).emit('message',msg);
        }else{
            io.emit('message',msg);
        }

    });
    socket.on('join', function (room) {
        socket.join(room);
        io.emit('message','加入'+room);
        inRoom = room;
    });
});

server.listen(80);
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>聊天室</title>
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">
            <button class="btn btn-primary" onclick="join('chat')">进入聊天房间</button>
            <button class="btn btn-primary" onclick="join('study')">进入学习房间</button>
            <span id="room"></span>
        </div>
        <div class="panel-body">
            <ul class="list-group" id="messages">

            </ul>
        </div>
        <div class="panel-footer">
            <input type="text" class="form-control" id="msg"/>
            <button type="button" onclick="send()" class="btn btn-primary">发言</button>
        </div>
    </div>
</div>
</body>
<script src="/socket.io/socket.io.js"></script>
<script>

    window.onload = function(){
        var socket = io.connect('/');
        socket.on('message',function(msg){
            var messages = document.querySelector('#messages');
            var li = document.createElement('li');
            li.innerHTML = msg;
            li.className = 'list-group-item';
            messages.appendChild(li);
        });

        window.send = function(){
            var input = document.querySelector('#msg');
            socket.send(input.value);
            input.value = '';
        }

        window.join = function(room){
            socket.emit('join',room);
            document.querySelector('#room').innerHTML = room;
        }
    };
</script>
</html>
```

## 扩展阅读
[socket.io](http://socket.io)