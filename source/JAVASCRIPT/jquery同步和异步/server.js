var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    if(req.url == '/sync'){
        fs.createReadStream('sync.html').pipe(res);
    }else if(req.url == '/async'){
        fs.createReadStream('async.html').pipe(res);
    } else if(req.url == '/ajax'){
        setTimeout(function(){
            res.end('ok');
        },5000);
    }else{
        res.end('Not Found');
    }
}).listen(8080);