var fs = require('fs');
var Promise = require('bluebird');
var xml2js = require('xml2js');
exports.readFileAsync = function (path, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, encoding, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

exports.writeFileAsync = function (path, data, encoding) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, encoding, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        })
    });
}

exports.parseXMLAsync = function (xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function (err, content) {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
}

function formatMessage(xml) {
    var message = {};
    if (typeof xml == 'object') {
        var keys = Object.keys(xml);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var item = xml[keys[i]];
            if(!(item instanceof Array) || item.length === 0){
                continue;
            }
            if(item.length == 1){
                var val = item[0];
                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val || '').trim();
                }
            }else{
                message[key] = [];
                for(var j=0,k = item.length;j<k;j++){
                    message[key].push(formatMessage([item[j]]));
                }
            }
        }
    }
    return message;
}

exports.formatMessage = function (xml) {
    return formatMessage(xml);
}