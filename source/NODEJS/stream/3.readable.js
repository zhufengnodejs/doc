var Readable = require('stream').Readable;
var rs = Readable();

var c = 97 - 1;

rs._read = function () {
    if (c >= 'z'.charCodeAt(0)) return rs.push(null);

    setTimeout(function () {
        rs.push(String.fromCharCode(++c));
    }, 100);
};

rs.on('readable',function(data){
   var ch = rs.read(3);
    console.log(ch);
});
rs.on('end',function(data){
    console.log('end');
});