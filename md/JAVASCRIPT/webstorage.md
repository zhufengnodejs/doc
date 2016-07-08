

## 1. cookie的缺陷
1. 数据大小：cookie的大小限制在4KB左右
2. 安全性问题：由于在HTTP请求中的cookie是明文传递的带来的安全性问题。
3. 网络负担：我们知道cookie会被附加在每个HTTP请求中，在请求和响应的`header`中都是要被传输的，所以会消耗额外的网络流量。

## 2. WebStorage
WebStorage是HTML新增的本地存储解决方案之一，但并不是为了取代cookie而制定的标准，cookie作为HTTP协议的一部分用来处理客户端和服务器通信是不可或缺的，session正是依赖于实现的客户端状态保持。WebStorage的意图在于解决本来不应该cookie做，却不得不用cookie的本地存储。
### 2.1 localStorage
用于持久化的本地存储，浏览器窗口关闭后，localStorage存储的数据仍然可以被访问。所有浏览器窗口可以共享localStorage的数据，保存的数据永远不会过期，只能手动删除。
### 2.2 sessionStorage
用于本地存储一个会话中的数据，它不是一种持久化的本地存储。这些数据只有在同一个会话中的页面才能访问，当前页面不可以访问新开页面的数据，并且会话结束后数据也随之销毁而无法使用。

## 3. 用法
|方法|描述|
|:----|:----|
|getItem(key)|获取指定key本地存储的值|
|setItem(key, value)|将value值存储到本地的key字段|
|removeItem(key)|删除指定key本地存储的值|
|clear()|删除localStorage中存储的所有数据|
|length|获取存储的键值对的数量|
|key(index)|根据索引获取一个指定位置的键名|
 	
### 3.1 localStorage 
localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用
#### 3.1.1 如何创建和访问 localStorage：
```javascript
    localStorage.lastname="Smith";
    document.write(localStorage.lastname);
```

#### 3.1.2 对用户访问页面的次数进行计数
```javascript
if (localStorage.pagecount)
  {
  localStorage.pagecount=Number(localStorage.pagecount) +1;
  }
else
  {
  localStorage.pagecount=1;
  }
document.write("Visits "+ localStorage.pagecount + " time(s).");

```

### 3.2 sessionStorage 方法
sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。
#### 3.2.1 创建并访问一个 sessionStorage
```javascript
sessionStorage.lastname="Smith";
document.write(sessionStorage.lastname);
```

#### 3.2.2 对用户在当前 session 中访问页面的次数进行计数
```javascript
if (sessionStorage.pagecount)
  {
  sessionStorage.pagecount=Number(sessionStorage.pagecount) +1;
  }
else
  {
  sessionStorage.pagecount=1;
  }
document.write("Visits "+sessionStorage.pagecount+" time(s) this session.");

```

 	
 	
 	
 	

