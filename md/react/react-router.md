## 1. 路由
`React Router`可以让我们定义这样的路由，然后指定访问这些路由的时候，应该使用的是哪个`react`组件。

## 2. 安装路由
```
$ npm install react-router --save
```
## 3.使用路由
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/react-router-homepage.jpg" class="img-responsive">
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/react-router-user.jpg" class="img-responsive">
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/react-router-profile.jpg" class="img-responsive">

### 3.1. 初始化项目
[初始化项目](https://github.com/zhufengnodejs/react-router-lesson/commit/6dc20634a633867390d221f339293ec79fe0c3d4)

### 3.2.定义路由
可以先定义Router容器，然后再在里面定义Route路由
可以在Route中使用`path`定义路径，并使用`component`指定当路径匹配里加载的组件

[定义路由](https://github.com/zhufengnodejs/react-router-lesson/commit/634f12fd630ae6b88f411fade594499daf2b9f3b)

### 3.3.得到地址里的参数
在跟路由对应的组件里，我们可以得到路径参数的值。

这样你就可以使用这个路径参数的值为用户显示出对应的内容。

一般就是使用这个` id `向服务端请求对应的内容，请求回来以后再去设置一下组件的状态。

这个路径参数会被保存在`this.props.params`中
[得到地址里的参数](https://github.com/zhufengnodejs/react-router-lesson/commit/884d110362442d947cee164fa7e862ab746d84b9)

### 3.5.绝对路径和重定向
**默认组件**是指一个当路径不匹配任何子组件的时候使用的组件

**绝对路径**是以/ 开头

**重定向路由**可以把对一个路径的访问重定向到另外一个路径

[绝对路径和重定向](https://github.com/zhufengnodejs/react-router-lesson/commit/036ead5e80b434d88f658350a5fea439f7ca06bc)

### 3.6.进入或退出路由
在离开一个路由地址，进入到下一个路由地址，这些都会触发对应的行为

使用onEnter指定当进入一个路径的时候执行的任务

使用 onLeave 去指定离开的时候要做的任务

[进入或退出路由](https://github.com/zhufengnodejs/react-router-lesson/commit/74ae88336a70a4311f49ae0547352ac1a2c89427)

### 3.7.获取查询字符串参数
在地址里可以包含查询字符串，比如可以设置查询的条件或排序的字段

在`Link`标签上指定`query`属性可以指定查询符

 在路由里可以通过`let { query } = this.props.location; `提供查询对象

[获取查询字符串参数](https://github.com/zhufengnodejs/react-router-lesson/commit/752f92d2baee48a692eaf4a65db6cf6e42c8dc5d)

### 3.8. 高亮显示菜单
可以指定当路径匹配的时候进行高亮显示导航菜单

[activeStyle activeClassName](https://github.com/zhufengnodejs/react-router-lesson/commit/f2118d6d13d1f2a8c72aab6771749461920efee0)

### 3.9.组件的生命周期
组件的生命周期，就是一个组件从出生到结束这期间的不同的阶段

使用路由地址可以切换显示不同的组件，这也就会触发组件的生命周期里的这些不同的阶段


[组件的生命周期](https://github.com/zhufengnodejs/react-router-lesson/commit/7433f17a1d50320ead7359b5ca6dff9a60320512)

## 4. 资源

[项目代码](https://github.com/zhufengnodejs/react-router-lesson)
