##  1.js盒子模型
指的是通过js中提供的一系列的属性和方法，获取页面中元素的样式信息值


例：box有很多自己的私有属性
```javascript
HTMLDivElement.prototype->HTMLElement.prototype->Element.prototype->Node.prototype->EventTarget.prototype->Object.prototype
var box = document.getElementById("box");
console.dir(box);
```

## 2.概念
### 2.1 内容的宽度和高度
- 我们设置的width/height这两个样式就是内容的宽和高；
- 如果没有设置height值，容器的高度会根据里面内容自适应，这样获取的值就是真实内容的高；
- 如果设置了固定的高度，不管内容是多还是少，其实我们内容的高度值的都是设定的那个值。

### 2.2 真实内容的宽度和高度
指的是实际内容的宽高（和我们设置的height没有必然的联系），如我设置高度为200,如果内容有溢出，那么真实内容的高度是要把溢出内容的高度也加进来的。

## 3.  JS盒子模型常用属性
### 3.1 client系列
#### 3.1.1 clientWidth/clientHeight（只读属性）
- 内容的宽/高+左右/上下填充 （和内容是否溢出没有关系）(即不包含border值)
- 如果设置了box-sizing:border-box; 则clientWidth/clientHeight =容器宽/高- border
3.1.2 clientLeft/clientTop （只读属性）
左/上边框的宽度 （border[Left/Top]Width）

### 3.2 offset系列
```javascript
<div id="outer">
    <div id="inner">
        <div id="center"></div>
    </div>
</div>
var outer = document.getElementById("outer"),
    inner = document.getElementById("inner"),
    center = document.getElementById("center");
```

#### 3.2.1 offsetWidth/offsetHeight（只读属性）
clientWidth/clientHeight + 左右/上下边框 （和内容是否溢出没有关系）(包含border)

#### 3.2.2 offsetParent
当前元素的父级参照物，在同一个平面中，最外层的元素是里面所有元素的父级参照物（和html层级结构没有必然的联系）
- 一般来说一个页面中所有元素的父级参照物都是body
```javascript
console.log(center.offsetParent);   //body
console.log(inner.offsetParent);    //body
console.log(outer.offsetParent);    //body
console.log(document.body.offsetParent);    //null
```

- 想要改变父级参照物需要通过position定位来进行改变:absolute,relative,fixed中任意一个值都可以把父级参照物进行修改
```javascript
outer.style.position = "relative";
inner.style.position = "relative";
console.log(center.offsetParent);   //inner
console.log(inner.offsetParent);    //outer
console.log(outer.offsetParent);    //body
```

###3.2.3 offsetLeft/offsetTop（只读属性）
当前元素（外边框）距离其父级参照物（内边框）的偏移距离
```javascript
console.log(center.offsetLeft); //距离body左偏移距离
console.log(inner.offsetLeft);  //距离body左偏移距离
console.log(outer.offsetLeft);  //距离body左偏移距离
```

```javascript
outer.style.position = "relative";
inner.style.position = "relative";
console.log(center.offsetLeft); //距离inner左偏移距离
```
<img src="http://7xjf2l.com1.z0.glb.clouddn.com/offset.png" class="img-responsive">


#### 3.2.4 offset函数封装
等同于jquery中的offset方法，实现获取页面中任意一个元素距离body的偏移（包含左偏移和上偏移），不管当前元素的父级参照物是谁
- 获取的结果是一个对象{left:距离body的左偏移，top:距离body的上偏移}
- 在标准的ie8浏览器中，我们使用offsetLeft/offsetTop其实是把父级参照物的边框已经算在内了，所以我们不需要自己再单独的加边框了

```javascript
function offset(curEle){
    var totalLeft = null,
    <span style="white-space:pre">    </span>totalTop = null,
        par = curEle.offsetParent;
    // 首先把自己本身的进行累加：
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;

    // 只要没有找到body，我们就把父级参照物的边框和偏移进行累加
    while (par){
        if(navigator.userAgent.indexOf("MSIE 8.0") === -1){ //不是标准ie8浏览器才累加边框
            // 累加父级参照物的边框
            totalLeft += par.clientLeft;
            totalTop += par.clientTop;
        }

        // 累加父级参照物的偏移
        totalLeft += par.offsetLeft;
        totalTop += par.offsetTop;

        par = par.offsetParent;
    }
    return {left:totalLeft,top:totalTop};
}
console.log(offset(center));
console.log(offset(center).left);
```

