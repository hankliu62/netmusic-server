const router = require('koa-router')();

const cookies = require('../utils/cookie');
const weblog = require('../controllers/weblog');

// 获取操作记录
router.get('/', async(ctx) => {
  const result = await weblog.fetchList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
