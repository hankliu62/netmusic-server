const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const constants = require('../constants');
const comment = require('../controllers/comment');
const video = require('../controllers/video');

// 获取视频评论
router.get('/:id/comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  const result = await comment.fetchList(
    id,
    constants.ResourceTypePrefix.Video,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取视频热门评论
router.get('/:id/hot-comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  const result = await comment.fetchHotList(
    id,
    constants.ResourceTypePrefix.Video,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞视频的某条评论
router.put('/:id/comments/:commentId/like', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.like(
    id,
    constants.ResourceTypePrefix.Video,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞视频的某条评论
router.put('/:id/comments/:commentId/unlike', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.unlike(
    id,
    constants.ResourceTypePrefix.Video,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 评论视频
router.post('/:id/comments', async(ctx) => {
  const id = ctx.params.id;
  const content = ctx.request.body.content;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  if (!content) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The body comment content is required');
  }

  const result = await comment.create(
    id,
    constants.ResourceTypePrefix.Video,
    content,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 删除视频的某条评论
router.delete('/:id/comments/:commentId', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.delete(
    id,
    constants.ResourceTypePrefix.Video,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取相关视频列表
router.get('/:id/related', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  const result = await video.fetchRelatedList(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞视频
router.put('/:id/like', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  const result = await video.like(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞视频
router.put('/:id/unlike', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params video id is required');
  }

  const result = await video.unlike(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 收藏某视频
router.put('/:id/sub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await video.subscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消收藏某视频
router.put('/:id/unsub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await video.unsubscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取视频链接
router.get('/:id/url', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await video.fetchURL(
    id,
    ctx.request.query.resolution,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取视频详情
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params id is required');
  }

  const result = await video.fetchOne(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
