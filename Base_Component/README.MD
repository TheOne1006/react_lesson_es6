## 组件的生命周期

组件本身就是 **状态机**,输入确定,输出一定确定.  
状态发生转换,会触发不同的钩子函数.  
同 __事件__  

顺序:
1. 初始化 (默认值,渲染实例)
2. 运行中状态 (实例状态可能发生改变, 可能触发重新渲染)
3. 销毁 (移除时)


### 什么是声明周期

#### 不同声明周期可以自定义函数

- 初始化阶段
  1. getDefaultProps()    // 获取实例默认props
	2. getInitalState()     // 获取实例初始化 State
	3. componentWillMount() // 组件准备装载.
	4. render()             // 生成虚拟节点,再让React生成真实节点
	5. componentDidMount()  // 组件装载完成,已经被渲染
  6. getDefaultProps() 只有第一个实例会被调用,

- 运行中阶段
	1. componentWillReceiveProps() // 组件准备接受Props,(在这里,组件还没接收到属性)
	2. shouldComponentUpdate()      // 组件是否要更新,(在这可以人为干预更新)
	3. componentWillUpdate()        // 类似初始化阶段compoentWillMount
	4. render()
	5. componentDidUpdate()

- 销毁
	1. componentWillUnmount()   // 真正销毁前调用

### 初始化阶段

1. getDefaultProps(): 只调用一次,实例间共享引用, CreateClass时调用
2. getInitalState(): 初始化,每个实例特有的状态, 需要返回对象 或者空
3. componentWillMount(): render前最后一次修改的机会
4. render(): 只能访问 this.props 和 this.state, 只有一个顶级组件,不允许修改状态和Dom 输出
5. componentDidMount(): 渲染完成,并且生成 DOM之后,可以修改 **DOM**
6. ES6差异:不支持  getDefaultProps(), getInitalState(),使用 constructor() 代替

### 运行中阶段

1. componentWillReceiveProps(): 组件将要接收到属性,属性发生改变之前,
2. shouldComponentUpdate(): 询问是否需要更新, 返回 `false`, 会阻止 render(), return boolean;
3. componentWillUpdate(): __不能__ 修改属性和状态
4. render(): 同初始化阶段一样
5. componentDidUpdate(): 同初始化阶段

### 销毁阶段
componentWillUnmount(),使用场景
1. 在组件销毁之前,进行清理, 定时器,等自定义信息(非React数据)
2. ReactDOM.unmountComponentAtNode(Node);
