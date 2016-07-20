var fs = require('fs');
function double(val) {
    return function(next){
        setTimeout(function(){
            next(val*val);
        },1000);
    }
}
co(function *(){
    var a = yield double(2);
    console.log(a);

    var b = yield double(3);
    console.log(b);
})();

function co(fn) {
    return function() {
        var it = fn();//得到迭代器
        var curr = null;//当前对象
        function next(val) {
            curr = it.next(val);
            if(!curr.done){
                curr.value(next);
            }
        }
        next();
    }
}