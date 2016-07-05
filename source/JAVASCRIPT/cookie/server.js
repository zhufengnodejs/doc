var express = require('express');
var app = express();
app.get('/write',function(req,res){
    res.setHeader('Set-Cookie','name=zfpx');
    res.end('Set-Cookie: name=zfpx');
});

app.get('/read',function(req,res){
   res.send(req.headers['cookie']);
});

app.listen(9090);