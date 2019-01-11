const request = require('../utils/request');
const codes = require('../constants/code');

/**
 * 获取歌手列表
 *
 * @param {string} [categoryCode='1001']
 *  入驻歌手 5001
 *  华语男歌手 1001
 *  华语女歌手 1002
 *  华语组合/乐队 1003
 *  欧美男歌手 2001
 *  欧美女歌手 2002
 *  欧美组合/乐队 2003
 *  日本男歌手 6001
 *  日本女歌手 6002
 *  日本组合/乐队 6003
 *  韩国男歌手 7001
 *  韩国女歌手 7002
 *  韩国组合/乐队 7003
 *  其他男歌手 4001
 *  其他女歌手 4002
 *  其他组合/乐队 4003
 * @param {string} [initial=''] 取值 a-z/A-Z
 * @param {number} [pageIndex=1] 分页开始位置
 * @param {number} [pageSize=20] 分页每页大小
 * @param {object} cookie
 * @returns
 */
async function fetchList(categoryCode = '1001', initial = '', pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    categoryCode,
    initial: initial.toUpperCase().charCodeAt() || '',
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/artist/list';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌手简介
 *
 * @param {number} id
 * @param {object} cookie
 * @returns
 */
async function fetchIntro(id, cookie) {
  const data = { id };

  const url = '/weapi/artist/introduction';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌手详情及热门歌曲
 *
 * @param {number} id
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {};

  const url = `/weapi/v1/artist/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌手的专辑列表
 *
 * @param {string} id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchAlbums(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = `/weapi/artist/albums/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌手的MV列表
 *
 * @param {string} id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchMvs(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    artistId: id,
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/artist/mvs';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 收藏某歌手
 *
 * @param {string} id
 * @param {object} cookie
 * @returns
 */
async function subscribe(id, cookie) {
  const data = {
    artistId: id,
    artistIds: `[${id}]`
  };

  const url = '/weapi/artist/sub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消收藏某歌手
 *
 * @param {string} id
 * @param {object} cookie
 * @returns
 */
async function unsubscribe(id, cookie) {
  const data = {
    artistId: id,
    artistIds: `[${id}]`
  };

  const url = '/weapi/artist/unsub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取收藏的歌手列表
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchSubscribedList(pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/artist/sublist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相似歌手列表
 *
 * @param {string} id 歌手 id
 * @param {object} cookie
 * @returns
 */
async function fetchSimilarityList(id, cookie) {
  const data = {
    artistid: id
  };

  const url = '/weapi/discovery/simiArtist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取热门歌手列表
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchHotList(pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/artist/top';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌手榜
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchToplistList(pageIndex = 1, pageSize = 100, cookie) {
  const data = {
    type: 1,
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/toplist/artist';

  const options = { crypto: 'we', cookie };

  const response = await request.post(url, data, options);
  if (response.status === codes.Success) {
    response.data = { ...(response.data.list || {}) };
  }

  return response;
}

module.exports = {
  fetchList,
  fetchOne,
  fetchIntro,
  fetchAlbums,
  fetchMvs,
  subscribe,
  unsubscribe,
  fetchSubscribedList,
  fetchSimilarityList,
  fetchHotList,
  fetchToplistList
};
