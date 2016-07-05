var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.set('view engine','html');
app.engine('html',require('ejs').__express);
app.set('views',__dirname);

app.use(cookieParser());

function checkUser(req,res,next){
    if(req.cookies && req.cookies.username)
      next();
    else
      res.redirect('/');
}

//进入登录页
app.get('/',function(req,res){
    res.render('index');
});

//登录
app.get('/login',function(req,res){
    res.cookie('username',req.query.username,{httpOnly:true});
    res.redirect('/user');
});

//用户页面
app.get('/user',checkUser,function(req,res){
    res.render('user',{username:req.cookies.username});
});

//用户退出
app.get('/logout',function(req,res){
    res.clearCookie('username');//清除cookie
    res.redirect('/');
});


app.listen(8080);