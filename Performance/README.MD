## 性能调优

### 性能调优原理

- 为什么需要调优?
- 调优的最佳时机
- React调优原理
- JS数据类型介绍

1. 为什么需要调优:
   1. React 在开发就非常注重性能, 作为前端框架,是极其重要的判断
   2. React 提高性能方法: 虚拟 DOM ,diff 算法, 减少DOM 操作
   3. 但是,父组件的更新会触发所有子组件的更新
   4. 列表类型组件, 默认更新非常复杂 (循环的key)
2. 调优最佳时机:
   1. 避免过早优化
   2. 完成所有功能,发现性能问题
3. React 调优原理
  1. 子组件覆盖shouldComponentUpdate()方法,执行决定是否更新. 状态是否变更,
  2. 给列表组件添加key属性,(在当前组件的内部的唯一)


### 如何寻找性能热点

性能分析工具
示例代码
如何使用工具

#### 性能分析工具 Perf (performance)

1. perf.start() 性能分析工具 开始记录
2. ... 记录所有操作信息
3. pref.stop() 结束记录, 生成分析信息


(index)   | Owner > component         | Inclusive time (ms) | Instances
----------|---------------------------|---------------------|----------
索引       | 父组件 > 子组件,统计子信息    | 消耗时间	           | 调用次数
0	        | "<root> > ChoseNumber"    | 442.66	            | 1
1	        | "ChoseNumber > NumberDiv" | 311.24              |	5000



### 如何解决性能问题


> shouldComponentUpdate:
- 当组件更新时, 无论是新 props 还是 setState 或者 forceUpdate 方法, React 都会调用所有子组件的 render 方法. 在大多数时候这样是没有问题的, 但是在树嵌套较深的组件中, 可能会有延迟.  
- __返回__ : boolean ,
- false 不要调用组件渲染方法, 并使用之前渲染好的虚拟 DOM,
- 默认返回 true, 重新计算虚拟 DOM
- __参数__ : 两个 `nextProps` 和 `nextState`

> PureRenderMixin: React 官方提供的Mixin, 用于　"简单的"　判断是否需要更新流程
只能处理非对象数据．

Immutability Helpers: 实现Js不可变对象　　
1. 修改不可变对象会返回一个新对象，之前的对象保持不变
2. 不同对象在Js引擎中的引用不同，因此直接比较引用即可确定是否发生了改变．


> Immutable






- - -
