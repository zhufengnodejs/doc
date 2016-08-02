## 1.ng-route路由
angular-route是angular自带的路由模块
### 1.1 安装路由
```javascript
$ npm install angular-route
```
### 1.2 依赖模块
让当前模块依赖于ngRoute
```javascript
var app = angular.module('appModule',['ngRoute']);
```
### 1.3 配置路由
```javascript
app.config(function ($routeProvider) {
    $routeProvider.when('/home',{
        template:'<div>首页 {{title}}</div>',
        controller: function ($scope) {
            $scope.title = 'hello '
        }
    }).when('/user',{
        template:'<div>用户</div>',
        controller: function ($scope) {
            $scope.title = 'hello '
        }
    }).when('/contact',{
        template:'<div>zfpx</div>',
        controller: function ($scope) {
            $scope.title = 'hello '
        }
    }).when('/settings',{
        template:'<div>设置页面</div>',
    }).otherwise('/home');
})
```
### 1.4 创建路由链接
```html
<a href="#/home">首页</a>
<a href="#/user">用户管理</a>
<a href="#/contact">联系</a>
<a href="#/settings">设置</a>
<div ng-view></div>
```
### 1.5 监控路由变化
```
app.run(function ($rootScope,$location) {
    $rootScope.flag = false;
    $rootScope.$on('$routeChangeStart', function (event,toState,fromState) {
        if(toState.$$route.originalPath=='/settings'){
            if(!$rootScope.flag){
                $location.path('user');
                alert('没有权限自动跳转到用户页面')
                event.preventDefault();
            }
        }
    })
});
```
### 1.6 获取路由参数
增加带参数跳转的按钮
```javascript
$routeProvider.when('/home',{
    template:'<div>首页 {{title}}</div><button ng-click="go()"></button>',
    controller: function ($scope,$location) {
        $scope.title = 'hello ';
        $scope.go = function () {
            $location.path('contact/100');
        }
    }
})
```
增加路由
```
.when('/contact/:id',{
        template:'<div>zfpx{{count}}</div>',
        controller: function ($scope,$routeParams) {
            $scope.title = 'hello '
            $scope.count = $routeParams.id;
        }
})
```
## 2.angular-ui-route
```javascript
$ npm install angular-ui-router
```
### 2.1 配置路由
```javascript
var app = angular.module('appModule',['ui.router']);
app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('home',{
        url:'/home',
        template:'<div>home</div>',
    }).state('user',{
        url:'/user',
        template:'<div>user</div>',
    }).state('contact',{
        url:'/contact',
        template:'<div>contact</div>',
    })
    $urlRouterProvider.otherwise('home');
})
```
### 2.2 创建路由连接
```html
<a ui-sref="home">首页</a>
<a ui-sref="user">用户 </a>
<a ui-sref="contact">联系</a>
<div ui-view></div>
```
### 2.3 监控路由变化
```javascript
$rootScope.$on('$stateChangeStart', function (event,toState,toParams,fromState,fromParams) {
    if(toState.url=='/settings'){
        if(toState.needLogin){
            $state.go('user');
            event.preventDefault();
        }
    }
})
```
增加路由
```javascript
.state('settings',{
    url:'/settings',
    needLogin:true,
    template:'<div>settings</div>',
})
```
#### 2.3.1 监听不存在的路由
```javascript
$rootScope.$on('$stateNotFound', function (event) {
    alert('没有这样的路由');
    $state.go('user');
    event.preventDefault();
})
```
#### 2.3.2 切换出错
```javascript
 $rootScope.$on('$stateChangeError', function (event) {
    alert('没有此模板');
    $state.go('user');
})
```
#### 2.3.3 进入路由时
```javascript
onEnter: function () {
    alert('进入');
},
``` 
#### 2.3.4 退出路由时
```javascript
onExit: function () {
    alert('退出');
}
```
#### 2.3.4 设置服务
```javascript
resolve: {
    add:function (){
        return {name:1}
    },
    promise: function ($q,$timeout) {
        var defer = $q.defer();
        $timeout(function () {
            defer.resolve({age:8});
        },3000)
        return defer.promise;
    }
}
```
在控制器中使用服务
```javascript
template:'<div>user {{name}}{{age}}</div>',
controller: function ($scope,add,promise) {
    $scope.name = add.name
    $scope.age = promise.age
},
```
### 2.4 路由嵌套
设置子路由
```javascript
$stateProvider.state('home',{
    url:'/home',
    templateUrl:'1.html',
}).state('home.user',{
    url:'/user',
    template:'<div>Hello</div>',
}).state('home.profile',{
    url:'/profile',
    template:'<div>world</div>',
}).state('settings',{
    url:'/settings',
    template:'<div>settings</div>',
});
$urlRouterProvider.otherwise('home');
```
一级路由
```
<a ui-sref="home">首页</a>
<a ui-sref="settings">设置</a>
<hr>
<div ui-view></div>
```
1.html中设置二级路由
```html
<a ui-sref="home.user">子内容</a>
<a ui-sref="home.profile">子内容</a>
<div ui-view></div>
```
### 2.5 配置多视图
```javascript 
views:{
    '':{
        templateUrl:'1..html',
    },
    'tmp1@home':{
        template:'<div>tmpl1</div>'
    },
    'tmp2@home':{
        template:'<div>tmpl2</div>'
    },
}
```
配置模板
```javascript
<a ui-sref="home.user">子内容</a>
<a ui-sref="home.profile">子内容</a>
<div ui-view></div>
<div ui-view="tmp1"></div>
<div ui-view="tmp2"></div>
```

### 3.路由demo
#### 3.1 配置根view
```
<div ui-view></div>
```
#### 3.2 引入样式
```css
<link href="css/ionic.css" rel="stylesheet">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
#### 3.3 配置路由
```
var app = angular.module('appModule',['ui.router']);
app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tab', {
        url:'/tab',
        views:{
            '':{
                templateUrl:'1.html'
            }
        }
    }).state('tab.home', {
        url:'/home',
        views:{
            '':{
                templateUrl:'tmpl/home.html'
            }
        }
    }).state('tab.car', {
        url:'/car',
        views:{
            '':{
                templateUrl:'tmpl/list.html'
            }
        }
    }).state('tab.search', {
        url:'/search',
        views:{
            '':{
                templateUrl:'tmpl/search.html'
            }
        }
    });
    $urlRouterProvider.otherwise('tab/home')
})
```
#### 3.4 设置子路由
配置index.html
```html
<div ui-view=""></div>
<div class="tab-nav tabs">
    <a ui-sref="tab.home" class="tab-item">
        <i class="icon ion-home "></i>
    </a>
    <a ui-sref="tab.search"  class="tab-item">
        <i class="icon ion-search"></i>
    </a>
    <a ui-sref="tab.car"  class="tab-item">
        <i class="icon ion-ios-cart"></i>
    </a>
</div>
```
#### 3.5 参数的传递
```javascript
state('tab.home', {
    url:'/home/:id',
    views:{
        '':{
            templateUrl:'tmpl/home.html',
            controller: function ($scope,$stateParams) {
                $scope.id = $stateParams.id
            }
        }
    },
}).state('tab.car', {
    url:'/car',
    views:{
        '':{
            templateUrl:'tmpl/list.html',
            controller: function ($scope,$state) {
                $scope.go = function () {
                    $state.go('tab.home',{id:100})
                }
            }
        }
    },
})
```
增加跳转按钮
```
<button ng-click="go()">点击</button>
```