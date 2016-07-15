var str = '<a href="http://top.baidu.com/buzz?b=353&amp;c=10&amp;fr=topcategory_c10">玄幻奇幻</a><a href="http://top.baidu.com/buzz?b=355&amp;c=10&amp;fr=topcategory_c10">都市言情</a>';

var reg = /<a href="http:\/\/top.baidu.com\/buzz\?b=\d+&amp;c=\d+&amp;fr=topcategory_c\d+">.+<\/a>/g;

console.log(reg.test(str));
console.log(reg.exec(str));
console.log(str.match(reg));


var request = require('request');
var iconv = require('iconv-lite');
request({url: 'http://top.baidu.com/category?c=10&fr=topindex', encoding: null},function(err,response,body){
    if(err)
        console.error(err);
    body = iconv.decode(body, 'gbk').toString();
    var regex = /<a href=".\/buzz\?b=\d+&c=\d+">.+<\/a>/g;
    console.log(body.match(regex));
})