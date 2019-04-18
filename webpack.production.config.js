const path = require('path');
//处理模板html自动引入JS
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginFunctions = require('less-plugin-functions');
//清除文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//预渲染
const PreRender = require('prerender-spa-plugin');
//js压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: "production",
    entry: {
        app: path.join(__dirname, "src/index.jsx")
    },
    output: {
        filename: 'js/[name]-[contentHash].js',//名字已入口entry 名字命名
        path: path.join(__dirname, 'dist'),//输出文件的路径
        publicPath: "./",
        chunkFilename: "js/[name]chunk-[contentHash].js",
        library: 'XLSX',
        libraryTarget: 'var',
    },
    node: {
        process: false,
        Buffer: false
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    'astroturf/loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/hotcss/images',
                            publicPath: '/hotcss/images'
                        },
                    },

                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader:"less-loader",
                        options: {
                            plugins: [
                                new LessPluginFunctions()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    // 输出源码
    devtool: 'source-map',
    optimization: {
        // 压缩js
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                    ecma: 8
                }
            })
        ],
        // 抽离公用的js部分 , 配置自动提取node_modules里用到的模块如jquery
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /\.js$/,
                    chunks: "all", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    enforce: true
                },
            }
        }
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        //清除文件
        new CleanWebpackPlugin(['dist']),
        //设置默认环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index-template.html",
            inject: true,
            // minify: true,
            filename: "./index.html",
            hash: true
        }),
        new MiniCssExtractPlugin({ // 在plugins中配置属性
            filename: 'css/[name]-[contentHash].css', // 配置提取出来的css名称
            chunkFilename: "css/chunk-[id].css"
        }),
        new webpack.NamedModulesPlugin(),
        new PreRender({
            staticDir: path.join(__dirname,'dist'),
            routes: ['/']
        })
    ]
};