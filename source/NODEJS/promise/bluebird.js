var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var sb = readFile('1.txt','utf8').then(function(data){
    console.log(data);
    return Promise.resolve('hello')
}).then(function(re){
    console.log(re);
});

console.log(sb);