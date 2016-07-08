
## 1.页面组成
页面由HTML(超文本标记语言)+CSS(层叠样式表)+Javascript(动态脚本语言)三部分组成        
### 1.1 js引入页面的方式                          
1. 行内引入(不推荐)，安全性能低
2. script内嵌
3. script外链  
`注意:在外链的script标签中间写的js代码不执行，也不报错`   
因为html从上至下加载，所以将js文件放在body最后面，js可以获取html标签添加动态效果    
  
### 1.2 js常用输出方式
```javascript
alert("...");   //alert自动将输出内容转为字符串 
document.write("...");  
cosole.log("...");  
objNode.innerHTML = "...";
objNode.innerTEXT = "...";
```

### 1.3 JS的三部分
JS由`ECMAScript`、`DOM(document object model)`和`BOM(browser object model)`三部分组成

### 1.4 JS的命名规范  
在js中严格区分大小写，常用命名法使用驼峰命名方式
1. 首字母小写，其余有意义的首字母大写  
2. 使用数字，字母，下划线，$,但不能以数字开头  
3. 不能使用关键字和保留字  

## 2.变量和数据类型
js中的变量是松散类型的，声明的变量可存储任何数据类型;  
js的数据类型有Number,String,Boolean,Null,Undefined,Object  
其中基本数据类型由简单结构组成，如Number,String,Boolean,Null,Undefined  
引用数据类型的结构相对复杂，分为:对象数据类型:object、数组、正则;函数数据类型:function  

### 2.1 Number数据类型  
1.  强制数据类型转换 Number():
强制将其他数据类型转换为number数据类型，如果是字符串，字符串中一定是数字才可以转换
```javascript
console.log(Number('12px'));  //NaN
```
2.  非强制数据类型转换 parseInt(),parseFloat():  
在转换中途遇到非有效数字就不查找了
```javascript
parseInt('12px');
parseInt('12px13');
parseInt('zhufeng2015');
parseInt('12.5px');
parseFloat('12.5px');
Number('12.5px');
```
```javascript
var num = Number('12px');  //NaN
if( num == 12){
  console.log(12);
}else if(num == NaN){
  console.log(NaN);
}else{
  console.log('以上都不是');
}
```
3.  NaN表示不是一个有效数字，但属于Number数据类型
isNaN()用于检测一个值是否为有效数字
```javascript
console.log(NaN == NaN); //false
console.log(isNaN("123"));  //true
```
如果检测的值不是number数据类型，浏览器会默认把它转化成number数据类型，然后再比较

### 2.2 Boolean数据类型
转换规则
1. 如果只有一个值，判断这个值的真假；
2. 0,NaN,"",undefined,null这五个值都为假
3. val1 == val2 两值相比若不是同一数据类型的，先默认进行数据转换

### 2.3 比较规则   
1. 对象==对象  永远不相等  
```javascript
var obj1 = {name:'zhangsan',age:8};
var obj2 = {name:'zhangsan',age:8};
var obj3 = obj2;
console.log(obj1 == obj2);
console.log(obj2 == obj3);
```
2. 对象==字符串  先将对象转换为字符串(toString())，然后再进行比较，例如
[].toString()转为""空字符串；({}.toString();) ==> [object Object]
```javascript
console.log({} == "");
```
3. 对象==布尔类型 对象先转换为字符串(toString())，字符串再转换为数字(Number());布尔类型转换为数字(true:1,false:0);最后两数字比较  
```javascript
  console.log([]==false);
```
4. 对象==数字  对象先转换为字符串(toString())，字符串再转换为数字(Number())
```javascript
var obj = [age:7];
var arr = [7];
console.log(obj == 7);
console.log(arr == 7);
```
5. 数字==布尔  布尔类型转换为数字(true:1,false:0)
```javascript
console.log(1 == true);
console.log(2 == true);
console.log(2 == false);
```
6. 数字==字符串 字符串再转换为数字(Number())
```javascript
console.log(7 == "7px");
```
7. 字符串==布尔 都转换为数字，然后比较
```javascript
console.log(true == "1");
```
8. null或undefined和其他任何数据类型相比都不相等，但是
```javascript
console.log(null == undefined);   //true
```
```javascript
console.log(Number(null)); //0
console.log(Number(undefined)); //NaN
```
9. === 绝对比较 如果数据类型不一样，肯定不相等
```javascript
console.log("1" === 1);
console.log(0 === false);
console.log(null === undefined);
```
10. !:取反（先将值转化为布尔类型，然后再取反）
!!:将其他数据类型转换为boolean类型，相当于Boolean();
```javascript
![] == false   // true !先和[]运算，不等[]转为字符串
```

