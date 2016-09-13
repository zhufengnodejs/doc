## 1. 什么是react
React 是一个用于构建用户界面的JavaScript库

## 2. 安装react
```sh
$ bower install react babel --save
```

## 3. 直接在浏览器中使用React
```javascript
  <script src="../bower_components/react/react.js"></script>
  <script src="../bower_components/react/react-dom.js"></script>
  <script src="../bower_components/babel/browser.js"></script>
  <script type="text/babel" src="index.js"></script>
```

* react.js 是 React 的*核心*库
* react-dom.js 是提供与*DOM*相关的功能,会在window下增加`ReactDOM`属性
* browser.js 的作用是将`JSX`语法转为`JavaScript`语法

> `script`中的`type`属性为`text/babel`,因为React独有的JSX语法,跟JavaScript不兼容

## 4. ReactDOM.render
`ReactDOM.render` 是 `React` 的最基本方法,用于将标签模板转为HTML语言，并插入指定的DOM节点
### 4.1. index.html

```diff
+   <div id="app"></div>
+   <script type="text/babel" src="js/1.react.js"/>
```

### 4.2. js/1.react.js

```javascript
    ReactDOM.render(
    <h1>珠峰培训</h1>,
        document.getElementById('app')
    );
```
> 上面代码将一个h1标题，插入app元素内部

