var Readable = require('stream').Readable;

var rs = new Readable();
rs.push('123');//告诉消费者rs准备输出数据了,触发data事件
rs.push('456');
rs.push(null);

rs.on('data',function(data){
    console.log('data:',data.toString());
});
rs.on('end',function(data){
    console.log('end');
});

 var app = document.getElementById('app');
app.appendChild();
