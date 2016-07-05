var util = require('./util');
var TOKEN_FILE = './wechat.txt';
var prefix = 'https://api.weixin.qq.com/cgi-bin';

module.exports = {
    appID: 'wx4bc04730ea7aa5ca',
    appSecret: '1cbfbc33bf3af7aced8e89ea06dcdb98',
    token: 'zhufengpeixun',
    get: function () {
        return util.readFileAsync(TOKEN_FILE);
    },
    set: function (data) {
        return util.writeFileAsync(TOKEN_FILE, data);
    },
    api: {
        accessToken: (appid, secret)=>`${prefix}/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
        temporary:{
            upload: (token, type)=>`${prefix}/media/upload?access_token=${token}&type=${type}"`,
            fetch:(token)=>`${prefix}/media/get`
        },
        permanent:{
            upload:(token) => `${prefix}/add_material`,
            uploadNews:(token) => `${prefix}/add_news`,
            uploadNewsPic:(token) => `${prefix}/uploadimg`,
            fetch:(token) => `${prefix}/fetch`,
        },
        group:{
            create:`${prefix}/groups/create?`,
            get:`${prefix}/groups/get?`,
            check:`${prefix}/groups/getid?`,
            update:`${prefix}/groups/create?`,
            move:`${prefix}/groups/members/update?`,
            batchUpdate:`${prefix}/groups/members/batchupdate?`,
            del:`${prefix}/groups/members/delete?`,
        }

    }
}