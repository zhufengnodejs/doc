## jquery ajax属性async(同步异步)
在*jquery*的`ajax`中如果我们希望实现同步或者异步时我们可以直接设置`async`属性为`false`和`true`

### 同步执行
当把`async`设为`false`时，这时`ajax`的请求时同步的  
也就是说，这个时候ajax块发出请求后，他会等待在`load()`这个地方，不会去执行`after()`
直到`load()`部分执行完毕。

#### 前台
```javascript
<script src="//cdn.bootcss.com/jquery/2.1.3/jquery.min.js"></script>
<script>
    function load(msg) {
        console.log(msg);
    }
    function after(){
        console.log('after');
    }
    $.ajax({
        url: '/ajax',
        method: 'GET',
        async: false
    }).success(function(result){
        load(result);
    });
    after();
</script>
```

#### 后台
```javascript
var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    if(req.url == '/sync'){
        fs.createReadStream('sync.html').pipe(res);
    }else if(req.url == '/ajax'){
        setTimeout(function(){
            res.end('ok');
        },5000);
    }else{
        res.end('Not Found');
    }
}).listen(8080);
```

### 异步执行
在这里,`async`默认的设置值为`true`，这种情况为异步方式  
就是说当`ajax`发送请求后，在等待*server*端返回的这个过程中，前台会继续执行`ajax`块后面的脚本，直到`server`端返回正确的结果才会去执行`success`
也就是说这时候执行的是两个线程，`ajax`块发出请求后一个线程和`ajax`块后面的脚本(另一个线程)

#### 后台
```javascript
var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    if(req.url == '/sync'){
        fs.createReadStream('sync.html').pipe(res);
    }else if(req.url == '/async'){
        fs.createReadStream('async.html').pipe(res);
    } else if(req.url == '/ajax'){
        setTimeout(function(){
            res.end('ok');
        },5000);
    }else{
        res.end('Not Found');
    }
}).listen(8080);
```

#### 前台
```javascript
<script src="//cdn.bootcss.com/jquery/2.1.3/jquery.min.js"></script>
<script>
    function load(msg) {
        console.log(msg);
    }
    function after(){
        console.log('after');
    }
    $.ajax({
        url: '/ajax',
        method: 'GET',
        async: true
    }).success(function(result){
        load(result);
    });
    after();
</script>
```