const router = require('koa-router')();
const Boom = require('boom');

const errors = require('../constants/error');
const Constants = require('../constants');
const accounts = require('../controllers/account');

// 手机登录
router.post('/login/cellphone', async(ctx, next) => {
  const phone = ctx.request.body.phone;
  const password = ctx.request.body.password;

  if (!phone) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params phone is required');
  }
  if (!password) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params password is required');
  }
  if (!Constants.RegExps.Phone.test(phone)) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params phone is invalid');
  }

  const result = await accounts.loginByCellphone(phone, password);

  ctx.body = result;
});

router.get('/json', async(ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  };
});

module.exports = router;
