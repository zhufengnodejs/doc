
## 1.JS预解析
当浏览器加载html页面的时候，会先提供一个供全局JS代码执行的环境，称为`全局作用域`(global/window)  
预解析仅发生在当前作用域中(刚开始时仅对window下的进行预解析，只有函数执行时才对函数的进行预解析)  
函数名存储的是一个内存地址，代表了函数本身，函数名加括号代表函数执行；函数执行结果为return返回的内容，若没有return则返回值为undefined  
对象名存储的也是一个内存地址，当修改对象属性时先找到对应的空间，然后修改属性  
在当前的作用域中，JS代码执行之前浏览器会默认把所有的var和function的进行提前的声明或定义  
### 1.1 变量的预解析  
变量在预解析时仅提前声明  
```javascript
console.log(num);  //undefined
var num = 12;
console.log(num);  //12
if(false){
  var a = 13;
}
console.log(a);  //undefined
```
预解析时仅var num; 告诉浏览器在全局作用域中有一个num变量了，此时还未定义  
不管if条件成立不成立，里面有var声明都进行预解析  
```javascript
if(!("num" in window)){
  var num = 12;
}
//条件成立才会赋值
console.log(num);  //undefined
```

### 1.2 函数的预解析  
1. 函数在预解析时提前声明和定义  
```javascript
showMsg();  //这是第二个函数
function showMsg(){
  alert("这是第一个函数");
}
showMsg();  //这是第二个函数
function showMsg(){
  alert("这是第二个函数");
}
```
函数执行时先创建自己的私有作用域，然后如果有形参，先给形参赋值，再进行私有作用域的预解析，再代码从上至下执行  
私有变量：在私有作用域中声明的变量和`函数的形参`  

2. var fn = function(){};在JS预解析时，在匿名函数表达式中只预解析等号(=)左边的，右边的作为值不参与预解析.即var fn;
```javascript
fn();  //报错 TypeError: fn is not a function //该项不为函数，不能执行
var fn = function(){
  console.log("ok");
}
```
3. 自执行函数定义的function在全局作用域下是不进行预解析的，当代码执行到这个位置时，定义和执行一起完成   
4. 函数体中return下面的代码虽然不再执行了，但是也会预解析;return后面跟着的都是返回值，所以不进行预解析  
```javascript
function fn(){
  console.log(num);
  return function(){};  //该function作为返回值不进行预解析
  var num = 12;  //该num作为声明变量进行预解析
}
fn();
```

### 1.3 全局变量  
带var的变量可以进行预解析，在赋值之前执行不会报错  
不带var的变量是不能进行预解析的，在赋值之前执行会报错  
```javascript
console.log(num);  //报错：num is not defined
num = 12;
``` 
```javascript
num = 12;
console.log(num); // 12  window.num
```  
全局作用域中增加了一个全局变量num,相当于给window增加了一个num属性，值为12  
注：JS中在不做任何特殊情况处理下，上面的代码报错，下面的代码都不再执行  
在JS中，变量名和函数名重复了，是冲突情况;在预解析时如果名字已经声明过了不需要重新声明，但要重新赋值    
```javascript
var fn = 12;
function fn(){...}
//这两个fn是一个名字，最终只能保留一个值，最终fn为变量
```
```javascript
fn();
function fn(){console.log(1)}
fn();
var fn = 12;
fn();
function fn(){console.log(2)}
fn();
```

