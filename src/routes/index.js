const fs = require('fs');
const Router = require('koa-router');

const suffixReg = /\.js$/i;

const routes = {};
fs.readdirSync(__dirname).filter((filename) => {
  return suffixReg.test(filename) && filename !== 'index.js'; // 过滤自身
}).forEach((filename) => {
  const currentModule = require('./' + filename);
  if (currentModule instanceof Router) {
    routes[filename.replace(suffixReg, '')] = currentModule;
  }
});

module.exports = routes;
