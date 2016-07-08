### 7  连接数据库
#### 7.1 安装数据库支持
安装mongodb模块到node_modules下面并把此配置添加到`package.json`文件中
```
$ npm install mongoose --save
```
#### 7.2 创建配置文件
在工程根目录下创建 `settings.js` 文件,内容如下
```
    module.exports = {
        cookieSecret:'zhufengkey', 用于 Cookie 加密与数据库无关
        db:'zhufengblog', 数据库的名称
        host:'123.57.143.189', 数据库的地址
        port:27017,  数据库的端口号
        url:"mongodb://123.57.143.189:27017/zhufengblog"
    }
```

#### 7.3 创建db文件夹

#### 7.4 创建模型文件夹
在db文件夹下创建文件`models.js`,此文件存放着所有的模型
```
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;
    module.exports = {
        User:{ 设置User的数据模型 
            username:{type:String,required:true},用户名
            password:{type:String,required:true},密码
            email:{type:String,required:true},邮箱
            avatar:{type:String,required:true}头像
        },
        Article: { 设置文章的数据模型
            user:{type:ObjectId,ref:'User'}, 用户
            title: String, 标题
            content: String, 内容
            createAt:{type: Date, default: Date.now} 创建时间
        }
    }
```

#### 7.5 定义模型
此文件负责向外暴露模型,因为Model赋给了global作为属性，那就意味着在程序任何地方都可以调用了
```
  var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        models = require('./models');
    var settings = require('../settings');    
    mongoose.connect(settings.url);
    mongoose.model('User', new Schema(models.User));
    mongoose.model('Article', new Schema(models.Article));
    global.Model = function (type) {
            return mongoose.model(type);;
        }
```


#### 7.6 在`app.js中`引入此模块    
```
  require('./db'); //导入db模块
```

### 8 会话支持
#### 8.1 安装会话支持模块
使用 `express-session` 和 `connect-mongo` 模块实现了将会话信息存储到`mongodb`中。   
```
$ npm install express-session --save
$ npm install connect-mongo --save
```

#### 8.2 修改app.js
```
    var settings = require('./settings');
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);
    app.use(session({
      secret: settings.cookieSecret,//secret 用来防止篡改 cookie
      key: settings.db,//key 的值为 cookie 的名字
      cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天
      resave:true,
      saveUninitialized:true,
      store: new MongoStore({ //设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免重启服务器时会话丢失
        db: settings.db,
        host: settings.host,
        port: settings.port,
      })
    }));
```
添加完了以后我们就可以路由中通过`request.session`来操作会话对象了

## 9 用户注册登陆
### 9.1 增加工具方法
在`routes/users.js`中增加md5加密的工具方法
```
    function md5(val){
        return require('crypto').createHash('md5').update(val).digest('hex');
    }
```

### 9.2 用户注册路由
注册表单的form中`action="/users/reg"`,所以我们要实现用户注册的路由
修改 `routes/users.js` 
```
    router.post('/reg', function (req, res) {
      就是 POST 请求信息解析过后的对象，例如我们要访问 POST 来的表单内的 name="username" 域的值，只需访问 req.body['username'] 或 req.body.username 即可。
      var user = req.body;//
      if(user.password != user.repassword){
        req.flash('error','两次输入的密码不一致');
        return res.redirect('/users/reg');
      }
      delete user.repassword; 由于repassword不需要保存，所以可以删除
      user.password = md5(user.password); 对密码进行md5加密
      user.avatar = "https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=48"; 得到用户的头像
      new Model('User')(user).save(function(err,user){
        if(err){
          req.flash('error',err);
          return res.redirect('/users/reg');
        }
        req.session.user = user;//用户信息存入 session
        res.redirect('/');//注册成功后返回主页
      });
    });
```

### 9.3 用户登陆路由
```
    router.post('/login', function (req, res) {
        var user = req.body;
        user.password = md5(user.password);
        Model('User').findOne(user,function(err,user){
            if(err){
                req.flash('error',err);
                return res.redirect('/users/login');
            }
            req.session.user = user;//用户信息存入 session
            res.redirect('/');//注册成功后返回主页
        });
    });
```

### 9.4 用户退出路由
```
    router.get('/logout', function (req, res) {
        req.session.user = null;//用户信息存入 session
        res.redirect('/');//注册成功后返回主页
    });
```

