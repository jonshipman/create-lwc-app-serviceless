const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LwcWebpackPlugin = require('lwc-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
    entry: [path.join(__dirname, 'src', 'client', 'index.js')],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8081
    },
    mode,
    devtool: mode === 'development' && 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode)
        }),
        new LwcWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'client', 'index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join('src', 'client', 'resources'),
                    to: path.join('dist', 'resources')
                }
            ]
        })
    ]
};
