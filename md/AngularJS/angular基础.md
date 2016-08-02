## AngularJs MVC
Model:数据模型层  
View:视图层,负责展示  
Controller:控制器，控制逻辑  
## 1.模块化
### 1.1 创建模块
一切从模块开始
```javascript
angular.module(name, [requires], [configFn]);
```
#### 1.1.1 模块的名字
name：字符串类型，代表模块的名称；
#### 1.1.2 依赖的模块
requires：字符串的数组，代表该模块依赖的其他模块列表，如果不依赖其他模块，用空数组即可
#### 1.1.3 模块的配置
configFn：用来对该模块进行一些配置。
## 2.控制器
### 2.1 创建控制器
通过模块创建控制器
```javascript
angular.module('appModule').controller('appCtrl',function(){});
```
### 2.2 使用控制器
```html
<div ng-controller="ctrl"></div>
```
### 2.2 控制器中的$scope
```javascript
angular.module('appModule').controller('appCtrl',function($scope){});
```
> 当前作用域$scope,$scope就是viewModel  

### 2.3 控制器特点
1. controller和DOM平行
2. 控制器可以声明变量和方法
3. 控制器可以嵌套  
4. 子控制器可以继承父控制器

### 2.4 控制器的合理使用
1. 不要复用controller
2. 不要在controller中操作DOM
3. 不要再controller里格式化数据
4. 控制器之间交互是通过事件进行的

## 3.$scope和$rootScope
### 3.1 注入$scope和$rootScope
我们想使用$scope和$rootScope可以注入进来(名字是固定的)
```javascript
angular.module('appModule').controller('appCtrl',function($scope,$rootScope){});
```
### 3.2 初始化方法
通常情况下我们会将$rootScope上的代码提取声明
```javascript
app.run(function($rootScope){});
```
### 3.3 防止代码压缩
通过压缩工具压缩代码后$scope等名称改变报错
```javascript
app.controller('appCtrl',['$scope',function ($s) {
    $s.name = 'zfpx';
}]);
```
```javascript
md.run(["$rootScope",function($s){
    $s.name = 'zfpx';
}]);
```
## 4.$watch和$apply
### 4.1 $watch监听模型上的值
页面代码
```diff
<div ng-controller="appCtrl">
+    <input type="text" ng-model="name">
</div>
```
#### 4.1.1 监听写法1:
```diff
app.controller('appCtrl',['$scope',function ($s) {
+        $s.$watch('name', function (newVal,oldVal) {
+            console.log(newVal,oldVal);
+        })
}]);
```
#### 4.1.2 监听写法2:
```javascript
app.controller('appCtrl',['$scope',function ($s) {
       $s.$watch(function () {
           return $s.name;
       }, function (newVal,oldVal) {
           console.log(newVal,oldVal);
       });
}]);
```
### 4.2 $watch监听方法
页面代码
```javascript
<div ng-controller="appCtrl">
    <input type="text" ng-model="val1">
    +
    <input type="text" ng-model="val2">
    {{total()}}
</div>
```
控制器
```javascript
app.controller('appCtrl',['$scope',function ($s) {
        $s.total = function () {
            return $s.val1+$s.val2;
        };
        $s.$watch($s.total, function (newVal,oldVal) {
            console.log(newVal,oldVal);
        })
}]);
```
### 4.3 $apply刷新视图
#### 4.3.1 原生的方法不会刷新视图
页面代码
```javascript
<div ng-controller="appCtrl">
    {{name}}
</div>
```
控制器
```javascript
app.controller('appCtrl',['$scope',function ($s) {
        $s.name = 1;
        setInterval(function () {
            $s.name++
        },1000)
}]);
```
#### 4.3.2 通知视图刷新
通知方式1:
```
app.controller('appCtrl',['$scope','$interval',function ($s,$interval) {
    $s.name = 1;
    setInterval(function () {
        $s.name++;
        $s.$apply();
    },1000);
}]);
```
通知方式2:
```
app.controller('appCtrl',['$scope','$interval',function ($s,$interval) {
    $s.name = 1;
    setInterval(function () {
        $s.$apply(function(){
            $s.name++;
        });
    },1000);
}]);
```
### 4.4 自带的指令会刷新视图
#### 4.4.1 $timeout
```javascript
app.controller('appCtrl',['$scope','$timeout',function ($s,$timeout) {
    $s.name = 1;
    $timeout(function () {
        $s.name++;
    },1000);
}]);
```
#### 4.4.2 $interval
```javascript
app.controller('appCtrl',['$scope','$interval',function ($s,$interval) {
    $s.name = 1;
    $interval(function () {
        $s.name++;
    },1000);
}]);
```
#### 4.4.3 取消定时器
```javascript
app.controller('appCtrl',['$scope','$interval',function ($s,$interval) {
    $s.name = 1;
    var timer = $interval(function () {
        $s.name++;
        $interval.cancel(timer);
    },1000);
}]);
```
> 已经是angular自带的指令就不要在调用$apply去通知了
  
