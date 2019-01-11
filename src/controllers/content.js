const request = require('../utils/request');

/**
 * 获取私人推荐的独家放送列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchPersonalizedList(cookie) {
  const data = {};

  const url = '/weapi/personalized/privatecontent';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchPersonalizedList
};