## 5. JSX 语法
是一种JS和HTML混合的语法,将组件的*结构*、*数据*甚至*样式*都聚合在一起定义组件,会编译成普通的Javascript。
* 遇到HTML标签(以 < 开头)，就用*HTML*规则解析
* 遇到代码块(以 { 开头)，就用*JavaScript*规则解析
* 使用样式时可以让style等于一个样式对象
* 使用样式类时只能使用`className=类名`,因为class是Javascript关键字

```javascript
var persons = ['刘德华', '范冰冰', '郭跃'];
var style = {color:'red'};
ReactDOM.render(
  <div>
  {
    persons.map(function (person) {
      return <div style={style}>Hello, {person}!</div>
    })
  }
  </div>,
  document.getElementById('app')
);
```


## 6. 定义组件
我们可以很直观的将一个复杂的页面分割成若干个独立组件,每个组件包含自己的逻辑和样式
再将这些独立组件组合完成一个复杂的页面。
这样既减少了逻辑复杂度，又实现了代码的重用
- 可组合：一个组件可以和其他的组件一起使用或者可以直接嵌套在另一个组件内部
- 可重用：每个组件都是具有独立功能的，它可以被使用在多个场景中
- 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护

### 6.1 定义组件
React允许将代码封装成组件，然后像插入普通HTML标签一样，在网页中插入这个组件

* 组件类的第一个字母必须*大写*
* 组件类*能且只能*包含一个*顶层标签*

```javascript
var Message = React.createClass({
    render: function() {
        return <h1>Hello</h1>;
    }
});
ReactDOM.render(
    <Message/>,
    document.getElementById('app')
);
```

### 6.2 组件的属性
* 每个组件可以有自己的属性,一般用来存放组件初始后不变的数据,比如人的性别，姓名等
* 属性一般用作组件的数据源，一般由父组件传入,比如你的名字一般是由你父母取的
* 属性可以通过`this.props`中取出
* *propTypes*可以用来定义传入组件属性的名称和类型
* `getDefaultProps`函数可以用来定会引起组件的默认属性

```javascript
var Person = React.createClass({
    //类似于约定了一个接口文档,用于这是验证传递给组件的属性，
    propTypes: {
        //定义msg的属性类型为字符串，必须传入
        name: React.PropTypes.string.isRequired,
        gender: React.PropTypes.string.isRequired,
        age:React.PropTypes.number.isRequired
    },
    getDefaultProps:function(){
        return {name:'无名氏'}
    },
    render: function() {
        //属性可以通过属性对象this.props中取出
        return (<h1> {this.props.name}
                     {this.props.gender}
                     {this.props.age}
                </h1>);
    }
});

var props = {
    gender:'男',
    age:18
}

ReactDOM.render(
    <Person {...props} />,//属性可以在使用组件时传入
    document.getElementById('app')
);
```

### 6.3 this.props.children
`this.props`对象的属性与组件实例的属性一一对应,但`this.props.children`属性表示组件的所有子节点
`React.Children.map`是一个工具方法，用于实现对数组元素的映射

```html
var Person = React.createClass({
    render: function() {
      return (
            <ol>
                {
                    React.Children.map(this.props.children,
                      function (child) {
                        return <li>{child}</li>;
                    })
                }
            </ol>
      );
    }
});

ReactDOM.render(
    <Person>
        <span>大毛</span>
        <span>二毛</span>
        <span>三毛</span>
    </Person>,
    document.getElementById('app')
);
```

### 6.4 state状态
- 组件的状态就像人的心情，会经常变化，而且只能由自己来改变
- 组件一开始有一个初始状态,然后用户互动,导致状态变化，从而触发界面重新渲染
* `getInitialState`用来定义初始状态
- 可以给按钮绑定事件，当事件发生的时候调用对应的方法改变组件的状态

```javascript
var Person = React.createClass({
    getInitialState: function() {
        return {happy: true};
    },

    getDefaultProps:function(){
        return {name:'无名氏'};
    },
    handleClick: function(event) {
        this.setState({happy: !this.state.happy});
    },
    render: function() {
        var heart = this.state.happy ? '开心' : '不开心';
        return (
            <p >
                 {this.props.name} {heart} <br/>
                 <button onClick={this.handleClick}>变心</button>
            </p>
        );
    }
});

ReactDOM.render(
    <Person name="林志玲" />,
    document.getElementById('app')
);
```

常用的事件
```javascript
剪贴板事件 onKeyDown onKeyPress onKeyUp
键盘事件 onFocus onBlur
焦点事件 onChange onInput onSubmit
鼠标事件 onClick onDoubleClick onMouseDown onMouseEnter onMouseLeave
```

### 6.5 表单元素双向数据绑定
```javascript
var Input = React.createClass({
    getInitialState: function() {//获取初始状态
        return {value: '珠峰培训'};
    },
    handleChange: function(event) { //处理改变事件
        this.setState({value: event.target.value});
    },
    render: function () {
        var value = this.state.value;
        return (
            <div>
                <input style={{color:'red'}} type="text"
                value={value} onChange={this.handleChange} />
                <p>{value}</p>
            </div>
        );
    }
});

ReactDOM.render(<Input/>, document.getElementById('app'));
```
> 注意: 如果给表单元素设置了`value`属性，则必须指定`onChange`事件处理函数，否则 此字段会变成只读状态

## 7. 复合组件
多个简单的组件嵌套，可构成一个复杂的复合组件，从而完成复杂的交互逻辑
```javascript
var Panel = React.createClass({
    render: function () {
        return (
            <div className="panel panel-default">
                <PanelHead head={this.props.head}/>
                <PanelBody body={this.props.body}/>
            </div>
        );
    }
});


var PanelHead = React.createClass({
    render: function () {
        return (
            <div className="panel-heading">
                {this.props.head}
            </div>
        );
    }
});


var PanelBody = React.createClass({
    render: function () {
        return (
            <div className="panel-body">
                {this.props.body}
            </div>
        );
    }
});

ReactDOM.render(
    <Panel
        head="头部"
        body="正文"
    />,
    document.getElementById('app')
);
```


## 8. 组件的生命周期
React中可以指定在组件的生命周期的不同阶段执行的函数
- 渲染前
    - getDefaultProps  在组件类创建的时候调用一次,则此处返回的对象中的相应属性将会合并到`this.props`
    - getInitialState 在组件挂载之前调用一次。返回值将会作为`this.state`的初始值。
    - componentWillMount 在首次渲染之前触发
- 渲染
    - render 当调用的时候，会检测`this.props`和`this.state`，返回一个组件
- 渲染后
    - componentDidMount 在初始化渲染执行之后立刻调用一次
    - shouldComponentUpdate 在接收到新的`props`或者`state`，将要渲染之前调用,返回`false`则不更新组件
    - componentWillUpdate 做一些更新之前的准备工作
    - componentDidUpdate 更新之后触发
    - componentWillReceiveProps 在组件接收到新的`props`的时候调用
- 移除
    - componentWillUnmount 在组件从DOM中移除的时候立刻被调用
    - componentDidUnmount 组件移除之后调用

```javascript
var MessageBox = React.createClass({
    getInitialState: function () {
        console.log('MessageBox.getInitialState');
        return {
            count: 0,
        }
    },
    getDefaultProps: function () {
        console.log('MessageBox.getDefaultProps');
    },
    componentWillMount: function () {
        console.log('MessageBox.componentWillMount');
    },
    componentDidMount: function () {
        console.log('MessageBox.componentDidMount');
    },
    componentWillUnmount: function () {
        console.log('MessageBox.componentWillUnmount');
    },
    shouldComponentUpdate: function (nextProp, nextState) {
        console.log('MessageBox.shouldComponentUpdate');
        if (nextState.count > 10) return false;
        return true;
    },
    componentWillUpdate: function (nextProp, nextState) {
        console.log('MessageBox.componentWillUpdate');
    },
    componentDidUpdate: function () {
        console.log('MessageBox.componentDidUpdate');
    },
    killMySelf: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    },
    doUpdate: function () {
        this.setState({
            count: this.state.count + 1,
        });
    },
    render: function () {
        return (
            <div>
                <h1 > 计数： {this.state.count}</h1>
                <button onClick={this.killMySelf}>卸载掉这个组件</button>
                <button onClick={this.doUpdate}>手动更新一下组件</button>
                <Submessage count={this.state.count}/>
            </div>
        )
    }
});

var Submessage = React.createClass({
    componentWillReceiveProps: function (nextProp) {
        console.log('Submessage.componentWillReceiveProps');
    },
    shouldComponentUpdate: function (nextProp, nextState) {
        console.log('Submessage.shouldComponentUpdate');
        if (nextProp.count > 5) return false;
        return true;
    },
    render: function () {
        return (
            <h3>当前计数是：{this.props.count}</h3>
        )
    }
});

ReactDOM.render(<MessageBox/>, document.getElementById('app'));
```

> ReactDOM.unmountComponentAtNode 从DOM中移除已经挂载的React组件

## 9. DOM操作
给组件加上`ref="xxx"`后，可在父组件中通过`this.refs.xxx`获取该DOM元素
```javascript
var Focus = React.createClass({
    handleClick: function() {
        this.refs.msg.focus();
    },
    render: function() {
        return (
            <div>
                <input type="text" ref="msg" />
                <input type="button" value="获得焦点"
                onClick={this.handleClick} />
            </div>
        );
    }
});

ReactDOM.render(
    <Focus />,
    document.getElementById('app')
);
```

## 10.通过Ajax获取数据
### 10.1 客户端
```javascript
var Suggestion = React.createClass({
    getInitialState:function(){
      return {}
    },
    handleChange: function () {
        var value = this.refs.input.value;
        $.ajax({
            url: 'http://www.baidu.com/su',
            type: 'get',
            jsonp: 'cb',
            dataType: 'jsonp',
            data: {wd: value},
            processData: true,
            context:this,
            success: function (result) {
                var data = result.s;
                data = data.map(function(item，index){
                    return <li key={index}>{item}</li>
                });
                this.setState({content:data});
            }
        })
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="input"
                onChange={this.handleChange}/>
                <ul>
                    {this.state.content}
                </ul>
            </div>
        )
    }
});

ReactDOM.render(<Suggestion></Suggestion>, document.getElementById('app'));
```

### 10.2 服务器端
```javascript
var express = require('express');
var app = express();
app.get('/jsonp',function(req,res){
    var wd = req.query.wd;//得到关键字
    var cb = req.query.cb;//得到回调函数的方法名
    var result = {q:wd,p:false,s:[]};//拼结果对象
    for(var i=0;i<10;i++)
        result.s.push(wd+i);
    //先设置响应头
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.send(`${cb}(${JSON.stringify(result)})`);
});
app.listen(9090);
```

### 10.3 ajax方法
```javascript
function ajax({url,type,data,processData,jsonp,dataType,context,success}){
   var xhr = new XMLHttpRequest();
   url+= '?';
   var params = '';
   if(processData)
       for(var attr in data){
           params += (attr+'='+data[attr]);
       }
    else
       url+=data;
   url+=params;
   var method = 'jQuery_'+Date.now();
   url += ('&'+jsonp+'='+method);
   xhr.open(type,url,true);
   xhr.onreadystatechange = function(){
       if(xhr.readyState == 4 && /2\d{2}/.test(xhr.status)){
           var response = xhr.responseText.match(/{[^{}]+}/)[0];
           var jsonObj = JSON.parse(response);
           success.bind(context)(jsonObj);
       }
   }
   xhr.send();
}
```

## 11. mixin
公用抽取出来,让不同的组件共用同一部分逻辑，实现代码重用
```javascript
var counterMix = {
    getInitialState:function(){
        return {count:0};
    },
    componentWillUpdate:function(){
        console.log('componentWillUpdate');
    },
    handleClick:function(){
        this.setState({count:this.state.count+1});
    }
}
var Counter1 = React.createClass({
   mixins: [counterMix],
   render:function(){
       return (
           <div>
               {this.state.count}
               <button onClick={this.handleClick}>增加</button>
           </div>
       )
   }
});
var Counter2 = React.createClass({
    mixins: [counterMix],
    render:function(){
        return (
            <div>
                {this.state.count}
                <button onClick={this.handleClick}>增加</button>
            </div>
        )
    }
});
ReactDOM.render(<div>
  <Counter1/>
  <Counter2/>
</div>,document.getElementById('app'));
```

## 12. 插件实现双向数据绑定
在`index.html`引入插件
```
+ <script src="lib/react/react-with-addons.js"></script>
```
JS实现
```
var Input = React.createClass({
    mixins:[React.addons.LinkedStateMixin],
    getInitialState: function() {//获取初始状态
        return {msg: '珠峰培训'};
    },
    render: function () {
        var msg = this.state.msg;
        return (
            <div>
                <input type="text" valueLink={this.linkState('msg')} />
                <p>{msg}</p>
            </div>
        );
    }
});

ReactDOM.render(<Input/>, document.getElementById('app'));
```

## 13.珠峰留言版
```javascript
var Board = React.createClass({
    getInitialState: function () {
        return {
            msg: '请输入',
            messages:this.props.messages
        };
    },
    render: function () {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <input type="text" defaultValue={this.state.msg}
                ref="txtMsg" onClick={this.clear}/>
                <input type="button" value='发言' onClick={this.leaveMsg}/>
                <ul>
                    {
                        this.state.messages.map(function (item, index) {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    },
    clear:function(){
        this.refs.txtMsg.value =  '';
    },
    leaveMsg: function (event) {
     this.state.messages.push(this.refs.txtMsg.value);
       //每次状态都是一个新的state对象
     localStorage.setItem('messages',JSON.stringify(this.state.messages));
     this.setState({
           messages:this.state.messages
     },function(){
           this.refs.txtMsg.value =  '';
     });
    }
})
var data = {
    title: '珠峰留言版',
    messages: JSON.parse(localStorage.getItem('messages'))||[]
}

ReactDOM.render(
    <Board {...data}/>,
    document.getElementById('app')
);
```

## 13.扩展阅读

- [郭永峰博客](http://guoyongfeng.github.io/idoc/html/React%E8%AF%BE%E7%A8%8B%E4%B8%93%E9%A2%98/React%E6%8A%80%E6%9C%AF%E5%88%86%E4%BA%AB.html)
- [react官网](https://facebook.github.io/react)
- [react中文网](http://reactjs.cn)
- [react中文网](http://react-china.org)
- [react中文网](http://ant.design)
- [githup](https://github.com/facebook/react)
