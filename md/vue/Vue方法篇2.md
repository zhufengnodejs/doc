## 1. v-on中的修饰符
### 1.1 阻止冒泡
防止子级事件触发时，触发父级的事件
```javascript
<div id="app">
    <div @click="parent">
        parent
        <div @click.stop="child">child</div>
    </div>
</div>
```
给子父级增加方法
```javascript
var vm = new Vue({
    el:'#app',
    methods:{
        parent: function () {
            console.log('parent');
        },
        child: function () {
            console.log('child');
        }
    }
});
``` 
### 1.2 自己身上触发
```javascript
<div id="app">
    <div @clickt.self="parent">
        parent
        <div @click="child">child</div>
    </div>
</div>
``` 
### 1.3 阻止默认事件
```javascript
<a href="http://www.baidu.com" @click.prevent>goBD</a>
```
### 1.4 按键修饰符
```javascript
<input type="text" @keyup.13="dosome">
  或
<input type="text" @keyup.enter="dosome">
```
内置的修饰符 

键位|修饰符含义|键位|修饰符含义|键位|修饰符含义
-----|----|----|----|----|
enter |按下回车键|up| 按下上键 |left |按下左键 
tab |按下tab键|down| 按下下键 |delete |按下删除键 
esc| 按下ESC键|right|按下右键 |space|按下空格键 

### 1.5 自定义修饰符
```javascript
Vue.directive('on').keyCodes.A = 65;
```
> 增加指令，后期会在指令篇中详细讲解如何自定义指令

## 2.绑定样式
很多时候我们需要的样式，要根据我们的数据进行绑定
### 2.1 通过{{}}方式绑定
```javascript
<div class="{{hello}}">直接取data上对象的属性</div>
```
### 2.2 优雅的绑定方式
```javascript
<div :class="hello">直接取data上对象的属性</div>
```
### 2.3 根据boolean类型增加样式
```javascript
<div v-bind:class="{class1:true,class2:false}">根据数据的boolean类型增加class样式</div>
```
### 2.4 绑定数组
```javascript
<div v-bind:class="[class1,class2]">增加class1,和class2两个样式</div>
```
### 2.5 根据条件绑定样式
```javascript
<div v-bind:class="[class1,isTrue?'class2':'class3']">三元表达式判断</div>
```
### 2.6 数组和对象混用
```javascript
<div v-bind:class="[class1,{class2:isTrue}]">比较常见的增加样式用法</div>
```

> {{className}}和v-bind:class不要混用; class 和v-bind:class可以同时存在

## 3 绑定行内样式
### 3.1 直接绑定
```javascript
<div v-bind:style="{color:'red',background:'yellow'}">行内</div>
```
### 3.2 绑定对象
```javascript
<div v-bind:style="className">行内</div>
data:{
    className:{color:'red'}
}
```
### 3.3 数组方式绑定多组对象
```javascript
<div v-bind:style="[hello,world]">2个样式</div>
data:{
    hello:{color:'red'},
    world:{fontSize:'50px'}
}
```
> 当 v-bind:style 使用需要厂商前缀的 CSS 属性时，如 transform，Vue.js会自动侦测并添加相应的前缀。

## 4.过滤器
### 4.1 内置过滤器
过滤器名字| 作用 |过滤器名字| 作用 
---------|---------
capitalize| 首字母大写 |uppercase| 转换成大写
lowercase| 转换成小写|currency| 货币过滤器
pluralize| 根据数量|json| 对象过滤器
debounce| 延迟数据刷新|limitBy| 限制
filterBy | 过滤器属性|orderBy | 排序过滤器
#### 4.1.1 capitalize
```javascript
{{ 'hello' | capitalize }} //Hello
```
#### 4.1.2 uppercase
```javascript
{{ 'hello' | uppercase }} //HELLO
```
#### 4.1.3 lowercase
```javascript
{{ 'HELLO' | lowercase  }} //hello
```
#### 4.1.4 currency
```javascript
{{123.43123 | currency '￡' 2}}
```

> 传递多个参数的时候,用空格分开


#### 4.1.5 pluralize 
除了1所有的都是复数
```javascript
{{1 | pluralize 'item'}}
```
#### 4.1.6 pluralize 
转换不同数字，最大为9不满足的均为最后一项
```javascript 
{{9 | pluralize 'item' 'item2' 'item3' 'item4' 'item5' 'item6' 'item7' 'item8' 'item9' 'item10' 'item11'}}
```
#### 4.1.7 debounce
延迟事件执行时间
```javascript 
<input @keyup="onKeyup | debounce 500">
```
#### 4.1.8 limitBy
显示几条，从哪条开始显示
```javascript 
<button @click="count+=2">下一页</button>
<div v-for="a in arr | limitBy 2 count">
    {{a}}
</div>
```
#### 4.1.9 filterBy 
在所用数据中过滤
```javascript
<div v-for="item in items | filterBy 'hello'"> 
```
在指定的数据中过滤，节约性能
```javascript
<div v-for="item in items | filterBy 'Tom' in 'name' 'phone'">
```
#### 4.1.10 orderBy
```javascript
<button @click="order = order * -1">排序反</button>
<div v-for="item in items | orderBy 'name' -1">
```
## 5.自定义过滤器
通过Vue.filter()方法注册过滤器
```javascript
Vue.filter('capitalize', function (value,begin,end) {
        return value.slice(0,begin)+value.slice(begin,end).toUpperCase()+value.slice(end);
});
```
将数据写回model,对写入的内容进行过滤，当失去焦点时候继续过滤
```javascript
<input type="text" v-model="hello | write 2">
{{hello}}
```
```javascript 
Vue.filter('write',{
    read: function (value,key) {
        return value[key]
    },
    write: function (val) {
        return val+'zfpx'
    }
});
```
## 6.表单元素
### 6.1 checkbox
获取checkbox值为当前value值,并且数据要为数组类型
```javascript 
<input checked type="checkbox" value="点击" v-model="name" >
<input type="checkbox" value="点击1" v-model="name" >
<input type="checkbox" value="点击2" v-model="name" >
{{name}}
var vm = new Vue({
    el:"#app",
    data:{
       name:[],
    }
})
```
### 6.2 radio
```javascript
<input type="radio" value="first" v-model="radio">
<input type="radio" value="second" v-model="radio">
{{radio}}
``` 
### 6.3 select 
单选时类型为字符串，多选时类型为数组
```javascript
<select v-model="selected" multiple >
    <option value="4" selected>A</option>
    <option value="5">b</option>
    <option value="6">c</option>
</select>
{{selected}}  
```
动态绑定数据
```javascript
<select v-model="name">
  <!--绑定value 到 Vue 实例的一个动态属性-->
  <option v-for="a in ary" :value="a.value">{{a.name}}</option>
</select>
```
### 6.4 表单元素参数特性
#### 6.4.1 lazy
将input改变为change
```javascript
<input type="text" v-model="data" lazy>
{{data}}
```
#### 6.4.2 debounce
延时数据改变时间
```javascript
<input type="text" v-model="data" debounce="3000">
{{data}}
```