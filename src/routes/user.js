const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const user = require('../controllers/user');

// 获取云盘数据
router.get('/clouds', async(ctx) => {
  const result = await user.fetchClouds(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 关注用户
router.put('/:id/follow', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params user id is required');
  }

  const result = await user.follow(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消关注用户
router.put('/:id/unfollow', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params user id is required');
  }

  const result = await user.unfollow(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 相似用户
router.get('/:id/similarity', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchSimilarityList(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得用户创建的电台列表
router.get('/:id/audios', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchAudios(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取云盘数据详情
router.get('/:id/cloud', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchCloud(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得用户的电台节目列表
router.get('/:id/djs', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchDjs(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取用户详情
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchOne(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取用户动态
router.get('/:id/events', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchEvents(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得用户关注列表
router.get('/:id/follows', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchFollows(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得用户粉丝列表
router.get('/:id/fans', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchFans(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得用户歌单列表
router.get('/:id/playlists', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchFollows(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得用户听歌排行榜
router.get('/:id/play-record', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await user.fetchPlayRecord(
    id,
    ctx.request.query.type,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
