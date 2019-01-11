const router = require('koa-router')();

const banner = require('../controllers/banner');

// 获取首页横幅轮播图
router.get('/', async(ctx) => {
  const result = await banner.fetchList();

  ctx.body = result;
});

module.exports = router;
