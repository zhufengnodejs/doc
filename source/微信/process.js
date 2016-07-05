var upload = require('./upload');
var path = require('path');
module.exports = function(){
    return function* (next){
        var message = this.message;
        var toUserName = message.FromUserName;
        var fromUserName = message.ToUserName;
        var msgType= 'text';
        //事件推送
        if(message.MsgType === 'event'){
            if(message.Event='subscribe'){
                if(message.EventKey){//二维码的参数值  ticket获取二维码的图片
                    console.log('扫二维码进来的: ',message.EventKey,' ',message.ticket);
                }
                this.body = {
                    content:'哈哈,你订阅了这个号'+'消息ID:'+message.MsgId,
                    toUserName:toUserName,
                    fromUserName:fromUserName,
                    now:Date.now(),
                    msgType:'text'
                }

            }else if(message.Event == 'unsubscribe'){
                console.log('取消订阅');
                this.body = {
                    content:'你取消订阅了这个号',
                    toUserName:toUserName,
                    fromUserName:fromUserName,
                    now:Date.now(),
                    msgType:'text',
                }
            }else if(message.Event == 'LOCATION'){
                this.body = '你上报的位置是: '+message.Latitude+'/'+message.Longitude+'-'+message.Precision;
            }else if(message.Event == 'CLICK'){
                this.body = '你点击了菜单:'+message.EventKey;
            }else if(message.Event == 'SCAN'){
                console.log('关注后扫描二维码'+message.EventKey+' '+message.Ticket);
            }else if(message.Event === 'VIEW'){
                this.body = '你点击了菜单中的链接:'+message.EventKey;
            }
            //发送消息
        }else if(message.MsgType == 'text'){
            var content = message.Content;
            var reply = '你是想说 '+message.Content+' 吗?';
            if(content == '1'){
                reply = '1';
            }else if(content == '2'){
                reply = '2';
            }else if(content == '3'){
                reply = '3';
            }else if(content == '4'){
                msgType= 'news';
                reply = [
                    {
                        title:'珠峰培训',
                        description:'七年专注',
                        picurl:'https://www.baidu.com/img/bd_logo1.png',
                        url:'https://www.baidu.com/'
                    },
                    {
                        title:'珠峰在线',
                        description:'前端培训',
                        picurl:'http://img1.gtimg.com/sports/pics/hv1/132/101/2093/136123212.jpg',
                        url:'http://www.qq.com/'
                    }
                ]
            }else if(content == 5){
                var data = yield upload(this.access_token,'image',path.join(__dirname,'logo.png'));
                msgType = 'image';
                reply = {
                    media_id:data.media_id
                }
            }else if(content == 6){
                var data = yield upload(this.access_token,'video',path.join(__dirname,'1.mp4'));
                msgType = 'video';
                reply = {
                    title:'宣传片头',
                    description:'珠峰片头',
                    media_id:data.media_id
                }
            }else if(content == '7'){
                var data = yield upload(this.access_token,'image',path.join(__dirname,'logo.png'));
                msgType = 'music';
                reply={
                    type:'music',
                    title:'音乐',
                    description:'珠峰音乐',
                    musicUrl:'',
                    thumbMediaId:data.media_id
                }
            }else if(content == 8){
                var data = yield upload(this.access_token,'image',path.join(__dirname,'logo.png'),{type:'image'});
                msgType = 'image';
                reply = {
                    media_id:data.media_id
                }
            }else if(content == 9){
                var data = yield upload(this.access_token,'video',path.join(__dirname,'1.mp4'),{type:'video',description:'{"title":"zfpx","introduction":"easy"}'});
                msgType = 'video';
                reply = {
                    title:'宣传片头',
                    description:'珠峰片头',
                    media_id:data.media_id
                }
            }
            this.body = {
                content:reply,
                toUserName:toUserName,
                fromUserName:fromUserName,
                now:Date.now(),
                msgType:msgType,
            }
        }
        yield next;
    }
}