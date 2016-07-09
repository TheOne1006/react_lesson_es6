## 表单

### 不可控组件 和 可控制组件 (又称 约束组件 和 不可约束组件)

> 什么是不可控组件(无约束组件)?
  1. 无约束组件的构造与 React 中大多数组件相比是反模式
  2. HTML 中, 表单组件与 React 组件行为并不一样, 给定 HTML <input /> 一个值, 这个 input 值仍然可以改变. 这正是无约束组件.
  3. 访问 value 需要使用 `ref` 属性

> 什么是可控组件?(可约束组件)
  1. 约束组件的模式与 React 其他类型组件的模式一致. 表单组件的状态由 React 组件控制,状态值被存储在 React 的 state 中
  2. 约束组件中,输入框的值由父组件设置

> 为什么组件要可控?

可控好处:  

- 符合React数据流, state 向 View 渲染
- 数据存储在 state 中,便于使用
- 对数据处理直接获取,(不必,通过dom再次获取)


### 表达事件

- React 支持所有 HTML 事件, 这些事件 遵循驼峰命名的约定, 且会被转成 __合成事件__  
- 这些事件是标准化的, 提供了跨浏览器的一致接口
- 所有合成事件,提供了 `event.target` 来访触发事件的 DOM 节点

### 不同表单元素的使用

> Label
  1. 通过 Label 组件可以明确向用户传达你的要求,提升单选和复选框的可以性.  
  2. `for` => `htmlFor`

> textarea 和 Select
  1. React 对 `<textarea/>` 和 `<select/>` 的接口做了些修改,提升了一致性, 更方便操作
  2. `<textarea />` 改的像 `<input />` 允许我们设置 `value` 和 `defaultValue`
  3. React 支持多选 select, 你需要给 value 和 defaultValue 传递了一个数组

> checkbox 和 radio
  1. HTML 中,类型为 checkbox 或者 radio 的 `<input>` 与 `<input type='text'>` 行为完全不同
  2. 通常 `checkbox` 和 `radio` 的值是不变的,只有 checked 状态会变化
  3. 控制他们的 `checked` 属性,或者在非约束组件中的 `defaultChecked`


### 如何复用事件处理函数

方式一: bind 复用
```js
function(){}.bind(this, 'name');
```

方式二: name复用
```js
handleFun(event) {
  var name = event.target.name;
}
```

方式三: `React.addons.LinkedStateMixin`


其他:


### Focus

因为 React 表单不总是在浏览器加载时被渲染,所以表单的输入域的自动聚焦操作起来有点不一样.  
React 实现了 autoFocus 属性,因此组件第一次挂载时,如果没有其他的表单域聚焦时,
React 就会把聚焦放到对应的表单域中.

```jsx
<input type="text" autoFocus="true" />
```


### 自定义表单组件

- 为什么要定义表单组件?
- 表单组件的两种定义方式?

自定义表单组件原因:

1. 内因: 表单本身具备特殊性: 样式统一,信息内聚, 行为固定
   - 信息内聚: 表单内的元素,都是相互关联,需要集中处理
   - 行为固定: 一起提交
2. 外因: 本质上是组件嵌套,组织和管理的一种方式

定义方式:

1. 不可控的表单组件(不推荐)
2. 可控的表单的组件



















1
