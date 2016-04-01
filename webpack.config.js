'use strict';

const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

const colors = JSON.parse(fs.readFileSync('./config/colors.json', 'utf8'));

const config = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
    ],
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                },
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader",
            },
        ]
    },
    postcss: function () {
        return [
            postcssImport,
            cssnext({
                features: {
                    customProperties: {
                        variables: colors,
                    },
                },
            }),
        ];
    },
};

module.exports = config;
