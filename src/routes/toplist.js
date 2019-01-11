const router = require('koa-router')();

const cookies = require('../utils/cookie');
const toplist = require('../controllers/toplist');

// 获得所有简单介绍的榜单列表
router.get('/', async(ctx) => {
  const result = await toplist.fetchBriefList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得所有详细介绍的榜单列表
router.get('/detail', async(ctx) => {
  const result = await toplist.fetchDetailList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
