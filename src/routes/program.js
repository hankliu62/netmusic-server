const router = require('koa-router')();

const cookies = require('../utils/cookie');
const program = require('../controllers/program');

// 获取推荐节目列表
router.get('/daily-recommend', async(ctx) => {
  const result = await program.fetchRecommendList(
    ctx.request.query.type,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
