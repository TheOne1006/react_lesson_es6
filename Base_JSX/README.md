## JSX 语法及特点介绍

官网:  <http://facebook.github.io/jsx/>

### 什么是JSX

JSX = JavaScript XML, 在js中可以使用 类XML 语法.  

**JSX:**

1. 基于ECMAScript的一种 **新特性**
2. 一种定义带属性树结构的 **语法**. (只有语法, 并不是语言)
3. X 不是 XML/HTML
4. 不适用XML也可以使用(实际生产环境,也不建议使用JSX,在浏览器上)
5. 特点:
	 - 类XML容易接受
	 - 增加JS语义
	 - 结构清晰
	 - 抽象程度高
	 - 代码模块化 (MVC对比)

### 如何使用JSX

JSX语法:

1. 首字母大小写
		- 如果 Component 大写,为 组件名
		- 如果小写,则为html元素名
2. 嵌套
   - 可以多层前台
3. 求值表达式
   - 概念同ng
4. 命名: 驼峰
5. 保留字 :  `Class` 和 `for` 在 JS 中是保留关键字,如果需要使用 `className`, `htmlFor`

#### 注释 方法同 js

#### CSS
驼峰命名

### 非DOM属性介绍

React 引入3个非DOM属性

1. dangerouslySetInnerHTML :在JSX中直接插入HTML代码
2. ref: 父组件引用子组件
3. key: 提高渲染性能
   - diff算法
	 - 类似组件尽量合并
	 - 列表组件加key


### JSX解释器架构介绍
