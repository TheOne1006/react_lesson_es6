## React中的事件

### 编写事件处理函数

React 的 Component 本质是一个有多个function 的集合,
组件可以很分为 :

1. React自有方法如 `render()`,`componetnWillMount()`,
2. 用户定义方法 如: `handleClick()`, `handleChage()`

### 不同事件对象的介绍

#### 事件对象的使用方法

```js
handleChange( event) {
  // event react 封装的 event 对象
  // event.target 是事件对应的dom元素
}
```

#### 不同的事件对象有不同的属性

1. 通用属性
   1. @boolean bubbles     事件是否可以冒泡
   2. @boolean cancelable  事件是否可以取消
   3. @DOMEventTarget currentTarget  (事件冒泡阶段的的当前函数,通常等于this)
   4. @boolean defaultPrevented 事件是否禁止了默认行为, ture 为禁止
   5. @Number eventPhase  事件所处的阶段
   6. @boolean isTrusted  是否可信,(用户触发, 代码触发辨别)
   7. @DOMEvent nativeEvent 获取原生event
   8. @void preventDefault()  方法禁止浏览器默认行为
   9. @void stopPropagation() 禁止事件冒泡
   10. @DOMEventTarget target 事件属性可返回事件的目标节点（触发该事件的节点）
   11. @Number timeStamp 触发的事件
   12. @string type      触发的类型

2. 剪切事件
  1. @DOMDataTransfer clipboardData 剪切的数据
3. 焦点事件
  1. @DOMEventTarget relatedTarget (切换目标的dom元素)

4. 鼠标事件
  1. @boolean altKey 是否摁住alt
  2. @boolean ctrlKey 是否摁住ctrl
  3. @function getModifierState(key) 是否按下辅助键
  4. @boolean metaKey window键
  5. @boolean shiftKey 是否按下shift
  6. @number botton 左键右键
  7. @number buttons
  8. @DOMEventTarget relatedTarget 类似焦点事件
  9. @number clientX 相对于浏览器
  10. @number clientY
  11. @number pageX   相对与document
  12. @number pageY
  13. @number screenX 相对与显示器
  14. @number screenY

5. 键盘事件
  1. @boolean altKey 是否摁住alt
  2. @Number charCode 按键字符编码
  3. @boolean ctrlKey 是否摁住 ctrl
  4. @function getModifierState(key) 是否按下辅助键
  5. @string key 按下的键
  6. @Number keyCode
  7. @string locale 本地化的字符串
  8. @number location 位置
  9. @boolean metaKey window键
  10. @boolean repeat 是否重复
  11. @boolean shiftKey 是否按下shift
  12. @number which 经过通用化的 charCode 和 keyCode


6. 触摸事件
  1. @boolean altKey 是否摁住alt
  2. @boolean ctrlKey 是否摁住ctrl
  3. @function getModifierState(key) 是否按下辅助键
  4. @boolean metaKey window键
  5. @boolean shiftKey 是否按下shift
  6. @DOMTouchList touches       
  7. @DOMTouchList targetTouches
  8. @DOMTouchList changedTouches
  9. DOMTouchList 0-多个信息,对应touch和经过元素

7. UI 元素 onScroll 屏幕滚动
  1. @number detail 距离
  2. @DOMAbstractView view 视窗

8. 鼠标滚动 onWheel
  1. @number deltailMode 滚动单位
  2. @number deltaX x轴 相对距离
  3. @number deltaY
  4. @number deltaZ