## 10 发表文章路由
发表文章表单的form中`action="/articles/add"`,所以我们要实现发表文章路由
修改 `routes/article.js` 中的 `post('/add')`
```
    router.post('/add', function (req, res) {
        req.body.user = req.session.user._id;
        new Model('Article')(req.body).save(function(err,article){
            if(err){
                return res.redirect('/articles/add');
            }
            res.redirect('/');//发表文章成功后返回主页
        });
    
    });
```

## 11 页面消息通知
我们需要引入 flash 模块来实现页面通知（即成功与错误信息的显示）的功能。

## 11.1 什么是 flash?
我们所说的 flash 即 connect-flash 模块（https://github.com/jaredhanson/connect-flash），flash 是一个在 session 中用于存储信息的特定区域。信息写入 flash ，下一次显示完毕后即被清除。典型的应用是结合重定向的功能，确保信息是提供给下一个被渲染的页面。

## 11.2  安装模块
```
$ npm install connect-flash --save
```

## 11.3  导入模块
在app.js中添加调用此模块
```   
    var flash = require('connect-flash');
    app.use(flash());
```

### 11.4 发表文章成功提示
在发表文章的路由里放置flash提示信息
```
    router.post('/add', function (req, res) {
        req.body.user = req.session.user._id;
        new Model('Article')(req.body).save(function(err,article){
            if(err){
                req.flash('error', '更新文章失败!'); 放置失败信息
                return res.redirect('/articles/add');
            }
            req.flash('success', '更新文章成功!');  放置成功信息
            res.redirect('/');//发表文章成功后返回主页
        });
    });
```

### 11.5 在页面里增加显示提示的区域
修改 views/include/header.ejs
在最底部增加以下区域 
```
    <div class="container text-center">
        <% if (success) { %>
        <div class="alert alert-success" role="alert"><%= success %></div>
        <% } %>
        <% if (error) { %>
        <div class="alert alert-danger" role="alert"><%= error %></div>
        <% } %>
    </div>
```

### 11.6  用session中的值为模板赋默认值
在app.js 中增加以下中间件
```
    app.use(function(req,res,next){
      res.locals.user = req.session.user;
      res.locals.success = req.flash('success').toString();
      res.locals.error = req.flash('error').toString();
      next();
    });
    
```

## 12 控制导航
用户是否登陆看到的页面应该是不一样的，所以应该根据用户登陆状态来控制导航菜单的显示状态
修改 `views/include/header.ejs`
```
    <ul class="nav navbar-nav">
                <%
                if(!user){
                %>
                <li class="active"><a href="/users/reg">注册</a></li>
                <li><a href="/users/login">登录</a></li>
                <%
                }else{
                %>
                <li><a href="/articles/add">发表文章</a></li>
                <li><a href="/users/logout">登出</a></li>
                <%
                }
                %>
    </ul>
```
用户登陆后显示发表文章和登出按钮，用户登陆前显示注册和登录按钮。

## 13 页面权限控制
我们虽然已经完成了用户注册与登陆的功能，但并不能阻止比如已经登陆的用户访问 http://localhost:3000/users/reg 页面，
为此，我们需要为页面设置访问权限。即注册和登陆页面应该阻止已登陆的用户访问，
登出及后面我们将要实现的发表页只对已登录的用户开放。
如何实现页面权限的控制呢？我们可以把用户登录状态的检查放到路由中间件中，在每个路径前增加路由中间件，即可实现页面权限控制。
我们添加 checkNotLogin 和 checkLogin 函数来实现这个功能。

### 13.1  添加中间件
添加middleware文件夹
在`middleware`下添加`index.js`文件
middleware/index.js
```
     exports.checkLogin = function(req, res, next) {
         if (!req.session.user) {
             req.flash('error', '未登录!');
             return res.redirect('/users/login');
         }
         next();
     }
     
     exports.checkNotLogin = function(req, res, next) {
         if (req.session.user) {
             req.flash('error', '已登录!');
             return res.redirect('back');//返回之前的页面
         }
         next();
     }
```

