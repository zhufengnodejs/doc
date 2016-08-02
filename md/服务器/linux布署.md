
# 购买一台阿里云ECS服务器
https://www.aliyun.com

https://ecs.console.aliyun.com



# 安装ubuntu系统
更新安装源
```
apt-get update

```


# SSH连接到服务器
* xshell 新建连接
* ssh root@123.57.143.189



# 安装node
https://nodejs.org/en/download/package-manager
```
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install nodejs
```


# 安装mysql
```
 apt-get install mysql-server
 apt-get install mysql-client
 apt-get install libmysqlclient-dev
```


# 下载github代码


# 安装pm2
强大的进程管理器，进程异常退出时pm2会尝试重启
```
npm install pm2 -g
```


## 用pm2启动node
----
|命令|用途|
|:-----|:-----|
|pm2 start app.js --name "crawl"|启动应用|
|pm2 list|查看所有应用|
|pm2 restart crawl|重启应用|
|pm2 stop crawl|停止应用|
|pm2 delete crawl|删除应用|


# 安装nginx
Nginx是一个高性能的`HTTP`和`反向代理`服务器
```
apt-get install nginx
```


# nginx命令
* 启动nginx `nginx -c /etc/nginx/nginx.conf `
* 关闭 nginx  `nginx -s stop`
* 重读配置文件`nginx -s reload` `kill -HUP nginx`
* 常用命令`service nginx {start|stop|status|restart|reload|configtest|}`


# 配置nginx反向代理和负载均衡
```
upstream crawl{
    ip_hash;
    server 127.0.0.1:3000 weight=10;
    server 127.0.0.1:4000 weight=1;
}

server {
        listen 80;
        server_name www.zfpx.com;

        location / {
           proxy_pass http://crawl;
        }
}
```
