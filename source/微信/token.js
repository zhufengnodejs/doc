var Promise = require('bluebird');
var config = require('./config');
var request = Promise.promisify(require('request'));


function Token(options) {
    var that = this;
    this.appID = options.appID;
    this.appSecret = options.appSecret;
    this.get = options.get;
    this.set = options.set;

}

Token.prototype.ensure = function(){
    var that  = this;
    if(!that.isValid()){
        return that.get().then(function (data) {
            try {
                data = JSON.parse(data);
            } catch (e) {
                return that.update();
            }
            if (that.isValid(data)) {
                return Promise.resolve(data);
            } else {
                return that.update();
            }
        }).then(function (data) {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;
            return that.set(JSON.stringify(data));
        });
    }else{
        return Promise.resolve({
                access_token:this.access_token,
               expires_in:this.expires_in
        });
    }

}

Token.prototype.isValid = function () {
    if (!this || !this.access_token || !this.expires_in) {
        return false;
    }
    var expires_in = this.expires_in;
    var now = Date.now();
    if (now < this.expires_in) {
        return true;
    } else {
        return false;
    }
}

Token.prototype.update = function () {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = config.api.accessToken(appID, appSecret);

    return new Promise(function (resolve, reject) {
        request({url: url, json: true}).then((response)=> {
            var data = response.body;
            var now = Date.now();
            var expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;
            resolve(data);
        })
    });
}

module.exports = function(){
    return function* (next){
        var self = this;
        var token = new Token(config);
        var data = yield token.ensure();
        this.access_token = data.access_token;
        yield next;
    };
}