### 13.2   在路由中添加中间件
修改 routes/users.js
```
    router.get('/reg',middleware.checkNotLogin, function (req, res) {
        res.render('user/reg', {title: '注册'});
    });
```
修改routes/article.js
``` 
    router.get('/add',middleware.checkLogin, function (req, res) {
        res.render('article/add', { title: '发表文章' });
    });
```
凡是不能登陆的中间加入 `checkNotLogin`
凡是需要登陆的中间加入 `checkLogin`

## 14 显示文章列表
## 14.1 修改首页模板
views/index.ejs
```
   <% include include/header.ejs%>
    <div class="container">
     <ul class="media-list">
      <%
      articles.forEach(function(article){
      %>
      <li class="media">
       <div class="media-left">
        <a href="#">
         <img class="media-object" src="<%=article.user.avatar%>" alt="">
        </a>
       </div>
       <div class="media-body">
        <h4 class="media-heading"><a href="/articles/detail/<%=article._id%>"><%=article.title%></a></h4>
        <p class="media-left"><%- article.content%></p>
       </div>
       <div class="media-bottom">
        作者:<%=article.user.username%>
        发表时间:<%=article.createAt.toLocaleString()%>
       </div>
      </li>
      <%
      });
      %>
     </ul>
    </div>
    <% include include/footer.ejs%>
```

## 14.2 修改路由
routes/index.js
```
 router.get('/', function(req, res, next) {
      Model('Article').find({}).populate('user').exec(function(err,articles){
        res.render('index', {title: '主页',articles:articles});
      });
    });
```

## 14 支持markdown
## 14.1 安装markdown
```
$ npm install markdown -save
```
## 14.2  修改路由
routes/index.js
```
    markdown = require('markdown').markdown;
    
    router.get('/', function(req, res, next) {
      Model('Article').find({}).populate('user').exec(function(err,articles){
        articles.forEach(function (article) {
          article.content = markdown.toHTML(article.content);
        });
        res.render('index', {title: '主页',articles:articles});
      });
    });
```

## 15 文章详情页
### 15.1   修改首页
views/index.ejs
```
<h4 class="media-heading"><a href="/articles/detail/<%=article._id%>"><%=article.title%></a></h4>
```

### 15.2 修改路由
routes/article.js
```
     router.get('/detail/:_id', function (req, res) {
         Model('Article').findOne({_id:req.params._id},function(err,article){
             article.content = markdown.toHTML(article.content);
             res.render('article/detail',{title:'查看文章',article:article});
         });
     });
```

### 15.3 增加详情页
views/article/detail.ejs
```
     <% include ../include/header.ejs%>
     <div class="container">
         <div class="panel panel-default">
             <div class="panel-heading">
                 <%=article.title%>
             </div>
             <div class="panel-body">
                 <%-article.content%>
             </div>
             <div class="panel-footer">
                 <a href="/articles/edit/<%=article._id%>" class="btn btn-warning">编辑</a>
                 <a href="/articles/delete/<%=article._id%>" class="btn btn-danger">删除</a>
             </div>
         </div>
     </div>
     <% include ../include/footer.ejs%>
```
## 16 删除文章
### 16.1 修改详情页
views/article/detail.ejs
```
 <a href="/articles/delete/<%=article._id%>" class="btn btn-danger">删除</a>
```
### 16.2 修改路由
 routes/article.js
```
 router.get('/delete/:_id', function (req, res) {
        Model('Article').remove({_id:req.params._id},function(err,result){
            if(err){
                req.flash('error',err);
                res.redirect('back');
            }
            req.flash('success', '删除文章成功!');
            res.redirect('/');//注册成功后返回主页
        });
    });
```

## 17 编辑文章
### 17.1 修改详情页
views/article/detail.ejs
```
    <a href="/articles/edit/<%=article._id%>" class="btn btn-warning">编辑</a>
   
```

