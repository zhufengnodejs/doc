## 1. 什么是MySQL
* MySQL是一个开源的关系型数据库管理系统
* 数据库是指用特定方式存储数据的仓库
* 关系型是指数据库中的各种实体之间可以建立关系

# 2. RDBMS术语
- 数据库: 数据库是一些关联的表的组成的集合。
- 数据表: 表是数据的载体。在一个数据库中的表看起来像一个简单的excel表格。
- 列: 一列包含了相同类型的数据, 例如用户表中的用户名。
- 行：一行是一组列组合成的数据，例如一条用户的数据。
- 主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
- 外键：外键用于关联两个表

## 3. 官方下载 MySQL
http://dev.mysql.com/downloads/mysql/
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/1.%20clickdownload.jpg" class="img-responsive">
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/2.%20startdownload.jpg" class="img-responsive">

## 4. 云盘下载MySQL
http://pan.baidu.com/s/1pLf6B7X#path=%252Fmysql
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mysql3264.png" class="img-responsive">

## 4.1 双击MSI安装文件
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mysql1.jpg" class="img-responsive">
## 2. 同意许可协议
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/4.mysql2.jpg" class="img-responsive">
========
## 3. 典型安装是安装服务器和客户端
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/5.mysql3.jpg" class="img-responsive">
========
## 4. 开始安装，安装完成后还有广告也可以忽略
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/6.mysql4.jpg" class="img-responsive">
========
## 5. 可以立即可以配置服务
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/7.mysql5.jpg" class="img-responsive">
========
## 6. 开始配置向导
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/8.mysql6.jpg" class="img-responsive">
========
## 7. 执行典型配置
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/9.mysql7.jpg" class="img-responsive">
========
## 8. 配置mysql实例
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/10.mysql8.jpg" class="img-responsive">
========
## 9. 修改安全设置
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/11.mysql9.jpg" class="img-responsive">
========
## 10. 开始执行配置
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/11.mysql10.jpg" class="img-responsive">
========
## 11. 配置成功
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/12.mysql11.jpg" class="img-responsive">
========
## 12. 查看服务配置
-----
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/13.mysql12.jpg" class="img-responsive">
[/magic]
[slide]
##mac安装
1. 先安装 `homebrew`
http://brew.sh/

2. 安装mysql
> brew install mysql


[slide]

[magic]
## 1. 双击MSI安装文件
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mysql1.jpg" class="img-responsive">
========
## 2. 同意许可协议
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/4.mysql2.jpg" class="img-responsive">


[slide]
##windows停止启动mysql
[magic data-transition="cover-circle"]
-----
##1. 通过服务界面启动  
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/14.startstopmysql.jpg" class="img-responsive">
=======

##2. 通过命令行启动  
-----
```
net stop mysql 停止mysql
net start mysql 启动mysql
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/15.netstartstopmysql.jpg" class="img-responsive">
[/magic]


[slide]
##mac停止启动mysql
> service stop mysql 停止mysql
> service start mysql 启动mysql

[slide]
##mysql登录
使用`root`用户以`123456`密码登陆***本机***上的`mysql`服务器
```
mysql -uroot -p123456 -h127.0.0.1 登录
//如果你想允许用户root从ip为192.168.1.3的主机连接到mysql服务器,访问studb数据库的所有表，并使用123456作为密码 
GRANT ALL PRIVILEGES ON studb.* TO 'root'@'192.168.1.3' IDENTIFIED BY '123456' WITH GRANT OPTION;
//如果想远程访问需要打开 /etc/mysql/my.cnf 注释掉 #bind-address		= 127.0.0.1