## 5.ng-href
表达式生效前不要加载该资源,防止空链接
```html
<a ng-href="{{ myHref }}">baidu</a>
```
```javascript
var app = angular.module('appModule',[]);
app.controller('appCtrl',function ($scope,$timeout) {
  $timeout(function () {
      $scope.myHref = 'http://www.baidu.com';
  },20000)
})
```
## 6.ng-src
表达式生效前不引用该资源,防止出现404
```html
<img ng-src="{{imgSrc}}"/>
```
```javascript
var app = angular.module('appModule',[]);
app.controller('appCtrl',function ($scope,$timeout) {
    $timeout(function() {
        $scope.imgSrc = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png';
    }, 1000);
});
```
## 7.控制器间的交互
控制器间的交互是通过事件进行监听的
```html
<div ng-controller="parentCtrl">
    商品总价 <input type="text" ng-model="total">
    <div ng-controller="childCtrl">
        商品的名称 {{product.name}} <br>
        商品的单价 {{product.price}} <br>
        商品的数量 <input type="text" ng-model="product.count" ng-change="total()">
    </div>
</div>
```
子控制器代码
```javascript
app.controller('childCtrl', function ($scope) {
        $scope.product = {name:'火车', price:10,count:1}
});
```
父控制器代码
```javascript
app.controller('parentCtrl', function ($scope) {
        $scope.total = 10;
});
```
### 7.1 $emit发射事件
修改子控制器代码,当数量变化时通知父控制器
```javascript
$scope.product = {name:'火车', price:10,count:1}
+ $scope.total = function () {
+     $scope.$emit('total',$scope.product.price*$scope.product.count);
+ };
```
### 7.2 $on监听子控制器事件
监听子控制器发射的事件
```javascript
$scope.total = 10;
+ $scope.$on('total', function (ev,data) {
+     $scope.total = data;
+ });
```
### 7.3 $broadcast向下广播
当总价改变，向下通知所有子控制器
```javascript
+ $scope.$watch('total', function () {
+     $scope.$broadcast('count',$scope.total);
+ });
```
### 7.4 $broadcast父控制器向下广播
子控制器接收父控制器广播的内容
```javascript
$scope.$on('count', function (ev,data) {
    $scope.product.count = data/$scope.product.price;
});
```
## 8.表单元素
### 8.1 ng-disabled
当表单元素被设置disabled属性为true时元素不可用
```html
<button ng-disabled='true'>点击</button>
```
### 8.2 ng-readonly
当表单元素被设置readonly属性为true时元素仅读
```html
<input type="text" ng-readonly="true" value="仅读"/>
```
### 8.3 select循环数据
用id的值作为value,以name值作为可见参数去数据中遍历
```html
<select ng-model="name" ng-options="t.id as t.name for t in type"></select>
```
定义select中的数据
```javascript
app.controller('appCtrl',['$scope','$interval',function ($s,$interval) {
        $s.type = [{name:'人类',id:1},{name:'动物',id:2},{name:'动物',id:3}]
}]);
```
## 9.模块间的依赖
创建第一个模块
```javascript
var app = angular.module('appModule1',[]);
app.controller('appCtrl', function ($scope,$interval) {
  $scope.name = 20;
});
```
创建第二个模块并依赖第一个模块
```javascript
var app1 = angular.module('appModule2',['appModule1']);
app1.controller('appCtrl', function ($scope,$interval) {
  $scope.name = 1;
});
```
> 被依赖的同名控制器会被覆盖掉

## 10.启动多个模块
将不同的模块应用到不同的div上，达到启动多个ng-app的效果
```html 
<div ng-controller="appCtrl" id="div1">{{name}}</div>
<div ng-controller="appCtrl" id="div2">{{name}}</div>
```
```javascript
var app1 = angular.module('appModule2',[]);
app1.controller('appCtrl', function ($scope,$interval) {
    $scope.name = 'zfpx';
});
var app = angular.module('appModule1',[]);
app.controller('appCtrl', function ($scope,$interval) {
    $scope.name = 'home';
});
angular.bootstrap(div1,['appModule1']);
angular.bootstrap(div2,['appModule2']);
```
 