### 2.4 Object对象数据类型    
对象由多组属性名和属性值组成，属性名和属性值用来描述对象特征，创建方式有：   
 
1. 字面量创建方式    
```javascript
var obj = {name:'zhangsan'}
```    
             
2. 实例创建方式  
```javascript
var obj = new Object();
//增加属性名和属性值的方式
obj.name = 'zhangsan';
obj["name"] = 'zhangsan';  //方括号创建必须双引号属性名
//修改属性值,规定:对象中的属性名不允许重复，如果之前有就是修改，没有就是增加
obj.name = "zhufeng";
obj["name"] = "zhufeng";
//获取属性名和属性值的方式
console.log(obj["name"]);
console.log(obj.name);
console.log(obj.aa);  //若对象中没有属性名，则返回undefined
//删除属性名和属性值
obj.name = null; //假删除，该属性值仍然存在
delete obj.name; //真删除，彻底删除属性名和属性值
```
对象数据类型中包含：对象类(Obejct)，数组类(Array)，正则类(RegExp)，时间类(Date)，字符串类(String)，布尔类(Boolean)，Math...对应的实例  
js中对象、类、实例的区别:对象是泛指;类是对象的具体细分;实例是类中具体事物

### 2.5 数据类型区分和数据类型检测
1. 基本数据类型和引用数据类型的区别  
基本数据类型把值直接赋给变量，直接对值进行操作  
引用数据类型则是开辟一段内存，将属性名和属性值保存在里面，并拥有一个内存地址   
而变量引用的是内存地址，并没有存储数值   
`基本数据类型操作的是值；引用数据类型操作的是引用内存地址`   
2. 检测数据类型方式
typeof运算符，返回值:`字符串`，包含"number","string","boolean","undefined","function","object"
typeof不能具体检查object下细分的数据类型，如:数组，对象，正则...
```javascript
console.log(typeof typeof typeof typeof []);
```
3. 其他检测数据类型的方式:instanceof运算符;constructor;Object.prototype.toString.call()



## 3.条件执行 
### 3.1 三个判断
1. if判断
```javascript
if(true){...}else{...}
if(...||...)  
if(...&&...)
```
2. 三元运算符
```javascript 
 条件 ? 执行一 : 执行二;  
 条件 ? 执行   : void 0;
```
3. switch case 
```javascript
var num = 0;
switch(num){
  case 0:
    ...;
    break;
  case 1:
    ...;
    break;
  default:
    ...;  
}
```  
每一种情况下都要加break，不加break的话后面条件不成立的情况的代码也会执行；每一种case比较都相当于===，所以要注意数据类型一致  

###  3.2 for循环
第一步，设置初始值 var i=0;
第二步，设置循环执行条件 i<5;
第三步，执行循环体中的内容{...}
第四步，每一轮循环完成后执行i++操作
```javascript
for(var i=0;i<5;i++){
  if(){
    continue;
  }else{
    break;
  }
}
```
break:在循环体中出现后，整个循环立即结束
continue:在循环体中出现后，当前这轮循环停止，继续下一轮循环
在循环体中只要遇到这两个关键字，循环体后面的代码就不执行了

### 3.3 for in循环  
用来循环一个对象中的属性名和属性值  
```javascript  
for(var key in obj){
  console.log(key,obj[key]);  //输出键和值
}
```
对象获取值若键值为数字，则obj.key方式不能获取到  
循环顺序：若有数字为键值，则按照数字顺序由小到大循环，剩下的再按照对象中的顺序循环  

