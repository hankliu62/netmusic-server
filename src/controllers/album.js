const request = require('../utils/request');

/**
 * 获取专辑列表
 *
 * @param {string} id 专辑 id
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {};

  const url = `/weapi/v1/album/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取最新专辑列表
 *
 * @param {string} [type='ALL'] 专辑类型
 *  - ALL 所有
 *  - ZH 中国
 *  - EA 欧美
 *  - KR 韩国
 *  - JP 日本
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchNewList(type = 'ALL', pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    area: type,
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/album/new';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchOne,
  fetchNewList
};
