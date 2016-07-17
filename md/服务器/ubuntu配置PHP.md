## 1. 更新系统
```
$ sudo apt-get update
$ sudo apt-get upgrade
```
## 2. 安装并配置Nginx
### 2.1 安装nginx
```
$ apt-get install nginx
```

### 2.2 配置nginx
```
$ sudo vim /etc/nginx/nginx.conf 

```
然后 在http{} 字段里添加
```
client_max_body_size 1024M;
sendfile       on;
```

## 2.3 安装MySQL
```
$ apt-get install mysql-server
```
> 在这个过程过程中会要求您输入MySQL数据库的root密码，请认真填写。
## 2.4 安装并配置PHP


## 安装并配置EduSoho

## 测试Edusoho