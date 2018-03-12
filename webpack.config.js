const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractCSS = new ExtractTextPlugin("styles/[name].css");

module.exports = {
    entry: {
        index: './src/main.js',
        axios: 'axios'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                options: {
                    loaders: {
                      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                // use:[{
                //     loader: 'style-loader'
                // },{
                //     loader: 'css-loader'// 将 JS 字符串生成为 style 节点
                // }, {
                //     loader: 'sass-loader'// 将 CSS 转化成 CommonJS 模块
                // }, {
                //     loader: 'vue-style-loader'
                // }]
                use:  [
                    { loader: 'vue-style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    { loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: ['src/sass-global/**/*.scss']
                        }
                    }
                ]
                // loader: ExtractTextPlugin.extract("style", 'css!sass')
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
              loader: 'file-loader'
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]?[hash]'
              }
            },
            {
              test: /\.css$/,
            //   use: [{
            //       loader: 'style-loader'
            //   },{
            //       loader: 'css-loader'
            //   }, {
            //       loader: 'vue-style-loader'
            //   }]
                loader: ExtractTextPlugin.extract("style", 'css')
            },
            {
                test: /\.json$/,
                exclude: /^node_modules$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', 
            filename: 'index.html'
        }),
        // 开启webpack全局热更新
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        }),
        // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
        new webpack.NamedModulesPlugin(),
        // extractCSS
        new ExtractTextPlugin("style.css")
    ],
    optimization: {
        splitChunks: {
            name: 'common'
        }
    },
    devServer: {
        hot: true,
        noInfo: false,
        inline: true
    },
    mode: 'development'
}
