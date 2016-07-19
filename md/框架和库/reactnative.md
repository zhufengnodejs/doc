## 1. 安装react-native OSX
```
$ brew update
$ brew doctor

$ xcode-select --install

$ brew install watchman
$ brew install flow

npm install react-native-cli -g

```

## 2. 配置Android开发环境
### 2.1 下载sdk
[jdk8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
### 2.2 下载android sdk
[android-studio](http://tools.android-studio.org/index.php/sdk)

### 2.3 下载 android-sdk
```
brew install android-sdk
```

### 2.4 编译环境变量
```
vi ~/.bash_profile
```

```
export ANDROID_HOME=/usr/local/opt/android-sdk
```
打开管理工具
```
andoird
brew info android
```
```
cd /usr/local/Cellar/android-sdk/24.3.4
ls
cd extra
cd intel
ls 
Hardware
open ./
android avd
create 创建一个新的模拟器
start
launch

```


### 3 初始化项目
```
react-native init study
atom .
```




