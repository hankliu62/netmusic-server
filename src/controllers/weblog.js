const request = require('../utils/request');

/**
 * 获取操作记录
 *
 * @param {object} cookie
 * @returns
 */
async function fetchList(cookie) {
  const data = {};

  const url = '/weapi/feedback/weblog';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchList
};
