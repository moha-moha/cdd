const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');
const BabiliPlugin = require('babili-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig,{
    devtool: 'source-map',
    plugins: [
        // 删除没用的代码
        new BabiliPlugin(),
        new BundleAnalyzerPlugin()
    ]
});