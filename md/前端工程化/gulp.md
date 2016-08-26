## 1. 什么是gulp
`gulp`是可以自动化执行任务的工具
在平时开发的流程里面,一定有一些任务需要手工重复得执行，比如:

-  把文件从开发目录**拷贝**到生产目录
-  把多个 JS 或者 CSS 文件**合并**成一个文件
-  对JS文件和CSS进行**压缩**
-  把`sass`或者`less`文件**编译**成`CSS`
-  **压缩图像**文件
-  创建一个可以**实时刷新**页面内容的本地服务器

只要你觉得有些动作是要**重复**去做的,就可以把这些动作创建成一个gulp任务
然后在指定的条件下自动执行
比如在less源文件发生改变后自动编译成css文件


## 2. gulp特点

* **易于使用** 通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。
* **快速构建** 利用 node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。前一级的输出，直接变成后一级的输入，使得在操作上非常简单
* **高质量的插件** Gulp 严格的插件指南确保插件如你期望的那样简洁地工作。
* **易于学习** 通过最少的 API，掌握 gulp 毫不费力，构建工作尽在掌握。

## 3. 流
### 3.1 流的概念
* **Stream**是`nodejs`各种对象实现的抽象接口。
* 所有的`stream`对象都是`EventEmitter`的实例,可以发射事件。
* 流是一种有**起点**和**终点**的**数据传输**手段。
* 上一个的**输出**是下一个的**输入**

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/eat.jpg" class="img-responsive">

### 3.2 gulp中的流
* gulp正是通过**代码**优于配置的策略来尽量简化任务编写的工作。
* 类似`jquery`里的**链式**操作，把各个方法串连起来构建完整的任务。
* 用gulp编写任务也可看作是用`Node.js`代码编写任务。
* 当使用流时,gulp不需要生成大量的**中间**文件，只将最后的输出写入磁盘，整个过程因此变得非常快。

## 3. 安装gulp
在项目里使用gulp需要
* 安装node
* 在全局范围内去安装一下gulp的命令行工具
* 然后在项目里面再去本地安装gulp

### 5.1 安装node
gulp是基于Nodejs的自动任务运行器
安装Gulp和相关行件用的都是node的包管理工具`npm`
所以你需要先在电脑上安装 node,确定在命令行工具的下面可以使用npm这个命令，这样就能去安装Gulp了

