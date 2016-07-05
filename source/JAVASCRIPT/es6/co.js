var co = require('co');
var fs = require('fs');

function read(file){
    return function(fn){
        fs.readFile(file,'utf8',fn);
    }
}

co(function* (){
 var a = yield read('1.txt');
 console.log(a);

 var b = yield read('2.txt');
 console.log(b);
});