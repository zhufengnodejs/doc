## mongodb的使用
### 查看数据库
```javascript
$ show dbs
```
### 使用一个表
```javascript
$ use users
```
### 查看当前所在表的名字
```javascript
$ db.getName();
```
### 删除当前表
```javascript
$ db.dropDatabase();
```
### 创建空集合
```javascript
$ db.createCollection('course');
```
### 显示所有集合
```javascript
$ show collections
```
### 删除集合
```javascript
$ db.course.drop();
```
### 创建有内容的集合
```javascript
$ db.course.insert([{name:'nodejs'}]);
或
$ db.course.save([{name:'nodejs'}]);
```
### 查看集合中的内容
```javascript
$ db.course.find();
```
### 更新集合中的内容
```javascript
$ db.course.update({"age":8},{$set:{name:'nodejs'}});
```
### 递增更新
```javascript
$ db.course.update({name:'nodejs'},{$inc:{age:2}});
```
### 多条更新(只能带有$参数时使用)
```javascript
$ db.course.update({name:'nodejs'},{$inc:{age:2}},{multi:true})
```
### 覆盖更新
```javascript
$ db.course.update({name:'nodejs'},{age:1})
```
### 匹配不到插入
```javascript
$ db.course.update({name:'nodejs1'},{age:1},{upsert:true})
```
### 删除单条记录
```javascript
$ db.course.remove({age:1},{justOne:true})
```
### 删除所有记录
```javascript
$ db.course.remove({age:1})
```
### 查询字段(1为显示0为不显示)
```javascript
$ db.course.find({name:'nodejs'},{name:1,_id:0}))})
```
### 查询一条记录
```javascript
$ db.course.findOne({name:'nodejs'})
```
### 范围查询
```javascript
$ db.person.find({age:{$gt:7}})
```
### 根据id进行查询
```javascript
$ db.course.find({"_id" : ObjectId("5796db838611f21cd7df214c")});
```
### 查询条数
```javascript
$ db.course.find({name:'nodejs'}).count()
```
### 正则查询
```javascript
$ db.course.find({name:/^nodejs$/})
```
### 条件查询
```javascript
$ db.course.find({age:{$lt:2},$or:[{name:'nodejs0'},{name:'nodejs'}]})
```
### 限制条数查询
```javascript
$ db.course.find().limit(3)
```
### 跳过查询
$ db.course.find().skip(3).limit(3)
### 排序查询
```javascript
$ db.course.find().sort({_id:-1})
```
