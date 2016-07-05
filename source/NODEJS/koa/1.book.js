var koa = require('koa');
var router = require('koa-router')();
var app = koa();

app.use(router.routes()).use(router.allowedMethods());
router.get('/', function *(next) {
    //我是首页
    //this 指向请求
    this.body = '首页';
});
router.param('id',function *(id,next){
    this.id = Number(id);
    if ( typeof this.id != 'number') return this.status = 404;
    yield next;
}).get('/detail/:id', function *(next) {
    //我是详情页面
    var id = this.id; //123
    this.body = id;
});

app.on('error', function(err,ctx){
    if (process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});

app.listen(3000);