[node.js官网](https://nodejs.org/en/)

安装好以后，我们可以打开命令行工具，mac 用户可以使用终端工具，windows 用户可以找到cmd命令行工具。

### 5.2 gulp 命令行工具
- 使用 `npm install` 去安装  gulp，注意加上一个 `-g` 的参数，表示在全局范围内去安装.
- 一般用 npm 安装的时候用一个 -g 的参数就表示，这个安装的东西会作为命令去执行。
- 如果你在mac或linux下遇到了权限问题,在下面这个命令的前面加上 `sudo npm install gulp -g` 并输入mac密码。
```
$ npm install -g gulp
```
安装完成后可以输入 `gulp --help`
如果输出一些帮助的信息就表示可以gulp命令行成功安装了

如果安装不上可以换一下源试试

- 淘宝源
npm install -g gulp --registry=http://registry.npm.taobao.org
- 中国源
npm install -g gulp --registry=http://registry.cnpmjs.org
- 官方源
npm install -g gulp --registry=http://www.npmjs.org/

### 5.3 gulp本地安装
1. 先创建一个目录
在 **mac** 和 **linux** 操作系统下创建一个文件夹
```
$ mkdir learngulp
```

2. 使用 `cd` 命令进入此目录
```
$ cd learngulp
```

3. 创建项目描述文件`package.json`
项目需要一个叫`package.json`的文件来管理项目的配置,可以使用 `npm init` 这个命令生成
```
$ npm init

	name: (zhufeng_automation) learngulp //项目名称
	version: (1.0.0) 1.0.0   //项目版本号
	description: learn gulp //项目说明
	entry point: (index.js) index.js // 入口文件
	test command: test.js //测试脚本 执行npm test时会执行此文件
	git repository: (https://github.git) //模块的git仓库
	keywords: node.js gulp  //在npmjs官网搜索时的关键字
	author: zhufengpeixun //项目作者名字
	license: (ISC) MIT //授权协议
	About to write to D:\mygit\zhufeng_automation\package.json:
	Is this ok? (yes) yes //直接回车确认
```
回车后会在当前目录下创建一个 **package.json** 文件

## 4. 安装gulp
4. 本地安装gulp到开发依赖中
```
$ npm install gulp --save-dev
```
这样可以把 gulp 作为项目的开发依赖(只在开发时用，不会发布到线上)
第一会在`node_modules`下安装本地的`gulp`库
第二会把并把添加配置到`package.json`文件里面

```diff
    "devDependencies": {
+        "gulp": "^3.9.0"
      }
```

## 5. 运行gulp
### 5.1 创建配置文件
gulp的任务要放到一个叫 `gulpfile.js` 的文件里面
先在项目的根目录下面创建一个这样的文件
然后在这个文件的顶部添加下面这行代码
```diff
+   var gulp = require('gulp');
```
通过`require`可以把`gulp`模块引入当前项目并赋值给`gulp`变量
这样`gulp`这个变量里面就会拥有gulp的所有的方法了

### 5.2 创建gulp的任务
可以使用gulp的task方法
同样我们去创建一个叫 hello 的任务，它要做的事就是在控制台上输出 **"您好"** 这两个字
1. 第一个参数是任务的名称
2. 第二个参数是任务的定义,是一个匿名函数
```javascript
    gulp.task('hello', function () {
      console.log('您好');
    });
```

### 5.3 执行gulp任务
打开命令行工具，进入到项目所在的目录，然后输入：
```
$ gulp hello
```
会返回：
```
    [21:36:34] Starting 'hello'...
    您好
    [21:36:34] Finished 'hello' after 959 μs
```
gulp后面跟着的是任务的名称
不输入任务名称的话会默认找`default`任务，找不到会报错

### 5.4 执行其它任务
可以使用
```
$ gulp <task> <othertask>
```

## 6. gulp参数
gulp 只有你需要熟知的参数标记，其他所有的参数标记只在一些任务需要的时候使用。

* -v 或 --version 会显示全局和项目本地所安装的 gulp**版本号**
* --gulpfile <gulpfile path> 手动指定一个 gulpfile 的**路径**，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
* --cwd dirpath 手动指定 CWD。定义 gulpfile **查找的位置**，此外，所有的相应的依赖（require）会从这里开始计算相对路径
* -T 或 --tasks 会显示所指定 gulpfile 的 task **依赖树**
* --color 强制 gulp 和 gulp 插件**显示颜色**，即便没有颜色支持
* --no-color 强制**不显示颜色**，即便检测到有颜色支持
* --silent **禁止**所有的 gulp **日志**


## 7. gulp.js工作方式
gulp的使用流程一般是
1. 首先通过gulp.src()方法获取到想要处理的文件流
2. 然后把文件流通过pipe方法导入到gulp的插件中
3. 最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中
4. gulp.dest()方法则把流中的内容写入到文件中

```javascript
    var gulp = require('gulp');
    gulp.src('script/src.js')             // 获取文件的流的api
        .pipe(gulp.dest('dist/dest.js')); // 写文件的api
```

## 8. gulp核心API
gulp只有4个核心API

### 8.1 gulp.src()
在Gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的stream
然后可以通过stream的`pipe`方法把流导入到你想要的地方
比如Gulp的**插件**中,经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到**文件**中
所以Gulp是以stream为媒介的，它不需要频繁的生成**临时文件**，这也是Gulp的速度快的一个原因
`gulp.src()`方法正是用来获取流的

但要注意这个流里的内容不是原始的文件流,而是一个**虚拟文件对象流**,这个虚拟文件对象中存储着原始文件的路径、文件名和内容等信息
[vinyl](https://github.com/gulpjs/vinyl)
```javascript
var File = require('vinyl');

var indexFile = new File({
    cwd: "/",
    base: "/test/",
    path: "/test/index.js",
    contents: new Buffer("name=zfpx")
});

console.log(File.isVinyl(indexFile));
console.log(indexFile.isBuffer());
console.log(indexFile.isStream());
```

其语法为：
```javascript
    gulp.src(globs[, options])
```

- **globs**  参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组
- **options**  为可选参数。通常情况下我们不需要用到

### 8.2 glob语法
gulp内部使用了`node-glob`模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符来匹配我们想要的文件：
#### 8.2.1 glob规则
<table>
<tr><td>匹配符</td><td>说明</td></tr>
<tr><td>*</td><td>匹配文件路径中的0个或多个字符，但不会匹配路径分隔符</td></tr>
<tr><td>**</td><td>匹配路径中的0个或多个目录及其子目录</td></tr>
<tr><td>?</td><td>匹配文件路径中的一个字符(不会匹配路径分隔符)</td></tr>
<tr><td>[...]</td><td>匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个</td></tr>
<tr><td>!(pattern|pattern|pattern)</td><td>匹配任何与括号中给定的任一模式都不匹配的</td></tr>
<tr><td>?(pattern|pattern|pattern)</td><td>匹配括号中给定的任一模式0次或1次，类似于js正则中的(pattern|pattern|pattern)?</td></tr>
<tr><td>+(pattern|pattern|pattern)</td><td>匹配括号中给定的任一模式至少1次，类似于js正则中的(pattern|pattern|pattern)+</td></tr>
<tr><td>*(pattern|pattern|pattern)</td><td>匹配括号中给定的任一模式0次或多次，类似于js正则中的(pattern|pattern|pattern)*</td></tr>
<tr><td>@(pattern|pattern|pattern)</td><td>匹配括号中给定的任一模式1次，类似于js正则中的(pattern|pattern|pattern)</td></tr>
</table>

#### 8.2.2 glob示例
<table>
<tr><td>glob</td><td>匹配</td></tr>
<tr><td>\*</td><td>能匹配 a.js,x.y,abc,abc/,但不能匹配a/b.js</td></tr>
<tr><td>\*.\*</td><td>a.js,style.css,a.b,x.y</td></tr>
<tr><td>\*/\*/\*.js</td><td>能匹配 a/b/c.js,x/y/z.js,不能匹配a/b.js,a/b/c/d.js</td></tr>
<tr><td>\*\*</td><td>能匹配 abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件</td></tr>
<tr><td>a/\*\*/z</td><td>能匹配 a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z</td></tr>
<tr><td>a/\*\*b/z</td><td>能匹配 a/b/z,a/sb/z,但不能匹配a/x/sb/z,因为只有单**单独出现才能匹配多级目录</td></tr>
<tr><td>?.js</td><td>能匹配 a.js,b.js,c.js</td></tr>
<tr><td>a??</td><td>能匹配 a.b,abc,但不能匹配ab/,因为它不会匹配路径分隔符</td></tr>
<tr><td>[xyz].js</td><td>只能匹配 x.js,y.js,z.js,不会匹配xy.js,xyz.js等,整个中括号只代表一个字符</td></tr>
<tr><td>[^xyz].js</td><td>能匹配 a.js,b.js,c.js等,不能匹配x.js,y.js,z.js</td></tr>
</table>


### 8.3 gulp.dest()
是用来向硬盘写入文件的，其语法为：
```javascript
     gulp.dest(path[,options])
```
- **path** 为写入文件的路径
- **options** 为一个可选的参数对象，通常我们不需要用到

要想使用好`gulp.dest()`这个方法，就要理解给它传入的路径参数与最终生成的文件的关系。

`gulp.dest()`传入的路径参数只能用来指定要生成的文件的**目录**,而不能指定生成文件的文件名
它生成文件的文件名使用的是**导入**到它的文件流自身的文件名
所以生成的文件名是由导入到它的文件流决定的
```javascript
     var gulp = require('gulp');
     gulp.src('script/jquery.js')
    .pipe(gulp.dest('dist/jquery.js'));
    //最终生成的文件路径为 dist/jquery.js/jquery.js,而不是dist/jquery.js
```
> `gulp.dest(path)`生成的文件路径是我们传入的path参数后面再加上`gulp.src()`中有通配符开始出现的那部分路径

> 通过指定`gulp.src()`方法配置参数中的`base`属性，我们可以更灵活的来改变`gulp.dest()`生成的文件路径
```javascript
 //配置了base参数，此时base路径为script
gulp.src(script/lib/*.js, {base:'script'})
    //假设匹配到的文件为script/lib/jquery.js
    //此时生成的文件路径为 build/lib/jquery.js
    .pipe(gulp.dest('build'))
```

### 8.4 gulp.task()

`gulp.task`方法用来定义任务，其语法为：
```javascript
    gulp.task(name[, deps], fn)
```
- **name** 为任务**名称**
- **deps** 是当前定义的任务需要**依赖**的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数
- **fn** 为**任务定义函数**，我们把任务要执行的代码都写在里面。该参数也是可选的。
```javascript
    gulp.task('mytask', ['array', 'of', 'task', 'names'],
     function() { //定义一个有依赖的任务
        // Do something
    });
```

> 如果某个任务所依赖的任务是异步的，就要注意了，gulp并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务

```javascript
//two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
gulp.task('one',function(){
      //one是一个异步执行的任务
      setTimeout(function(){
        console.log('one is done')
      },5000);
    });
 gulp.task('two',['one'],function(){
      console.log('two is done');
    });
```

在异步操作完成后执行一个**回调函数**来通知gulp这个异步任务已经完成,这个回调函数就是任务函数的第一个参数
```javascript
 gulp.task('one',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
      //one是一个异步执行的任务
      setTimeout(function(){
        console.log('one is done');
        cb();  //执行回调，表示这个异步任务已经完成
      },5000);
    });
```

## 8.5 gulp.watch()
用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件拷贝等。其语法为
```javascript
    gulp.watch(glob[, opts], tasks)
```
- **glob** 为要监视的文件匹配模式，规则和用法与`gulp.src()`方法中的 **glob** 相同。
- **opts** 为一个可选的配置对象，通常不需要用到
- **tasks** 为文件变化后要执行的任务，为一个数组
```javascript
    gulp.task('uglify',function(){
      //do something
    });
    gulp.task('reload',function(){
      //do something
    });
    gulp.watch('js/**/*.js', ['uglify','reload']);
```

另外一种使用方式：
```javascript
    gulp.watch(glob[, opts, cb])
```
- **glob**和 **opts** 参数与第一种用法相同
- `cb`参数为一个函数。每当监视的文件发生变化时，就会调用这个函数,并且会给它传入一个对象，该对象包含了文件变化的一些信息  `type`属性为变化的类型，可以是 **added**、**changed**、**deleted**和**path**属性为发生变化的文件的路径
```javascript
     gulp.watch('js/**/*.js', function(event){
      //变化类型 added为新增,deleted为删除，changed为改变
      console.log(event.type);
      //变化的文件的路径
      console.log(event.path);
    });
```

## 9.基本任务
### 9.1 复制单个文件
```javascript
 var gulp = require('gulp');
     gulp.task('copy-html',function(){
         return gulp.src('app/index.html').pipe(gulp.dest('dist'));
     });
```

### 9.2 复制多个文件

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/copyallthings.jpg" class="img-responsive">
```javascript
    var gulp = require('gulp');
    //复制图片
    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/*.jpg')
        .pipe(gulp.dest('dist'));
    });

    /**
     * 1. {} 里可以指定多个扩展名
     * 2. * 匹配所有的字符，除了路径分隔符 /
     * 3. ** 匹配所有的字符，包括路径分隔符 /
     */
    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/**/*.{jpg,png}')
        .pipe(gulp.dest('dist'));
    });

    /**
     * 1. 匹配多个目录 glob
     * 2. 可以填写一个数组
     */
    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js'],{base:'app'})
        .pipe(gulp.dest('dist'));
    });

    /**
     * 1. 匹配多个目录 glob
     * 2. !表示 排除一个文件
     */
    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js'
        ,'!app/js/*.tmp.js'],{base:'app'})
        .pipe(gulp.dest('dist'));
    });

```


### 9.3 组合任务
```javascript
 var gulp = require('gulp');

    gulp.task('copy-html',function(){
        return gulp.src('app/index.html').pipe(gulp.dest('dist'));
    });

    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/**/*.{jpg,png}').pipe(gulp.dest('dist'));
    });

    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js','app/js/*.tmp.js'],{base:'app'}).pipe(gulp.dest('dist'));
    });


    gulp.task('default',['copy-html','copy-images','copy-other'],function(){
        console.log('全部拷贝任务执行完毕!');
    });
```

### 9.4 监听任务
使用 gulp 的 watch 这个方法，我们可以去监视一些文件，当这些文件发生变化的时候，立即去执行一些指定的任务
```javascript
var gulp = require('gulp');

    gulp.task('copy-html',function(){
        return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
    });

    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/**/*.{jpg,png}',{base:'app'})
        .pipe(gulp.dest('dist'));
    });

    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js'
        ,'app/js/*.tmp.js'],{base:'app'}).pipe(gulp.dest('dist'));
    });

    //在执行watch的时候会监控index.html文件的变化，发生变化后可以执行拷贝html的任务
    gulp.task('default',function(){
        gulp.watch('app/index.html',['copy-html']);
        gulp.watch('app/imgs/**/*.{jpg,png}',['copy-images']);
        gulp.watch(['app/css/*.css','app/js/*.js'
        ,'app/js/*.tmp.js'],['copy-other']);
    });
```

## 10. gulp插件
gulp提供了一些很实用的接口，但本身并不能做太多的事情
可以读取文件、写入文件以及监控文件等一少部分功能
其它实用的功能都是依靠插件来进行扩展的
这些插件可以实现比如

- 编译 Sass：gulp-sass
- 编译 Less：gulp-less
- 合并文件：gulp-concat
- 压缩js 文件：gulp-uglify
- 重命名js文件：gulp-rename
- 优化图像大小：gulp-imagemin
- 压缩css 文件：gulp-minify-css
- 创建本地服务器：gulp-connect
- 实时预览  gulp-connect


### 10.1 使用插件步骤
1. `npm install xxx --save-dev` 安装插件
2. 在 **gulpfile.js** 顶部引入此插件
3. 在创建任务的时候使用此插件

### 10.2  gulp-load-plugins
这个插件能自动帮你加载`package.json`文件里的gulp插件。
例如假设你的package.json文件里的依赖是这样的:
```javascript
    "devDependencies": {
       "gulp": "^3.9.0",
       "gulp-concat": "^2.6.0",
       "gulp-connect": "^2.2.0"
     }
```
然后我们可以在`gulpfile.js`中使用`gulp-load-plugins`来帮我们加载插件
```javascript
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
```
然后我们要使用`gulp-concat`和`gulp-connect`这两个插件的时候，
就可以使用`$.concat`和`$.connect`来代替了,也就是原始插件名去掉`gulp-`前缀，之后再转换为驼峰命名。

### 10.3  less
less插件可以把less文件编译成css
```
$    npm install gulp-less --save-dev
```
```javascript
var gulp = require('gulp');
    var less = require('gulp-less');

    gulp.task('less',function(){
        return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
    });

    gulp.task('default',['less']);
```

### 10.4 gulp-concat
这个插件可以把几个文件合并到一块
```
$    npm install gulp-concat --save-dev
```
```javascript
  var gulp = require('gulp');
  var concat = require('gulp-concat');

  gulp.task('concat',function(){
      return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])//指定要合并的文件glob
          .pipe(concat('app.js'))//进行合并并指定合并后的文件名
          .pipe(gulp.dest('dist/js'));//输出到目标路径
  });

  gulp.task('default',['concat']);
```
### 10.5  gulp-uglify
合并后我们可以对JS文件进行压缩,最小化处理
```
$  npm install gulp-uglify --save-dev
```
```javascript
    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify')

    gulp.task('uglify',function(){
        return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])
            .pipe(concat('app.js')) //把多个JS文件合并成一个文件
            .pipe(uglify()) //对合并后的app.js文件进行压缩
            .pipe(gulp.dest('dist/js')); //输出到目的地
    });

    gulp.task('default',['uglify']);
```

### 10.6  gulp-rename
在把处理好的文件存放到指定的位置之前，我们可以先去重新命名一下它
```
$ npm install gulp-rename --save-dev
```

```javascript
    var gulp = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    gulp.task('uglify',function(){
        return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])//指定要处理的文件
            .pipe(concat('app.js'))//合并成一个文件
            .pipe(gulp.dest('dist/js'))//保存此文件
            .pipe(uglify())//进行压缩
            .pipe(rename('app.min.js'))//对此文件进行重命名
            .pipe(gulp.dest('dist/js'));//再输出一次
    });

    gulp.task('default',['uglify']);
```

### 10.7  gulp-minify-css
压缩css
```
$    npm install gulp-minify-css --save-dev
```
```javascript
   var gulp = require('gulp');
    var less = require('gulp-less');
    var minify = require('gulp-minify-css');//在文件的顶部去包含这个插件，起个名字，叫做 minify
    var rename = require('gulp-rename');
    gulp.task('minify',function(){
        return gulp.src('app/less/page.less')//指定 less文件
            .pipe(less())//把less编译成css
            .pipe(gulp.dest('dist/css'))//输出到目的地
            .pipe(minify())//对 css再进行压缩
            .pipe(rename('page.min.css'))//重命名
            .pipe(gulp.dest('dist/css'));//输出到目的地
    });

    gulp.task('default',['less']);
```

### 10.8  gulp-minify-html
html文件压缩
```
$ npm install gulp-minify-html --save-dev
```
```javascript
    var gulp = require('gulp'),
        minifyHtml = require("gulp-minify-html");

    gulp.task('minify-html', function () {
        gulp.src('src/*.html') // 要压缩的html文件
        .pipe(minifyHtml())    //压缩
        .pipe(gulp.dest('dist/html'));//输出到目的地
    });
```
### 10.9  gulp-imagemin
如果要想在保证不改变图像质量的情况下，让图像文件的体积变得更小一点,我们可以使用`gulp-imagemin  `
```
$ npm install gulp-imagemin --save-dev
```

```javascript
 var gulp = require('gulp');
 var imagemin = require('gulp-imagemin');

 gulp.task('copy-images',function(){
     return gulp.src('app/imgs/**/*.{jpg,png}')//指定要压缩的图片
         .pipe(imagemin()) //进行图片压缩
         .pipe(gulp.dest('dist'));//输出目的地
 });

  gulp.task('default',['copy-images']);
```


### 10.10 gulp-connect
有些时候我们需要把文件放到本地服务器上去预览，gulp-connect可以帮我们创建一个本地服务器去运行我们的项目
```
     npm install gulp-connect --save-dev
```
```javascript
    var gulp = require('gulp');
    var connect = require('gulp-connect');

    gulp.task('server',function(){
       connect.server({
           root:'dist',//服务器的根目录
           port:8080 //服务器的地址，没有此配置项默认也是 8080
       });
    });

    gulp.task('default',['server']); //运行此任务的时候会在8080上启动服务器，
```


### 10.11 自动刷新
我们希望当文件变化的时候浏览器可以自动刷新，这样我们就不需要文件修改后手动去刷新浏览器了
```javascript
    var gulp = require('gulp');
    var connect = require('gulp-connect');

    gulp.task('copy-html',function(){
         gulp.src('app/index.html')//指定源文件
             .pipe(gulp.dest('dist'))//拷贝到dist目录
             .pipe(connect.reload());//通知浏览器重启
    });

    gulp.task('watch',function(){
        gulp.watch('app/index.html',['copy-html']);//当index.html文件变化时执行copy-html任务
    });

    gulp.task('server',function(){
        connect.server({
            root:'dist',//服务器的根目录
            port:8080, //服务器的地址，没有此配置项默认也是 8080
            livereload:true//启用实时刷新的功能
        });
    });
    gulp.task('default',['server','watch']);//运行此任务的时候会在8080上启动服务器，
```

### 10.12 jshint
可以用此插件进行代码检查,注意必须同时安装jshint和gulp-jshint
[全部选项](http://jshint.com/docs/options/)
```
npm install jshint gulp-jshint  --save-dev
```

```javascript
    var gulp = require('gulp'),
        jshint = require("gulp-jshint");

    gulp.task('jsLint', function () {
        gulp.src('src/*.js')
        .pipe(jshint()) //进行代码检查
        .pipe(jshint.reporter()); // 输出检查结果
    });
```

## 11 gulp.js 特点
1. 使用gulp.js构建的是代码不是配置文件
2. 使用node标准库编写脚本
3. 插件非常简单，职责单一
4. 任务都是最大的并发数执行

## 12 学习建议

- 多了解插件库，利用最合适的插件。
- 常用的插件，仔细阅读 文档以便更好使用。
- 学习好自身的API
- 尝试编写适合自己工作流程中和习惯的`plugin`


## 13 项目实战
### 13.1 安装生成器`gulp-webapp`
[yeoman](http://yeoman.io)

### 13.2 生成项目
```
$    mkdir gulpstart
$    cd gulpstart
$    npm install generator-gulp-webapp@0.2.0 -g
$    yo gulp-webapp gulpstart
```

会打开一个向导，在这里为了简化起见，我们不使用任何第三方库。
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/gulpdemo.jpg" class="img-responsive">

### 13.3 阅读gulpfile.js文件
```javascript
/* jshint node:true */
'use strict';
// generated on 2015-10-15 using generator-gulp-webapp 0.2.0
//使用require把gulp引入进来
var gulp = require('gulp');
/**
 * 读取package.json中的devDependencies配置项，调用gulp api把相关的插件加载进来
 * 返回一个object,每个key指向各自的插件，把对象赋值给 $,后面可以用$获取每个插件的引用
 * 如果不使用gulp-load-plugins,就可以使用require引入插件 如
 *  var sass = require('gulp-sass');
 *
 */
var $ = require('gulp-load-plugins')();

/**
 * 1.此插件是用来编译sass的
 * 2.
 */
gulp.task('styles', function () {
  //把执行结果返回，以便此任务可以跟后续的任务配合依次执行。将多个小的操作进行组合，连接在一起就是流，数据依次从源头穿过一个个的管道，依次执行，最终在底部得到结果，可以很好的进行数据的转换
  return gulp.src('app/styles/main.scss')//读取此文件到数据流中
  /**
   * 1.pipe是steam模块中负责传递流数据的方法，把前一个流里的数据以管道的方式传递给下一个管道。
   * 2.标准的流当期中一个管道出错的时候会触发unpipe事件，会导致gulp报错并强制退出
   * 我们现在监听main.scss文件的变化，一旦变化时会执行rubySass,但如果sass有语法错误，执行rubySass的时候会报错，会导致gulp报错并强制退出从而导致整个任务失败，watch就会失败，只能重启gulp服务。
   * 然后不停的失败再重启，这样肯定是不可接受的。
   * 3.plumber是水管工的意思，plumber通过替换pipe方法并移除onerror处理函数，这样即使有管道出问题了不会影响其它管道以及影响其它后续数据流的再处理。
   * 当我们希望我们的管道能容忍容错的时候，就必须先通过plumber插件。
   */
      .pipe($.plumber())
  /**
   * 通过 npm install gulp-ruby-sass 安装
   */
      .pipe($.rubySass({
        style: 'expanded',// 设置编译出来的模式为expanded模式，一共有四种 nested(层级选择器嵌套) expanded(不嵌套) compact(属性合合并在一行) compressed(全部合并到一行)，请参考 http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_13
        precision: 10 //属性保留几位小数点 因为sass支持表达式，比如10/3,那么除不尽会有小数，我们尽可能保留完整，如果不能保留10位
      }))
    //需要厂商前缀的属性自动添加厂商前缀，只适配每种浏览器最新的一个版本
      .pipe($.autoprefixer({browsers: ['last 1 version']}))
    //处理完成后把流数据写入.tmp/styles目录
      .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  //对scripts目录下的JS进行校验，使用.jshintrc作为配置文件
  //配置文件说明 http://jinlong.github.io/2014/10/25/jshint-configuration/?utm_source=tuicool
  return gulp.src('app/scripts/**/*.js')
      .pipe($.jshint())
    //校验结果传递给jshint-stylish reporter
      .pipe($.jshint.reporter('jshint-stylish'))//传递的是report的名称
    //当校验没通过时会通过stylish记录下错误信息并传递给fail reporter,并使当前任务失败
      .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  //lazypipe用来缓存一组管道配置，存起来稍后使用
  var lazypipe = require('lazypipe');

  var cssChannel = lazypipe()
    //注意传递的是插件对象而不是插件方法调用
    //csso用来压缩css文件
      .pipe($.csso)
    //替换内容
      .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');
  //通过解析html中的注释块来处理替换html中那些未经合并压缩的JS CSS等资源的引入
  //分成二步  assets 和 useref
  // assets方法用来生成检索资源文件的管道
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});//指定在哪些目录中搜索 html文件，是相对于gulp

  return gulp.src('app/*.html')
      .pipe(assets)//检索传递进来的html文件，按注释指令对这些文件进行合并，然后生成一个新的流，将之前的HTML文件替换掉,新增加合并合的资源文件
      .pipe($.if('*.js', $.uglify()))//符合条件才能进入后面的流，如果是JS进行压缩再回归到主流
      .pipe($.if('*.css', cssChannel()))//如果是CSS文件，则先压缩CSS再替换fonts路径
      .pipe(assets.restore())//再回到主流，把删除的HTML文件添加回来
      .pipe($.useref())//修改原来注释块用修改后的引用地址替换掉原来的地址
      .pipe($.if('*.html', $.minifyHtml({conditionals: true/*true不移除针对IE的注释*/, loose: true/*压缩空格的时候至少保留一个空格*/})))//如果是html文件，则进行压缩
      .pipe(gulp.dest('dist'));//把处理后的文件输出到dist目录
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')//把图片读取入流中
  /**
   * 为了避免图片多次压缩失真
   * imagemin只负责压缩图片，不负责检查图片是否被压缩过
   * 为了避免二次压缩使用$.cache，维护一份临时文件记录哪些文件已经被处理过了，处理过了则不再传递给它包装的管道。
   */
      .pipe($.cache($.imagemin({
        progressive: true,//针对jpg 图像逐行扫描，先以比较模糊的方式出现，再清晰。
        interlaced: true //针夺gif,隔行扫描的方式。比如先出奇数行，再出偶数行，一半的时间就可以看到轮廓。
      })))
      .pipe(gulp.dest('dist/images'));//输出到images目录
});

gulp.task('fonts', function () {
  //main-bower-files 读取所有的bower的文件并合并上所有的字体文件读取入流
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
      .pipe($.filter('**/*.{eot,svg,ttf,woff}'))//类似于if,符合流转，不符合则被剔除
      .pipe($.flatten())//将相对路径移除
      .pipe(gulp.dest('dist/fonts'));//将字体文件写入fonts目录
});
//将app下除了html以外的文件拷贝到dist目录 只拷贝一级
gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'//拷贝apache配置文件
  ], {
    dot: true// node glob配置项，true时匹配以.开头的文件或文件夹
  }).pipe(gulp.dest('dist'));
});
//删除.tmp和dist下的所有文件
gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));
//等同于 gulp.task('clean',function(){require('del')(['.tmp','dist'])});

/**
 * 1.connect会依赖styles
 * 2.这是一个node扩展的http框架，可以使用中间件方便配置
 */
gulp.task('connect', ['styles'], function () {
  var serveStatic = require('serve-static');//静态文件服务器中间件
  var serveIndex = require('serve-index');//显示索引文件中间件
  var app = require('connect')()//先创建connect对象叫app
  /**
   * 此中间件就是自动为html插入livereload脚本，通过参数传递配置项参数
   */
      .use(require('connect-livereload')({port: 35729}))//实时重启服务器中间件
      .use(serveStatic('.tmp'))//对根目录的请求映射到.tmp目录
      .use(serveStatic('app'))//对根目录的请求映射到app目录
    //将对bower_components目录的访问定位到bower_components目录下
      .use('/bower_components', serveStatic('bower_components'))
    //参数为本地的一个文件目录，当路径命中这个目录的时候，而路径下没有index文件的时候会显示目录索引文件显示此目录下的所的文件
      .use(serveIndex('app'));
  //加载http组件并创建http服务器，传入的参数app就是一个请求监听处理函数
  //当服务器接受请求的时候，会依次执行上面的一系列中间件，其实就是用请求路径在相应的文件夹里进行匹配，如果匹配上就返回
  require('http').createServer(app)
      .listen(9000)
    //服务器监听成功后会输出此信息
      .on('listening', function () {
        console.log('Started connect web server on http://localhost:9000');
      });
});

/**
 * 1. 在命令行中执行 gulp serve 就可以自动打开浏览器，然后修改app/index.html就会实时刷新浏览器
 * 2.因为watch依赖connect,所以这里connect可以省略
 * 3.
 *
 */
gulp.task('serve', ['connect', 'watch'], function () {
  //打开浏览器并打开指定的URL地址
  require('opn')('http://localhost:9000');
});

//插入bower_component文件
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  //先处理sass文件对bower_component文件的依赖
  gulp.src('app/styles/*.scss')
      .pipe(wiredep())
      .pipe(gulp.dest('app/styles'));

  //处理app下的html文件对bower_component文件的依赖
  gulp.src('app/*.html')
      .pipe(wiredep({exclude: ['bootstrap-sass-official']}))//排除bootstrap-sass-official
      .pipe(gulp.dest('app'));
});

/**
 * 1. watch依赖connect执行
 * 2.
 */
gulp.task('watch', ['connect'], function () {
  /**
   * 1.先调用livereload的listen方法启动监听,这样文件发生改动时就可以接收到变化通知了
   * 原理都是一样的，即通过在本地开启一个websocket服务，检测文件变化，当文件被修改后触发livereload任务，推送消息给浏览器刷新页面。详情参考
   * http://blog.csdn.net/u010373419/article/details/38184333?utm_source=tuicool
   */
  $.livereload.listen();

  //监听文件的变化，当文件发生变化的时候重启服务器
  //gulp.watch返回的一个eventEmitter对象，通过on change可以添加事件监听 ，当watch监控这些文件发生变化的时候可以发射change事件，从而调用$.livereload.changed监听函数执行，这就是订阅者设计模式
  //监听函数可以获得哪些文件发生了改变，通过livereload服务器哪些文件变更了，
  gulp.watch([
    'app/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);
  //当scss文件变化的时候重新编译sass
  gulp.watch('app/styles/**/*.scss', ['styles']);
  //当bower.json文件发生变化的时候自动重启把依赖的组件引入html文件
  gulp.watch('bower.json', ['wiredep']);
});

/**
 *编译
 *
 */
gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  //size展示文件大小以及总的大小 gzip为true展示gzip压缩后的文件大小,展示的是项目的总大小
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/**
 * 组合任务
 *
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');//start 可以运行build任务
});
```

## 14 自定义插件
### 14.1 vinyl
gulp.src中这个流里的内容不是原始的文件流,而是一个**虚拟文件对象流**,这个虚拟文件对象中存储着原始文件的路径、文件名和内容等信息
[vinyl](https://github.com/gulpjs/vinyl)

```javascript
var File = require('vinyl');

var indexFile = new File({
    cwd: "/",//当前路径
    base: "/test/",//文件名
    path: "/test/index.js",//路径
    contents: new Buffer("name=zfpx")//文件内容
});

console.log(File.isVinyl(indexFile));//是否是vinyl
console.log(indexFile.isBuffer());//内容是否是Buffer
console.log(indexFile.isStream());//内容是否是Stream
```

### 14.2 through2
https://www.npmjs.com/package/through2
二进制流的方式
```javascript
 var through2 = require('through2');
 var fs = require('fs');

 fs.createReadStream('src.txt',{highWaterMark:1})
     .pipe(through2(function (chunk, encoding, callback) {
         for (var i = 0; i < chunk.length; i++)
             chunk[i] = chunk[i] + 1;
         this.push(chunk); //向流中写数据,每push一次就发射一次data事件
         callback();
     })).on('data', function (data) {
        console.log(data.toString());
     }).on('end', function (data) {
        console.log('end');
 })
 //.pipe(fs.createWriteStream('dest.txt'))


```
对象方式
```
var through2 = require('through2');
var fs = require('fs');
var all = [];
fs.createReadStream('src.txt', {highWaterMark: 1})
    .pipe(through2.obj(function (chunk, enc, callback) {
        var data = {
            name: chunk.toString()
        }
        this.push(data);
        callback();
    }))
    .on('data', function (data) {
        console.log(data)
    })
    .on('end', function () {
        console.log('end')
    })

```


### 14.3 buffer往头部增加内容插件
如果你的插件依赖着一个基于 buffer 处理的库，你可能会选择让你的插件以 buffer 的形式来处理 file.contents。让我们来实现一个在文件头部插入额外文本的插件：
```javascript
var through = require('through2');
var PluginError = require('gulp-util').PluginError;
const PLUGIN_NAME = 'gulp-prefixer';

// 插件级别的函数（处理文件）
function gulpPrefixer(prefixText) {
    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    }

    prefixText = new Buffer(prefixText); // 提前分配

    // 创建一个 stream 通道，以让每个文件通过
    var stream = through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            file.contents = Buffer.concat([prefixText, file.contents]);
        }

        // 确保文件进入下一个 gulp 插件
        this.push(file);

        // 告诉 stream 引擎，我们已经处理完了这个文件
        cb();
    });

    // 返回文件 stream
    return stream;
};

// 导出插件主函数
module.exports = gulpPrefixer;
```

上述的插件可以这样使用：
```javascript
var gulp = require('gulp');
var gulpPrefixer = require('gulp-prefixer');

gulp.src('files/**/*.js')
  .pipe(gulpPrefixer('prepended string'))
  .pipe(gulp.dest('modified-files'));
```

### 14.4 stream往头部增加内容插件

```javascript
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
```

上述的插件可以这样使用：
```javascript
var gulp = require('gulp');
var gulpPrefixer = require('gulp-prefixer');

gulp.src('files/**/*.js', { buffer: false })
  .pipe(gulpPrefixer('prepended string'))
  .pipe(gulp.dest('modified-files'));
```

## 15. 资源地址
- [本课程视频](http://yuntv.letv.com/bcloud.html?uu=zna4ig8gbr&vu=6712255a12&auto_play=1&gpcflag=1&width=640&height=360)
- [视频中项目代码](https://github.com/zhufengnodejs/201605gulp)
- [gulp英文官网](http://gulpjs.com/)
- [gulp中文网](http://www.gulpjs.com.cn/)
- [gulp 技巧集](http://www.gulpjs.com.cn/docs/recipes)
- [gulp api](http://www.gulpjs.com.cn/docs/api)
- [gulp使用指南](http://www.techug.com/gulp)
- [gulp开发教程](http://www.w3ctech.com/topic/134)
- [利用 Gulp 处理前端工作流程](http://segmentfault.com/a/1190000003098076#articleHeader0)
- [前端构建工具gulpjs的使用介绍及技巧](http://www.cnblogs.com/2050/p/4198792.html)
- [sass](http://www.ruanyifeng.com/blog/2012/06/sass.html)
- [nodejs中流(stream)的理解](http://segmentfault.com/a/1190000000519006)
- [Node.js Stream（流）的学习笔记](http://www.it165.net/pro/html/201406/15924.html)
- [Node 中的流(Stream)](http://segmentfault.com/a/1190000000357044)
- [深入理解Promise实现细节](http://segmentfault.com/a/1190000002591145)
- [Promise实现原理](http://www.tuicool.com/articles/fe6Jbyz)
- [异步编程 promise模式的简单实现](http://segmentfault.com/a/1190000003028634)
- [gulp插件](http://gulpjs.com/plugins/)
- [jshint](http://jshint.com/docs/options/)
- [stream-handbook](https://github.com/substack/stream-handbook)
- [Gulp：插件编写入门](http://www.cnblogs.com/chyingp/p/writting-gulp-plugin.html)
