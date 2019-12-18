const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        entry: './src/main.js',
        output: {
            filename: 'OmoWidget.js',
            path: path.resolve(bundleOutputDir),
        },
        devServer: {
            contentBase: bundleOutputDir,
            host: "0.0.0.0", // Your Computer Name
            port: 8080

        },
        plugins: isDevBuild
            ? [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin([{ from: 'demo/' },{from: 'pictures/', to:'img/'},{from: 'icons/', to:'img/'},{from: 'config/', to:'config/'}])]
            : [new webpack.optimize.UglifyJsPlugin()],
        module: {
            rules: [
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.css$/i, use: ['style-loader', 'css-loader' + (isDevBuild ? '' : '?minimize')] }
                 ,
                { test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=100000'},
                {
                    test: /\.js$/i, exclude: /node_modules/, use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/env', {
                                // 'targets': {
                                //     'browsers': ['ie 6', 'safari 7','chrome 51', 'opera 39', 'firefox 48','Edge']
                                // }
                                'targets':">0.25%"
                            }]]
                        }
                    }
                }
            ]
        }
    }];
};