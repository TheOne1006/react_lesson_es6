# redux-auth-wrapper

## Api


```js
/**
 * 高阶函数
 * @param {object} configObject 配置信息
 * ----
 * @param {object} DecoratedComponent 需要装饰的 component
 */
UserAuthWrapper(configObject)(DecoratedComponent)
```

```js
/**
 * @param {object} configObject 配置信息
 * @return function
 */
UserAuthWrapper(configObject)
```

返回一个函数，可以将函数参数作为 component, 并赋予 用户 auth 功能。
该函数也有以下扩展属性

```js
// 可选方法，为router 的 onEnter 使用
onEnter(store, nextState, replace) (Function):
```




### Config Object Keys

**authSelector:**

```js
/**
 * @param {any} state 全局 state
 * @return {object} authData
 */
// Function:
authSelector(state, [ownProps], [isOnEnter]): authData
```

* 一个 authDate 的  state selector。就像 mapToStateProps
* ownProps 可能为 null, 如果 ownProps 为 true，因为 onEnter 的钩子不能获得 component 的属性，
    当不使用 onEnter 时可以忽略


**authenticatingSelector**

```js
// 是否正在验证
// Function:
authenticatingSelector(state, [ownProps]): Bool

```

**LoadingComponent**

```js
// Component:
LoadingComponent: Component
```

当 authenticatingSelector 返回的是 true, 使用 LoadingComponent 代替

**FailureComponent (Component)**

当 authenticatingSelector 返回的是 false,
并且指定 wrapper 没有 redirect(跳转功能时)
会显示该 Component

**failureRedirectPath (String | (state, [ownProps]): String)**

可以是一个 String 或者一个函数返回 String，
验证失败时跳转的地址，默认是，`/login`

**redirectQueryParamName(String)**

当`allowRedirectBack` 设置为true, 会指定返回地址的参数，默认 `redirect`

**redirectAction(Function)**

可选的 redux action creater 用来重定向，
如果没有设置，则使用 React-Router 的 router context 作为过渡


**wrapperDisplayName**

显示名字，将展现在 React-devtools 中，但是还没瞧见

**predicate(authData): Bool**

```js
// Function:

predicate(authData): Bool

// 例如：
predicate: user => user.isAdmin,
```

可选 function , 继续判断 authSelector 返回的参数。
如果判定失败，还是会执行验证失败操作。

**allowRedirectBack：Bool**

是否可执行 Redirect 记录，
默认 true



### Component Parameter （Component 参数 即 DecoratedComponent)

DecoratedComponent (React Component):  

该 Component 包裹在 auth 检测中







- - -
