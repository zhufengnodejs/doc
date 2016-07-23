var express = require('./express');
var app = express();
app.get('/',function(req,res){
    res.end('welcome to  homepage');
});
app.get('/about',function(req,res){
    res.end('welcome to about page');
})
app.get("*",function(req,res){
    res.end("404");
})
app.listen(3000);