const crypto = require('crypto');

const request = require('../utils/request');
/**
 * 判断歌曲是否可用
 *
 * @param {number} id
 * @param {number} br
 * @param {object} cookie
 */
async function checkEnable(id, br, cookie) {
  const data = {
    ids: '[' + parseInt(id, 10) + ']',
    br: parseInt(br || 999000, 10)
  };

  const response = await request.post('/weapi/song/enhance/player/url', data, { crypto: 'we', cookie });
  let playable = false;
  if (response.data.code === 200 && response.data.data[0].code === 200) {
    playable = true;
  }

  if (playable) {
    response.data = { enable: true, message: 'ok' };
  } else {
    response.data = { enable: false, message: '亲爱的，暂无版权' };
  }

  return response;
}

/**
 * 将歌曲拖到垃圾桶
 *
 * @param {number} id 歌曲 id
 * @param {number} [time=25]
 * @param {object} cookie
 * @returns
 */
async function trash(id, time = 25, cookie) {
  const data = {
    songId: id
  };

  const url = `/weapi/radio/trash/add?alg=RT&songId=${id}&time=${time}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 喜欢(红心)某歌曲
 *
 * @param {number} id 歌曲 id
 * @param {number} [time=25]
 * @param {string} [alg='itembased']
 * @param {object} cookie
 * @returns
 */
async function like(id, time = 25, alg = 'itembased', cookie) {
  const data = {
    trackId: id,
    like: true
  };

  const url = `/weapi/radio/like?alg=${alg}&trackId=${id}&like=true&time=${time}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消喜欢(取消红心)某歌曲
 *
 * @param {number} id 歌曲 id
 * @param {number} [time=25]
 * @param {string} [alg='itembased']
 * @param {object} cookie
 * @returns
 */
async function unlike(id, time = 25, alg = 'itembased', cookie) {
  const data = {
    trackId: id,
    like: false
  };

  const url = `/weapi/radio/like?alg=${alg}&trackId=${id}&like=false&time=${time}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取喜欢(红心)歌曲列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchLikedList(cookie) {
  const data = {};

  const url = '/weapi/song/like/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌曲的歌词
 *
 * @param {number} id 歌曲 id
 * @param {object} cookie
 * @returns
 */
async function fetchLyric(id, cookie) {
  const data = {};

  const url = `/weapi/song/lyric?os=osx&id=${id}&lv=-1&kv=-1&tv=-1`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取私人推荐的新歌列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchPersonalizedRecentList(cookie) {
  const data = {};

  const url = '/weapi/personalized/newsong';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取每日推荐歌曲列表
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchDailyRecommendList(pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/v1/discovery/recommend/songs';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相似歌曲列表
 *
 * @param {string} id 歌曲 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchSimilarityList(id, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    songid: id,
    offset: (pageIndex || 1) - 1,
    limit: pageSize
  };

  const url = '/weapi/v1/discovery/simiSong';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌曲详情
 *
 * @param {string} id 歌曲 ids
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {
    c: `[{"id":${id}}]`,
    ids: `[${id}]`
  };

  const url = '/weapi/v3/song/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 根据歌曲ids获取歌曲列表
 *
 * @param {array} ids 歌曲 ids
 * @param {object} cookie
 * @returns
 */
async function fetchListByIds(ids = [], cookie) {
  const idsStr = ids.map(id => (`{"id":${id}}`)).join(',');
  const data = {
    c: `[${idsStr}]`,
    ids: `[${ids.join(',')}]`
  };

  const url = '/weapi/v3/song/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌曲链接
 *
 * @param {string} id 歌曲 id
 * @param {number} [br=999000]
 * @param {object} cookie
 * @returns
 */
async function fetchURL(id, br = 999000, cookie) {
  const data = {
    ids: `[${id}]`,
    br: parseInt(br || 999000, 10)
  };

  const url = '/weapi/song/enhance/player/url';

  if (cookie && !('MUSIC_U' in cookie)) {
    cookie._ntes_nuid = crypto.randomBytes(16).toString('hex');
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取新品歌曲列表
 *
 * @param {number} [type=0] 歌曲类型
 *  - 0: 全部
 *  - 7: 华语
 *  - 8: 日本
 *  - 16: 韩国
 *  - 96: 欧美
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchNewList(type = 0, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    areaId: type, // 全部:0 华语:7 欧美:96 日本:8 韩国:16
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/v1/discovery/new/songs';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  checkEnable,
  trash,
  like,
  unlike,
  fetchLikedList,
  fetchLyric,
  fetchPersonalizedRecentList,
  fetchDailyRecommendList,
  fetchSimilarityList,
  fetchOne,
  fetchListByIds,
  fetchURL,
  fetchNewList
};
