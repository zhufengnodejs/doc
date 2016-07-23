var express = require('express');
var app = express();
var path = require('path');
function filter1(req,res,next){
    console.log('filter1');
    next();
}
function filter2(req,res,next){
    console.log('filter2');
    next();
}
app.use(filter1);
app.use(filter2);
app.use('/get',function(req,res){
    res.send('hello');
});
app.listen(3000);