### 17.2 修改添加文章界面
views/article/add.ejs
```
   <form action="/articles/add" method="post"  role="form" class="form-horizontal" enctype="multipart/form-data">
            <input type="hidden" value="<%=article._id%>" name="_id"/>
            <div class="form-group">
                <label for="title" class="col-sm-2 control-label">标题</label>
                <div class="col-sm-10">
                    <input type="text" value="<%=article.title%>" class="form-control" id="title" name="title" placeholder="标题"/>
                </div>
            </div>
            <div class="form-group">
                <label for="content" class="col-sm-2 control-label">正文</label>
                <div class="col-sm-10">
                    <textarea class="form-control"   id="" cols="30" rows="10" id="content" name="content" placeholder="请输入内容" ><%=article.content%></textarea>
                </div>
            </div>
            <div class="form-group">
                <label for="img" class="col-sm-2 control-label">图片</label>
                <div class="col-sm-10">
                    <%
                        if(article.img){
                            %>
                                 <img src="<%=article.img%>" style="width:100px;height:100px" alt=""/>
                            <%
                        }
                     %>
                    <input type="file" class="form-control"  name="img" id="img"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default">提交</button>
                    <button type="reset" class="btn btn-default">重置</button>
                </div>
            </div>
    
        </form>
```

### 17.3 修改路由
routes/article.js
```
   router.post('/add',middleware.checkLogin,upload.single('img'), function (req, res) {
        var _id = req.body._id;
        if(_id){
            var set = {title:req.body.title,content:req.body.content};
            Model('Article').update({_id:_id},{$set:set},function(err,result){
                if(err){
                    req.flash('error',err);
                    return res.redirect('back');
                }
                req.flash('success', '更新文章成功!');
                res.redirect('/');//注册成功后返回主页
            });
        }else{
            req.body.user = req.session.user._id;
            new Model('Article')(req.body).save(function(err,article){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/articles/add');
                }
                req.flash('success', '发表文章成功!');
                res.redirect('/');//注册成功后返回主页
            });
        }
    });
    
    router.get('/edit/:_id', function (req, res) {
        Model('Article').findOne({_id:req.params._id},function(err,article){
            res.render('article/add',{title:'编辑文章',article:article});
        });
    });
```

## 18 搜索和分页
### 18.1 在导航栏增加搜索框
views/include/header.ejs
```
    <form  class="navbar-form navbar-right" role="search" method="get" action="/articles/list/1/2">
                <div class="form-group">
                    <label for="keyword">关键字</label>
                    <input type="text" name="keyword" id="keyword" class="form-control" value="<%=keyword%>"/>
                </div>
                <button type="submit" class="btn  btn-default" value="search" name="searchBtn">搜索</button>
            </form>
```

### 18.2  在首页增加分页条
views/index.ejs
```
     <ul class="pagination">
      <%
      for(var i=1;i<=totalPage;i++){
      %>
      <li><a href="/articles/list/<%=i%>/<%=pageSize%>?keyword=<%=keyword%>"><%=i%></a></li>
      <%
      }
      %>
     </ul>
```

### 18.3 首页导航重定向到文章列表页
```
routes/index.js

    router.get('/', function(req, res, next) {
      res.redirect('/articles/list/1/2');
    });
```

### 18.4  增加文章列表导航
routes/article.js
```
    router.get('/list/:pageNum/:pageSize',function(req, res, next) {
        var pageNum = req.params.pageNum&&req.params.pageNum>0?parseInt(req.params.pageNum):1;
        var pageSize =req.params.pageSize&&req.params.pageSize>0?parseInt(req.params.pageSize):2;
        var query = {};
        var searchBtn = req.query.searchBtn;
        var keyword = req.query.keyword;
        if(searchBtn){
            req.session.keyword = keyword;
        }
        if(req.session.keyword){
            query['title'] = new RegExp(req.session.keyword,"i");
        }
    
        Model('Article').count(query,function(err,count){
            Model('Article').find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
                articles.forEach(function (article) {
                    article.content = markdown.toHTML(article.content);
                });
                res.render('index',{
                    title:'主页',
                    pageNum:pageNum,
                    pageSize:pageSize,
                    keyword:req.session.keyword,
                    totalPage:Math.ceil(count/pageSize),
                    articles:articles
                });
            });
        });
    });
```

