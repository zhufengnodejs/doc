var through = require('through2');
var PluginError = require('gulp-util').PluginError;

//常量
const PLUGIN_NAME = 'gulp-prefixer';

function prefixStream(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}

// 插件级别函数 (处理文件)
function gulpPrefixer(prefixText) {
    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    }

    prefixText = new Buffer(prefixText); // 预先分配

    // 创建一个让每个文件通过的 stream 通道
    var stream = through.obj(function (file, enc, cb) {
        if (file.isBuffer()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
            return cb();
        }

        if (file.isStream()) {
            // 定义转换内容的 streamer
            var streamer = prefixStream(prefixText);
            // 从 streamer 中捕获错误，并发出一个 gulp的错误
            streamer.on('error', this.emit.bind(this, 'error'));
            // 开始转换
            file.contents = file.contents.pipe(streamer);
        }

        // 确保文件进去下一个插件
        this.push(file);
        // 告诉 stream 转换工作完成
        cb();
    });

    // 返回文件 stream
    return stream;
}

// 暴露（export）插件的主函数
module.exports = gulpPrefixer;