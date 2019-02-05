const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/assets/scripts/index',
    devServer: {
        port: "9000",
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    output: {
        path: __dirname,
        filename: 'build/bundle.js',
        sourceMapFilename: 'sourcemap'
    },
    resolve: {
        extensions: ['.js', '.jsx','css'],
        alias: {
            css: path.resolve(__dirname, 'css'),
        }
    },
    module: {
        rules:[
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=src/assets/images/[name].[ext]"
            },
            {
                test: /\.(css|scss)?$/,
                use: ['style-loader','css-loader','sass-loader' ]
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                    }
                }
            }
        ]
    },
    devtool: '#inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Experia',
            filename: 'index.html',
            template: 'index.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Experia',
            filename: 'dashboard.html',
            template: 'dashboard.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Experia',
            filename: 'accountsummary.html',
            template: 'accountsummary.html',
            inject: false
        }),
    ]
}