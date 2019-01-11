const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const artist = require('../controllers/artist');

// 获取歌手列表
router.get('/', async(ctx) => {
  const result = await artist.fetchList(
    ctx.request.query.categoryCode,
    ctx.request.query.initial,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取收藏的歌手列表
router.get('/subscribed', async(ctx) => {
  const result = await artist.fetchSubscribedList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取热门歌手列表
router.get('/top', async(ctx) => {
  const result = await artist.fetchHotList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌手榜
router.get('/toplist', async(ctx) => {
  const result = await artist.fetchToplistList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌手简介
router.get('/:id/intro', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params artist id is required');
  }

  const result = await artist.fetchIntro(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌手的专辑列表
router.get('/:id/albums', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params artist id is required');
  }

  const result = await artist.fetchAlbums(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌手的MV列表
router.get('/:id/mvs', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params artist id is required');
  }

  const result = await artist.fetchMvs(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 收藏某歌手
router.put('/:id/sub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params artist id is required');
  }

  const result = await artist.subscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消收藏某歌手
router.put('/:id/unsub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params artist id is required');
  }

  const result = await artist.unsubscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 相似歌手
router.get('/:id/similarity', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await artist.fetchSimilarityList(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌手详情及热门歌曲
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params artist id is required');
  }

  const result = await artist.fetchOne(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
