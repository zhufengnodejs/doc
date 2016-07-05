var co = require('co');
var gen = function* (){
    var v1 = yield new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('1');
        },3000);
    })
    console.log(v1);
    var v2 =yield new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('2');
        },3000);
    })
    console.log(v2);
}

co(gen());
