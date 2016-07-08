
## 1.DOM document object model  
DOM 就是描述html节点关系的图谱  
DOM提供获取元素的方法和之间关系属性以及操作元素的方法  
### 1.1 获取元素方法    
1. 通过ID名来获取元素  
```javascript
var oTab = document.getElementById('tab');
```  
通过id获取时上下文只能是document  
若文档中出现同名ID，则通过该方法获得的是第一个元素   
若没获取到元素，则返回null   
在IE6/7中会把表单元素的name属性值当做id来用，并且不区分id的大小写  
所以不要让表单元素的name和id重复，不要用id的大小写区分元素  
也可以直接用ID名来代替获取元素对象(但是不推荐)，例：console.log(tab);也可获取到元素  
2. 通过标签名来获取元素
```javascript
var oP = document.getElementsByTagName('p');
```
在`整个文档`中通过标签名获取`一组`元素  
document在这里为上下文(context),可通过改变上下文来限制获取范围；  
获取这组元素长度：Obj.length或Obj["length"]  
获取第一个元素：Obj[0]或Obj.item(0)   
3. 通过元素name属性值获取一组元素
```javascript
var names = document.getElementsByName('name');
```
在IE浏览器下只对表单元素属性有效  
4. 通过元素class属性值获取一组元素
```javascript
var list = document.getElementsByClassName('list');
```
这个方法是项目中最常用的方法；但是不兼容IE6/7/8  
5. 通过元素class属性值获取一组元素的另一方法  
```javascript
document.querySelector('.tab');
document.querySelectorAll('.tab');
```
同样，此方法不兼容IE6/7/8  
document.querySelector();  获取的是第一个类名元素  
document.querySelectorAll(); 获取多个元素，是类数组集合  
6. 获取html元素：document.documentElement；获取body元素：document.body   
获取当前屏幕宽度的兼容方法：  
```
var width = document.documentElement.clientWidth || document.body.clientWidth;
```

### 1.2 增加DOM的方法  
动态创建一个div元素对象  
```javascript
var div = document.createElement("div");
```
将创建元素添加到页面去,默认添加到容器的末尾位置  
```javascript
document.body.appendChild(div);
```
也可以添加到指定元素之前，第一个参数为添加元素，第二个参数为指定元素  
```javascript
document.body.insertBefore(oP,oDiv);
```
等同于  
```javascript
oDiv.parentNode.insertBefore(oP,oDiv);
```
### 1.3 删除DOM的方法  
只有父级元素才有权利删除，所以必须找到父元素才能删除  
```javascript
oDiv.parentNode.removeChild(oDiv);
```
### 1.4 克隆DOM的方法
cloneNode() 默认为false，只克隆当前的;设置为true可以把选定元素的子孙元素也克隆出来  
```javascript
var a = oP.cloneNode();
cloneNode(true); 
```
### 1.5 替换DOM的方法  
replaceChild(newNode,oldNode)将newNode元素替换oldNode元素  
```javascript
oDiv.parentNode.replaceChild(dd,oP); 
```
### 1.6 增加自定义属性  
给DOM增加自定义属性的方式  
```javascript
obj["key"]=value;
obj.key=value;
```
获取形式只能是obj.key，另一种方式是  
```javascript
obj.setAttribute(key,value);  
```
获取形式只能是obj.getAttribute(key)   
删除形式只能是obj.removeAttribute(key)  
二者区别在于前者的添加属性不会显示在结构上；后者添加的属性会改变html结构，显示在结构上  
而后者的缺陷在于IE6/7/8下不能修改class属性  

### 1.7 节点类型
|     类型        |nodeType   |   nodeName |     nodeValue|
|-----------------|-----------|------------|--------------|
|元素节点(元素标签)|   1        |大写的标签名 |      null   |
|文本节点(文字)    |    3      |     #text  |      文字内容 |
|注释节点(注释)    |    8      |    #comment|      注释内容 |
|document         |    9      |  #document |      null    |
在标准浏览器下，把空格和回车的内容都作为text文本节点处理   
练习题：模拟children方法，实现获取指定元素下的元素子节点  

###  1.8 DOM获取关系属性
Node节点:一个页面中的标签、文字、注释……都是节点  
Obj.childNodes 获取所有子节点  (包括文本节点、注释节点、元素节点。。。)  
Obj.children 获取所有元素子节点  (只包含元素节点)  
Obj.parentNode 获取父节点  
Obj.previousSibling 获取上一个哥哥节点(排行第五，则获取的是第四个)  
Obj.nextSibling 获取下一个弟弟节点(排行第五，则获取的是第六个)  
Obj.firstChild 获取所有子节点中第一个  
Obj.lastChild 获取所有子节点中最后一个  

## 2.Math函数
### 2.1 Math方法  
Math.abs();取绝对值  
Math.ceil();向上取整  
Math.floor();向下取整  
Math.round();四舍五入 在负数情况下五及五以下是舍  
Math.max(val1,val2,val3...);求最大值  
Math.min(val1,val2,val3...);求最小值  
```javascript
Math.abs(-12);
Math.ceil(12.5);
Math.floor(12.5);
Math.round(12.4);
Math.min(11,12,13,14,15);
Math.max(11,12,13,14,15);
```
### 2.2 随机数
Math.random(); 获取[0,1)之间的随机小数(包含0不包含1)  

