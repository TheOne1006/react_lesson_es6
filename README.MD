## React

### 什么是React

#### React开发背景

![react](https://facebook.github.io/react/img/logo.svg)

facebook开发的JavaScript库.  
facebook需要什么样的库.  

1. 数据结构不断变化的大型应用
  - 大量DOM操作 (自动DOM操作)
  - 逻辑极其复杂 (状态对应内容)
2. React特点
  - 简单  
	- 声明  
	- React核心是组件, 组件的设计目的是 **提高代码复用率**,**降低测试难度**,**降低复杂度**
	- 提高复用率: 组件将 **数据和逻辑进行封装**,类似面向对象的类.
	- 降低测试难度: 组件的设计是 **高内聚低耦合**, 很容易对单个组件进行测试
	- 降低代码复杂度: 组件 声明式,**直观的语法** 极大的提高了可读性

#### React发展

1. 2013年6月, facebook官方发布 React  
2. 2013年9月, React 热度上涨  
3. 2015年3月, React Native 发布  

[React Blog](https://facebook.github.io/react/blog/all.html)

### Base_JSX

jsx语法

### Base_Component

> 组件的生命周期

### 属性和状态 props and state

> 数据流
  React中,数据的流向是单向的
  1. 从父节点传递到子节点.  
  2. 如果顶层组件的某个 prop 改变了, React 会递归向下遍历整棵组件树, 重新渲染所有使用这个属性的组件

什么时候该用属性,什么时候该用状态.

### mixin

mixin 允许我们定义可以在多个组件中公用的方法.

### Event in React

event 如果操作事件对象

### Form in React

### Animate in React


### 组件性能部分 Performance
1. 为什么要调优
2. 如何调优
3. 调优工具

### 组件的协同使用

1. 组件的嵌套
2. Mixin

### 服务器渲染 render in Server

- 渲染函数

### React 相关库

1. jest
2. ImmutableJs
3. Flux

#### Flux

Flux 由实现特定功能的几个部分组成.在单向数据流当中, flux 的那个部分获取上游输入的内容进行处理,然后向下游发送他的输出内容.  

- Dispatcher: 应用的中心仓库
- Action: 应用的 DSL( Domain Specific Language)(领域特定语言)
- Store: 业务逻辑和数据交互
- 视图: 渲染应用组件树





### tool 开发工具

1. gulp
2. browserify
3. webpack
