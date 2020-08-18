## 创建工程

```
$ mkdir yeo-demo
$ cd yeo-demo
$ npm init -y
```

修改`package.json`:

```
{
  "name": "generator-xixi",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

> `yo`命令安装的必须以`generator-xxxx`开头

在根目录下创建以下目录：

```
|--package.json
|--app
 ----index.js
```

安装依赖`npm i yeoman-generator`

编写`app/index.js`代码：

```
const Generator = require("yeoman-generator")

module.exports = class extends Generator{
	//共有函数，可输出
    method1(){
        console.log(1)
    }
    method2(){
        console.log(2)
    }
   	//私有方法，不会自动执行
    _b(){
    	console.log('b')
    }
}
```

执行命令`npm link`

再执行命令`yo xixi` ==> `1 2`

> 如果没有`yo`,则安装依赖`npm install -g yo`

有关错误异常：可以再函数中加入以下代码：

```
 var done = this.async();
 done('error')
```

此时只要执行了`done()`,就会抛出异常，不会继续执行，具体代码如下:

```
const Generator = require("yeoman-generator")

module.exports = class extends Generator{
    method2(){
        var done = this.async();
        done('ff')
        console.log(2)
    }
    method1(){
        console.log(1)
    }
    _b(){
    	console.log('b')
    }
}
```

生命周期：

* `constructor`构造器（用于解析传入的参数以及选项）
* `initializing`配置文件的获取等操作
* `prompting`用户输入选择，用于之后的文件限制输出
* `configuring`在用户选择之后可以选择性保存用户选择过的选项配置
* `default`如果方法名称不匹配的优先事项，将被推到该组
* `writing`在其中写入生成器特定文件（路由，控制器等）的位置
* `conflicts`冲突的处理,当目标目录有相同的文件时会出现选项
* `install`依赖安装阶段
* `end`最后调用清理

#### 解析命令行参数

在`construct`中写入以下代码

```
this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
});
```

这个时候就可以使用`opts`可选性的使用了

```
$ yo xixi --skip-welcome-message
```

同时，这样的话可以通过以下方式获取该选择:

```
this.options['skip-welcome-message'] //有带这样的参数的话这个值就是true
```

再给一个可动态字符串的参数

```javascript
 this.option('test-framework', {
       desc: 'Test framework to be invoked',
       type: String,
       defaults: 'mocha'
 });
```

```
$ yo xixi --test-framework=fuck
```

```javascript
this.options['test-framework']
```

使用`argument`

```javascript
this.argument("appname", {
       type: String,
       required: true //这样的话就一定要带这个值
});
```

```javascript
$ yo xixi mini
```

```javascript
this.options['appname']
```

#### 初始化阶段

可以在此阶段获取之前保存过的配置文件用于本次选项

```
this.config.getAll()//读取.yo-rc.json中的配置
```

有关`this.config.`的使用：https://yeoman.io/authoring/storage.html

#### 用户交互阶段

https://github.com/SBoudrias/Inquirer.js

用于绘制用户在终端的选择界面，包括了选择，列表，多项等多种情况，然后可将此时做出的选择作用到文件输出阶段进行可选择性输出

```
	async prompting() {
        //提示用户输入
        // https://yeoman.io/authoring/user-interactions.html#arguments
        this.log('prompting')
        const answers = await this.prompt([{
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);

        this.log("app name", answers.name);
        this.log("cool feature", answers.cool);
        this.answers=answers;
    }
```

#### 写入阶段

 https://github.com/sboudrias/mem-fs-editor