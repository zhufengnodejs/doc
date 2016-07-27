## 1.安装
### 1.1 Chocolatey
Chocolatey是一个Windows上的包管理器
[官方网站](https://chocolatey.org/)
需要以管理员的身份来运行命令提示符窗口，然后执行
```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

> 如果找不到powershells可以在C盘里搜索一下

### 1.2 Python 2
打开命令提示符窗口，使用Chocolatey来安装Python 2
```
choco install python2
```

### 1.3 Node
打开命令提示符窗口，使用Chocolatey来安装NodeJS
```
choco install nodejs.install
```

### 1.4 React Native命令行工具（react-native-cli）
eact Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。
```
npm install -g react-native-cli
```
> 如果你遇到EACCES: permission denied权限错误，可以尝试运行下面的命令： sudo npm install -g react-native-cli

### 1.6 git
```
choco install git
```

### 1.7 Genymotion
比起Android Studio自带的原装模拟器，Genymotion是一个性能更好的选择，但它只对个人用户免费
[genymotion](https://www.genymotion.com/)


### 1.8 Visual Studio Emulator for Android
Visual Studio Emulator for Android)是利用了Hyper-V技术进行硬件加速的免费android模拟器。也是Android Studio自带的原装模拟器之外的一个很好的选择。而且你并不需要安装Visual Studio。
[Emulator](https://www.visualstudio.com/zh-cn/features/msft-android-emulator-vs.aspx#中国 (简体中文)



### 1.9 Android Studio
#### 1.9.1 安装jdk8
```javascript
choco install jdk8
```

#### 1.9.2  安装Studio
[Android Studio](http://developer.android.com/sdk/index.html)

#### 1.9.3 配置ANDROID_HOME环境变量
确保ANDROID_HOME环境变量正确地指向了你安装的Android SDK的路径

#### 1.9.4 配置Android SDK环境变量
将Android SDK的Tools目录添加到PATH变量中

#### 1.9.5 Gradle Daemon
开启Gradle Daemon可以极大地提升java代码的增量编译速度
```javascript
(if not exist "%USERPROFILE%/.gradle" mkdir "%USERPROFILE%/.gradle") && (echo org.gradle.daemon=true >> "%USERPROFILE%/.gradle/gradle.properties")
```

#### 测试安装
```javascript
react-native init AwesomeProject
cd AwesomeProject
react-native run-android
```


## 问题
### 初始化报错
```
react-native init awesome
```
```
ReferenceError: [BABEL] E:\rn\AwesomeProject\node_modules\react-native\local-cli
\cliEntry.js: Unknown option: base.directory.
```


### 初始化报错
这个问题出现了使用了最新版的node自带的npm@3的情况
请使用node稳定版4.4.7
```
react-native init awesome
```
```
Error: Cannot find module 'babel-plugin-transform-es2015-template-literals'
```
[错误描述](https://phabricator.babeljs.io/T6692)


### 解决Genymotion
解决Genymotion出现Unable to load VirtualBox engin
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/genymotion.jpg" class="img-responsive">
- 右键-->VirtualBox-->属性-->兼容性-->(打钩)以兼容模式运行这个程序-->(选择)Windows Server 2008 (Service pack 1)-->应用-->确定！
- 右键-->Genymotion-->属性-->兼容性-->(打钩)以兼容模式运行这个程序-->(选择)Windows Server 2008 (Service pack 1)-->应用-->确定！

<img src="http://7xjf2l.com1.z0.glb.clouddn.com/virtualbox.jpg" class="img-responsive">


### REGDB_E_CLASSNOTREG
启动 VirtualBox报到 创建失败(被召者 RC: REGDB_E_CLASSNOTREG (0x80040154))
不要用最新版本，使用VirutalBox4.3.12
[VirutalBox](http://www.ithome.com/html/soft/85855.htm)

### app:processDebugResources
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/appdevice.png" class="img-responsive">
Execution failed for task ':app:processDebugResources'
查看编译错误
```
cd android
gradlew.bat --info clean build

A problem occurred configuring project ':app'.
> failed to find Build Tools revision 23.0.1

```
打开 sdk manager 安装  Build Tools  23.0.1

http://stackoverflow.com/questions/21645961/android-studio-processdebugresources-failed


### Invalid keystore format
```
* What went wrong:
Execution failed for task ':app:packageDebug'.
> Failed to read key AndroidDebugKey from store "C:\Users\Administrator\.android\debug.keystore": Invalid keystore format
```
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/keystore.png" class="img-responsive">

删除 C:\Users\Administrator\.android\debug.keystore


### :app:lint
```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:lint'.
> Lint found errors in the project; aborting build.

Fix the issues identified by lint, or add the following to your build script to proceed with errors:
...
android {
    lintOptions {
        abortOnError false
    }
}
...

* Try:
Run with --stacktrace option to get the stack trace. Run with --debug option to get more log output.
```
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/lint.png" class="img-responsive">

在`E:\finalrn\android\app\build.gradle`中增加
```
android {
    lintOptions {
        abortOnError false
    }
}
```

### babelHelpers.typeof(global)
<img src="" class="img-responsive">


```
E:\finalrn\node_modules\react-native\packager>packager.sh start --reset-cache
```

[issue](http://stackoverflow.com/questions/35563025/new-react-native-app-has-typeerror-babelhelpers-typeof-is-not-a-function-ios)


###
```
Total time: 21.771 secs
Error: Expected verb after global parameters but found '{' instead.

       Usage:
       android [global options] action [action options]
```