### 3.3 scroll系列
#### 3.3.1 scrollWidth/scrollHeight(只读属性)
- 容器中内容没有溢出的情况下：和我们的clientWidth/clientHeight一模一样
- 如果容器中内容有溢出，获取的结果如下规则：
 scrollWidth：真实内容的宽度（包含溢出）+左填充
 scrollHeight：真实内容的高度（包含溢出）+上填充
获取到的结果都是“约等于”的值，因为：
- 同一个浏览器，我们是否设置overflow="hidden"，对于最终的结果是有影响的（滚动条也占据宽度会影响）；
- 在不同的浏览器中我们获取到的结果也是不相同的

#### 3.3.2 scrollLeft/scrollTop（可读写属性）
滚动条卷去的宽度/高度
注意：
1. 之前我们学习的js盒子模型中：client系列/offset系列/scrollWidth/scrollHeight都是“只读”属性->只能通过属性获取值，不能通过属性修改元素的样式
2. scrollTop/scrollLeft：滚动条卷曲的高度/宽度(这两个属性是唯一“可读写”属性)
scrollTop的值是存在边界值（最大和最小值的），我们设置的值比最小值小或者比最大值大时都没用，起到效果的依然是边界的值。
[最小值是零]
```javascript
box.scrollTop = -1000;  //直接回到容器顶部，没有超出
console.log(box.scrollTop);
```

[最大值=真实的高度-当前容器一屏幕的高度]
```javascript
var maxTop = box.scrollHeight - box.clientHeight;
console.log(maxTop);
```

## 4. 关于js盒子模型属性取值的问题
我们通过以上这些属性值获取的结果永远不可能出现小数，都是整数；
浏览器获取结果的时候，会在原来真实结果的基础上进行四舍五入。

## 5. 关于操作浏览器本身的盒子模型信息
### 5.1 clientWidth/clientHeight
是当前浏览器可视窗口的宽/高（一屏幕的宽/高）
### 5.2 scrollWidth/scrollHeight
是当前页面的真实宽/高（所有屏加起来的宽/高），但是是一个约等于的值
### 5.3 注意
- 不管哪些属性，也不管是什么浏览器，也不管是获取还是设置，想要都兼容的话，需要写两套;
- 且必须document.documentElement在前
```javascript
document.documentElement[attr] || document.body[attr];

[获取]
document.documentElement.clientHeight || document.body.clientHeight
[设置]
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
```

win:编写一个有关于操作浏览器盒子模型的方法
如果只传递了attr没有传递value，默认的意思的“获取”
如果两个参数都传递了，意思是“设置”
不严谨的来说这就是有关于“类的重载”：同一个方法，通过传递参数的不同实现了不同的功能
```javascript
function win(attr,value){
if(typeof value === "undefined"){
return document.documentElement[attr] || document.body[attr];
}
document.documentElement[attr] = value;
document.body[attr] = value;
}
win("clientHeight");
```

补充
parentNode:父亲节点，html结构层级关系中的上一级元素
```javascript
<div id="outer">
    <div id="inner">
        <div id="center"></div>
    </div>
</div>
var outer = document.getElementById("outer"),
    inner = document.getElementById("inner"),
    center = document.getElementById("center");
```

- center.parentNode ->inner
- inner.parentNode ->outer
- outer.parentNode ->body
- document.body.parentNode -> null

- document.documentElement.parentNode ->#document:
- document.parentNode->null

## 6. DOM树形结构
DOM把层次中的每一个对象都称之为节点，就是一个层次结构，你可以理解为一个树形结构，就像我们的目录一样，一个根目录，根目录下有子目录，子目录下还有子目录。
以HTML超文本标记语言为例：整个文档的一个根就是<html>,在DOM中可以使用document.documentElement来 访问它，它就是整个节点树的根节点。而body是子节点，要访问到body标签，在脚本中应该写：document.body。

<img src="http://7xjf2l.com1.z0.glb.clouddn.com/jsbox.jpg" class="img-responsive">
