const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const search = require('../controllers/search');

router.withoutComplexSuffix = true;

// 热门搜索
router.get('/hot', async(ctx) => {
  const result = await search.fetchHotList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 多类型搜索
router.get('/multi-match', async(ctx) => {
  const keywords = ctx.request.query.keywords;

  if (!keywords) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params keywords is required');
  }

  const result = await search.multiMatch(
    ctx.request.query.type,
    keywords,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 云盘搜索
router.get('/cloud', async(ctx) => {
  const keywords = ctx.request.query.keywords;

  if (!keywords) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params keywords is required');
  }

  const result = await search.cloud(
    ctx.request.query.type,
    keywords,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 搜索建议
router.get('/suggest', async(ctx) => {
  const keywords = ctx.request.query.keywords;

  if (!keywords) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params keywords is required');
  }

  const result = await search.fetchSuggest(
    keywords,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 搜索
router.get('/', async(ctx) => {
  const keywords = ctx.request.query.keywords;

  if (!keywords) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params keywords is required');
  }

  const result = await search.fetchList(
    ctx.request.query.type,
    keywords,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
