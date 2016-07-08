## 1. 路由
`React Router`可以让我们定义这样的路由，然后指定访问这些路由的时候，应该使用的是哪个`react`组件。

## 2. 安装路由
```diff
$ npm install react-router --save
```

## 3. 定义路由
### 3.1 app/components/Home/index.js
```diff
+ import React from 'react';
+
+ export default class Home extends React.Component {
+
+    render() {
+        return (
+            <div>
+                Home
+            </div>
+        );
+    }
+ }
+
```

### 3.2 app/components/Profile/index.js
```diff
+ import React from 'react';
+
+ export default class Profile extends React.Component {
+
+    render() {
+        return (
+            <div>
+                profile
+            </div>
+        );
+    }
+ }
```

### 3.3 app/components/User/index.js
```diff
+ import React from 'react';
+
+ export default class User extends React.Component {
+
+    render() {
+        return (
+            <div>
+                User
+            </div>
+        );
+    }
+ }
```


### 3.4 app/components/index.js
```diff
+ export Profile from './Profile';
+ export User from './User';
+ export Home from './Home'; 
```

### 3.5 app/containers/App/index.js
```diff
import React from 'react';
-
+ import {Link} from 'react-router';
  class App extends React.Component {
-  constructor(props) {
-    super(props);
-  }
-
   render() {
      return (
        <div>
-        <p>
-          欢迎光临
-        </p>
+          <nav className="navbar navbar-default">
+              <div className="container-fluid">
+                  <div>
+                      <ul className="nav navbar-nav">
+                          <li><Link to="/home" >首页</Link></li>
+                          <li><Link to="/user" >用户管理</Link></li>
+                          <li><Link to="/profile" >个人设置</Link></li>
+                      </ul>
+                  </div>
+              </div>
+          </nav>
+          <div className="container">
+              {this.props.children}
+          </div>
        </div>
      );
    }
```
### 3.6 app/index.js
```diff
  import React from 'react';
  import { render } from 'react-dom';
+ import {Router,Route,hashHistory,Link} from 'react-router';
  import { App } from './containers';
+ import { Home,User,Profile } from './components';
  import 'bootstrap/dist/css/bootstrap.css';
  
  let root = document.getElementById('app');
- render( <App />, root );
+ render(
+    <Router history={hashHistory} >
+        <Route path="/" component={App}>
+            <Route path="home" component={Home}/>
+            <Route path="user" component={User}/>
+            <Route path="profile" component={Profile}/>
+        </Route>
+    </Router>
+    ,root);
```

### 3.7 package.json
```diff
+    "react-router": "^2.4.1"
```

## 4. 得到请求中的参数
### 4.1 app/components/User/index.js
```diff
  import React from 'react';
+ import {Link} from 'react-router';
  export default class User extends React.Component {
  
      render() {
          return (
-            <div>
-                User
+            <div className="row">
+                <div className="col-xs-4">
+                    <ul className="nav nav-tabs nav-stacked">
+                        <li><Link to="/user/list" >用户列表</Link></li>
+                        <li><Link to="/user/add" >新增用户</Link></li>
+                    </ul>
+                </div>
+                <div className="col-xs-8">
+                    {this.props.children}
+                </div>
              </div>
          );
      }
```


### 4.2 app/components/UserAdd/index.js
```diff
+ import React from 'react';
+
+ export default class UserAdd extends React.Component {
+
+    render() {
+        return (
+            <div>
+                UserAdd
+            </div>
+        );
+    }
+ }
+
```

### 4.3 app/components/UserDetail/index.js
```diff
+ import React from 'react';
+ import $ from 'jquery';
+
+ export default class UserDetail extends React.Component {
+    constructor(props){
+      super(props);
+      this.state = {name:''};
+      $.get('/users.json').then((data)=>{
+          var id = this.props.params.id;
+          this.setState({name:data[id]?data[id].name:''});
+      })
+    }
+
+    render() {
+        return (
+            <div>
+                {this.state.name}
+            </div>
+        );
+    }
+ }
+
```

### 4.4 app/components/UserList/index.js
```diff
+ import React from 'react';
+ import {Link} from 'react-router';
+ export default class UserList extends React.Component {
+
+    render() {
+        return (
+            <div>
+                <ul className="list-group">
+                    <li className="list-group-item">
+                        <Link to="/user/detail/1">用户1</Link>
+                    </li>
+                    <li className="list-group-item">
+                        <Link to="/user/detail/2">用户2</Link>
+                    </li>
+                </ul>
+            </div>
+        );
+    }
+ }
+
```

### 4.5  app/components/index.js
```diff
+ export UserList from './UserList';
+ export UserAdd from './UserAdd';
+ export UserDetail from './UserDetail'; 
```

