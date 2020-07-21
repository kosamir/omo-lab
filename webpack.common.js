const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    scss: './assets/scss/',
    js: './assets/js/',
    dist: `${__dirname}/dist/`,
};

module.exports = {
    entry: {
        index: `${paths.js}index.js`,
    },
    output: {
        path: paths.dist,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.es6'],
        alias: {
            '@scss': path.resolve(__dirname, paths.scss),
            '@js': path.resolve(__dirname, paths.js),
        },
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: './assets',
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${__dirname}/index.html`,
        }),
    ],
};
