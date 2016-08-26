## Vue介绍
Vue.js是构建数据驱动的 web 界面的库,而不是一个全能框架—它只
聚焦于视图层。特点：

1. 响应的数据绑定
每当修改了数据，DOM 便相应地更新。这样我们应用中的逻辑就
几乎都是直接修改数据了，不必与 DOM 更新搅在一起。这让我
们的代码更容易 撰写、理解与维护。
2. 组件系统
让我们可以用`独立可复用`的小组件来构建大型应用。
3. 特性
简洁 数据驱动 组件化 轻量快速 模块友好。

## 1.Vue的安装
- 使用cdn

```
http://cdn.jsdelivr.net/vue/1.0.26/vue.min.js
```
- 通过npm安装

```
$ npm install vue
```
- 通过bower安装

```
$ bower install vue
```

> Vue.js 不支持 IE8 及其以下版本

## 2.初识Vue
### 2.1 hello world Demo
```javascript
<div class="app">
    {{message}}
</div>
<script src="vue.js"></script>
<script>
    var vm = new Vue({
        el:'.app',
        data:{
            message:'hello world'
        }
    });
</script>
```
### 2.2 双向数据绑定v-model
```diff
<div class="app">
    {{message}}
+   <input type="text" v-model="message">
</div>
```
### 2.3 绑定表达式
#### 2.3.1 {{}}将模型的数据取出显示到页面上
```javascript
{{message?message:'init data'}}
```

> 支持三元表达式

#### 2.3.2 {{*}}首次绑定数据后，不随数据变化(绑定一次)
```javascript
{{*message}}
```

#### 2.3.3 {{{}}}将html类型的数据正常绑定到页面上
```javascript
<div class="app">
    {{{message}}}
</div>
<script>
    var vm = new Vue({
        el:'.app',
        data:{
            message:'<h1>hello world</h1>'
        }
    });
</script>
```
## 2.4 Vue的实例
一个 Vue 实例其实正是一个 MVVM 模式中所描述的 ViewModel
```javascript
var message  = {
    name:'hello'
};
var vm = new Vue({
    el:'.app',
    data:{
        message:message
    }
});
alert(vm.message == message);
```

> 实例上的data属性绑定的数据和原数据指定的是同一内存空间

### 2.4.1 修改数据属性刷新视图
```javascript
var message  = {
    name:'hello'
};
var vm = new Vue({
    el:'.app',
    data:{
        message:message
    }
});
message.name = 1000; //视图刷新
```
注意




1. 不能将原数据指向新的数据，否则不能刷新视图

    ```javascript
    var message  = {
        name:'hello'
    };
    var vm = new Vue({
        el:'.app',
        data:{
            message:message
        }
    });
    message = {name:'hello1'}
    ```
2. 实例创建后不能设置以前没有的属性，无法映射到视图
    ```javascript
    var message  = {
        name:'hello'
    };
    var vm = new Vue({
        el:'.app',
        data:{
            message:message
        }
    });
    message.age = 100;
    ```
> Vue.set/vm.$set可以给对象添加属性

## 2.5 实例上的属性和方法
Vue通过$暴露实例上的属性和方法
### 2.5.1 $el
获取当前绑定的元素
```javascript
vm.$el = document.querySelector('.app');
```

> 不能更改绑定对象

### 2.5.2 $data
获取当前绑定的数据
```javascript
vm.$data = {message:{name:1}}
```

> 更换data对象刷新视图，尽量不去更换

### 2.5.3 $watch
监控模型的变化
```javascript
vm.$watch('message', function (newVal,oldVal) {
    console.log(newVal,oldVal);
});
```
## 3. 生命周期
![vue声明周期](http://cn.vuejs.org/images/lifecycle.png)
### 3.1 属性介绍
方法名 | 用法
----|------
created | 先实例化,在实例化后(检测el)
vm.$mount('#app') | 手动挂载实例
beforeCompile| 开始编译之前
compiled  | 编译完成后
ready | 插入文档后
vm.$destroy() | 手动销毁实例
beforeDestroy | 将要销毁
destroyed | 销毁实例

### 3.2 生命周期的使用
```javascript
var vm = new Vue({
    data:{
        hello:'zfpx'
    },
    created: function () {alert('实例创建完成');},
    beforeCompile: function () {alert('开始编译前')},
    compiled: function () {alert('编译完成')},
    ready: function () {alert('准备好了')},
    beforeDestroy: function () {alert('准备销毁')},
    destroyed: function () {alert("销毁")}
});
vm.$mount('#app');
vm.$destroy();
```

### 3.3 属性的计算
用于计算性属性(默认为属性的get方法)
```javascript
var vm = new Vue({
    data:{
        name:'zfpx'
    },
    computed: {
        hello: function () {
            return this.name+8;
        }
    }
});
vm.$mount('#app');
```
属性的获取和设置
```javascript
var vm = new Vue({
    data:{
        name:'zfpx'
    },
    computed: {
        hello:{
            get: function () {
                return this.name+8;
            },
            set: function (val) {
                this.name = val
            }
        }
    },
});
```

## 4. 相关资源
- [珠峰vue视频(上)](http://yuntv.letv.com/bcloud.html?uu=zna4ig8gbr&vu=10e76ad6dd&auto_play=1&width=640&height=360&lang=zh_CN)
- [ 珠峰vue视频(中)](http://yuntv.letv.com/bcloud.html?uu=zna4ig8gbr&vu=6bf26b2e61&auto_play=1&width=640&height=360&lang=zh_CN)
- 课件 https://wakeupmypig.github.io/jw_blog/html/Vue.js/Vue%E5%85%A5%E9%97%A8.html
- 课上代码  https://github.com/zhufengzhufeng/vue1
- 提问地址 https://github.com/zhufengzhufeng/vue1/issues