## 19 实现评论功能
### 19.1 修改模板
views/article/detail.ejs
```
  <div class="panel panel-default">
            <div class="panel-heading">
                评论列表
            </div>
            <div class="panel-body"  style="height:300px;overflow-y: scroll">
                <ul class="media-list">
                    <%
                    article.comments.forEach(function(comment){
                    %>
                    <li class="media">
                        <div class="media-left">
                            <a href="#">
                                <img class="media-object" src="<%=comment.user.avatar%>" alt="">
                            </a>
                        </div>
                        <div class="media-body">
                            <p class="media-left"><%- comment.content%></p>
                        </div>
                        <div class="media-bottom">
                            <%=comment.user.username%> <%=comment.createAt.toLocaleString()%>
                        </div>
                    </li>
                    <%
                    });
                    %>
                </ul>
            </div>
    
        </div>
    
        <div class="panel panel-default">
            <form action="/articles/comment" method="post">
                <input type="hidden" value="<%=article._id%>" name="_id"/>
                <div class="panel-body">
                    <textarea class="form-control"   id="" cols="30" rows="10" id="content" name="content" placeholder="请输入评论" ></textarea>
                </div>
                <div class="panel-footer">
                    <button type="submit" class="btn btn-default">提交</button>
                </div>
            </form>
        </div>
```

### 19.2 修改模型   
db/models.js
```
     comments: [{user:{type:ObjectId,ref:'User'},content:String,createAt:{type: Date, default: Date.now}}],
```

### 19.3  修改路由
routes/article.js
```
    router.post('/comment',middleware.checkLogin, function (req, res) {
       var user = req.session.user;
       Model('Article').update({_id:req.body._id},{$push:{comments:{user:user._id,content:req.body.content}}},function(err,result){
            if(err){
                req.flash('error',err);
                return res.redirect('back');
            }
            req.flash('success', '评论成功!');
            res.redirect('back');
       });
    
    });
```


## 20 显示PV和评论
### 20.1 安装async
```
$  npm install async --save
```

### 20.2 修改模型
db/models.js
```
pv: {type:Number,default:0},
```

### 20.3 修改路由
routes/article.js
```
var async = require('async');
     router.get('/detail/:_id', function (req, res) {
         async.parallel([function(callback){
             Model('Article').findOne({_id:req.params._id}).populate('user').populate('comments.user').exec(function(err,article){
                     article.content = markdown.toHTML(article.content);
                     callback(err,article);
             });
         },function(callback){
             Model('Article').update({_id:req.params._id},{$inc:{pv:1}},callback);
         }],function(err,result){
             if(err){
                 req.flash('error',err);
                 res.redirect('back');
             }
             res.render('article/detail',{title:'查看文章',article:result[0]});
         });
     });
```

### 20.4 修改模板
views/index.ejs
```
        阅读：<%= article.pv %>|
        评论：<%= article.comments.length%>
```

## 21. 美化404中间件
### 21.1 修改404中间件
app.js
```
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      res.render("404");
    });
```
### 21.2 增加404页面模板
views/404.ejs
```
    <% include include/header.ejs%>
    <div class="container">
        <img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/20131122112727-1356352347.jpg" alt="404"/>
    </div>
    <% include include/footer.ejs%>
```

## 22 打印日志
现在给博客增加日志，实现访问日志（access.log）和错误日志（error.log）功能
把日志保存为日志文件
app.js
```
    正常日志
    var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
    app.use(logger('dev',{stream: accessLog}));
    
    错误日志
    var errorLog = fs.createWriteStream('error.log', {flags: 'a'});
    app.use(function (err, req, res, next) {
      var meta = '[' + new Date() + '] ' + req.url + '\n';
      errorLog.write(meta + err.stack + '\n');
      next();
    });    
```

## 23 发布heroKu
## 23.1 注册heroku
https://www.heroku.com/
### 23.2 先打开注册界面输入注册信息

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/heroku1.jpg" class="img-responsive">

### 23.3 验证邮箱(可用qq,不能126 163等)

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/hero2.jpg" class="img-responsive">

### 23.4 查看邮箱点击激活链接

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/heroku3.png" class="img-responsive">

### 23.5 需要设置密码

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/heroku4.png" class="img-responsive">

### 23.6 验证成功

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/heroku6.png" class="img-responsive">

### 23.7 进入控制面板
点击右上角的创建app按钮

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/hero7.png" class="img-responsive">

### 23.8 输入app名称

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/hero8.png" class="img-responsive">

### 23.9 将此APP关联到github上
要授权github登陆

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/hero9.png" class="img-responsive">

### 23.10 点击布署分支

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/heru10.png" class="img-responsive">

### 23.11 发布结果

https://zhufengpeixunblog.herokuapp.com/

