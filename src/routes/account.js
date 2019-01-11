const router = require('koa-router')();
const Boom = require('boom');

const cookies = require('../utils/cookie');
const errors = require('../constants/error');
const Constants = require('../constants');
const account = require('../controllers/account');

router.withoutComplexSuffix = true;

// 邮箱登陆
router.post('/login', async(ctx, next) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (!email) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params email is required');
  }

  if (!password) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params password is required');
  }

  if (!Constants.RegExps.Email.test(email)) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params email is invalid');
  }

  const result = await account.loginByEmail(email, password);

  ctx.body = result;
});

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

  const result = await account.loginByCellphone(phone, password);

  ctx.body = result;
});

// 每日签到
router.post('/daily-checkin', async(ctx) => {
  const type = ctx.request.body.type;

  if (!type) {
    throw Boom.badRequest(errors.Messages.BadRequest, 'The params type is required');
  }

  const result = await account.checkIn(
    type,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取个人动态
router.get('/personal/events', async(ctx) => {
  const result = await account.fetchEvents(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 查看登录状态
router.get('/check/login-status', async(ctx) => {
  const result = await account.fetchLoginStatus(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 退出登陆
router.post('/logout', async(ctx) => {
  const result = await account.logout(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获得收藏计数
router.get('/sub-count', async(ctx) => {
  const result = await account.fetchSubCount(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

router.put('/profile', async(ctx) => {
  const nickname = ctx.request.body.nickname;
  const gender = ctx.request.body.gender;
  const birthday = ctx.request.body.birthday;
  const province = ctx.request.body.province;
  const city = ctx.request.body.city;
  const signature = ctx.request.body.signature;

  if (!nickname && !gender && !birthday && !province && !city && !signature) {
    throw Boom.badRequest(
      errors.Messages.BadRequest,
      'One of params nickname, gender, birthday, province, city or signature is required'
    );
  }

  const result = await account.update(
    ctx.request.body,
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

// 获取推荐关注的用户列表
router.get('/recommend/follows', async(ctx) => {
  const result = await account.fetchRecommendFollows(
    cookies.parser(ctx.request)
  );

  ctx.body = result;
});

module.exports = router;
