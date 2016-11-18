## 1. 什么是MongoDB
- MongoDB是一个基于分布式文件存储的开源数据库系统
- MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

## 2. MongoDB安装
### 2.1 windows安装
[Windows官方安装指南](https://www.mongodb.org/downloads)

- mongodb32位安装版
http://pan.baidu.com/s/1mhQVHl2

- MongoDB64位绿色版
http://pan.baidu.com/s/1cMM9oq

- mongo客户端
http://pan.baidu.com/s/1kUIQlUZ

### 2.2 mac安装
[Mac官方安装指南](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

1. 先安装homebrew
```
http://brew.sh/
```

2. 使用brew安装mongodb
```
brew install mongodb
```

3. 再安装可视化工具
 [Robomongo]( https://robomongo.org/)



## 3. mongodb启动与连接

### 3.1 windows启动服务器端
1.  找到mongodb安装目录,一般是 `C:\Program Files\MongoDB 2.6 Standard\bin`
2. 按下Shift+鼠标右键,选择在此处打开命令窗口
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-1.png" class="img-responsive">
3. 在除C盘外的盘符新建一个空目录,如 `D:\Mongodb\data`
4. 在命令行中输入` mongod --dbpath=刚创建的空目录`,如
```
mongod --dbpath=D:\Mongodb\data
```
5. 再按回车键
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-2.png" class="img-responsive">

-  如果出现`waiting for connections on port 27017`就表示**启动成功**,已经在27017端口上监听了客户端的请求

-  注意：` --dbpath`后的值表示数据库文件的存储路径,而且后面的路径必须事先创建好，必须已经**存在**，否则服务开启失败

-  注意：这个命令窗体绝对**不能关**,关闭这个窗口就相当于停止了`mongodb`服务

### 3.2 启动客户端连接服务器
1.  找到mongodb安装目录,一般是 `C:\Program Files\MongoDB 2.6 Standard\bin`
2. 按下Shift+鼠标右键,选择在此处打开命令窗口
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-1.png" class="img-responsive">

3. 命令窗体中输入 mongo --host=127.0.0.1 或者 mongo 按回车键
> 备注：--host后的值表示服务器的ip地址
> 备注： --host=127.0.0.1 表示的就是本地服务器,每次数据库都会默认连接test数据库
---
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-4.png" class="img-responsive">

## 4. MongoDB基本概念
- **数据库** MongoDB的单个实例可以容纳**多个**独立的数据库，比如一个学生管理系统就可以对应一个数据库实例
- **集合** 数据库是由集合组成的,一个集合用来表示一个**实体**,如学生集合
- **文档** 集合是由文档组成的，一个文档表示一条**记录**,比如一位同学张三就是一个文档

<img src="http://7xjf2l.com1.z0.glb.clouddn.com/mongodbstructure.jpg" class="img-responsive">
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/mongovue.png" class="img-responsive">

## 5. 数据库操作
### 5.1 使用数据库
**语法**
```
use database_name      database_name代表数据库的名字
```
注：如果此数据库存在，则切换到此数据库下,如果此数据库还不存在也可以切过来

**实例**
切换到 `person`数据库下
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-8.png" class="img-responsive">

### 5.2 查看所有数据库
**语法**
```
show dbs
```

> 备注: 我们刚创建的数据库person 如果不在列表内， 要显示它，我们需要向 person 数据库插入一些数据 db.person.insert({name:"zhangSan",age:30})

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-7.png" class="img-responsive">

### 5.3 查看当前使用的数据库
**语法**
```
db 或 db.getName()
```
> 注：db代表的是当前数据库 也就是person这个数据库

**实例**

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-9.png" class="img-responsive">

### 5.4 删除数据库
**语法**
```
db.dropDatabase()
```

**实例**

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-shanChuShuJuKu-1.png" class="img-responsive">


## 6. 集合操作
### 6.1 查看帮助
**语法**
```
db.worker.help()
```

**实例**
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-13.png" class="img-responsive">

### 6.2 查看数据库下的集合
**语法**
```
show collections
```

**实例**
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-11.png" class="img-responsive">

### 6.3 创建集合

**创建一个空集合**
```
db.createCollection(collection_Name)      collection_Name集合的名称
```
**创建集合并插入一个文档**
- collection_Name集合的名称
- document要插入的文档

```
db.collection_Name.insert(document)
```

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-14.png" class="img-responsive">

## 7. 插入文档
 ### 7.1 insert
 **语法**
```
 db.collection_name.insert(document)
 ````
 **参数**
 - collection_name 集合的名字
 - document 插入的文档

**实例**
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-15.png" class="img-responsive">

> 每当插入一条新文档的时候mongodb会自动为此文档生成一个`_id`属性,_id一定是唯一的，用来唯一标识一个文档
>  _id也可以直接指定，但如果数据库中此集合下已经有此_id的话插入会失败

### 7.2 save
 **语法**
```
db.collection_name.save(document)
```

**参数**
- collection_name 集合的名字
- document 插入的文档

> 注：如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。


**实例**
```
db.person.save({name:"xiaoHong",age:50})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-baoCun-1.png" class="img-responsive">
```
db.person.save({_id:ObjectId("562c9caf671c978b6596e825"),name:"xiaoHong",age:10})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-baoCun-2.png" class="img-responsive">

## 8. 更新文档
**语法**
```
db.collection.update(
   <query>,
   <updateObj>,
   {
     upsert: <boolean>,
     multi: <boolean>
   }
)
```

**参数说明**
- query  查询条件,指定要更新符合哪些条件的文档
- update  更新后的对象或指定一些更新的操作符
     -  $set直接指定更新后的值
     -  $inc在原基础上累加
- upsert  可选，这个参数的意思是，如果不存在符合条件的记录时是否插入updateObj.  默认是false,不插入。
- multi  可选，mongodb 默认只更新找到的第一条记录，如果这个参数为true,就更新所有符合条件的记录。


**实例**
将document数据中name是liSi 的数据的name修改为liSi_update
```
db.worker.update({name:'liSi'},{$set:{name:'liSi_update'}})
```

> 注：如果有多条name是liSi的数据只更新一条,如果想全部更新需要指定{multi:true}的参数

<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-18.png" class="img-responsive">


## 9. 文档的删除
remove方法是用来移除集合中的数据

**语法**
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>
   }
)
```

**参数说明**

- query :（可选）删除的文档的条件。
- justOne : （可选）如果设为 true 或 1，则只删除匹配到的多个文档中的第一个

**实例**
删除worker集合里name是fJianZhou的所有Document数据
```
db.worker.remove({name:'fJianZhou'})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-19.png" class="img-responsive">
删除person集合里name是xiaoHong的第一条数据
```
db.person.remove({name:"xiaoHong"},1)
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-shanChuShuJu-1.png" class="img-responsive">

## 10. 查询文档
### 10.1 find
**语法**
```
db.collection_name.find()
```

**参数**
- collection_name 集合的名字

**实例**
查询worker下所有的文档
```
db.worker.find()
```

### 10.2 查询指定列
**语法**
```
db.collection_name.find({queryWhere},{key:1,key:1})
```

**参数列表**
- collection_name  集合的名字
-  queryWhere 参阅查询条件操作符
- key 指定要返回的列
- 1 表示要显示

**实例**
```
db.worker.find({},{age:1}) 查询指定列
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-FindWhere-1.png" class="img-responsive">

### 10.3 findOne
查询匹配结果的第一条数据
**语法**
```
db.collection_name.findOne()
```
**实例**
```
db.worker.findOne()
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-baoCun-3.png" class="img-responsive">


## 11. 条件操作符
条件操作符用于比较两个表达式并从mongoDB集合中获取数据
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-where-1.png" class="img-responsive">

### 11.1 大于操作符
**语法**
```
db.collectoin_name.find({<key>:{$gt:<value>}})
```

**参数**
- collectoin_name  集合名称
- key   字段
- value   值

**实例**
```
db.worker.find({age:{$gt:30}}) 查询age 大于 30的数据
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-2.png" class="img-responsive">


### 11.2 大于等于操作符
**语法**
```
db.collectoin_name.find({<key>:{$gte:<value>}})
```

**参数**
- collectoin_name 集合名称
- key  字段
- value  值

**实例**
```
db.worker.find({age: {$gte: 30}}) 查询age 3大于等于30 的数据
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-4.png" class="img-responsive">

### 11.3 小于操作符
**语法**
```
db.collectoin_name.find( {<key>:{$lt:<value>}})
```

**参数**
-  collectoin_name集合名称
-  key 字段
-  value 值

**实例**
```
db.worker.find({age: {$lt: 30}}) 查询age 小于30的数据
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-3.png" class="img-responsive">

### 11.4 小于等于操作符
**语法**
```
db.collectoin_name.find({<key>:{$lte:<value>}})
```

**参数**
- collectoin_name集合名词
- key字段
- value值

**实例**
```
db.worker.find({age: {$lte: 30}}) 查询age 小于等于30的数据
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-5.png" class="img-responsive">

### 11.5 同时使用 $gte和$lte
**语法**
```
db.collectoin_name.find({<key>:{$gte:<value>},<key>:{$lte:<value>}})
```

**参数**
- collectoin_name 集合名称
- key 字段
- value 值

**实例**
查询age 大于等于 30 并且 age 小于等于 50  的数据
```
db.worker.find({age: {$gte: 30, $lte: 50}})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-6.png" class="img-responsive">

### 11.6 等于
**语法**
```
db.collectoin_name.find({<key>:<value>,<key>:<value>})
```

**参数**
- collectoin_name集合名词
- key字段
- value值

**实例**
查询age = 30的数据
```
db.worker.find({"age": 30})`
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-1.png" class="img-responsive">

### 11.7 使用 _id进行查询
**语法**
```
db.collectoin_name.find({"_id" : ObjectId("value")})
```

**参数**
- value  `_id`的值

**实例**
查询_id是 562af23062d5a57609133974 数据
```
db.worker.find({"_id" : ObjectId("562af23062d5a57609133974")})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-9.png" class="img-responsive">

### 11.8 查询结果集的条数
**语法**
```
db.collectoin_name.find().count()
```

**参数**
- collectoin_name 集合名称

**实例**
```
db.worker.find().count()
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-17.png" class="img-responsive">

### 11.9 正则匹配
**语法**
```
db.collection.find({key:/value/})
```

**参数**
- collectoin_name 集合名称
- key 字段
- value 值

**实例**
查询name里包含zhang的数据
```
db.worker.find({name:/value/})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-10.png" class="img-responsive">

查询某个字段的值当中是否以另一个值开头
```
db.worker.find({name:/^zhang/})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-11.png" class="img-responsive">

## 12. 与和或
### 12.1 and
find方法可以传入多个键(key)，每个键(key)以逗号隔开

**语法**
```
db.collection_name.find({key1:value1, key2:value2})
```

**实例**
查询name是zhangRenYang并且age是30的数据
```
db.worker.find({name:'zhangRenYang',age:30})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-andfind-1.png" class="img-responsive">

### 12.2 or
**语法**
```
db.collection_name.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
)
```

**实例**
查询age = 30 或者 age = 50  的数据
```
db.worker.find({$or:[{age = 30},{age = 50}]})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-8.png" class="img-responsive">

### 12.3 and和or联用
**语法**
```
db.collection_name.find(
   {
     key1:value1,
     key2:value2,
     $or: [
         {key1: value1},
         {key2:value2}
     ]
   }
)
```

**实例**
查询 name是zhangRenYang 并且 age是30 或者 age是 50 的数据
```
db.worker.find({name:'zhangRenYang',$or:[{age:30},{age:50}]})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/mongodb-andOr-1.png" class="img-responsive">

## 13. 分页查询
### 13.1 limit
读取指定数量的数据记录
**语法**
````
db.collectoin_name.find().limit(number)
```
** 参数**
- collectoin_name集合
- number读取的条数

**实例**
查询前3条数据
```
db.worker.find().limit(3)
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-14.png" class="img-responsive">


### 13.2 skip
跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数
**语法**
```
db.collectoin_name.find().skip(number)
```
**参数**
- collectoin_name集合
- number跳过的条数

**实例**
查询3条以后的数据
```
db.worker.find().skip(3)
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-15.png" class="img-responsive">

### 13.3 skip+limit
通常用这种方式来实现分页功能
**语法**
```
db.collectoin_name.find().skip(skipNum).limit(limitNum)
```
**参数**
- collectoin_name 集合名称
- skipNum 跳过的条数
- limitNum 限制返回的条数

**实例**
查询在4-6之间的数据
```
db.worker.find().sort({age:-1})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-16.png" class="img-responsive">

### 13.4 sort排序
sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。
**语法**
```
db.collectoin_name.find().sort({key:1})
db.collectoin_name.find().sort({key:-1})
```
**参数**
- collectoin_name集合
-  key表示字段

**实例**
查询出并升序排序 {age:1}  age表示按那个字段排序 1表示升序
```
db.worker.find().sort({age:1})
```
<img src="http://7xjf2l.com2.z0.glb.qiniucdn.com/3.mongodb-16-12.png">
