var cheerio = require('cheerio');
var $ = cheerio.load('<ul><li><a href="./buzz?b=353&c=10">玄幻奇幻</a></li><li><a href="./buzz?b=354&c=10">爱情</a></li></ul>');
$('ul li a').each(function () {
    var $me = $(this);
    var item = {
        name: $me.text().trim(),
        url: $me.attr('href').slice(2)
    }
    var result = item.url.match(/buzz\?b=(\d+)/);
    if (Array.isArray(result)) {
        item.id = result[1];
    }
    console.log(item);
}); 