# normalizr

在Flux和Redux 应用中根据一种模式来扁平化深层嵌套的api返回的json数据

## 文档

[normalizr](https://github.com/paularmstrong/normalizr)
[normalizr-cn](https://github.com/fa-ge/Normalizr-translate-chinese)

## demo

* [flux-react-router-example](https://github.com/gaearon/flux-react-router-example)
* [redux/examples/real-world](https://github.com/rackt/redux/tree/master/examples/real-world)

## 能解决的问题

- 你的JSON API返回了嵌套很深的对象
- 你的应用是 Flux 和 Redux
- 你发现Store(或者Reducers)从深层嵌套的数据中获取和操作数据会非常麻烦


例如：  

```js
[{
  id: 1,
  title: 'Some Article',
  author: {
    id: 1,
    name: 'Dan'
  }
}, {
  id: 2,
  title: 'Other Article',
  author: {
    id: 1,
    name: 'Dan'
  }
}]
// 这里 author 是相同的 但是存在了两份数据
```

> 可以被范式化成(normalized to)

```js
{
  result: [1, 2],
  entities: {
    articles: {
      1: {
        id: 1,
        title: 'Some Article',
        author: 1
      },
      2: {
        id: 2,
        title: 'Other Article',
        author: 1
      }
    },
    users: {
      1: {
        id: 1,
        name: 'Dan'
      }
    }
  }
}
```

**注意它的扁平化结构(所有的嵌套都没了)**

## 特点

* 实体(Entities)可以嵌套在其他实体、对象、数组中
* 可以通过结合实体的schema来表示任何类型API返回的数据
* 相同id的实体会自动合并 (with a warning if they differ)
* 允许使用自定义的id属性作为合并的依据

## 使用方法

> 第一步, 定义

```js
/**
 * 加载 lib
 */
import { normalize, Schema, arrayOf } from 'normalizr';

// 首先，为实体定义一个模式(schema)
const article = new Schema('articles');
const user = new Schema('users');

// 然后我们定义一个嵌套规则
// 文章的作是 一个用户的id
// 文章的贡献者是, 一个数组, 元素为 user.id
article.define({
  author: user,
  contributors: arrayOf(user)
});

```

> 第二步, 使用

现在我们可以在处理API请求返回数据的方法中使用这个schema:

```js
const ServerActionCreators = {

  // 有两个带有不同响应对象的schemas的XHR endpoints----------------------------
  // 我们可以用前面定义的schema对象来表示他们:

  receiveOneArticle(response) {

    // 在这里，这个返回的数据是一个包含了一篇文章的对象
    // 把文章的schema作为normalize方法的第二个参数，让他能正确的遍历响应对象并且把所有的实体都整合到一起

    // BEFORE:
    // {
    //   id: 1,
    //   title: 'Some Article',
    //   author: {
    //     id: 7,
    //     name: 'Dan'
    //   },
    //   contributors: [{
    //     id: 10,
    //     name: 'Abe'
    //   }, {
    //     id: 15,
    //     name: 'Fred'
    //   }]
    // }
    //
    // AFTER:
    // {
    //   result: 1,                    // <--- 注意对象是由ID来引用的
    //   entities: {
    //     articles: {
    //       1: {
    //         author: 7,              // <--- 同样适用于在其它实体中的引用
    //         contributors: [10, 15]  
    //         ...}
    //     },
    //     users: {
    //       7: { ... },
    //       10: { ... },
    //       15: { ... }
    //     }
    //   }
    // }

    response = normalize(response, article);

    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ONE_ARTICLE,
      response
    });
  },

  receiveAllArticles(response) {

    // 这里，返回的数据是一个对象，他的key为'articles'并且该key指向了一个包含文章对象的数组
    // 把 { articles: arrayOf(article) }作为normalize方法的第二个参数，让他能正确的遍历响应对象并且把所有的实体都整合到一起

    // BEFORE:
    // {
    //   articles: [{
    //     id: 1,
    //     title: 'Some Article',
    //     author: {
    //       id: 7,
    //       name: 'Dan'
    //     },
    //     ...
    //   },
    //   ...
    //   ]
    // }
    //
    // AFTER:
    // {
    //   result: {
    //    articles: [1, 2, ...]     // <--- 注意对象数组转换成ID数组的方式
    //   },
    //   entities: {
    //     articles: {
    //       1: { author: 7, ... }, // <--- 同样适用于在其它实体中的引用
    //       2: { ... },
    //       ...
    //     },
    //     users: {
    //       7: { ... },
    //       ..
    //     }
    //   }
    // }

    response = normalize(response, {
      articles: arrayOf(article)
    });

    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ALL_ARTICLES,
      response
    });
  }
}
```

## API Reference

**new Schema(key, [options])**:  

Schema 允许你定义一个通过API返回的实体的类型,  
这应该与你服务器上代码的模型相对应.

`key`参数允许你定义一类实体的名字

```js
const article = new Schema('articles');

// 你可以自定义 id 属性使用的字段
const article = new Schema('articles', { idAttribute: 'slug' });

// 你可以使用 函数来代替它. 但是还是要返回一个 string
function generateSlug(entity) { /* ... */ }
const article = new Schema('articles', { idAttribute: generateSlug });

// 你也可以指定 需要使用元属性， 格式化掉不需要的字段 在 assignEntity(实体分配) 时
const article = new Schema('articles', { idAttribute: 'slug', meta: { removeProps: ['publisher'] }});

// 你可以自定义 `assignEntity`(实体分配) 方法 用于 在运行 系统的 `assignEntity` 之后
const article = new Schema('articles', { assignEntity: function (output, key, value, input) {
  if (key === 'id_str') {
    output.id = value;
    if ('id_str' in output) {
      delete output.id_str;
    }
  } else {
    output[key] = value;
  }
}})

// 你可以定义实体属性的默认值
const article = new Schema('articles', { defaults: { likes: 0 } });
```


**Schema.prototype.define(nestedSchema)**

定义实体之间的关系:

```js
const article = new Schema('articles');
const user = new Schema('users');

// article 包含 author
article.define({
  author: user
});
```

**Schema.prototype.getKey()**

key 指的是 `new Schema(key, [options])` 里的 key

```js
const article = new Schema('articles');

article.getKey();
// articles
```

**Schema.prototype.getIdAttribute()**

返回schema的id属性

```js
const article = new Schema('articles');
const slugArticle = new Schema('articles', { idAttribute: 'slug' });

article.getIdAttribute();
// id
slugArticle.getIdAttribute();
// slug
```

**Schema.prototype.getDefaults()**

返回schema定义的默认值

```js
const article = new Schema('articles', { defaults: { likes: 0 } });

article.getDefaults();
// { likes: 0 }
```

**arrayOf(schema, [options])**

描述了一个schema数组作为另一个schema的参数
```js
import { normalize, Schema, arrayOf } from 'normalizr';

const article = new Schema('articles');
const user = new Schema('users');

article.define({
  author: user,
  contributors: arrayOf(user)
});
```

如果数组包含了不同的 schemas, 你可以定义 schemaAttribute 选项来指定 使用的 实例


```js
const article = new Schema('articles');
const image = new Schema('images');
const video = new Schema('videos');
const asset = {
  images: image,
  videos: video
};

// You can specify the name of the attribute that determines the schema
// 没有理解？ 是 image 和 video 都必须有 type？ 还是 asset 有type ？
article.define({
  assets: arrayOf(asset, { schemaAttribute: 'type' })
});

// Or you can specify a function to infer it
function inferSchema(entity) { /* ... */ }
article.define({
  assets: arrayOf(asset, { schemaAttribute: inferSchema })
});
```

**valuesOf(schema, [options])**

描述数据源来自哪个 schema

```js
const article = new Schema('articles');
const user = new Schema('users');

article.define({
  collaboratorsByRole: valuesOf(user)
});
```
如果有多个，可以设置 `schemaAttribute` 选项 ?? 不清楚

**unionOf(schemaMap, [options])**

一脸懵逼，先放着😓

**normalize(obj, schema, [options])**

根据 schema 范式化一个对象.  
通过 schema 将一个深层的对象，解脱出来。  

你可以可以通过 `options` 指定一些选项:  

- assignEntity(function): 自定义实例分配方法。如果你的后端有额外的子端这将是非常有用的。比如，分离 ID 字段。
    你想在规范化的实体删除。详细使用方法和案例查看
    [the test](https://github.com/gaearon/normalizr/blob/a0931d7c953b24f8f680b537b5f23a20e8483be1/test/index.js#L89-L200) 和 [相关issues](https://github.com/gaearon/normalizr/issues/10)
- mergeIntoEntity (function): 自定义合并到实体方法。当合并有冲突时，你可以通过这个函数解决。
    详细使用方法和案例查看 [the test](https://github.com/gaearon/normalizr/blob/47ed0ecd973da6fa7c8b2de461e35b293ae52047/test/index.js#L132-L197) 和 [相关 issues](https://github.com/gaearon/normalizr/issues/34)



## 通过例子来解释

假如你有返回以下schema的API请求/articles:

```
articles: article*

article: {
  author: user,
  likers: user*
  primary_collection: collection?
  collections: collection*
}

collection: {
  curator: user
}
```

如果不做范式化，你的store需要清楚的知道返回数据的结构
比如， UserStore在获取到请求结果的时候会包含很多样板代码来获取新用户


```js
// 如果不做范式化, 你需要对每一个store都做这些

AppDispatcher.register((payload) => {
  const { action } = payload;

  switch (action.type) {
  case ActionTypes.RECEIVE_USERS:
    mergeUsers(action.rawUsers);
    break;

  case ActionTypes.RECEIVE_ARTICLES:
    action.rawArticles.forEach(rawArticle => {
      mergeUsers([rawArticle.user]);
      mergeUsers(rawArticle.likers);

      mergeUsers([rawArticle.primaryCollection.curator]);
      rawArticle.collections.forEach(rawCollection => {
        mergeUsers(rawCollection.curator);
      });
    });

    UserStore.emitChange();
    break;
  }
});
```

Normalizr解决了这个问题，通过把嵌套的实体用id替代把请求返回的数据变成了一个扁平化的结构的对象


```js
{
  result: [12, 10, 3, ...],
  entities: {
    articles: {
      12: {
        authorId: 3,
        likers: [2, 1, 4],
        primaryCollection: 12,
        collections: [12, 11]
      },
      ...
    },
    users: {
      3: {
        name: 'Dan'
      },
      2: ...,
      4: ....
    },
    collections: {
      12: {
        curator: 2,
        name: 'Stuff'
      },
      ...
    }
  }
}
```

UserStore的代码可以像这样被重写

```js
// 做了范式化后，所有的用户都在action.response.entities.users中

AppDispatcher.register((payload) => {
  const { action } = payload;

  if (action.response && action.response.entities && action.response.entities.users) {
    mergeUsers(action.response.entities.users);
    UserStore.emitChange();
    break;
  }
});
```













- - -
