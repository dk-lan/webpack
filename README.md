## webpack
webpack 是一个前端常用的模块化打包工具，它的作用就是将 JavaScript 代码或者其他静态文件进行分析、压缩，最终合并打包成浏览器可以识别的代码。关于模块化，拿 ES6 module 来说，可以通过 export 导出，import 导入的代码块或者静态资源都可以成为模块。从入口文件开始，webpack 会通过递归的方式将应用程序所依赖的模块进行打包成一个或者多个 bundle。

## 安装和使用
- 自动化构建都是基于 node 环境开发，所以先要配置 node 环境[传送门](https://github.com/dk-lan/nodejs/tree/master/module/base)
- `npm install webpack --save-dev`
- 在项目目录手动新建 `webpack.config.js`，用于对 webpack 进行配置
### 4.+版本
升级到 4.+以后命令都迁到了 webpack-cli，所以要单独安装。
- `npm install webpack webpack-cli -g`

## 常用命令
- `webpack --help` 或 `webpack -h` 列出命令行所有可用的配置选项
- `webpack --config example.config.js` 配置文件默认为 webpack.config.js，如果你想使用其它配置文件，可以加入这个参数。

## 简单使用
#### src/bar.js
```javascript
export default function bar() {
    //
}
```
#### src/index.js
```javascript
import bar from './bar';

bar();
```
#### webpack.config.js
```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
```
#### page.html
```html
page.html
<!doctype html>
<html>
    <head>
    ...
    </head>
    <body>
    ...
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

## 核心概念
- 入口(entry) 
- 输出(output)
- loader
- 插件(plugins)

### 入口(entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。  

每个依赖项随即被处理，最后输出到称之为 bundles 的文件中，我们将在下一章节详细讨论这个过程。
```javascript
module.exports = {
    entry: './path/to/my/entry/file.js'
};
```
也可以配置多个入口
```javascript
const config = {
    entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js',
        pageThree: './src/pageThree/index.js'
  }
};
```

### 出口(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。
```javascript
const path = require('path');

module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'), //物理 path
        publicPath: '/dist/', // 逻辑 path
        filename: 'my-first-webpack.bundle.js'
  }
};
```
多个入口
```javascript
{
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}
```

### loader
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。    

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

在 webpack 的配置中 loader 有两个目标：
1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. use 属性，表示进行转换时，应该使用哪个 loader。
```javascript
const path = require('path');

const config = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            {test: /\.txt$/, use: 'raw-loader'},
            {test: /\.css$/, use: 'css-loader'},
            {test: /\.ts$/, use: 'ts-loader'}
        ]
    }
};

module.exports = config;
```

### 插件(plugins)
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
    module: {
        rules: [{ 
            test: /\.txt$/, 
            use: 'raw-loader' 
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};

module.exports = config;
```

### ES6 支持
- `npm install babel-core --save-dev` babel 核心包
- `npm install babel-loader --save-dev` babel 转换器
- `npm install babel-preset-latest` 把所有es2015, es2016, es2017 全部包含在一起了
- `npm install babel-preset-stage-0` 包含stage-1, stage-2以及stage-3的所有功能
- `.babelrc` bebal 配置文件
```javascript
{
  "presets": [
   	"es2015",
    "latest",
    "stage-0"
  ]
}
```
- 配置文件
```javascript
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    }
```

### SASS 支持
- `npm install style-loader --save-dev` 创建样式 style 节点
- `npm install css-loader --save-dev` 转 css 转换成 js
- `npm install sass-loader --save-dev` 将 sass 转换成 css
- `npm install node-sass --save-dev` sass-loader 的依赖包
- 配置文件
```javascript
    {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
    }
```