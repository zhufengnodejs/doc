
var url = require('url');
var app = function(req, res) {
    app.handle(req, res);
};
//路由容器
app.router = [];
app.get = function(path,fn){
  app.router.push({method:'get',path:path,fn:fn});
}

app.all = function(path,fn){
    app.router.push({method:'all',path:path,fn:fn});
}

/*app.handle = function(req, res) {
    var method = req.method.toLowerCase();
    var path = url.parse(req.url).pathname;
    var routes = app.router;
    for(var i=0;i<routes.length;i++){
        var route = routes[i];
        console.log(route.method ,method , route.path , path);
        if((route.method == 'all' || route.method == method) && (route.path == path || route.path == '*')){
            route.fn(req,res);
        }
    }
}*/

app.handle = function(req, res) {
    var method = req.method.toLowerCase();
    var path = url.parse(req.url).pathname;
    var routes = app.router;
    var index = 0;
    function next(){
        var route = routes[index++];
        if((route.method == 'all' || route.method == method) && (route.path == path || route.path == '*')){
            var fn = route.fn;
            var length = fn.length;
            if(length==2){
                route.fn(req,res);
                next();
            }else{
                route.fn(req,res,next);
            }
        }
    }
    next();
}

app.use = function(path,fn){
    app.router.push({method:'all',path:path?path:'/',fn:fn});
}

app.listen = function(port){
    require('http').createServer(app).listen(port);
}

module.exports = function(){
    return app;
}