const path = require('path');
const pages = require('./page.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

let config = {};
config.plugins = [];
config.entry = {};

const cssPlugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true,
});

pages.forEach(page => {
  try{
    let { entry } = page;
    Object.assign(page, {
      filename: `${entry}.html`,
      chunks:[entry],
    });
    config.plugins.push(new HtmlWebpackPlugin(page));
    config.entry[page.entry] = path.join(__dirname, `src/${entry.split('/')[0]}`, entry.split('/')[1]);
  }
  catch(e) {
    throw new Error('page.config.js format error');
  }
});

config.plugins.push(cssPlugin);
config.plugins.push(new BabiliPlugin());

module.exports = {

  module: {
    rules:[{
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssPlugin.extract({
        use: {
          loader: 'css-loader',
          options: {
            modules: false,
          },
        },
        fallback : 'style-loader',
      }),
    },{
      test: /\.(jpg|png|gif)$/i,
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
  devServer: {
    host: process.env.HOST,
    compress: true, // gzip
    port: '8000',
  },
  // 增加调试
  devtool: 'source-map',
  entry: config.entry,
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    library: 'template',
    libraryTarget: 'umd',
  },
  performance: {
    hints: 'warning',
  },
  plugins:config.plugins,
};