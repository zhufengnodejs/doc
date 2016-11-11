
## Ubuntu 14.04 FTP服务器--vsftpd的安装和配置
我们经常需要将本地的文件上传到远程的Ubuntu 14.04服务器上，或者把远程Ubuntu 14.04服务器上的文件下载到本地，这就需要用到vsftpd来搭建FTP服务，现在介绍一下如何在Ubuntu 14.04上安装和配置vsftpd

## 方法/步骤
### 1. 更新源列表
```
sudo apt-get update
```

### 2. 安装vsftpd
```
sudo apt-get install vsftpd
```

### 3. 判断vsftpd是否安装成功
打开"终端窗口"，输入"sudo service vsftpd restart"重启vsftpd服务-->回车-->vsftpd处于运行状态，说明安装成功。

### 4. 新建"/home/uftp"目录作为用户主目录
```
sudo mkdir /home/uftp
```

### 5. 新建用户uftp并设置密码
```
sudo useradd -d /home/uftp -s /bin/bash uftp
sudo passwd uftp
```

### 6. 修改配置文件/etc/vsftpd.conf
```
userlist_deny=NO
userlist_enable=YES
userlist_file=/etc/allowed_users
seccomp_sandbox=NO
local_enable=YES
write_enable=YES
```

### 7. 新建/etc/allowed_users文件
```
sudo gedit /etc/allowed_users
```
输入uftp


## 8. 安装 fileZilla连接服务器

## 参考资料
- [Ubuntu 14.04 FTP服务器--vsftpd的安装和配置](http://jingyan.baidu.com/article/67508eb4d6c4fd9ccb1ce470.html)
- [查看 SELinux状态及关闭SELinux](http://bguncle.blog.51cto.com/3184079/957315/)
- [vsftpd 550 Permission denied 出错解决方案](http://www.blogjava.net/zhouf/articles/340148.html)
