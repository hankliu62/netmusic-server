module.exports = () => {
  return async(ctx, next) => {
    ctx.cookie = {};
    (ctx.request.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
      const crack = pair.indexOf('=');
      if (crack < 1 || crack === pair.length - 1) {
        return;
      }

      ctx.cookie[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim();
    });
    next();
  };
};
