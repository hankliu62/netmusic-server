const log4js = require('log4js');
const Boom = require('boom');

const config = require('../configs/log');

// 加载配置文件
log4js.configure(config);

const logUtil = {};
// 调用预先定义的日志名称
const resLogger = log4js.getLogger('resLogger');
const errorLogger = log4js.getLogger('errorLogger');
const apiLogger = log4js.getLogger('apiLogger');
const consoleLogger = log4js.getLogger();

// 封装错误日志
logUtil.logError = function(ctx, error, resTime) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
};

// 封装响应日志
logUtil.logResponse = function(ctx, resTime) {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
};

logUtil.logInfo = function(info) {
  if (info) {
    consoleLogger.info(formatInfo(info));
  }
};

logUtil.apiInfo = function(response) {
  if (response) {
    apiLogger.info(formatAxiosResponse(response));
  }
};

const formatAxiosResponse = function(response) {
  const config = response.config;
  const data = response.data;
  let logText = '';
  // API日志开始
  logText += '\n' + '*************** axios api log start ***************' + '\n';

  if (config) {
    // 请求 url
    logText += 'request url: ' + '\n    ' + config.url + '\n';

    // 请求 method
    logText += 'request method: ' + '\n    ' + config.method + '\n';

    // 请求 headers
    logText += 'request headers: ' + '\n    ' + JSON.stringify(config.headers) + '\n';

    if (config.method) {
      if (config.method.toUpperCase() === 'GET') {
        // 请求 参数
        logText += 'request params: ' + '\n    ' + JSON.stringify(config.params) + '\n';
      } else if (['POST', 'PUT', 'DELETE'].includes(config.method.toUpperCase())) {
        // 请求 参数
        logText += 'request data: ' + '\n    ' + JSON.stringify(config.data) + '\n';
      }
    }
  }

  if (response.status) {
    // 响应 status
    logText += 'response status: ' + '\n    ' + response.status + '\n';
  }

  if (response.headers) {
    // 响应 status
    logText += 'response headers: ' + '\n    ' + JSON.stringify(response.headers) + '\n';
  }

  if (data) {
    // 响应 结果
    logText += 'response body: ' + '\n    ' + JSON.stringify(data) + '\n';
  }

  if (response instanceof Error) {
    // 错误名称
    logText += 'response err name: ' + '\n    ' + response.name + '\n';

    // 错误Code
    logText += 'response err code: ' + '\n    ' + response.code + '\n';

    // 错误信息
    logText += 'response err message: ' + '\n    ' + response.message + '\n';

    // 错误详情
    logText += 'response err stack: ' + '\n    ' + response.stack + '\n';
  }

  // API日志结束
  logText += '*************** axios api log end *****************' + '\n';

  return logText;
};

const formatInfo = function(info) {
  let logText = '';
  // 响应日志开始
  logText += '\n' + '***************info log start ***************' + '\n';

  // 响应内容
  logText += 'info detail: ' + '\n    ' + JSON.stringify(info) + '\n';

  // 响应日志结束
  logText += '*************** info log end *****************' + '\n';

  return logText;
};

// 格式化响应日志
const formatRes = function(ctx, resTime) {
  let logText = '';
  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n';

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  // 请求params
  logText += 'request params: ' + JSON.stringify(ctx.params) + '\n';

  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n';

  // 响应内容
  logText += 'response body: ' + '\n    ' + JSON.stringify(ctx.body) + '\n';

  // 响应日志结束
  logText += '*************** response log end *****************' + '\n';

  return logText;

};

// 格式化错误日志
const formatError = function(ctx, err, resTime) {
  let logText = '';

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n';

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  // 请求params
  logText += 'request params: ' + JSON.stringify(ctx.params) + '\n';

  // 错误名称
  logText += 'err name: ' + err.name + '\n';

  if (Boom.isBoom(err)) {
    // 错误Code
    logText += 'err status code: ' + err.output.statusCode + '\n';

    // 错误Data
    logText += 'err data: ' + err.data + '\n';
  } else {
    // 错误Code
    logText += 'err code: ' + err.code + '\n';
  }

  // 错误信息
  logText += 'err message: ' + err.message + '\n';

  // 错误详情
  logText += 'err stack: ' + err.stack + '\n';

  // 错误信息结束
  logText += '*************** error log end *****************' + '\n';

  return logText;
};

// 格式化请求日志
const formatReqLog = function(req, resTime) {
  let logText = '';

  const method = req.method;
  // 访问方法
  logText += 'request method: ' + method + '\n';

  // 请求原始地址
  logText += 'request originalUrl: ' + req.originalUrl + '\n';

  // 客户端ip
  logText += 'request client ip: ' + req.ip + '\n';

  // 请求参数
  if (method.toUpperCase() === 'GET') {
    logText += 'request query: ' + JSON.stringify(req.query) + '\n';
  } else {
    logText += 'request body: ' + '\n    ' + JSON.stringify(req.body) + '\n';
  }

  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n';

  return logText;
};

module.exports = logUtil;
