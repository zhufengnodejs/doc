## 用户分类
- 超级用户 (root,UID=0)
- 普通用户 (UID 500-60000)
- 伪用户 (UID 1-499)
 伪用户就是与系统和程序服务相关,不需要或无未能登录系统，可以没有宿主目录

## 用户组
- 每个用户都至少属于一个用户组
- 每个用户组可能包括多个用户
- 同一用户组的用户享有该组共有的权限

## 配置文件




### 用户信息文件 /etc/passwd
```
root:x:0:0:root:/root:/bin/bash
用户名:密码位:用户标识号:缺省组标识号:注释性描述:宿主目录:命令解析器
```


### 密码文件 /etc/shadow
```
用户名:密码:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:账号闲置时间:失效时间:标志
```

### 用户组文件 /etc/group
```
组名:组密码:GID:组内用户列表
```

### 手工添加用户
1. 分别在/etc/passwd、/etc/group、/etc/shadow 文件中添加一笔记录
2. 创建宿主目录
3. 在用户宿主目录中设置默认的配置文件
4. 设置用户初始密码


## 添加用户
useradd 设置选项 用户名 -D 查看缺省参数
u: UID
g: 缺省所属用户组 GID
G:指定用户所属多个组
d:宿主目录
s:命令解释器Shell
c: 描述 信息
e:指定失效时间

passwd zfpx

### 删除用户
userdel -r 用户名
-r 删除用户目录


### 用户组管理命令
1. 添加用户组 groupadd
```
groupadd -g 124 student
创建用户组student,其GID为 124
```
2. 删除用户组
```
groupdel student
``

### 批量添加用户
```
#!/bin/bash
USERNAME=$1
useradd -d /home/$USERNAME -m $USERNAME
echo "$USERNAME:Zfpx2016" | chpasswd
```

## 查看用户状态
```
id 查看用户id和组信息
finger 查看用户详细信息
who w 查看当前登录用户信息
```
