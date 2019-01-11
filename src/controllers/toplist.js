const request = require('../utils/request');

/**
 * 获得所有详细介绍的榜单列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchDetailList(cookie) {
  const data = {};

  const url = '/weapi/toplist/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得所有简单介绍的榜单列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchBriefList(cookie) {
  const data = {};

  const url = '/weapi/toplist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchDetailList,
  fetchBriefList
};
