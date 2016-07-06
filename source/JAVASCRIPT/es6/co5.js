var fs = require('fs');
function read(val) {
    return function(fn){
        setTimeout(function(){
            fn(val*val);
        },1000);
    }
}
co(function *(){
    var a = yield read(1);
    console.log(a);

    var b = yield read(2);
    console.log(b);
})();

function co(fn) {
    return function() {
        var gen = fn();
        var it = null;
        function _next(err, res) {
            if(err) res = err;
            it = gen.next(res);
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}