const request = require('../utils/request');

/**
 * 获取推荐节目列表
 *
 * @param {string} type 节目类型
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchRecommendList(type, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    cateId: type,
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/program/recommend/v1';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchRecommendList
};
