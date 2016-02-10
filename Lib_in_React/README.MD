## React 相关库

以下均为 facebook 提出

Jest: js单元测试
ImmutableJs: 不可变对象
Flux: 设计思想


## Jest

什么是Jest?  
fb 官方推出单元测试库.  
环境: NodeJs  


### 常见测试

- 单元测试: 测试具体功能是否正常
- 集成测试: 确保整个系统是否正常
- 回归测试: 确保改动没有破坏系统
- 冒烟测试: 快速定位bug
- 压力测试: 确定性能是否达到要求


### Jest 安装

```
npm install jest-cli
```

语法类似jasmine

js 测试放在 \_\_tests\_\_ 目录中


### how to use

package.json
```json
...
"scripts": {
   "test": "jest"
 }
...
```

`npm run test` : 自动执行 \_\_tests\_\_里的代码  

```json
// scriptPreprocessor js 预编译脚本
// unmockedModulePathPatterns 匹配不需要模块
"scripts": {
	"test": "jest",
	"jest": {
		"scriptPreprocessor": "<rootDir>/preprocessor.js",
		"unmockedModulePathPatterns": [
			"<rootDir>/node_modules/react",
			]
	}
}
```


### ImmutableJs
不可变对象.

fb开发 js 库,能过实现 js的 __不可变对象__  
不可变对象能够大大提高对象的比较性.用于 状态 和 属性 判断  
实际上,提高比较性能是降低修改性能.只不过收益更大  

#### Flux

不是库或者框架,是一种代码结构  
