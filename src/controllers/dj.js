const request = require('../utils/request');
const constants = require('../constants');

/**
 * 获取电台分类列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchCategories(cookie) {
  const data = {};

  const url = '/weapi/djradio/category/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取电台详情
 *
 * @param {number} id 电台 id
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/djradio/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取热门电台列表
 *
 * @param {string} type 电台类型
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchHotList(type, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    cat: type,
    cateId: type,
    type: type,
    categoryId: type,
    category: type,
    limit: (pageIndex || 1) - 1,
    offset: pageSize
  };

  const url = '/weapi/djradio/hot/v1';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取付费电台列表
 *
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=10]
 * @param {object} cookie
 * @returns
 */
async function fetchPayGiftList(pageIndex = 1, pageSize = 10, cookie) {
  const data = {
    limit: (pageIndex || 1) - 1,
    offset: pageSize
  };

  const url = '/weapi/djradio/home/paygift/list?_nmclfl=1';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取电台的节目详情
 *
 * @param {number} id 电台 id
 * @param {object} cookie
 * @returns
 */
async function fetchProgram(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/dj/program/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取电台节目列表
 *
 * @param {number} id 电台 id
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {boolean} [asc=false] 是否升序
 * @param {object} cookie
 * @returns
 */
async function fetchPrograms(id, pageIndex = 1, pageSize = 20, asc = false, cookie) {
  const data = {
    radioId: id,
    limit: (pageIndex || 1) - 1,
    offset: pageSize,
    asc
  };

  const url = '/weapi/dj/program/byradio';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取精选电台分类下的所有电台
 *
 * @param {number} categoryId 分类 id
 *  - 1: 明星做主播
 *  - 2: 音乐故事
 *  - 3: 情感调频
 *  - 4: 娱乐|影视
 *  - 5: 脱口秀
 *  - 6: 美文读物
 *  - 7: 广播剧
 *  - 8: 相声曲艺
 *  - 11: 人文历史
 *  - 12: 旅途|城市
 *  - 13: 外语世界
 *  - 14: 亲子宝贝
 *  - 2001: 创作|翻唱
 *  - 3001: 二次元
 *  - 4001: 校园|教育
 *  - 10001: 有声书
 *  - 10002: 3D|电子
 *  - 453050: 知识技能
 *  - 453051: 商业财经
 *  - 453052: 科技科学
 * @param {object} cookie
 * @returns
 */
async function fetchCategoryRecommendList(categoryId, cookie) {
  const data = {
    cateId: categoryId
  };

  const url = '/weapi/djradio/recommend';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取推荐的精选电台
 *
 * @param {object} cookie
 * @returns
 */
async function fetchRecommendList(cookie) {
  const data = {};

  const url = '/weapi/djradio/recommend/v1';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 收藏某电台
 *
 * @param {string} id 电台 id
 * @param {object} cookie
 * @returns
 */
async function subscribe(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/djradio/sub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消收藏某电台
 *
 * @param {string} id 电台 id
 * @param {object} cookie
 * @returns
 */
async function unsubscribe(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/djradio/unsub';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取收藏的电台列表
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

  const url = '/weapi/djradio/get/subed';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取私人FM
 *
 * @param {object} cookie
 * @returns
 */
async function fetchPersonalList(cookie) {
  const data = {};

  const url = '/weapi/v1/radio/get';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取私人推荐的DJ列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchPersonalizedList(cookie) {
  const data = {};

  const url = '/weapi/personalized/djprogram';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 点赞电台
 *
 * @param {number} id 电台 id
 * @param {object} cookie
 * @returns
 */
async function like(id, cookie) {
  const type = constants.ResourceTypePrefix.DJ;
  const data = {
    threadId: type + id
  };

  const url = '/weapi/resource/like';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消点赞电台
 *
 * @param {number} id 电台 id
 * @param {object} cookie
 * @returns
 */
async function unlike(id, cookie) {
  const type = constants.ResourceTypePrefix.DJ;
  const data = {
    threadId: type + id
  };

  const url = '/weapi/resource/unlike';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchCategories,
  fetchOne,
  fetchHotList,
  fetchPayGiftList,
  fetchProgram,
  fetchPrograms,
  fetchCategoryRecommendList,
  fetchRecommendList,
  subscribe,
  unsubscribe,
  fetchSubscribedList,
  fetchPersonalList,
  fetchPersonalizedList,
  like,
  unlike
};
