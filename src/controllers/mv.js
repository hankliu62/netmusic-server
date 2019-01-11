const request = require('../utils/request');
const constants = require('../constants');

/**
 * 获取MV详情
 *
 * @param {number} id MV id
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/mv/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取最新的MV列表
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchRecentList(pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    // offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/mv/first';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 收藏某MV
 *
 * @param {string} id MV id
 * @param {object} cookie
 * @returns
 */
async function subscribe(id, cookie) {
  const data = {
    mvId: id,
    mvIds: `[${id}]`
  };

  const url = '/weapi/mv/sub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消收藏某MV
 *
 * @param {string} id MV id
 * @param {object} cookie
 * @returns
 */
async function unsubscribe(id, cookie) {
  const data = {
    mvId: id,
    mvIds: `[${id}]`
  };

  const url = '/weapi/mv/unsub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取 MV 的 URL
 *
 * @param {number} id MV id
 * @param {number} [res=1080]
 * @param {object} cookie
 * @returns
 */
async function fetchURL(id, res = 1080, cookie) {
  const data = {
    id,
    r: res
  };

  const url = '/weapi/song/enhance/play/mv/url';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取私人推荐的MV列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchPersonalizedList(cookie) {
  const data = {};

  const url = '/weapi/personalized/mv';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 点赞MV
 *
 * @param {number} id 歌曲 id
 * @param {object} cookie
 * @returns
 */
async function like(id, cookie) {
  const type = constants.ResourceTypePrefix.MV;
  const data = {
    threadId: type + id
  };

  const url = '/weapi/resource/like';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消点赞MV
 *
 * @param {number} id 歌曲 id
 * @param {object} cookie
 * @returns
 */
async function unlike(id, cookie) {
  const type = constants.ResourceTypePrefix.MV;
  const data = {
    threadId: type + id
  };

  const url = '/weapi/resource/unlike';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相似MV列表
 *
 * @param {string} id MV id
 * @param {object} cookie
 * @returns
 */
async function fetchSimilarityList(id, cookie) {
  const data = {
    mvid: id
  };

  const url = '/weapi/discovery/simiMV';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取热门(榜单)MV列表
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchTopList(pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/mv/toplist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchOne,
  fetchRecentList,
  subscribe,
  unsubscribe,
  fetchURL,
  fetchPersonalizedList,
  like,
  unlike,
  fetchSimilarityList,
  fetchTopList
};
