## AngularJs核心特性
1. MVVM 双向数据绑定(Model-View-ViewModel)model变化，view也变化
2. 模版 将html文件解析到DOM中
3. 模块化与依赖注入
4. 指令可以用来创建自定义的标签，也可以用来装饰元素或者操作DOM属性。  

## 1.AngularJs的使用
### 1.1 安装angular
#### 1.1.1 通过npm进行下载
```javascript
$ npm install angular
```
#### 1.1.2 使用bower下载
```javascript
$ bower install angular
```
### 1.2 引入angularjs
```html
<script src="node_modules/angular/angular.js"></script>
```
### 1.3 安装扩展程序ng-inspector
### 1.4 启动angular程序
在指定标签上添加跟作用域
```javascript
ng-app(rootScope->ngapp)
```  

> ng-app 指令在网页加载完毕时会自动引导(自动初始化)应用程序

## 2.初识ng-model
在ng-app下的内容都归angular所管理
### 2.1 数据模型的挂载
将ng-model生成数据模型然后挂在当前作用域上
```html
<input type="text" ng-model="name">
```
### 2.2 实现model和view的双向绑定
变量和视图进行绑定，取出模型上的数据
```html
{{name}}
```

## 3.表达式
### 3.1 表达式的组成
两个花括号{{}}组成，可以把数据绑定到HTML
```html
{{name}}
```
### 3.2 表达式结果
用来做表达式结果
```html
{{1+2*3}}
```
### 3.3 三元表达式
```javascript
{{name?name:'hello zfpx'}}
```

## 4.数据绑定
### 4.1 ng-bind
显示数据等同于{{}} 
```javascript
<div ng-bind="name"></div>
```
> 防止用户看到被渲染之前的样子 

### 4.2 ng-non-bindable
取消绑定数据
```html
<div ng-non-bindable>{{name}}</div>
```
### 4.3 ng-bind-template
绑定多个模板
```html
<div ng-bind-template="{{name}} {{age}}"></div>
``` 
   
> 解决 ng-bind 中只能绑定一个的问题 

## 5.初始化数据
### 5.1 ng-init
ng-init在当前作用域下定义初始值。
```javascript
<div ng-init="name='zfpx';age=7"></div>
```
> 多组值用分号;隔开  

### 5.2 赋值对象和数组
```javascript
<div ng-init="name=[{age:7},{age:8}]"></div>
```

> 通常情况下,不使用 ng-init。使用一个控制器或模块来代替它。

## 6.data-指令 
data-ng-init 与 ng-init 等价
```html
<div data-ng-init="name=[{age:7},{age:8}]"></div>
<div ng-init="name=[{age:7},{age:8}]"></div>
```

## 7.ng-repeat遍历
### 7.1 遍历对象
初始化对象
```html
<div ng-init="phones={age:7,sex:2,name:'zfpx'}">
</div>
```
遍历对象
```diff
<div ng-init="phones={age:7,sex:2,name:'zfpx'}">
+    <div ng-repeat="(key,value) in phones">
+        {{key}}{{value}}
+    </div>
</div>
```

### 7.2 遍历数组
初始化数组
```javascript
<div ng-init="phones=[{name:'苹果',age:7},{name:'华为',age:7},{name:'htc',age:7}]">
</div>
```

遍历数组
```javascript
<div ng-repeat="(key,phone) in phones">
    {{key}}{{phone.name}}
</div>
```

### 7.3 嵌套循环数组
内部获取外部索引  
方法1：
```html
<div ng-init="phones=[{name:'苹果',type:['白色','金色','玫瑰金']},{name:'华为',type:['白色','金色']},{name:'htc',type:['玫瑰金']}]">
    <div ng-repeat="(key,phone) in phones">
        <div ng-repeat="(index,type) in phone.type">
            {{key}}{{index}}{{type}}
        </div>
    </div>
</div>
```
方法2：
```html
<div ng-init="phones=[{name:'苹果',type:['白色','金色','玫瑰金']},{name:'华为',type:['白色','金色']},{name:'htc',type:['玫瑰金']}]">
    <div ng-repeat="phone in phones" ng-init="key=$index">
        <div ng-repeat="type in phone.type">
            {{key}}{{$index}}{{type}}
        </div>
    </div>
</div>
```

> 遍历数组需注意track by $index 

