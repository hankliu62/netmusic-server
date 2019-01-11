const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const constants = require('../constants');
const comment = require('../controllers/comment');
const playlist = require('../controllers/playlist');

// 获取歌单分类列表
router.get('/categories', async(ctx) => {
  const result = await playlist.fetchCategories(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取热门歌单分类
router.get('/hot-tags', async(ctx) => {
  const result = await playlist.fetchHotTags(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取每日推荐歌单列表
router.get('/daily-recommend', async(ctx) => {
  const result = await playlist.fetchDailyRecommendList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取私人推荐的歌单列表
router.get('/personalized', async(ctx) => {
  const result = await playlist.fetchPersonalizedList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取精品歌单列表
router.get('/high-quality', async(ctx) => {
  const result = await playlist.fetchHighQualityList(
    ctx.request.query.category,
    ctx.request.query['pagination.lastTime'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取热门歌单列表
router.get('/hot', async(ctx) => {
  const result = await playlist.fetchHotList(
    ctx.request.query.category,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取新品歌单列表
router.get('/newest', async(ctx) => {
  const result = await playlist.fetchNewList(
    ctx.request.query.category,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌单评论
router.get('/:id/comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  const result = await comment.fetchList(
    id,
    constants.ResourceTypePrefix.PlayList,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌单热门评论
router.get('/:id/hot-comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  const result = await comment.fetchHotList(
    id,
    constants.ResourceTypePrefix.PlayList,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞歌单的某条评论
router.put('/:id/comments/:commentId/like', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.like(
    id,
    constants.ResourceTypePrefix.PlayList,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞歌单的某条评论
router.put('/:id/comments/:commentId/unlike', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.unlike(
    id,
    constants.ResourceTypePrefix.PlayList,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 评论歌单
router.post('/:id/comments', async(ctx) => {
  const id = ctx.params.id;
  const content = ctx.request.body.content;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!content) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The body comment content is required');
  }

  const result = await comment.create(
    id,
    constants.ResourceTypePrefix.PlayList,
    content,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 删除歌单的某条评论
router.delete('/:id/comments/:commentId', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.delete(
    id,
    constants.ResourceTypePrefix.PlayList,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取排行榜榜单
router.get('/top/:topId', async(ctx) => {
  const topId = ctx.params.topId;

  if (!topId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params topId is required');
  }

  const result = await playlist.fetchTop(
    topId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 收藏某歌单
router.put('/:id/sub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  const result = await playlist.subscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消收藏某歌单
router.put('/:id/unsub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  const result = await playlist.unsubscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 收藏歌曲到歌单
router.put('/:id/songs/add', async(ctx) => {
  const id = ctx.params.id;

  const songIds = ctx.request.body.songIds;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!songIds || !songIds.length) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song ids is required');
  }

  const result = await playlist.addSongs(
    id,
    songIds,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 从歌单里移除歌曲
router.put('/:id/songs/remove', async(ctx) => {
  const id = ctx.params.id;

  const songIds = ctx.request.body.songIds;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!songIds || !songIds.length) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song ids is required');
  }

  const result = await playlist.removeSongs(
    id,
    songIds,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取相关歌单列表
router.get('/:id/related', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  const result = await playlist.fetchRelatedList(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 相似歌单
router.get('/:id/similarity', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await playlist.fetchSimilarityList(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 创建歌单
router.post('/', async(ctx) => {
  const name = ctx.request.body.name;

  if (!name) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist name is required');
  }

  const result = await playlist.create(
    name,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌单详情
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  const result = await playlist.fetchOne(
    id,
    ctx.request.query.s,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 编辑歌单
router.put('/:id', async(ctx) => {
  const id = ctx.params.id;
  const name = ctx.request.body.name;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlist id is required');
  }

  if (!name) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params name is required');
  }

  const result = await playlist.update(
    id,
    name,
    ctx.request.body.tags,
    ctx.request.body.desc,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
