

#### 学习vertical-align

[参考文档链接](https://www.itcodemonkey.com/article/3750.html)


##### 作用

* 这个属性主要目的用于将相邻的文本与元素对齐

##### 对哪些元素可以使用Vertical-Align

* inline
* inline-block
* inline-table

##### 基线

* 行盒子的基线不可见，是个自由变量，但下面这个方法可确定其位置

```
    但实际上有个简单的办法可以令其可见。只要在相关行的开头加上一个字母，比如上图中开头的“x”即可。如果这个字母没有被设置对齐，那么它默认就位于基线之上。
```

* 基线移动文本盒子也会跟着移动

* 有一个区域叫行盒子。行盒子中的内容可以垂直对齐。行盒子有基线、文本盒子，还有上边和下边。

* 还有行内元素，也就是可以被对齐的对象。行内元素有基线，以及上边和下边。


##### vertical-align 的值


* 对齐行内元素的基线和行盒子的基线。
* baseline：元素基线与行盒子基线重合。
* sub：元素基线移动至行盒子基线下方。
* super：元素基线移动至行盒子基线上方。
* 100%： 元素基线相对于行盒子基线向上或向下移动，移动距离等于line-height的百分比。

