## 1.Vue中的闪烁问题
### 1.1 v-text绑定属性
```javascript
<div v-text="hello"></div>
```
### 1.2 v-clock解决闪烁
增加样式(隐藏表达式)
```css
[v-cloak]{
    display:none;
}
```
设置需要防止闪烁的dom元素上，在数据绑定后移除v-cloak属性
```javascript
<div v-cloak>{{hello}}</div>
```

## 2.v-if/v-show/v-else
### 2.1 v-if
v-if条件不成立移除dom元素,可以与v-else连用
```javascript
<div v-if="false">hello</div>
<div v-else>world</div>
```

可以使用vue自带的template标签，解决多余标签问题
```javascript
<template v-if="false">hello</template>
<div v-else>world</div>
```
### 2.2 v-show
v-show 是简单的切换元素的 CSS 属性 display,可以与v-else连用
```javascript
<div v-show="false">hello</div>
<div v-else>world</div>
```
> 不能使用template语法

### 2.3 v-if/v-show区别  
一般来说，v‐if 有更高的切换消耗而 v‐show 有更高的初始渲染消耗。因此，如果需要频繁切换 v‐show 较好，如果在运行时条件不大可能改变 v‐if 较好
- v-if当条件成立的时候会将元素加上，不成立，就会移出dom，并且内部的指令不会执行
- v-show只是简单的隐藏和显示  

## 3.v-for循环
基于源数据将元素或模版块重复
### 3.1 遍历对象
```html
<template v-for="(key,value) in data">
    {{$index}}:{{value}}{{key}}:{{$key}} <br>
</template>
```

```javascript 
data:{
    data:{
        name:'zfpx',
        age:7,
    }
}
```
### 3.2 遍历数组
```html
<template v-for="(key,value) in data">
    {{key}}:{{value.name}}:{{value.type}} <br>
</template>
```

```javascript 
data:{
    data:[
        {name:'zfpx',type:['backbone']},
        {name:'zfpx1',type:['jquery','react','angularjs']},
        {name:'zfpx2',type:['nodejs','angularjs','vuejs']},
    ]
}
```
### 3.3 嵌套循环
```javascript
<template v-for="(key,value) in data">
    <template v-for="(childKey,t) in value.type">
        {{key}}{{childKey}}{{t}} <br>
    </template>
</template>
```
### 3.4 遍历数组中相同项
```html 
<template v-for="(key,value) in data" track-by="$index">
    {{value}}
</template>
```

```javascript
var vm = new Vue({
    el:'#app',
    data:{
        data:[
            '苹果','苹果','苹果','苹果'
        ]
    }
}) 
``` 

> 如果没有唯一的键供追踪 尽量使用track-by

## 4.v-bind绑定动态数据
```html
<img v-bind:src="src" alt="">
<a v-bind:href="href">官网</a>
```

```
var vm = new Vue({
    el:'#app',
    data:{
        src:'http://vuejs.org/images/logo.png',
        href:'http://vuejs.org'
    }
})
```
> 我们可以使用:号的方式进行简写,不要使用{{src}}进行设置链接

## 5.v-on绑定事件
```html
<div v-on:click="sayHello">sayHello</div>
<div v-on:click="sayWorld('我',$event)">sayWorld</div>
``` 

```javascript
var vm = new Vue({
    el:'#app',
    data:{
        hello:'hello',
        world:'world'
    },
    methods:{
        sayHello(e){
            console.log(e);//无参数时会传递事件源
            alert(this.hello);
        },
        sayWorld(who,e){
            console.log(e);//有参数时需要手动传递
            alert(who+'的'+this.world);
        }
    }
}); 
``` 
> 我们可以使用@符的方式进行简写

## 6.图书管理案例
![示意图](static/img/books.png)
html的结构
```javascript
<div id="app">
    <div class="container">
        <table class="table table-bordered">
            <tr>
                <td>书的名字</td>
                <td>数的价格</td>
                <td>书的数量</td>
                <td>小计</td>
                <td>操作</td>
            </tr>
            <tr v-for="book in books">
                <td>{{book.name}}</td>
                <td>{{book.price}}</td>
                <td><input type="text" v-model="book.count"></td>
                <td>{{book.price*book.count}}</td>
                <td><button class="btn btn-danger" @click="remove(book)">删除</button></td>
            </tr>
            <tr>
                <td colspan="5">
                    总价格 {{total}}
                </td>
            </tr>
        </table>
        <div class="form-group">
            <label for="bookname" class="control-label">书名</label>
            <input type="text" v-model="list.name" id="bookname" class="form-control">
        </div>
        <div class="form-group">
            <label for="bookprice" class="control-label">价格</label>
            <input type="text" v-model="list.price" id="bookprice" class="form-control">
        </div>
        <div class="form-group">
            <label for="bookcount" class="control-label">数量</label>
            <input type="text" v-model="list.count" id="bookcount" class="form-control">
        </div>
        <button class="btn btn-primary" @click="add">添加</button>
    </div>

</div> 
``` 
js代码
```javascript 
var books = [
    {name:'nodeJs',price:30,count:1},
    {name:'angularJs',price:20,count:2},
    {name:'vueJs',price:40,count:2}
];
var vm = new Vue({
    el:'#app',
    data:{
        books:books,
        list:{name:'',price:'',count:''
        }
    },
    computed:{
        total() {
            var sum = 0;
            this.books.forEach(function (a) {
                sum+=a.price* a.count
            });
            return sum;
        }
    },
    methods: {
        add() {
            this.books.push(this.list);
            this.list = {name:'',price:'',count:''
            }
        },
        remove(book){
            this.books.$remove(book);
        }
    }
});
```





