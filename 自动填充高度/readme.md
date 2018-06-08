

**一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度**

 - 方案1：
    `.sub { height: calc(100%-100px); }`
 - 方案2：
    `.container { position:relative; }`
    `.sub { position: absolute; top: 100px; bottom: 0; }`
 - 方案3：
    `.container { display:flex; flex-direction:column; }`
    `.sub { flex:1; }`
    
**height** 属性值

 - calc() CSS函数，可以计算量词单位。
 - 语法：
    `width: calc(100% - 80px);`