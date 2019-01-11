const request = require('../utils/request');

/**
 * 关注用户
 *
 * @param {number} id 用户 id
 * @param {object} cookie
 * @returns
 */
async function follow(id, cookie) {
  const data = {};

  const url = `/weapi/user/follow/${id}`;

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消关注用户
 *
 * @param {number} id 用户 id
 * @param {object} cookie
 * @returns
 */
async function unfollow(id, cookie) {
  const data = {};

  const url = `/weapi/user/delfollow/${id}`;

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相似用户列表
 *
 * @param {string} id 用户 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchSimilarityList(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    songid: id, // TODO: 确认是否为 songid
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/discovery/simiUser';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得用户创建的电台列表
 *
 * @param {string} id 用户 id
 * @param {object} cookie
 * @returns
 */
async function fetchAudios(id, cookie) {
  const data = {
    userId: id
  };

  const url = '/weapi/djradio/get/byuser';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取云盘数据详情(暂时不要使用)
 *
 * @param {string} id 用户 id
 * @param {object} cookie
 * @returns
 */
async function fetchCloud(id, cookie) {
  const data = {
    byids: id,
    id: id
  };

  const url = '/weapi/v1/cloud/get/byids';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取云盘数据
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=200]
 * @param {object} cookie
 * @returns
 */
async function fetchClouds(pageIndex = 1, pageSize = 200, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/v1/cloud/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取用户详情
 *
 * @param {string} id 用户 id
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {};

  const url = `/weapi/v1/user/detail/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得用户的电台节目列表
 *
 * @param {string} id 用户 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=200]
 * @param {object} cookie
 * @returns
 */
async function fetchDjs(id, pageIndex = 1, pageSize = 200, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = `/weapi/dj/program/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取用户动态
 *
 * @param {string} id 用户 id
 * @param {object} cookie
 * @returns
 */
async function fetchEvents(id, cookie) {
  const data = {
    time: -1,
    getcounts: true
  };

  const url = `/weapi/event/get/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得用户关注列表
 *
 * @param {string} id 用户 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchFollows(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    userId: id,
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/user/getfolloweds';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得用户粉丝列表
 *
 * @param {string} id 用户 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchFans(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = `/weapi/user/getfollows/${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得用户歌单列表
 *
 * @param {string} id 用户 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchPlaylists(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    uid: id,
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/user/playlist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获得用户听歌排行榜
 *
 * @param {string} id 用户 id
 * @param {number} type 排行榜类型
 *  - 1: 最近一周
 *  - 0: 所有时间
 * @param {object} cookie
 * @returns
 */
async function fetchPlayRecord(id, type = 1, cookie) {
  const data = {
    uid: id,
    type
  };

  const url = '/weapi/v1/play/record';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  follow,
  unfollow,
  fetchSimilarityList,
  fetchAudios,
  fetchCloud,
  fetchClouds,
  fetchOne,
  fetchDjs,
  fetchEvents,
  fetchFollows,
  fetchFans,
  fetchPlaylists,
  fetchPlayRecord
};
