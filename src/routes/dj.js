const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const constants = require('../constants');
const comment = require('../controllers/comment');
const dj = require('../controllers/dj');

// 获取DJ评论
router.get('/:id/comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await comment.fetchList(
    id,
    constants.ResourceTypePrefix.DJ,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取DJ热门评论
router.get('/:id/hot-comments', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await comment.fetchHotList(
    id,
    constants.ResourceTypePrefix.DJ,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞DJ的某条评论
router.put('/:id/comments/:commentId/like', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.like(
    id,
    constants.ResourceTypePrefix.DJ,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞DJ的某条评论
router.put('/:id/comments/:commentId/unlike', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.unlike(
    id,
    constants.ResourceTypePrefix.DJ,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 评论DJ
router.post('/:id/comments', async(ctx) => {
  const id = ctx.params.id;
  const content = ctx.request.body.content;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  if (!content) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The body comment content is required');
  }

  const result = await comment.create(
    id,
    constants.ResourceTypePrefix.DJ,
    content,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 删除DJ的某条评论
router.delete('/:id/comments/:commentId', async(ctx) => {
  const id = ctx.params.id;
  const commentId = ctx.params.commentId;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  if (!commentId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params comment id is required');
  }

  const result = await comment.delete(
    id,
    constants.ResourceTypePrefix.DJ,
    commentId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取电台分类列表
router.get('/categories', async(ctx) => {
  const result = await dj.fetchCategories(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取热门电台列表
router.get('/hot', async(ctx) => {
  const result = await dj.fetchHotList(
    ctx.request.query.type,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取付费电台列表
router.get('/pay-gift', async(ctx) => {
  const result = await dj.fetchPayGiftList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取收藏的电台列表
router.get('/subscribed', async(ctx) => {
  const result = await dj.fetchSubscribedList(
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取私人FM
router.get('/personal', async(ctx) => {
  const result = await dj.fetchPersonalList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取推荐的精选电台
router.get('/recommended', async(ctx) => {
  const result = await dj.fetchRecommendList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取私人推荐的DJ列表
router.get('/personalized', async(ctx) => {
  const result = await dj.fetchPersonalizedList(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取精选电台分类下的所有电台
router.get('/:categoryId/recommend', async(ctx) => {
  const categoryId = ctx.params.categoryId;

  if (!categoryId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj category id is required');
  }

  const result = await dj.fetchCategoryRecommendList(
    categoryId,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取电台分类列表
router.get('/:id', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.fetchOne(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取电台的节目详情
router.get('/:id/program', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.fetchProgram(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取电台的节目列表
router.get('/:id/programs', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.fetchPrograms(
    id,
    ctx.request.query['pagination.pageIndex'],
    ctx.request.query['pagination.pageSize'],
    ctx.request.query['pagination.order'] && ctx.request.query['pagination.order'].indexOf('asc') > -1,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 收藏某电台
router.put('/:id/sub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.subscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消收藏某电台
router.put('/:id/unsub', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.unsubscribe(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 点赞电台
router.put('/:id/like', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.like(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 取消点赞电台
router.put('/:id/unlike', async(ctx) => {
  const id = ctx.params.id;

  if (!id) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params dj id is required');
  }

  const result = await dj.unlike(
    id,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
