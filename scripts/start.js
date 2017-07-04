const open = require('open');
const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../build/webpack.config.dev');
const config = require('../config');
const app = express();

const PORT = process.env.port || 8000;
const HOST = process.env.HOST || '0.0.0.0';

let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.publicPath,
    // quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    reload: true
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

const uri = `http://localhost:8000${config.publicPath}/index.html`;

let _resolve
let readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    open(uri)
    _resolve()
})

let server = app.listen(PORT);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}