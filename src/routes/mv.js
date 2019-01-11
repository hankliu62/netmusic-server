const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const constants = require('../constants');
const comment = require('../controllers/comment');
const mv = require('../controllers/mv');

// 获取最新的MV列表
router.get('/recent', async(ctx) => {
  const result = await mv.fetchRecentList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取私人推荐的MV列表
router.get('/personalized', async(ctx) => {
  const result = await mv.fetchPersonalizedList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取热门(榜单)MV列表
router.get('/top', async(ctx) => {
  const result = await mv.fetchTopList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取MV评论
router.get('/:id/comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await comment.fetchList(
    id,
    constants.ResourceTypePrefix.MV,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取MV热门评论
router.get('/:id/hot-comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await comment.fetchHotList(
    id,
    constants.ResourceTypePrefix.MV,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞MV的某条评论
router.put('/:id/comments/:commentId/like', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.like(
    id,
    constants.ResourceTypePrefix.MV,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞MV的某条评论
router.put('/:id/comments/:commentId/unlike', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.unlike(
    id,
    constants.ResourceTypePrefix.MV,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 评论MV
router.post('/:id/comments', async(ctx) => {
  const id = ctx.params.id;
  const content = ctx.request.body.content;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  if (!content) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The body comment content is required');
  }

  const result = await comment.create(
    id,
    constants.ResourceTypePrefix.MV,
    content,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 删除MV的某条评论
router.delete('/:id/comments/:commentId', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.delete(
    id,
    constants.ResourceTypePrefix.MV,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取MV详情
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await mv.fetchOne(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 收藏某MV
router.put('/:id/sub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await mv.subscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消收藏某MV
router.put('/:id/unsub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await mv.unsubscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取 MV 的 URL
router.get('/:id/url', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await mv.fetchURL(
    id,
    ctx.request.query.res,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞MV
router.put('/:id/like', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await mv.like(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞MV
router.put('/:id/unlike', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params mv id is required');
  }

  const result = await mv.unlike(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 相似MV
router.get('/:id/similarity', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await mv.fetchSimilarityList(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
