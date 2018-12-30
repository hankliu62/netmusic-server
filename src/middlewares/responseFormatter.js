module.exports = function(options = {}) {
  return async(ctx, next) => {
    // 先去执行路由
    await next();

    // 可以忽略某些路由，不对某些response进行处理
    if (options.ignorePath && !options.ignorePath.test(ctx.originalUrl)) {
      // 如果有返回数据，将返回数据添加到data中
      if (ctx.body) {
        ctx.body = {
          code: 0,
          message: 'success',
          data: ctx.body
        };
      } else {
        ctx.body = {
          code: 0,
          message: 'success'
        };
      }
    }

  };
};
