## 异步回调
1. 在需要多个操作的时候，会导致多个回调函数嵌套，导致代码不够直观，就是常说的回调地狱 {:&.fadeIn}
2. 如果几个异步操作之间并没有前后顺序之分（例如不需要前一个请求的结果作为后一个请求的参数时，同样需要等待上一个操作完成再实行下一个操作。

> 为了解决上述的问题，Promise 对象应运而生，在 EMCAScript 2015 当中已经成为标准。

## Promise
一个 Promise 对象可以理解为一次将要执行的操作（常常被用于异步操作），使用了 Promise 对象之后可以用一种链式调用的方式来组织代码，让代码更加直观

## resolve 和 reject
```
function readFile(filename) {
    return new Promise(function (resolve, reject) {
        require('fs').readFile(filename, 'utf8', function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}
```
* resolve 方法可以使 Promise 对象的状态改变成成功，同时传递一个参数用于后续成功后的操作  {:&.fadeIn}
* reject 方法则是将 Promise 对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作

## Promise的三种状态
- Fulfilled 可以理解为成功的状态 {:&.fadeIn}
- Rejected 可以理解为失败的状态
- Pending 既不是 Fulfilld 也不是 Rejected 的状态，可以理解为 Promise 对象实例创建时候的初始状态

> then 方法就是根据 Promise 对象的状态来确定执行的操作，resolve 时执行第一个函数（onFulfilled），reject 时执行第二个函数（onRejected）

## 链式调用
`then`可以使用链式调用的写法原因在于，每一次执行该方法时总是会返回一个`Promise`对象
```
readFile('1.txt').then(function (data) {
    console.log(data);
    return data;
}).then(function (data) {
    console.log(data);
    return readFile(data);
}).then(function (data) {
    console.log(data);
}).cat;
```

## Promise.all
Promise.all 可以接收一个元素为 Promise 对象的数组作为参数，当这个数组里面所有的 Promise 对象都变为 resolve 时，该方法才会返回。
```
Promise.all([p1, p2]).then(function (result) {
    console.log(result); // [ '2.txt', '2' ]
});
```
>  不管两个promise谁先完成，Promise.all 方法会按照数组里面的顺序将结果返回

## Promise.race
Promise.race可以接收一个元素为 Promise 对象的数组作为参数，只要该数组中的 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回。
```
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // [ '2.txt', '2' ]
});
```

## q的用法
```
var deferred = Q.defer();
  setTimeout(function() {
     deferred.resolve();
  }, 5000);
  return deferred.promise;
```