获取[m,n]之间的随机整数  
```javascript
Math.round(Math.random()*(n-m)+m);  //公式
```
## 3.String字符串类
### 3.1 字符串属性
str.length 获取字符串中字符个数  
```javascript
var str = "hello world";
console.log(str.length);  //11
```

### 3.2 字符串操作
1. 字符串截取方法：  
str.substr(m,n); 从索引m开始，截取n个字符  
str.substring(m,n); 从索引m出开始查找，找到索引n处，不包含n，将查找到的内容返回  
str.slice(m,n); 从索引m出开始查找，找到索引n处，不包含n，将查找到的内容返回;支持负数索引,计算为str.length+负数索引   
```javascript
var str = "hello world";
console.log(str.substr(8,3));  //rld
console.log(str.substring(8,11));  //rld
```
以上三方法若参数中只有m一个参数，则都截取到str末尾  
2. 查找字符串索引  
str.indexOf(字符); 获取字符串中该字符第一次出现的索引位置   
str.lastIndexOf(字符); 获取字符串中该字符最后一次出现的索引位置    
```javascript
var str = "hello world";
console.log(str.indexOf("l"));  //2
console.log(str.lastIndexOf("l"));  //9
console.log(str.indexOf("a")); //-1
```
以上两方法中若没有找到该字符则返回-1；可用来判断是否包含某字符   
3. 大小写转换  
str.toLowerCase();  将字符串转换为小写字母  
str.toUpperCase();  将字符串转换为大写字母    
```javascript
var str = "hello WORLD";
console.log(str.toLowerCase());
console.log(str.toUpperCase());
```
4. 替换字符  
str.replace(oldStr,newStr); 在不使用正则的情况下，每一次调用都只替换一次  
```javascript
var str = "hello world";
var newstr = str.replace(/l/g,'a');
console.log(newstr);
```
5. 分隔字符串  
按照指定的字符将字符串拆分成数组    
```javascript
var str = "1+2+3+4"
var arr = str.split("+");  //["1","2","3","4"]
var arr2 = str.split("");  //["1","+","2","+","3","+","4"]
var arr3 = str.split(","); //["1+2+3+4"]
```
若没有字符则将每一项都拆分成数组元素，若找不到指定字符则将整体按一个元素添加到数组  
此方法对应数组的join方法  
6. 字符串中也存在索引，从零开始，空格和换行等特殊字符也是字符  
str.charAt(n); 获取字符串中索引为n的字符  
str.charCodeAt(n); 获取指定位置字符对应的ASCII编码值      
```javascript
var str = "hello world";
console.log(str.charAt(8)); //r
console.log(str.charCodeAt(8)); //114
```

## 4.Date函数
### 4.1 获取时间
1. 获取电脑时间  
```javascript
var time = new Date();  //获取当前电脑时间
var year = time.getFullYear();
var month = time.getMonth()+1; // 获得0-11
var day = time.getDate();
var week = time.getDay(); //0-6之间，代表周日到周六
var hours = time.getHours();
var minutes = time.getMinutes();
var seconds = time.getSeconds();
var msecond = time.getMilliseconds();
```
2. 获取目标时间，在Date()中传参数   
```javascript
var targetTime = new Date("2016-06-20 21:00:00");
```
Date()支持十多种传入时间格式，在日期中用"-"可以连接时间，但是在IE6/7/8中不兼容，需要改成"/"  
```javascript
var targetTime = new Date("2016/06/20 21:00:00");
```
### 4.2 计算倒计时  
getTime(); 获取当前时间距离1970年1月1日午夜(00:00)到现在的毫秒差   
则用目标时间距离1970年的毫秒差  减去  当前时间距离1970年的毫秒差，则是目标时间与当前时间之间的差值    

## 5.定时器  
1. window.setInterval([function],[interval]); 每隔一段时间执行一次  
2. window.setTimeout([function],[interval]);  隔一段时间仅执行一次  
3. clearInterval(); clearTimeout();  清除定时器  
4. 定时器的返回值是一个数字，代表这是第几个定时器  

## 6.深入函数数据类型  
JS在预解析时将变量或函数预解析到它们能调用的环境（变量运行时环境）中，并且预解析发生在`当前` `作用域`下的  
变量和函数进行预解析时是不一样的，变量只是提前声明，而函数是提前声明和定义都完成了    
函数执行可以写在任何位置，因为定义的这个操作在预解析时已完成了  
函数执行时会形成一个新的私有作用域(栈内存)，首先进行的是预解析，其次代码执行  
函数`执行一次`就形成一个新的私有作用域，执行完成之后，当前的私有作用域会`销毁`  


## 7.栈内存和堆内存
刚开始加载页面时浏览器会自带一个js的执行环境，这个环境也叫做“栈内存”，也叫作用域  
引用数据类型会先开辟一段内存空间，把属性名和属性值都存起来，叫做“堆内存”  
栈内存(作用域)存储的是基本数据类型，代码从上至下执行  
当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。  
因此，所有在方法中`定义的变量`都是放在栈内存中的；因为对象的创建成本通常较大，堆内存中的对象不会随方法的结束而销毁，为的是能够反复利用；即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。   
因为与垃圾回收机制有关，栈内存和堆内存的作用都是为了使程序运行时占用的内存最小。  
