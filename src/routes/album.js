const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const constants = require('../constants');
const album = require('../controllers/album');
const comment = require('../controllers/comment');

// 获取新碟专辑列表
router.get('/newest', async(ctx) => {
  const result = await album.fetchNewList(
    ctx.request.query.type,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取专辑评论
router.get('/:id/comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  const result = await comment.fetchList(
    id,
    constants.ResourceTypePrefix.Album,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取专辑热门评论
router.get('/:id/hot-comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  const result = await comment.fetchHotList(
    id,
    constants.ResourceTypePrefix.Album,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞专辑的某条评论
router.put('/:id/comments/:commentId/like', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.like(
    id,
    constants.ResourceTypePrefix.Album,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞专辑的某条评论
router.put('/:id/comments/:commentId/unlike', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.unlike(
    id,
    constants.ResourceTypePrefix.Album,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 评论专辑
router.post('/:id/comments', async(ctx) => {
  const id = ctx.params.id;
  const content = ctx.request.body.content;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  if (!content) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The body comment content is required');
  }

  const result = await comment.create(
    id,
    constants.ResourceTypePrefix.Album,
    content,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 删除专辑的某条评论
router.delete('/:id/comments/:commentId', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.delete(
    id,
    constants.ResourceTypePrefix.Album,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取专辑内容
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params album id is required');
  }

  const result = await album.fetchOne(id, cookies.parser(ctx.request));

  ctx.body = result;
});

module.exports = router;
