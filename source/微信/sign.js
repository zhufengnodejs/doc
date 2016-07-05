var sha1 = require('sha1');
var config = require('./config');
var Token = require('./Token');
var rawBody = require('raw-body');
var util = require('./util');



module.exports = function () {
    return function* (next) {
        var that = this;
        var token = config.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var shaStr = sha1(str);
        if (shaStr == signature) {
            if(this.method == 'GET'){
                this.body = echostr + '';
            }else if(this.method == 'POST'){
                var data = yield rawBody(this.req,{
                    length:this.length,
                    limit:'5mb',
                    encoding:this.charset
                });

                var content = yield util.parseXMLAsync(data);
                var message = util.formatMessage(content.xml);
                this.message = message;
            }
        } else {
            this.body = 'wrong';
        }
        yield next;
    }
}
