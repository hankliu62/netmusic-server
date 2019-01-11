const router = require('koa-router')();

const cookies = require('../utils/cookie');
const content = require('../controllers/content');

// 获取私人推荐的独家放送列表
router.get('/personalized', async(ctx) => {
  const result = await content.fetchPersonalizedList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
