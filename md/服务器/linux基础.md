# 远程控制
##windows
> xshell git-bash

##mac terminal
> ssh root@ip


# 目录与文件
* `pwd` 看你当前所在的目录
* `cd` 改变你所在的目录
* `ls` 列出目录里的文件
* `ls -la` 列出全部文件(`l`=long,`a`=all)
* `mkdir` 创建目录(`-p` 级联创建)
* `rm` 删除目录或文件
* `rm -rf www`  递归强行删除目录及子目录(`r`=recursive,`f`=force)
* `cat` 查看文件内容


# 路径
* / 表示系统的`根`目录。
* ~ 表示当前所登录的用户的`主目录`
* . 一个点表示`当前`的目录。
* ../ 两个点加一个斜线，表示`上一级`目录。


# 移动
* `mv` *移动*/*重命名*目录或文件
* `cp` *复制*目录或文件


# 编辑文件 vi
* `i` 输入编辑模式
* `esc` 退出编辑模式
* `:wq` 保存文件并退出
* `:wq!` 强制保存并退出
* `:q` 直接退出不保存修改
* `/` 可以进行搜索，在 / 后面加上要搜索的文字，然后回车
* `n` 可以查找下一处
* `N` 可以查找上一处
* `ctrl+f` 向后翻页
* `ctrl+b` 向前翻页

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/vieditor.png">


# 权限
linux每个用户都属于一个*用户*和*用户组*,一般是*创建*者,权限分为*所有者*、*所属组*和*其它人*
权限位
-----
|英文|含义|数字|
|:-----|:----|
|读取|Read|4|
|写入|Write|2|
|执行|Execute|1|

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/descauth.jpg">


# root
管理员账户，可以执行所有的任务
* `su root` 切换到用户
* `exit` 退出
* `sudo root` 临时使用root用户


# 用户管理
-------
|操作|用法|示例|
|:-----|:----|
|添加用户|useradd|useradd zhangsan|
|设置密码|passwd|passwd zhangsan|
|删除用户|userdel|userdel zhangsan|


# 文件描述
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/authorigy.jpg">


# 修改权限
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/chmod2.png">
