var fs = require('fs');
function read(file) {
    return function(fn){
        fs.readFile(file, 'utf8', fn);
    }
}
co(function *(){
    var a = yield read('1.txt');
    console.log(a);

    var b = yield read('2.txt');
    console.log(b);
})();

function co(fn) {
    return function(done) {
        var ctx = this;
        var gen = fn.call(ctx);
        var it = null;
        function _next(err, res) {
            if(err) res = err;
            it = gen.next(res);
            //{value:function(){},done:false}
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}