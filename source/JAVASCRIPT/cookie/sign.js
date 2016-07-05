var crypto = require('crypto');
var sign = function(val, secret){
    return val + '.' + crypto
            .createHmac('sha256', secret)
            .update(val)
            .digest('base64')
            .replace(/\=+$/, '');
};

console.log(sign('123','zfpx'));