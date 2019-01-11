const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const message = require('../controllers/message');
const playlist = require('../controllers/playlist');

router.withoutComplexSuffix = true;

// 发送私信
router.post('/send/text', async(ctx) => {
  const msg = ctx.request.body.message;
  const userIds = ctx.request.body.userIds;

  if (!msg) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params message is required');
  }

  if (!userIds && !userIds.length) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params userIds is required');
  }

  const result = await message.send(
    msg,
    userIds,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 发送歌单私信
router.post('/send/playlist', async(ctx) => {
  const msg = ctx.request.body.message;
  const userIds = ctx.request.body.userIds;
  const playlistId = ctx.request.body.playlistId;

  if (!playlistId) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params playlistId is required');
  }

  if (!msg) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params message is required');
  }

  if (!userIds && !userIds.length) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params userIds is required');
  }

  const result = await playlist.send(
    playlistId,
    msg,
    userIds,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