## 4.数组和数组的常用方法    
### 4.1 创建数组的两种方式  
1. 字面量创建方式：
```javascript
var arr = [1,2,3,4];
```
2. 实例创建方式：
```javascript
var arr = new Array();  
```
3. 数组也是对象数据类型，由属性名和属性值组成
4. arr.length 可以获取数组的长度  
  
### 4.2 数组的增加
1. arr.push(16); 向数组末尾添加元素，返回值为新数组的长度；原有数组改变了
2. arr.unshift(17); 向数组的开头添加元素，返回值为新数组的长度；原有数组改变了
```javascript
var arr = [14,15];
arr.push(16);
console.log(arr);
arr.unshift(17);
console.log(arr);
```  
3. arr.splice(0,0,x); 相当于arr.unshift(x)，在数组开头`添加`元素
```javascript
var arr = [1,2,3,4];
console.log(arr.splice(0,0,5,6));  //[]
console.log(arr); // 5,6,1,2,3,4
```  
4. arr.splice(n,0,x); 向数组中某个位置`添加`元素，从索引n开始，删除0个内容，并在索引n之前添加内容x；返回的是一个空数组；原有数组改变
```javascript
var arr = [1,2,3,4];
console.log(arr(1,0,5)); //[]
console.log(arr); //[1,5,2,3,4]
```  
5. arr.splice(arr.length,0,x); 相当于arr.push(x)，在数组末尾`添加`元素
```javascript
var arr = [1,2,3,4];
console.log(arr.splice(arr.length,0,5));  //[]
console.log(arr);  //1,2,3,4,5
```

### 4.3 数组的删除  
1. arr.splice(n,m,x); 把原数组中的某些项进行替换，从索引n开始删除m个元素，用x替换原来的，并返回`删除`的内容
```javascript
var arr = [1,2,3,4];
console.log(arr.splice(1,2,5,6));  //2,3
console.log(arr);  //1,5,6,4
```

2. arr.splice(n,m); 从索引n开始(包含n)，`删除`m个元素，并将删除的内容作为数组返回
```javascript
var arr = [1,2,3,4];
console.log(arr.splice(1,2));  //2,3
console.log(arr);  //1,4
```
3. arr.splice(arr.length-1,1); 删除数组的最后一项
```javascript
var arr = [1,2,3,4];
console.log(arr.splice(arr.length-1,1));
```  
4. arr.pop(); 删除数组最后一项，并将删除的元素作为返回值，原有数组长度减1
```javascript
var arr = [1,2,3,4];
console.log(arr.pop()); //4
console.log(arr);  //1,2,3
```
5. arr.shift(); 删除数组第一项，并将删除的元素作为返回值，原有数组长度减1
```javascript
var arr = [1,2,3,4];
console.log(arr.shift());  //1
console.log(arr);  //2,3,4
```  
6. 可以总结出：数组删除元素的方法都会将删除元素返回，数组增加元素的方法都会返回空数组 
  
### 4.4 数组的查询  
1. arr.slice(n,m); 从索引n开始(包含n)，找到索引m处(不含m)，将找到的内容作为一个新的数组返回，原有数组不变  
```javascript
var arr = [1,2,3,4];
console.log(arr.slice(1,2));  //2
console.log(arr);  //1,2,3,4
```  
2. arr.slice(n); 从索引n开始(包含n)，找到数组末尾  
```javascript
var arr = [1,2,3,4];
console.log(arr.slice(1));  //2,3,4
console.log(arr); //1,2,3,4
```
3. arr.slice(0)或arr.slice()  将原有数组复制一份，属于数组的克隆  
```javascript
var arr = [1,2,3,4];
console.log(arr.slice());  //1,2,3,4
console.log(arr);  //1,2,3,4
```
4. splice和slice的区别在于对原数组的改变    

