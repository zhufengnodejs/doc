var ejs = require('ejs');
var heredoc = require('heredoc');
var tmpl = heredoc(function () {/*
 <xml><ToUserName><![CDATA[<%=toUserName%>]]></ToUserName>
 <FromUserName><![CDATA[<%=fromUserName%>]]></FromUserName>
 <CreateTime><%=now%></CreateTime>
 <% if(msgType == 'text'){%>
     <MsgType><![CDATA[<%=msgType%>]]></MsgType>
     <Content><![CDATA[<%=content%>]]></Content>
 <%}else if(msgType == 'image'){%>
     <MsgType><![CDATA[<%=msgType%>]]></MsgType>
     <Image>
     <MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
     </Image>
 <%}else if(msgType == 'voice'){%>
     <MsgType><![CDATA[<%=msgType%>]]></MsgType>
     <Voice>
     <MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
     </Voice>
 <%}else if(msgType == 'video'){%>
 <MsgType><![CDATA[<%=msgType%>]]></MsgType>
     <Video>
     <MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
     <Title><![CDATA[<%=content.title%>]]></Title>
     <Description><![CDATA[<%=content.description%>]]></Description>
     </Video>
 <%}else if(msgType == 'music'){%>
     <MsgType><![CDATA[<%=msgType%>]]></MsgType>
     <Music>
     <Title><![CDATA[<%=content.TITLE%>]]></Title>
     <Description><![CDATA[<%=content.DESCRIPTION%>]]></Description>
     <MusicUrl><![CDATA[<%=content.MUSIC_Url%>]]></MusicUrl>
     <HQMusicUrl><![CDATA[<%=content.HQ_MUSIC_Url%>]]></HQMusicUrl>
     <ThumbMediaId><![CDATA[<%=content.media_id%>]]></ThumbMediaId>
     </Music>
 <%}else if(msgType == 'news'){%>
     <MsgType><![CDATA[<%=msgType%>]]></MsgType>
     <ArticleCount><%=content.length%></ArticleCount>
     <Articles>
        <%content.forEach(function(item){%>
         <item>
         <Title><![CDATA[<%=item.title%>]]></Title>
         <Description><![CDATA[<%=item.description%>]]></Description>
         <PicUrl><![CDATA[<%=item.picurl%>]]></PicUrl>
         <Url><![CDATA[<%=item.url%>]]></Url>
         </item>
        <%})%>
     </Articles>
 <%}%>
 </xml>
 */
});
var compiled = ejs.compile(tmpl);
exports = module.exports =compiled;
