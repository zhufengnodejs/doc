## DOM
在一个页面中，最常用的有四种: 元素、文本、注释
元素 nodeType=1 nodeName=大写的标签名 nodeValue=null
文本 nodeType=3 nodeName=#text nodeValue=文本内容
注释 nodeType=8 nodeName=#comment nodeValue=注释内容

document
document nodeType=9 nodeName=#document nodeValue=null

## DOM获取节点
### 获取当前页面中元素的方法
```javascript
 document.getElementById();
```
### 把当前指定容器中子子孙孙辈份的所有标签名都获取到
```javascript
   ///context.getElementByTagName(TAG_NAME)
```
### 把当前指定容器中子子孙孙辈份的所有类名元素都获取到
```javascript
   //var spans = oDiv.getElementsByClassName('.span');//IE 6-8不兼容
```
### 有两种特殊的文档属性可用来访问根节点
```javascript
document.documentElement;  //第一个属性可返回存在于 XML 以及 HTML 文档中的文档根节点
document.body;  //第二个属性是对 HTML 页面的特殊扩展，提供了对 <body> 标签的直接访问。
```
### 通过它得到的集合是没有映射关系的属于 staticNodelist
```javascript
document.querySelector();
document.querySelectorAll();
```


## 描述节点和节点之间的属性
### 获取子节点
元素 文本 注释 ，在标准浏览器当中把空格和换行当作文本节点处理,childNodes包括tag之间隐形存在的TextNode对象
```javascript
childNodes
```
### 获取子元素节点
children是指DOM Object类型的子对象，不包括tag之间隐形存在的TextNode
```javascript
children
```

### 父节点
```javascript
parentNode
```

### 上一个哥哥节点/获取上一个哥哥元素节点
```javascript
previousSibling/previousElementSibling
```

### 下一个弟弟节点/下一个弟弟元素节点
```javascript
nextSibling/nextElementSibling
```

### 最后一个节点/最后一个元素节点
```javascript
lastChild/lastElementChild
```

### 第一个节点/第一个元素节点
```javascript
firstChild/firstElementChild
```


## DOM操作
创建元素
```javascript
document.createElement
```

### 创建文档碎片
```javascript
document.createDocumentFragment
```

### 追加新的子元素
```javascript
appendChild
```

## 在当前元素之前插入
```javascript
insertBefore
```

### 克隆元素
```javascript
cloneNode(true/false); 为true表示也克隆子元素/为 false表示 只克隆当前标签
````

### 替换子元素
```javascript
replaceChild
```

### 移除子元素
```javascript
removeChild
```

### 获取/设置/移除自定义属性
```javascript
 get set removeAttribute
```


## DOM盒子模型
```
clientHeight
clientWidth
clientTop
clientLeft

offsetHeight
offsetWidth
offsetTop
offsetLeft
offsetParent

scrollWidth
scrollHeight
scrollTop
scrollLeft

getComputedStyle
currentStyle
```
