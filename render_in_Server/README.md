## 服务端渲染

- 为什么使用服务端渲染
- 考虑方面
- 渲染函数

### 为什么使用服务端渲染

1. 想要搜索引擎抓取,服务器渲染不可少,
2. 还可以提升站点性能,因为在加载 js 脚本同时,浏览器就可以进行页面渲染了
3. 虚拟 DOM 是服务器渲染的关键
  - 首先,每个 React Component 在虚拟 DOM 完成渲染,
  - 然后, React 通过虚拟 DOM 来更新浏览器 DOM 中产生变化的那些部分.
- `React.renderToString`
- `React.renderToStaticMarkup`


### 设计服务器端渲染需要预见性,考虑一下方面

- 选取最优渲染函数
- 如何支持组件的异步状态 ?
- 如何将应用的初始状态传到客户端 ?
- 那些声明周期函数可以用于服务端渲染 ?
- 如何为应用提供同构路由支持
- 单例,实例 以及上下文的用法

### 渲染函数

在服务端渲染 React Component , **无法使用** 标准的 React.render 方法, 因为服务端不存在 DOM.
React 提供两个渲染函数,支持标准React Component 生命周期方法的一个子集,因而能在服务端渲染

> React.renderToString
  开发中主要使用的一个函数, 和 `React.Render` 不同该函数去掉了用于表示渲染位置的参数,取而代之的,该函数只返回一个字符串,这是一个快速的同步(阻塞式)函数,(非常快)

demo1:  
```bash
# 执行
$ babel-node renderTo_demo1.jsx

# 转码
$ babel renderTo_demo1.jsx --out-file renderTo_demo1.js

# output
# <div data-reactroot="" data-reactid="1" data-react-checksum="999625590">Hello World</div>
```

注意:  
- data前缀
- data-reactid, 在浏览器环境下, React 使用 data-reactid 来区分 DOM 节点, 这也就是组件 state 以及 props 变化时, React 都可以精准的更新指定 DOM 节点
- data-react-checksum: __仅__ 存在于服务端, 用于已创建 DOM 的校验和, 这准许 __React 在客户端复用与服务端结构相同的 DOM 结构__.
  - 该属性只会添加到根元素上

> React.renderToStaticMarkup
  除了不会包含 React 的 data 属性外,它和 React.renderToString 没有区别.


##### toString or toStaticMarkup

使用场景:  

- React.renderToStaticMarkup
  - 生成 HTML 电子邮件
  - 通过 HTML 到 PDF
  - 组件测试
- React.renderToString
  - 大多数情况
  - React 可以重用服务器提供的 DOM, 可以跳过生成 DOM 节点以及把它们挂在到文档中这两个昂贵的过程.


### 服务端组件的声明周期

| process | browser | server  |
| ------- | ------- | ------- |
| getDefaultProps |
| getInitalState |
| componentWillMount |
| render |
| componentDidMount |
|




- - -