### 4.5 数组的复制  
虽然slice()也能复制一个数组出来，但是这个方法只是查询出了所有元素，真正的复制方法为concat()
1. arr.concat() 实现数组的克隆，原来的数组不变，相当于slice(0)
```javascript
var arr = [1,2,3,4];
var arr2 = arr.concat();
console.log(arr2);
```  
2. arr.concat(arr2)本意用于数组的拼接,将数组arr和arr2拼接成一个数组；返回拼接后的数组
```javascript
var arr = [1,2];
var arr2 = [3,4];
console.log(arr.concat(arr2)); //1,2,3,4
console.log(arr2.concat(arr)); //3,4,1,2
```

### 4.6 数组的其他方法
1. 转化为字符串toString()，把数组中每一项用“,”隔开，连接为字符串，原有数组不变 
空数组转化为空字符串
```javascript
var arr = [1,2,3,4];
console.log(arr.toString); //"1,2,3,4"
console.log([] == "");  //true
```  
2. join(分隔符)，把原有数组按照指定分隔符连接成字符串
```javascript
var arr = [1,2,3,4];
var str = arr.join("+")
console.log(str);  //"1+2+3+4"
console.log(eval(str));  //10
```
3. 数组的倒序reverse()，将数组倒过来排列，原有数组改变
```
var arr = [1,2,3,4];
arr.reverse();
console.log(arr);
```
4. 数组的排序sort()，将数组由大到小或由小到大排列，原有数组改变；但是直接用sort排序只能处理10以内的排序
```javascript
var arr = [4,1,3,2];
arr.sort();
console.log(arr); //1,2,3,4
```
当需要排序10以上的数组时需要传递参数sort(function(a,b){return a-b;})，其中a代表每次循环的当前项，b代表后面的项
```javascript
var arr = [11,16,15,17,12,14,13];
arr.sort(function(a,b){return a-b;});
console.log(arr);
```  
### 4.7 数组常用但不兼容的方法  
1. indexOf();  判断数组是否包含某一项
```javascript
var arr = [1,2,3,4,5];
console.log(arr.indexOf(3));  //返回元素3所在的索引位置：2
console.log(arr.indexOf(3,1));  //从索引1的位置处开始查找元素3的所在位置：2
//若在指定位置后没找到的话则返回-1
```
2. forEach();  循环数组中每一项，在这个循环中不能使用break和continue，若跳出循环则需要return
```javascript
var arr = [1,2,3,4];
arr.forEach(function(e){
  if(e<=3){
    alert(e)
  }else{
    return ;
  }
});
```
3. map();  循环每一项，操作参数

## 5.function函数数据类型
创建函数，关键字为function   
执行函数，函数名后带小括号   
创建一个函数时，首先开辟一段内存空间，浏览器为其分配一个16进制的地址；把函数中的代码以`字符串`的形式存储到空间内；再把当前的`地址`赋值给函数名    
函数执行步骤：  
函数执行时，会为js代码提供一个私有作用域；把字符串变为js代码，并从上至下执行  
私有作用域保护了里面的变量不受外界干扰，这种形成的保护机制叫`闭包`  
### 5.1 函数的返回值
由于闭包的机制导致了在函数体外面无法获取里面变量的值，所以需要关键字return为函数提供出口   
return 并不是把变量返回给外边，而是把变量的值返回到外边   
若没有写return则默认返回结果为undefined；若只写return而没写变量，则为undefined   
函数在return 之后，后面的语句不再执行   
### 5.2 函数的参数集合
arguments为函数接收参数的集合，但是它不是数组，而是一个类数组   
arguments的数据类型为对象；以数字作为索引，0开始；有length属性；   
函数的形参作用：用来实现一个功能，把需要的变量定义到形参上，在执行时提供   
根据参数的不同，函数可以实现一个功能的多种形态   
若定义了形参而执行时未赋值，则为undefined    
arguments.callee代表当前执行函数的本身，它在哪一个函数中运行，就代表哪个函数   

### 5.3 匿名函数方式
1. 自执行函数,定义和执行一起完成
```javascript
;(function(num){
  //定义部分
})(100);  //执行部分
~function(){}();
!function(){}();
+function(){}();
-function(){}();
```
2. 函数表达式
```javascript
var a = function(){}
```


## 6.练习题
1. 选项卡实例
2. 隔行变色
3. 冒泡排序
4. 数组去重(数组塌陷)