```html
<div ng-init="phones=['苹果','苹果','苹果']">
    <div ng-repeat="phone in phones  track by $index" >
        {{phone}}
    </div>
</div>
```
## 8.ng-click
显示隐藏/效果
### 8.1 增加样式
```css
<style>
    .block{
        display: block;
    }
    .none{
        display: none;
    }
</style>
```
### 8.2 增加ng-click
```html
<div ng-init="flag=false" ng-click="flag=!flag">
    {{!flag?'显示':'隐藏'}}
</div>
<div class=" {{flag?'block':'none'}}">content</div>
```
## 9.ng-hide/ng-show/ng-if
### 9.1 ng-hide/ng-show
简单的操作css样式
```html
<div ng-init="flag=false" ng-click="flag=!flag">
    {{!flag?'显示':'隐藏'}}
</div>
<div ng-show="flag">content</div>
```
### 9.2 ng-if
ng-if为false时候内部节点消失，内部指令不执行
```html
<div ng-init="flag=false" ng-click="flag=!flag">
    {{!flag?'显示':'隐藏'}}
</div>
<div ng-if="flag">content</div>
```
> ng-if不停的修改dom性能消耗较大,使用ng-show,ng-if与ng-repeat经常连用

### 9.3 ng-switch
```html
<input type="text" ng-model="sex">
<div ng-switch="sex">
    <p ng-switch-when="boy">boy</p>
    <p ng-switch-when="girl">girl</p>
    <p ng-switch-default>no person</p>
</div>
```

### 9.4增加class值
#### 9.4.1 写法1:
```html
<div ng-class ="{true:'red',false:'yellow'}[isActive]"></div>
```
#### 9.4.2 写法2:
```html
<div ng-class ="{'selected':isSelected}"></div>
```
#### 9.4.3 行内样式
```html
<div ng-style ="{color:'red'}"></div>
```
#### 9.4.4 class使用场景
bootstrap导航切换
```javascript
<ul class="nav nav-tabs">
  <li role="presentation" ng-click="click='Home'" ng-class="{active:click=='Home'}"><a href="">Home</a></li>
  <li role="presentation" ng-click="click='Profile'" ng-class="{active:click=='Profile'}"><a href="">Profile</a></li>
  <li role="presentation" ng-click="click='Messages'" ng-class="{active:click=='Messages'}"><a href="">Messages</a></li>
</ul>

```
## 10.引入页面
加载外部模板
```javascript
<div ng-include="'temp.html'"></div>
```
## 11.内置过滤器
### 11.1 currency 
货币过滤器
```html
{{100 | currency:'￡' }}
```
### 11.2 lowercase & uppercase
大小写转换过滤器
```html
{{'abc' | uppercase }}
{{'ABC' | lowercase }}
```
### 11.3 limitTo 
限制位数
```html
{{123456 | limitTo:5}}
```
### 11.4 number 
数字过滤器
```html
{{1234.2345|number:2}}
```
### 11.5 json
对象过滤器
```html
<pre>
{{{aa:123,bb:456} | json}}
</pre>
```
### 11.6 date 
日期过滤器
```html
{{1654325689063 | date:'yyyy-MM-dd hh:mm:ss'}}
```
### 11.7 orderBy
排序orderBy:'字段名字':'正反序'(true/false)
```html
<div ng-repeat="p in phones | orderBy:'age':'reverse'">
    {{p.name}}
</div>
```
### 11.8.filter
查询过滤器
#### 11.8.1 查询全部值
```html
<div ng-repeat="p in phones | filter:age">
    {{p.name}}
</div>
```
#### 11.8.2 查询全指定字段
```html
<div ng-repeat="p in phones | filter:{age:query}">">
    {{p.name}}
</div>
```
## 12.angular常用工具方法
### 12.1 uppercase&&lowercase
```javascript
var abc = angular.uppercase("aaaa");
console.log(abc);
var abc = angular.lowercase("aaaa");
console.log(abc);
```
### 12.2 equals
```javascript
var a = angular.equals(NaN,NaN);
console.log(a);
```
### 12.3 extend
```javascript
var obj = {a:123},obj1 = {b:456};
angular.extend(obj,obj1);
console.log(obj);
```
### 12.4 fromJson&&toJson
```javascript
var obj = '{"aa":123,"bb":456}';
var a =angular.fromJson(obj);
a = angular.toJson(a);
console.log(a);
```
### 12.5 copy
```javascript
var obj = {a:123},obj1 = {b:456};
angular.copy(obj,obj1);
console.log(obj1);
```
### 12.6 forEach
```javascript
var arr = [{name:1},{name:2},{name:3}];
var result = [];
angular.forEach(arr,function (item) {
    this.push(item.name);
},result);
```
### 12.7 bind
```javascript
var obj = {name:2};
function arr(who){console.log(this.name+who);}
var newArr =  angular.bind(obj,arr,1);
newArr();
```
