var config = require('./config');
var fs = require('fs');
var Promise = require('bluebird');
var _ = require('lodash');
var request = Promise.promisify(require('request'));

module.exports = function (access_token,type,material,permanent){
    var form = {};
    var uploadUrl = config.api.temporary.upload(access_token,type);
    if(permanent){//如果是永久上传
        uploadUrl = config.api.permanent.upload(access_token,type);//素材上传
        _.extend(form,permanent);
    }
    if(type == 'pic'){//图片
        uploadUrl = config.api.permanent.uploadNewsPic(access_token,type);
    }
    if(type == 'news'){//图文
        uploadUrl = config.api.permanent.uploadNews(access_token,type);
        form = material;
    }else{
        form.media = fs.createReadStream(material);
    }
    return new Promise(function(resolve,reject){
        var options = {
            method:'POST',
            url: uploadUrl,
            json: true
        }
        if(type == 'news'){
            options.body = form;
        }else{
            options.formData = form;
        }
        //console.log(options);
        request(options).then((response)=> {
            var result = response.body;
            console.error(result);
            if(result){
                resolve(result);
            }else{
                throw new Error('上传失败');
            }
        }).catch(function(err){
            reject(err)
        })
    })
}