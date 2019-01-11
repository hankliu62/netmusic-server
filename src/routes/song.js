const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const constants = require('../constants');
const song = require('../controllers/song');
const comment = require('../controllers/comment');

// 获取喜欢(红心)歌曲列表
router.get('/liked', async(ctx) => {
  const result = await song.fetchLikedList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取每日推荐歌曲列表
router.get('/daily-recommend', async(ctx) => {
  const result = await song.fetchDailyRecommendList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取新品歌曲列表
router.get('/newest', async(ctx) => {
  const result = await song.fetchNewList(
    ctx.request.query.type,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 判断歌曲是否可用
router.get('/:id/enable', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await song.checkEnable(
    id,
    ctx.request.query.br,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌曲评论
router.get('/:id/comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await comment.fetchList(
    id,
    constants.ResourceTypePrefix.Song,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌曲热门评论
router.get('/:id/hot-comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await comment.fetchHotList(
    id,
    constants.ResourceTypePrefix.Song,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞歌曲的某条评论
router.put('/:id/comments/:commentId/like', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.like(
    id,
    constants.ResourceTypePrefix.Song,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞歌曲的某条评论
router.put('/:id/comments/:commentId/unlike', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.unlike(
    id,
    constants.ResourceTypePrefix.Song,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 评论歌曲
router.post('/:id/comments', async(ctx) => {
  const id = ctx.params.id;
  const content = ctx.request.body.content;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  if (!content) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The body comment content is required');
  }

  const result = await comment.create(
    id,
    constants.ResourceTypePrefix.Song,
    content,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 删除歌曲的某条评论
router.delete('/:id/comments/:commentId', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.delete(
    id,
    constants.ResourceTypePrefix.Song,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 将歌曲拖到垃圾桶
router.put('/:id/trash', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await song.trash(
    id,
    ctx.request.query.time,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 喜欢(红心)某歌曲
router.put('/:id/like', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await song.like(
    id,
    ctx.request.query.time,
    ctx.request.query.alg,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消喜欢(取消红心)某歌曲
router.put('/:id/unlike', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await song.unlike(
    id,
    ctx.request.query.time,
    ctx.request.query.alg,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌曲歌词
router.get('/:id/lyric', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params song id is required');
  }

  const result = await song.fetchLyric(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取私人推荐的新歌列表
router.get('/personalized/recent', async(ctx) => {
  const result = await song.fetchPersonalizedRecentList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 相似歌曲
router.get('/:id/similarity', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await song.fetchSimilarityList(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌曲链接
router.get('/:id/url', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await song.fetchURL(
    id,
    ctx.request.query.br,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取歌曲详情
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await song.fetchOne(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取多首歌曲详情
router.get('/', async(ctx) => {
  const ids = ctx.request.query.ids;

  if (!ids) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params ids is required');
  }

  const result = await song.fetchListByIds(
    ids,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
