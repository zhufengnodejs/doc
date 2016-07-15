## 1. 实时通信
### 1.1 轮询
浏览器周期性的发出请求，如果服务器没有新数据需要发送就返回以空响应,这种方法问题很大,很快就被淘汰  
1. 大量无意义的请求造成网络压力
2. 请求周期的限制不能及时地获得最新数据

```javascript
var xhr = new XMLHttpRequest();
  setInterval(function(){
      xhr.open('GET','/data',true);
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 && xhr.status == 200){
            document.querySelector('#content').innerHTML = xhr.responseText;
          }
      }
      xhr.send();
  },1000);
```

### 1.2 长轮询
长轮询是在打开一条连接以后保持连接,等待服务器推送来数据再关闭连接
然后浏览器再发出新的请求，这能更好地管理请求数量，也能及时得到更新后的数据
```javascript
function send() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/data', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.querySelector('#content').innerHTML = xhr.responseText;
                send();
            }
        }
        xhr.send();
    }

send();
```

## 2. WebSocket
WebSocket是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术   
使用WebSocket，浏览器和服务器只需要要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道，两者之间就直接可以数据互相传送
- 节省资源：互相沟通的Header是很小的-大概只有 2 Bytes。
- 推送信息：不需要客户端请求,服务器可以主动传送数据给客户端

## 4. 对比
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/websocket.png" class="img-responsive">

## 5. WebSocket实现
### 5.1 WebSocket服务器
```javascript
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});

//监听客户端的请求
wss.on('connection', function (ws) {
    //监听客户端的消息
    ws.on('message', function(message) {
        console.log('received: %s', message);
        //向客户端发消息
        ws.send('server hello');
    });
});
```

### 5.2 Node客户端
```javascript
var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080/');

ws.on('open', function open() {
    ws.send('hello world!');
});

ws.on('message', function(data, flags) {
    console.log(data);
    console.log('message ',data);
});
```

### 5.3 网页客户端
```
//创建socket对象
    var socket = new WebSocket('ws://localhost:8080/');
    //监听连接事件
    socket.onopen = function(){
        //向服务器发送消息
        socket.send('hello server');
    }
    //监听服务器端消息
    socket.onmessage = function(event){
        //输出服务器返回的消息
        console.log(event.data);
    }
```