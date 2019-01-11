const crypto = require('crypto');
const Boom = require('boom');

const request = require('../utils/request');
const codes = require('../constants/code');
const constants = require('../constants');

/**
 * 根据手机号码登陆
 *
 * @param {string} phone 手机号码
 * @param {string} password 密码
 * @returns
 */
async function loginByCellphone(phone, password) {
  const data = {
    phone: phone,
    password: crypto.createHash('md5').update(password).digest('hex'),
    rememberLogin: 'true'
  };

  const url = '/weapi/login/cellphone';

  const options = { crypto: 'we', userAgent: 'pc' };

  return await request.post(url, data, options);
}

/**
 * 根据邮箱地址登陆
 *
 * @param {string} email 邮箱地址
 * @param {string} password 密码
 * @returns
 */
async function loginByEmail(email, password) {
  const data = {
    username: email,
    password: crypto.createHash('md5').update(password).digest('hex'),
    rememberLogin: 'true'
  };

  const url = '/weapi/login';

  const options = { crypto: 'we', userAgent: 'pc' };

  return await request.post(url, data, options);
}

/**
 * 退出登陆
 *
 * @param {object} cookie
 * @returns
 */
async function logout(cookie) {
  const data = {};

  const url = '/weapi/logout';

  const options = { crypto: 'we', userAgent: 'pc', cookie };

  return await request.post(url, data, options);
}

/**
 * 刷新登录的Token
 *
 * @param {object} cookie
 * @returns
 */
async function refreshLoginToken(cookie) {
  const data = {};

  const url = '/weapi/login/token/refresh';

  const options = { crypto: 'we', userAgent: 'pc', cookie };

  return await request.post(url, data, options);
}

/**
 * 查看登录状态
 *
 * @param {object} cookie
 * @returns
 */
async function fetchLoginStatus(cookie) {
  const data = {};

  const url = constants.MusicApiHost;

  const options = { cookie };

  const response = await request.get(url, data, options);

  try {
    // eslint-disable-next-line
    const profile = eval(`(${/GUser\s*=\s*([^;]+);/.exec(response.data)[1]})`);
    // eslint-disable-next-line
    const bindings = eval(`(${/GBinds\s*=\s*([^;]+);/.exec(response.data)[1]})`);
    return { status: codes.Success, data: { profile, bindings }, cookie: [] };
  } catch (error) {
    throw new Boom(new Error('Need Login'), {
      statusCode: 1000 + codes.MovedPermanently
    });
  }
}

/**
 * 签到
 *
 * @param {number} type 签到设备类型
 *  - 0: 安卓端，得 3 经验点
 *  - 1: 网页端，得 2 经验点
 * @param {object} cookie
 * @returns
 *  - 签到成功 {'android': {'point': 3, 'code': 200}, 'web': {'point': 2, 'code': 200}}
 *  - 重复签到 {'android': {'code': -2, 'msg': '重复签到'}, 'web': {'code': -2, 'msg': '重复签到'}}
 *  - 未登录   {'android': {'code': 301}, 'web': {'code': 301}}
 */
async function checkIn(type = 0, cookie) {
  const data = {
    type
  };

  const url = '/weapi/point/dailyTask';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相关的动态
 *
 * @param {object} cookie
 * @returns
 */
async function fetchEvents(cookie) {
  const data = {};

  const url = '/weapi/v1/event/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得收藏计数
 *
 * @param {object} cookie
 * @returns
 */
async function fetchSubCount(cookie) {
  const data = {};

  const url = '/weapi/subcount';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 编辑个人信息
 *
 * @param {object} [profile={}] 个人信息
 * @param {object} cookie
 * @returns
 */
async function update(profile = {}, cookie) {
  const data = {
    avatarImgId: '0'
  };

  const nickname = profile.nickname;
  const gender = profile.gender;
  const birthday = profile.birthday;
  const province = profile.province;
  const city = profile.city;
  const signature = profile.signature;

  if (!nickname) {
    data.nickname = nickname;
  }

  if (!gender) {
    data.gender = gender;
  }

  if (!birthday) {
    data.birthday = birthday;
  }

  if (!province) {
    data.province = province;
  }

  if (!city) {
    data.city = city;
  }

  if (!signature) {
    data.signature = signature;
  }

  const url = '/weapi/user/profile/update';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取推荐关注的用户列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchRecommendFollows(cookie) {
  const data = {};

  const url = '/weapi/user/follow/recommend';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  loginByCellphone,
  loginByEmail,
  logout,
  refreshLoginToken,
  checkIn,
  fetchEvents,
  fetchLoginStatus,
  fetchSubCount,
  update,
  fetchRecommendFollows
};
