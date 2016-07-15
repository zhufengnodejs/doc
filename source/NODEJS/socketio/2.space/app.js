var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    var inRoom;
    socket.on('message', function (msg) {
        if(inRoom){
            io.in(inRoom).emit('message',msg);
        }else{
            io.emit('message',msg);
        }

    });
    socket.on('join', function (room) {
        socket.join(room);
        io.emit('message','加入'+room);
        inRoom = room;
    });
});

server.listen(80);