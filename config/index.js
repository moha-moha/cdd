const path = require('path');
const chalk = require('chalk');
const pages = require('./page.config');

// 把相对路径解析为绝对路径
const resolveApp = relativePath => path.resolve(process.cwd(),relativePath);

function isPagesError() {
    // 判断pages是否为数组
    if(pages instanceof Array) {
        // 判断pages数组是否为空
        if(pages.length === 0){
            console.log(chalk.red(`${__dirname}/page.config.js is empty!'`));
            return true;
        }
        return false;
    }else{
        console.log(chalk.red(`${__dirname}/page.config.js format error, except Array!'`));
        return true;
    }
}

// 获取入口文件和模板文件
function getAppIndexJsAndTemplate() {
    let appIndexJs = {};
    let appTemplate = new Array(pages.length);
    if(isPagesError()) process.exit(1);
    pages.forEach((page,index) => {
        let { entry } = page;
        appTemplate[index] = Object.assign(page, {
            filename: `${entry}.html`,
            chunks: [entry],
        });
        appIndexJs[entry] = path.join(resolveApp(''), `src/${entry.split('/')[0]}`, entry.split('/')[1]);
    })
    return {appIndexJs,appTemplate};
}

const {appIndexJs,appTemplate} = getAppIndexJsAndTemplate();

module.exports = {
    appIndexJs, // 入口文件
    appTemplate, // 模板文件数组
    appBuild: resolveApp('dist'), // 文件输出目录
    appSrc: resolveApp('src'), // 源代码目录
    publicPath: '/dist/',
}