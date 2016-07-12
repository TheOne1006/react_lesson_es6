## Flux

![](/flux/images/flux-diagram-white-background.png)

Flux 由实现特定功能的几个部分组成.在单向数据流当中, flux 的那个部分获取上游输入的内容进行处理,然后向下游发送他的输出内容.  

- Dispatcher: 应用的中心仓库
- Action: 应用的 DSL( Domain Specific Language)(领域特定语言)
- Store: 业务逻辑和数据交互
- 视图: 渲染应用组件树

### Dispatcher 应用的中心仓库 (调度程序)

它是所有用户交互和数据流的中心仓库, 在 Flux 模式当中 Dispatcher 是一个单例.  
Dispatcher **负责 Store 上注册回调** 以及 **管理他们之间的依赖关系**.  
用户的 Action 会流入 Dispatcher.   
数据会传送到注册过 Action 的 Store 当中

### Action

从用户角度看, 这是 Flux 的起点, 每个在 UI 上的行为 **都会创建一个被发送到 Dispatcher 的 Action**  

尽管 Action 不是 Flux 模式真正的部分, 他是他们构成了应用的 DSL .用户操作被转化称为有含义的 Dispatcher Action -- Store 可以依此调用相应的行为.  

### Store (存储仓库)

Store 负责封装应用的 __业务逻辑与应用数据交互__.  
Store 通过注册 Action 来选择响应哪些 Action.  
Store 把内部的数据通过更改时的 change 事件发送 React 的组件当中.
保持 Store 严格的独立非常重要.  

- Store 中包含应用所有的数据
- 应用其他任何部分都不知道怎么操作数据 -- Store 是应用中唯一的数据发生改变的地方.
- Store 没有赋值 -- 所有的更改(??)都是由 Dispatcher 发送到Store 的, 新的数据随着 Store 的更改事件传送回到应用当中.

> 管理多个 Store









- - -
