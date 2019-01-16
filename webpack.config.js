const path = require('path');
const webpack = require('webpack');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//清除旧的打的包
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/Index.js'
    },
    output: {
        filename: 'bundle.js', //打包后的文件名称
        // filename: '[name].js',
        path: path.resolve('dist'), //打包后的目录，必须是绝对路径
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test:/\.js|jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        //引入antd
                        options: {
                            plugins: [
                                ['import', [{ libraryName: "antd", style: 'css' }]],
                            ]
                        }
                    }
                ],
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.less$/,     // 解析less
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析
                })
            },
            {
                test: /\.scss$/,     // 解析scss
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'sass-loader'] // 从右向左解析
                })
            },
            {
                test: /\.css$/,     // 解析css
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        //通过new一下这个类来使用插件
        new HtmlWebpackPlugin({
            //用哪个html作为模板
            //在src目录下创建一个index.html页面当做模板来用
            template: './src/Index.html',
            filename: 'index.html',
            // chunks: ['Index'],   // 对应关系,Index.js对应的是index.html
            chunks: ['vendor', 'index', 'utils'],  //  引入需要的chunk
            hash: true, //会在打包好的bundle.js后面加上hash串
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css'),
        new ExtractTextWebpackPlugin('css/reset.css'),
        // 打包前先清空
        new CleanWebpackPlugin('dist'),
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        // 别名
        alias: {
            pages:path.join(__dirname,'src/pages'),
            // component:path.join(__dirname,'src/component'),
            // actions:path.join(__dirname,'src/redux/actions'),
            // reducers:path.join(__dirname,'src/redux/reducers'),
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: {
                    // 抽离自己写的公共代码，utils里面是一个公共类库
                    chunks: 'initial',
                    name: 'utils',  //  任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    devServer: {
        port: 3001,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true
    },
    mode: 'development',
    devtool: 'inline-source-map'
}