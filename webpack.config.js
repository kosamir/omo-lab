const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  return [
    {
      entry: './src/main.js',
      output: {
        filename: 'OmoWidget.js',
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        contentBase: bundleOutputDir,
        host: '0.0.0.0', // Your Computer Name
        port: 8080,
      },
      plugins: isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin(),
            new copyWebpackPlugin([
              { from: 'demo/' },
              { from: 'config/', to: 'config/' },
              { from: 'fonts/woff', to: 'fonts/woff' },
              { from: 'fonts/std', to: 'fonts/std' },
              { from: 'assets/', to: 'assets/' },
              { from: 'css/', to: 'css/' },
            ]),
            new webpack.ProvidePlugin({
              Promise: 'es6-promise-promise',
            }),
          ]
        : [new UglifyJsPlugin()],
      module: {
        rules: [
          { test: /\.html$/i, use: 'html-loader' },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader' + (isDevBuild ? '' : '')],
          },
          {
            test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
          },
          {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/env',
                    {
                      targets: {
                        browsers: ['IE>=10', '>0.25%', 'not op_mini all'],
                      },
                      // targets:
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    },
  ];
};
