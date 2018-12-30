const fs = require('fs');

const suffixReg = /\.js$/i;

const routes = {};
fs.readdirSync(__dirname).filter((filename) => {
  return suffixReg.test(filename) && filename !== 'index.js'; // 过滤自身
}).forEach((filename) => {
  routes[filename.replace(suffixReg, '')] = require('./' + filename);
});

module.exports = routes;
