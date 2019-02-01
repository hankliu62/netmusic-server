const request = require('../utils/request');

/**
 * 获取热门搜索
 *
 * @param {object} cookie
 * @returns
 */
async function fetchHotList(cookie) {
  const data = {
    type: 1111
  };

  const url = '/weapi/search/hot';

  const options = { userAgent: 'mobile', crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 多类型搜索
 *
 * @param {number} [type=1] 搜索的类型
 *  - 1: 单曲
 *  - 10: 专辑
 *  - 100: 歌手
 *  - 1000: 歌单
 *  - 1002: 用户
 *  - 1004: MV
 *  - 1006: 歌词
 *  - 1009: 主播电台
 *  - 1014: 视频
 * @param {string} [keywords=''] 关键字
 * @param {object} cookie
 * @returns
 */
async function multiMatch(type = 1, keywords = '', cookie) {
  const data = {
    type: type,
    s: keywords
  };

  const url = '/weapi/search/suggest/multimatch';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 云盘搜索
 *
 * @param {number} [type=1] 搜索的类型
 *  - 1: 单曲
 *  - 10: 专辑
 *  - 100: 歌手
 *  - 1000: 歌单
 *  - 1002: 用户
 *  - 1004: MV
 *  - 1006: 歌词
 *  - 1009: 主播电台
 *  - 1014: 视频
 * @param {string} [keywords=''] 关键字
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function cloud(type = 1, keywords = '', pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    type: type,
    s: keywords,
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/cloudsearch/get/web';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 搜索建议
 *
 * @param {string} [keywords=''] 关键字
 * @param {object} cookie
 * @returns
 */
async function fetchSuggest(keywords = '', cookie) {
  const data = {
    s: keywords
  };

  const url = '/weapi/search/suggest/web';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 搜索
 *
 * @param {number} [type=1] 搜索的类型
 *  - 1: 单曲
 *  - 10: 专辑
 *  - 100: 歌手
 *  - 1000: 歌单
 *  - 1002: 用户
 *  - 1004: MV
 *  - 1006: 歌词
 *  - 1009: 主播电台
 *  - 1014: 视频
 * @param {string} [keywords=''] 关键字
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchList(type = 1, keywords = '', pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    type: type,
    s: keywords,
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/search/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchHotList,
  multiMatch,
  fetchSuggest,
  fetchList,
  cloud
};
