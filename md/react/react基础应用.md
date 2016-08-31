## 1.留言版
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/comment.png" class="img-responsive">
[1.初始化项目](https://github.com/zhufengnodejs/zhufeng_board/commit/c1d49cf33f6dd109d16b456cf530c6d78402a84a)
## 2.创建第一个组件CommentBox
[2.创建第一个组件CommentBox](https://github.com/zhufengnodejs/zhufeng_board/commit/b99786c39343a11325a8adfd1a73a4fd923e838e)
### 2.1 新建 `webpack.config.js`
```javascript
var path = require('path');
module.exports = {
    entry: path.resolve(__dirname,'app/main.js'),
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devServer:{
      inline:true,
      contentBase:'build'
    },
    resolve:{
        extensions:["",".js",".jsx",".css"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude:/node_modules/,
                include:path.resolve(__dirname,'app')
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)/,
                loader:'url'
            }
        ]
    }
}
```
### 2.2 配置`package.json`
```javascript
"dependencies": {
    "babel-loader": "^6.2.4",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "bootstrap": "^3.3.6",
    "css-loader": "^0.23.1",
    "file-loader": "^0.8.5",
    "jquery": "^3.0.0",
    "react": "^15.1.0",
    "react-dom": "^15.1.0",
    "react-loader": "^2.4.0",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  }
```
### 2.3 创建app/main.js

```javascript
var React = require('react');

import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox.js';


ReactDOM.render(<CommentBox />, document.querySelector('#app'));

```
### 2.4 创建 app/components/CommentBox.js
```javascript
import React from 'react';
class CommentBox extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div class="page-header">
                        <h1>评论</h1>
                    </div>
                </div>

            </div>
        )
    }
}

export {CommentBox as default}
```
### 2.5 创建build/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app" class="container"></div>
</body>
<script src="bundle.js"></script>
</html>
```

## 3.复合组件
[3.复合组件](https://github.com/zhufengnodejs/zhufeng_board/commit/0685abd9470d96fd65b179b79931d67968e1a167)
### 3.1 CommentBox
```javascript
'use strict'

import React from 'react';
import CommentList from './CommentList.js';
import CommentForm from './CommentForm.js';
import 'bootstrap/dist/css/bootstrap.css';
class CommentBox extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div class="page-header">
                        <h1>评论</h1>
                    </div>
                    <CommentList/>
                </div>
                <div className="col-xs-12">
                    <CommentForm/>
                </div>
            </div>
        )
    }
}

export {CommentBox as default}
```

### 3.2 CommentForm
```javascript
import React from 'react';
class CommentForm extends React.Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <input type="text" ref="author"
                    className="form-control" defaultValue="姓名"
                    name="author"/>
                </div>
                <div className="form-group">
                    <textarea class="form-control" ref="text"
                    name="content" id="text" cols="60" rows="7"
                    defaultValue="留言">
                    </textarea>
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">
                发表评论</button>
                </div>
            </form>
        )
    }
}

export {CommentForm as default}
```

### 3.3 CommentList.js
```javascript
import React from 'react'
class CommentList extends React.Component {
    render(){
        return(
            <div className="list-group">
                <div className="list-group-item">张三:你好</div>
                <div className="list-group-item">李四:你也好</div>
            </div>
        )
    }
}

export {CommentList as default}
```

## 4. 从父组件传递属性给子组件
[4. 从父组件传递属性给子组件](https://github.com/zhufengnodejs/zhufeng_board/commit/21498ef97bd994b0de1836e703eaba3e581c9ce3)
### 4.1 app/components/Comment.js
```

import React from 'react';
class Comment extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className="list-group-item">
                {this.props.author}:
                {this.props.date}:
                {this.props.children}
            </div>
        )
    }
}
export {Comment as default}
```

### 4.2 app/components/CommentList.js
```diff
    render(){
        return(
            <div className="list-group">
+                <Comment author="张三" date="10分前">你好</Comment>
+                <Comment author="李四" date="5分前">你也好啊</Comment>
            </div>
        )
    }
```


## 5. 从外界初始化数据
[5. 从外界初始化数据](https://github.com/zhufengnodejs/zhufeng_board/commit/65b1809361e943551bb4efadf09c5baa8ef0416e)
### 5.1 app/main.js
```diff
+ var data = [
+     {name:'张三',date:'10分钟前',text:"你好"},
+     {name:'李四',date:'5分钟前',text:"你也好"}
+ ]
+ ReactDOM.render(<CommentBox data={data} />,
 document.querySelector('#app'));
```

### 5.2 app/components/CommentBox.js
```diff
+   <CommentList data={this.props.data}/>
```

### 5.3 app/components/CommentList.js
```diff
<div className="list-group">
+                {
+                    this.props.data.map((item,index)=>{
+                        return <Comment key={index} author={item.name}
+  date={item.date}>{item.children}</Comment>
+                    })
+                }
            </div>
```

### 5.4 app/components/Comment.js
```diff
            <div className="list-group-item">
+                {this.props.author}:
+                {this.props.date}:
+                {this.props.children}
            </div>
```

## 6.从远程接口获取数据并改变状态
[6.从远程接口获取数据并改变状态](https://github.com/zhufengnodejs/zhufeng_board/commit/d803cc8b066a727fac7efb3e2ca4d4305186afee)
### 6.1 app/components/CommentBox.js
```diff
+ import $ from 'jquery';

+ constructor(props){
+        super(props);
+        this.state = {comments:[]};
+        this.getComments();
+    }

+    getComments(){
+        $.ajax({
+            url:this.props.url,
+            dataType:'json',
+           cache:false,
+            success:data =>{
+                this.setState({comments:data});
+            },
+            error:(xhr,status,error)=>{
+                console.error(error);
+            }
+        })
+    }
+      <CommentList data={this.state.comments}/>
```

## 7.处理事件并提交给父组件显示
[7.处理事件并提交给父组件显示](https://github.com/zhufengnodejs/zhufeng_board/commit/4fa195fd6833f8078438dbfb56abdde3f5fa4266)
### 7.1 app/components/CommentForm.js
```diff
+ handleSubmit(event){
+        event.preventDefault();
+        var author = this.refs.author.value;
+        var text = this.refs.text.value;
+        this.props.handleCommentSubmit({author,text,date:"刚刚"});
+    }

+ <form onSubmit={this.handleSubmit.bind(this)}>

```

### 7.2  app/components/CommentBox.js
```diff
+      handleCommentSubmit(comment){
+        this.setState({comments:this.state.comments.concat(comment)});
+      }
+     <CommentForm handleCommentSubmit=
+       {this.handleCommentSubmit.bind(this)}/>
```