```
参数说明
------
|命令|参数|描述|
|:-----|:-----|:-----|
|mysql|-u|用户名|
|mysql|-p|密码|
|mysql|-h|指定服务器的IP|
|mysql|-V|输出版本号并退出|

[slide]
##mysql退出
```
exit;
quit;
\q
```

[slide]
#mysql语句规范
- 关键字与函数名称全部大写
- 数据库名称表名称字段名称全部小写
- SQL语句必须以分号结尾

[slide]
#数据库语句
|功能|语句|示例|
|:----|:----|:----|
|创建数据库|CREATE DATABASE db_name CHARACTER SET charname |create database studb CHARACTER SET utf8|
|查看当前数据库|SHOW DATABASES|show databases|
|删除数据库|DROP DATABASE db_name|drop database studb|

[slide]
#数据类型
选择最合理最合适的数据类型
-----
|数据类型|说明|
|:-----|:-----|
|INT|整数|
|FLOAT|浮点数|
|DATETIME|日期日期型|
|DATE|日期日期型|
|CHAR(M)|定长字符类型|
|VARCHAR(M)|不定长字符类型|

[slide]
#数据表操作
表是一个二维的表格，行称为记录，列称为字段
-----
|功能|语句|示例|
|:----|:----|:----|
|打开数据库|USE db_name |use studb|
|创建表|CREATE TABLE table_name(column_name data_type,...)|CREATE TABLE student(id int identify,name varchar(20),age int)|
|查看数据表|SHOW TABLES|show tables|
|查看表结构|SHOW COLUMNS FROM tbl_name|show columns from student|


[slide]
#行记录操作
-----
|功能|语句|示例|
|:----|:----|:----|
|插入记录|INSERT INTO tbl_name[(col_names...)] values (val...)|insert into student(name,age) values('张静',18)|
|查询记录|SELECT expr... FROM tbl_name|select * from student|


[slide]
#列级约束
----------
|语法|说明|
|:----|:----|:----|
|AUTO_INCREMENT|自动递增|自动编号，且必须与主键组合使用，数据类型,起始值为1，每次增量为1|
|PRIMARY KEY|主键约束|每张表只能存在一个主键，主键保证记录的唯一性，主键自动为NOT NULL|
|FOREIGN KEY|外键约束|保持数据一致性，实现一对一或一对多的关系|

[slide]
#记录操作
-----
|功能|语句|示例|
|:----|:----|:----|
|插入记录|INSERT INTO tbl_name[(col_names...)] values (val...)|insert into student(name,age) values('张静',18)|
|更新记录|UPDATE tbl_name SET col_name1=expr1,col_name2=exp2 WHERE where_condition |update student where age = age+1|
|删除记录|DELETE tbl_name where where_condition|delete from student where age < 20|

[slide]
#SELECT查询
```
SELECT select_expr 查询表达式，列以英文逗号分隔，星号表示所有列
[
  FROM tbl_name  要查询的表
  WHERE where_condition 条件表达式，对记录进行过滤，如果不指定WHERE则查询所有记录
  GROUP BY col_name [ASC|DESC] 以哪列作为分组
  HAVING group_condition 对分组后的结果进行过滤
  ORDER BY col_name [ASC|DESC] 按哪些列进行排序
  LIMIT offset,row_count 从哪条开始查询，查询多少条
]
```


[slide]
#数据准备
##学生表 
student (id 主键,name 名称)
-----
|id|name|
|:-----|:-----|
|1|张三|
|2|李四|

##课程表 
course (id 主键,name 名称)
-----
|id|name|
|:-----|:-----|
|1|语文|
|2|数学|
|3|英语|


##成绩表
score(cid 科目名称,sid 学生ID,score 成绩)
-----
|cid|sid|score|
|:-----|:-----|
|1|1|70|
|1|2|70|
|1|3|70|
|2|1|80|
|2|2|80|
|2|3|80|

[slide]
##练习题
1. 查询全班的语文平均分
2. 查询每个学生的平均成绩
3. 按总分进行全班排名
[note]
1. select student.name,avg(score.score) from score inner join course on score.cid = course.id  
   inner join student on score.sid =  student.id  
   group by score.sid,student.name 
2. select avg(score.score) from score inner join course on score.cid = course.id ;
3.
select student.name,avg(score.score) from score inner join course on score.cid = course.id  
   inner join student on score.sid =  student.id  
   group by score.sid,student.name
   having sum(score.score)>60
   order by sum(score.score) desc
[/note]