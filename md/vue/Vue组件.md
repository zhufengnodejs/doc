## 1.Vue中组件
使用方法Vue.component(tag, constructor)
### 1.1 创建hello world组件
```javascript
<hello></hello>
```

```javascript
var hello = Vue.extend({
  template:'<div>hello world</div>'
})
Vue.component('hello',hello);
var vm = new Vue({
  el:"#app"
});
```
> 要先注册组件再创造实例

### 1.2 创建父子级组件
在父组件内注册子组件
```javascript
var Child = Vue.extend({
    template:'child'
});
var Parent = Vue.extend({
    template: 'Parent <my-component></my-component>',
    components: {
        //<my-component> 只能用在父组件模板内
        'my-component': Child
    }
});
Vue.component('parent',Parent);
``` 
直接注册组件，语法糖形式
```
Vue.component('parent',{
    template:'<div>Hello</div><child></child>',
    components: {
        'child': {
            template:'<div>world</div>'
        }
    }
});
```
### 1.3 模板的is特性
防止元素内部的自定义标签被提到元素的外面，导致渲染不正确。
```javascript
<table>
  <tr is="my-component"></tr>
</table>
```

## 2.组件传递数据
先从属性传递到props,在从props取出来绑定到组件里
## 2.1 传递静态属性
```javascript
Vue.component('parent',{
    template:'<span>Hello</span><child></child>{{msg}}',
    props:['msg'], //此时获得的为字符串1
    components:{
        child:{
            template:'<span>world</span>'
        }
    }
});
var vm = new Vue({
    el:'#app'
})
```
## 2.2 传递动态属性
```javascript
<parent :msg = 1></parent><!--此时传递的是数字类型,并且可以获取data上的属性-->
```
> 父子组件不能通用属性 属性采用-线,props采用驼峰命名