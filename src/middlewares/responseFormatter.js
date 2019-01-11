const Boom = require('boom');

const codes = require('../constants/code');

module.exports = function(options = {}) {
  return async(ctx, next) => {

    // 可以忽略某些路由，不对某些response进行处理
    const ignore = options.ignorePath && options.ignorePath.test(ctx.originalUrl);

    // 先去执行路由
    try {
      await next();

      if (ctx.body.status) {
        ctx.status = ctx.body.status;
        delete ctx.body.status;
      }

      let cookie;
      if (!ignore) {
        // 如果有返回数据，将返回数据添加到data中
        if (ctx.body) {
          if (ctx.body.cookie) {
            cookie = ctx.body.cookie;
            delete ctx.body.cookie;
          }
          ctx.body = {
            code: codes.Success,
            message: 'success',
            ...(ctx.body || {})
          };

        } else {
          ctx.body = {
            code: codes.Success,
            message: 'success'
          };
        }
      }

      if (ctx.body.cookie) {
        cookie = ctx.body.cookie;
        delete ctx.body.cookie;
      }

      if (cookie) {
        ctx.append('Set-Cookie', cookie);
      }
    } catch (error) {
      // 如果异常类型是 API 异常并且通过正则验证的url，将错误信息添加到响应体中返回。
      if (Boom.isBoom(error) && !ignore) {
        ctx.status = 200;
        let message = error.message;
        let code = error.output.statusCode % 1000;
        // TODO: 网易API调用返回301时，表示没有登陆(观察所得，需要验证)
        if (code === codes.MovedPermanently) {
          message = 'Need Login';
          code = codes.Unauthorized;
        }
        const result = {
          code,
          message
        };
        if (error.data) {
          result.errors = error.data.split(',');
        }
        ctx.body = result;
        return;
      } else {
        // 继续抛，让外层中间件处理日志
        throw error;
      }
    }
  };
};
