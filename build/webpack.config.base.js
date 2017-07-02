const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const config = require('../config');

const resolve = dir => path.resolve(__dirname,'..',dir);

const cssPlugin = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
  entry: config.appIndexJs,
  output: {
    path: config.appBuild,
    filename: '[name].js',
    library: 'template',
    libraryTarget: 'umd',
    publicPath: config.publicPath,
  },
  performance: {
    hints: 'warning',
  },
  resolve: {
    modules: [resolve("src"), "node_modules"],
  },
  module: {
    rules:[{
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: {
          loader: 'css-loader',
        },
        fallback : 'style-loader',
      }),
    },{
      test: /\.(png|jpe?g|gif)(\?\S*)?$/,
      use: ['file-loader'],
    },{
      test: /\.art$/,
      use: [{
        loader: 'art-template-loader',
        options: {
          htmlResourceRoot: __dirname,
          root: path.resolve(__dirname),
        },
      }],
    }],
  },
  plugins: [
    cssPlugin,
    ...config.appTemplate.map(templateConfig=>{
        return new HtmlWebpackPlugin(templateConfig);
    }),
    new CopyWebpackPlugin([{
        from: resolve('src/lib'),
        to: resolve('dist/lib'),
        toType:'dir',
    }])
  ],
};