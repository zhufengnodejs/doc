var Koa = require('koa');
var token = require('./token')
var sign = require('./sign');
var process = require('./process');
var render = require('./render');
var app = new Koa();
app.use(token());
app.use(sign());
app.use(process());
app.use(render());
app.listen(9090);
console.log('start listening at 9090');
