const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },

    module:{
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    jsLoaders()
                ],
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    devServer: {
        port: 3000,
        hot: false
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMlWebPackPlugin({
            template: 'index.html'
        }),
        // new CopyPlugin({
        //         patterns: [
        //             {
        //             from: path.resolve(__dirname, 'src/favicon.ico'),
        //             to: path.resolve(__dirname, 'dist')
        //             }
        //         ]
        //
        // }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })

    ]
}