## 动画

canIuse.com

### CSS3 动画

#### ReactCSSTransitionGroup 插件
  使用方法 `< ReactCSSTransitionGroup transitionName="xxx" >`
  1. 禁用渐入 `transitionEnter={false}`
  2. 禁用淡出 `transitionLeave={false}`

渐变周期:  

- xxx-enter: 组件被添加到渐变组后即可添加上的
- xxx-enter-active: 下一轮渲染时添加
- xxx-leave:
- xxx-leave-active:

渐变组隐患:  

1. 渐变组会延迟子组件的移除直到动画完成
  - 意味如果你把一个列表的组件包裹进一个 ReactCSSTransitionGroup, 却没有指定 transitionName, 将永远无法移除
  - 渐变组每个子组件都必须设置独一无二的 key 属性.如果没有 key 属性动画无法执行,同时也无法移除
  - 即使只有一个子元素,也必须设置 key



### JS 动画

### rAF 动画