### 4.6 app/index.js
```diff
import { render } from 'react-dom';
  import {Router,Route,hashHistory,Link} from 'react-router';
  import { App } from './containers';
- import { Home,User,Profile } from './components';
+ import { Home,User,Profile,UserList,UserAdd,UserDetail } from './components';
  import 'bootstrap/dist/css/bootstrap.css';
  
  let root = document.getElementById('app');
  render(
      <Router history={hashHistory} >
          <Route path="/" component={App}>
              <Route path="home" component={Home}/>
            <Route path="user" component={User}>
+                <Route path="list" component={UserList}/>
+                <Route path="add" component={UserAdd}/>
+                <Route path="detail/:id" component={UserDetail}/>
+            </Route>
              <Route path="profile" component={Profile}/>
          </Route>
      </Router>
```

### 4.7 package.json
```diff
+    "jquery": "^3.0.0",
```

## 5. 指定默认路由和绝对路径和重定向
### 5.1 app/index.js
```diff
 import React from 'react';
  import { render } from 'react-dom';
- import {Router,Route,hashHistory,Link} from 'react-router';
+ import {Router,Route,hashHistory,Link,IndexRoute,Redirect} from 'react-router';
  import { App } from './containers';
  import { Home,User,Profile,UserList,UserAdd,UserDetail } from './components';
  import 'bootstrap/dist/css/bootstrap.css';
 @@ -9,11 +9,14 @@ let root = document.getElementById('app');
  render(
      <Router history={hashHistory} >
          <Route path="/" component={App}>
+            <IndexRoute component={Home}/>
              <Route path="home" component={Home}/>
              <Route path="user" component={User}>
+                <IndexRoute component={UserList}/>
                  <Route path="list" component={UserList}/>
                  <Route path="add" component={UserAdd}/>
-                <Route path="detail/:id" component={UserDetail}/>
+                <Route path="/detail/:id" component={UserDetail}/>
+                <Redirect from="detail/:id" to="/detail/:id"/>
              </Route>
              <Route path="profile" component={Profile}/>
          </Route>
```


## 6. 进入或退出路由
### 6.1 app/index.js
```diff
+ function handleEnter(){
+    console.log('handleEnter',arguments);
+ }
+ function handleLeave(){
+    console.log('handleLeave',arguments);
+ }
  let root = document.getElementById('app');
  render(
      <Router history={hashHistory} >
 @@ -14,7 +19,7 @@ render(
              <Route path="user" component={User}>
                  <IndexRoute component={UserList}/>
                  <Route path="list" component={UserList}/>
-                <Route path="add" component={UserAdd}/>
+                <Route path="add" component={UserAdd} onEnter={handleEnter} onLeave={handleLeave}/>
                  <Route path="/detail/:id" component={UserDetail}/>
                  <Redirect from="detail/:id" to="/detail/:id"/>
              </Route>
```

## 7. 获取查询字符串参数
### 7.1 app/components/User/index.js
```diff
             <div className="row">
                  <div className="col-xs-4">
                      <ul className="nav nav-tabs nav-stacked">
-                        <li><Link to="/user/list" >用户列表</Link></li>
+                        <li><Link to="/user/list" query={{orderBy:'id'}} >用户列表</Link></li>
                          <li><Link to="/user/add" >新增用户</Link></li>
                      </ul>
                  </div>
```

### 7.2 app/components/UserList/index.js
```diff
 import React from 'react';
  import {Link} from 'react-router';
  export default class UserList extends React.Component {
+    constructor(props){
+        super(props);
+        console.log(this.props);
+        var data = [{id:3,name:'张三'},{id:2,name:'李四'},{id:1,name:'王五'}];
+        let {query} = this.props.location;
+        data = data.sort((a,b)=>{
+            return a[query.orderBy] - b[query.orderBy];
+        });
+        this.state = {data:data};
+    }
  
      render() {
          return (
              <div>
                  <ul className="list-group">
-                    <li className="list-group-item">
-                        <Link to="/user/detail/1">用户1</Link>
-                    </li>
-                    <li className="list-group-item">
-                        <Link to="/user/detail/2">用户2</Link>
-                    </li>
+                    {
+                        this.state.data.map((item,index)=>{
+                            return <li key={index} className="list-group-item">
+                                <Link to={"/user/detail/"+item.id}>{item.id}:{item.name}</Link>
+                            </li>
+                        })
+                    }
                  </ul>
              </div>
          );
```

## 8. activeStyle和activeClassName
### 8.1 pp/containers/App/index.js
```diff
               <div className="container-fluid">
                    <div>
                        <ul className="nav navbar-nav">
-                          <li><Link to="/home" >首页</Link></li>
-                          <li><Link to="/user" >用户管理</Link></li>
-                          <li><Link to="/profile" >个人设置</Link></li>
+                          <li><Link activeStyle={{color:'red'}} to="/home" >首页</Link></li>
+                          <li><Link activeStyle={{color:'red'}}  to="/user" >用户管理</Link></li>
+                          <li><Link activeStyle={{color:'red'}}  to="/profile" >个人设置</Link></li>
                        </ul>
                    </div>
                </div>
```

#资源

[项目代码](https://github.com/zhufengnodejs/react-router-lesson)