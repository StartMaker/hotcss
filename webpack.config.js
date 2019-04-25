const path = require('path');
const fs = require('fs');
//处理模板html自动引入JS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginFunctions = require('less-plugin-functions');
//清除文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: "development",
    entry: {
        app: path.resolve(__dirname, "./src/index.jsx")
    },
    output: {
        filename: '[name].js',//名字已入口entry 名字命名
        path: path.resolve(__dirname, 'dist'),//输出文件的路径
        publicPath: '/',
        chunkFilename: "[name].js",
        libraryTarget: 'var',
        library: 'XLSX'
    },
    node: {
        process: false,
        Buffer: false
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        host: '10.20.0.71',
        progress: true,
        inline: true,
        port: 3000,
        compress: true
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "astroturf/loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|svg|eot)($|\?)/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10
                        }
                    },
                    {
                        loader:'@svgr/webpack',
                        options:{
                            babel: true,
                            icon: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
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
            },
            {
                test: /\.(ts|tsx)?$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    // 输出源码
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx"],
        alias: { "./dist/cpexcel.js": "" }
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        //清除文件
        new CleanWebpackPlugin(['dist']),
        //设置默认环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index-template.html",
            inject: true,
            // favicon: './src/App/static/image/theme.jpg',
            filename: "index.html",
            hash: true
            // loading: loading
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};