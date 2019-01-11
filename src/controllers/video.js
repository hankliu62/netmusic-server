const request = require('../utils/request');
const constants = require('../constants');

/**
 * 获取相关视频列表
 *
 * @param {string} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function fetchRelatedList(id, cookie) {
  const data = {
    id: id,
    type: (/^\d+$/.test(id)) ? 0 : 1
  };

  const url = '/weapi/cloudvideo/v1/allvideo/rcmd';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 点赞视频
 *
 * @param {number} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function like(id, cookie) {
  const type = constants.ResourceTypePrefix.Video;
  const data = {
    threadId: type + id
  };

  const url = '/weapi/resource/like';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消点赞视频
 *
 * @param {number} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function unlike(id, cookie) {
  const type = constants.ResourceTypePrefix.Video;
  const data = {
    threadId: type + id
  };

  const url = '/weapi/resource/unlike';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取视频详情
 *
 * @param {string} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/cloudvideo/v1/video/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 收藏某视频
 *
 * @param {string} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function subscribe(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/cloudvideo/video/sub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消收藏某视频
 *
 * @param {string} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function unsubscribe(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/cloudvideo/video/unsub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取视频链接
 *
 * @param {string} id 视频 id
 * @param {number} [resolution=999000]
 * @param {object} cookie
 * @returns
 */
async function fetchURL(id, resolution = 1080, cookie) {
  const data = {
    ids: `["${id}"]`,
    resolution
  };

  const url = '/weapi/cloudvideo/playurl';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchRelatedList,
  like,
  unlike,
  fetchOne,
  subscribe,
  unsubscribe,
  fetchURL
};