## 2.作用域链
### 2.1 私有作用域
在私有作用域中遇到的变量，若为私有变量则与外界变量没有任何关系，若不是私有变量，则在当前作用域上一级进行查找，直到找到window为止  
私有作用域中出现的变量不是私有的，则往上级作用域中查找，若还没有则继续向上查找，直到window为止；若window下也没有则报错  
私有作用域下保护了私有变量不受外界干扰，外界变量不能修改私有变量，同样私有变量也不能修改外界变量  
```javascript
console.log(total);  // undefined
var total = 0;
function fn(num1,num2){
  console.log(total);  //undefined
  var total = num1+num2;
  console.log(total);  //300
}
fn(100,200);
console.log(total);  //0
```
### 2.2 查找上级作用域  
1. 如何查找当前作用域的上级作用域：看当前函数是在哪个作用域下定义的，那么它的上级作用域就是谁    
2. 和函数在哪里执行没关系，和函数在哪里定义有关系
```javascript
var num = 10;
function fn(){
  var num = 100;
  return funciton(){
    console.log(num);
  }
}
var f = fn();
f();
~function(){
  var num = 1000;
  f();
}();
```
f()的值和执行环境无关，和定义环境有关



## 3.内存释放和作用域销毁
### 3.1 堆内存  
存放引用数据类型值，比如对象的属性名和属性值，函数的字符串  
对象数据类型或函数数据类型在定义时都会开辟一个堆内存，并且有一个引用地址；如果有变量引用这个地址，那就认为这段内存被占用，不能被销毁了  
null为空对象指针  
将变量值赋为null即可释放堆内存，浏览器在空闲的时候会把它销毁  
```javascript
var obj1 = {"name":"张三"};
var obj2 = obj1;
obj1 = null;
obj2 = null;
```
### 3.2 栈内存(作用域)  
私有作用域，只有函数执行才会产生私有作用域(for,if,switch的大括号不是私有作用域)  
全局作用域属于不销毁作用域，只有当页面关闭的时候才会销毁  
一般情况下，函数执行完成后，私有作用域会主动进行释放和销毁  
特殊情况下，当前私有作用域的部分内存被作用域以外的东西占用了，那么当前作用域就不能被销毁了  

1. 函数执行返回了一个引用数据类型的值，并且在函数的外面被一个其他东西接收了，不销毁   
```javascript
  function fn(){
    var num = 100;
    return function(){
      console.log(num);
    }
  }
  var f = fn();  //返回值被f接收,fn不能被销毁
```
2. 自执行函数形成的私有作用域在这种情况下也不销毁    

```javascript
var oDiv = document.getElementById('div1');
~function(){
oDiv.onclick = function(){

}
}(); 
```
oDiv为一个引用数据类型，引用click函数的一段内存；自执行函数形成的私有作用域，包含oDiv的点击事件，也引用同一段内存(在私有作用域中给DOM元素的事件绑定方法，这种情况下私有作用域不销毁)
注：通过DOM方法获取的元素、元素集合都是对象数据类型的值  

```javascript
var oDiv = document.getElementById('div1');
```    
  
3. 不立即销毁：fn返回的函数没有被其他东西占用，但还需要`执行一次`，所以暂时不能销毁，当返回的值执行完后浏览器在空闲时间把它销毁

```javascript
  function fn(){
    var num = 12;
    return function(){

    }
  }
  fn()(); //表示执行函数fn，再执行返回值的函数
```

## 4.this关键字
this代表当前行为执行的主体；  
context指当前执行的环境和区域；  
this和context没有必然联系    
### 4.1 window下的this
函数执行首先看函数名前有没有点，有的话前边是谁this就是谁，没有的话就是window  
```javascript
function fn(){
    console.log(this);
}
var obj = {fn:fn};
fn();  // 方法名前没有点
obj.fn();  //方法名前有点
function sum(){
    fn();
}
sum();  //与执行环境无关
var aa = {
    sum:function(){
      fn();
    }
}
aa.sum();  //this --> window与执行环境无关
```
### 4.2 自执行函数this
自执行函数的this永远是window
### 4.3 指定元素this
给元素的某一事件绑定方法，当事件触发的时候，执行对应方法时当前this指该元素
```javascript
document.getElementById('div1').onlick = fn;  //this ==> #该方法
document.getElementById('div1').onlick = function(){
    //该方法的this指#div1
    fn(); //该方法的this依然是window
}
```

















