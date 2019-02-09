# KARL STORZ - ENDOSKOPE

> 「卡尔史托斯 2019 My Benefits」

## 目录

 - [依赖列表](#依赖列表)
 - [项目结构](#项目结构)
 - [开发流程](#开发流程)
 - [发布流程](#发布流程)

## 依赖列表
1. [Swiper][1] --> 用于实现页面的整屏滚动
2. [Animate.css][2] --> 用于提供CSS动画
3. [jQuery][3] --> 用于操作DOM
4. [Normalize.css][4] --> 用于CSS Reset
5. [PxLoader][5] --> 用于初始加载图片资源

## 项目结构

        /app
            /dist               --> 项目文件的分发版本，所有的文件均由Gulp任务生成，请勿手动修改
                /audios         --> 从app/src/audios复制而来
                /fonts          --> 从app/src/fonts和在config/vendors.js中指定的第三方字体复制而来
                /images         --> 由app/src/images下的图片经Imagemin压缩优化生成
                /javascripts    --> 由app/src/javascripts下的文件经Browserify打包生成
                /stylesheets    --> 由app/src/scss下的文件编译生成
                index.html      --> 由app/src/index.html经Gulp-inject插入bundle.(min.).css和bundle.(min.).js后生成
            /src                --> 项目的源码，所有文件都可编辑
                /audios         --> 存放音频、视频文件
                /fonts          --> 存放字体文件
                /images         --> 存放图片文件
                /javascripts    --> JS源文件，经Browserify打包后生成app/dist/javascripts/bundle.js
                /scss           --> SCSS文件，经过编译后生成app/dist/stylesheets/bundle.css
                index.html      --> 页面HTML，经过Gulp-inject处理后生成app/dist/index.html
        /config
            vendors.js          --> 第三方CSS、JS、Fonts列表，详见vendors.js说明
        .gitignore
        gulpfile.js             --> Gulp任务
        package.json
        

## 开发流程

1. **将本项目clone到本地**

    在控制台中运行：

        git clone https://github.com/cn-wx/storz.git <your-project-name>
        cd <your-project-name>
        
2. **安装第三方包**

    WHB使用NPM管理第三方包    

    在控制台中运行：
    
        npm install -g node-gyp  
        npm install

    注意1：由于中国网络环境恶劣，下载NPM上的包速度很慢，建议使用淘宝NPM镜像[CNPM][8]。CNPM的安装方法请参考[官网使用说明][9]。CNPM v4.2.0在Windows系统上有Bug（参考[#97](https://github.com/cnpm/cnpm/issues/97)），Windows用户请勿使用该版本，虽然官方说已经修复，但我在Windows上使用CNPM安装需要node-gyp编译的包时仍然会报错。我也不建议使用CNPM v3.4.1，因为其内置的NPM版本过旧。推荐`npm install --registry=https://registry.npm.taobao.org -d`这种直接使用镜像仓库的方式安装。（加入 -d 是为了显示安装过程中的详细信息，我个人经常用这种方法来判断安装过程是否因为网络或其他问题卡住了）。

    注意2：WHB所需的一些第三方包依赖于[node-gyp][10]，在安装这些包之前，请先确认你的机器已经正确安装node-gyp。请参考[node-gyp官方文档][11]来进行安装。Windows用户可能会遇到一些麻烦，因为在Windows上安装node-gyp是一件很痛苦的事。
    
    注意3：Windows用户，请不要将WHB放在路径太深的目录中。因为Windows只支持长度为255个字符以内的路径，所以如果你将本项目放在路径很深的目录中，有很大可能会造成node-gyp编译失败。
    
    注意4：Windows用户，如果你已经正确安装了node-gyp，但在运行`npm install -d`时依然报错，且报错信息为“EPERM, operation not permitted”的话，请尝试`npm install -d --force`。
    
3. **开始开发**

    在控制台运行：

        gulp dev
        
    稍等片刻，浏览器窗口会自动打开并指向地址`localhost:3000`，当你修改app/src下的任意文件时，浏览器页面会自动刷新。

## 发布流程

1. 执行gulp prod任务

   在控制台中运行：

        gulp prod

    该任务将在app/dist文件夹中生成两个新文件bundle.min.css和bundle.min.js，并删除原有的bundle.css和bundle.js。
    
2. 发布时，只需要将app/dist文件夹中的文件上传到服务器即可，其他文件都不是必需的。app/dist中的CSS、JS和图片文件都是经过压缩优化的。

## Lisence
[MIT][22]

  [1]: https://github.com/nolimits4web/swiper/
  [2]: https://github.com/daneden/animate.css
  [3]: https://github.com/jquery/jquery
  [4]: https://github.com/necolas/normalize.css
  [5]: https://github.com/thinkpixellab/PxLoader
  [8]: http://npm.taobao.org/
  [9]: http://npm.taobao.org/
  [10]: https://github.com/nodejs/node-gyp
  [11]: https://github.com/nodejs/node-gyp#installation
  [22]: http://opensource.org/licenses/mit-license.html
