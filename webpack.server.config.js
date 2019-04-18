const path = require('path');
//处理模板html自动引入JS
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清除文件夹
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//js压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode: "production",
    entry: {
        app: path.join(__dirname, "src/server/index.jsx")
    },
    target:'node',
    output: {
        filename: 'server.js',//名字已入口entry 名字命名
        path: path.join(__dirname, 'dist'),//输出文件的路径
        publicPath: "./",
        libraryTarget: "commonjs",
        library: 'page',
        globalObject: "this",
        chunkFilename: "js/[name]chunk-[contentHash].js"
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    'astroturf/loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // {
            //     test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 3000,
            //                 options: {
            //                     outputPath: './images',
            //                     publicPath: './images'
            //                 },
            //             }
            //         },
            //         {
            //             loader:'@svgr/webpack',
            //             options:{
            //                 babel: true,
            //                 icon: true
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './images',
                            publicPath: '/images'
                        },
                    },

                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
            // {
            //     test: /\.(svg(\?v=\d+\.\d+\.\d+)?)|(png|woff|woff2|ttf|eot)$/,
            //     issuer: {
            //         test: /\.jsx?$/
            //     },
            //     use: ['babel-loader', '@svgr/webpack', 'url-loader']
            // },
            // {
            //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url-loader'
            // }
        ]
    },
    // 输出源码
    devtool: 'source-map',
    optimization: {
        // 压缩js
        minimizer: [
            // new UglifyJsPlugin({
            //     sourceMap: true,
            //     uglifyOptions: {
            //         ecma:8,
            //         compress: {
            //             warnings: false
            //         }
            //     }
            // })
        ],
        // 抽离公用的js部分 , 配置自动提取node_modules里用到的模块如jquery
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // test: /\.js$/,
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "async", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    enforce: true,
                    name: 'common'
                },

            }
        }
    },
    resolve: {
        extensions: ['json','.js','.jsx']
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        //清除文件
        // new CleanWebpackPlugin(['dist']),
        //设置默认环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("server")
            }
        }),
        /**
         * chunks 代码块,vendor 为固定静态资源splitChunks配置,各个模板的入口 对应entry入口模块
         */
        new HtmlWebpackPlugin({
            template: "./src/index-template.html",
            inject: true,
            minify: true,
            filename: "./index.html",
            hash: true,
            contentHash: true,
            cache: true
        }),
        new webpack.IgnorePlugin( /uws/ ),
        new MiniCssExtractPlugin({ // 在plugins中配置属性
            filename: '/css/[name]-[contentHash].css', // 配置提取出来的css名称
            chunkFilename: '/css/[name].css'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};