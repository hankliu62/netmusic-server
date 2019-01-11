const request = require('../utils/request');
const Boom = require('boom');

const codes = require('../constants/code');

const CategoriesMap = {
  '01': '全部',
  '02': '华语',
  '03': '欧美',
  '04': '韩语',
  '05': '日语',
  '06': '粤语',
  '07': '小语种',
  '08': '运动',
  '09': 'ACG',
  '10': '影视原声',
  '11': '流行',
  '12': '摇滚',
  '13': '后摇',
  '14': '古风',
  '15': '民谣',
  '16': '轻音乐',
  '17': '电子',
  '18': '器乐',
  '19': '说唱',
  '20': '古典',
  '21': '爵士'
};

/**
 * 获取私人推荐的DJ列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchPersonalizedList(cookie) {
  const data = {};

  const url = '/weapi/personalized/playlist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌单分类列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchCategories(cookie) {
  const data = {};

  const url = '/weapi/playlist/catalogue';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 创建歌单
 *
 * @param {string} name 歌单名称
 * @param {object} cookie
 * @returns
 */
async function create(name, cookie) {
  const data = {
    name
  };

  const url = '/weapi/playlist/create';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取歌单详情
 *
 * @param {number} id 歌单 id
 * @param {number} [s=8]
 * @param {object} cookie
 * @returns
 */
async function fetchOne(id, s = 8, cookie) {
  const data = {
    id,
    n: 100000,
    s
  };

  const url = '/weapi/v3/playlist/detail';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取热门歌单分类
 *
 * @param {object} cookie
 * @returns
 */
async function fetchHotTags(cookie) {
  const data = {};

  const url = '/weapi/playlist/hottags';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 收藏某歌单
 *
 * @param {string} id MV id
 * @param {object} cookie
 * @returns
 */
async function subscribe(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/playlist/subscribe';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 取消收藏某歌单
 *
 * @param {string} id MV id
 * @param {object} cookie
 * @returns
 */
async function unsubscribe(id, cookie) {
  const data = {
    id
  };

  const url = '/weapi/playlist/unsubscribe';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 收藏歌曲到歌单
 *
 * @param {number} id 歌单 id
 * @param {array} [songIds=[]] 歌曲 ids
 * @param {object} cookie
 * @returns
 */
async function addSongs(id, songIds = [], cookie) {
  const data = {
    op: 'add', // del,add
    pid: id, // 歌单id
    trackIds: '[' + songIds.join(', ') + ']' // 歌曲id
  };

  const url = '/weapi/playlist/manipulate/tracks';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 从歌单里移除歌曲
 *
 * @param {number} id 歌单 id
 * @param {array} [songIds=[]] 歌曲 ids
 * @param {object} cookie
 * @returns
 */
async function removeSongs(id, songIds = [], cookie) {
  const data = {
    op: 'del',
    pid: id, // 歌单id
    trackIds: '[' + songIds.join(', ') + ']' // 歌曲id
  };

  const url = '/weapi/playlist/manipulate/tracks';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 编辑歌单
 *
 * @param {number} id 歌单 id
 * @param {string} name 歌单名称
 * @param {string} [tags=''] 歌单标签
 * @param {string} [desc=''] 歌单描述
 * @param {object} cookie
 * @returns
 */
async function update(id, name, tags = '', desc = '', cookie) {
  const data = {
    '/api/playlist/update/name': `{"id":${id},"name":"${name}"}`,
    '/api/playlist/desc/update': `{"id":${id},"desc":"${desc}"}`,
    '/api/playlist/tags/update': `{"id":${id},"tags":"${tags}"}`
  };

  const url = '/weapi/batch';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取每日推荐歌单列表
 *
 * @param {object} cookie
 * @returns
 */
async function fetchDailyRecommendList(cookie) {
  const data = {};

  const url = '/weapi/v1/discovery/recommend/resource';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相关歌单列表
 *
 * @param {string} id 视频 id
 * @param {object} cookie
 * @returns
 */
async function fetchRelatedList(id, cookie) {
  const data = {};

  const url = `/playlist?id=${id}`;

  const options = { userAgent: 'pc', cookie };

  const response = await request.get(url, data, options);

  try {
    // eslint-disable-next-line
    const pattern = /<div class="cver u-cover u-cover-3">[\s\S]*?<img src="([^"]+)">[\s\S]*?<a class="sname f-fs1 s-fc0" href="([^"]+)"[^>]*>([^<]+?)<\/a>[\s\S]*?<a class="nm nm f-thide s-fc3" href="([^"]+)"[^>]*>([^<]+?)<\/a>/g;
    let result;
    const playlists = [];
    while ((result = pattern.exec(response.data)) !== null) {
      playlists.push({
        creator: {
          userId: result[4].slice('/user/home?id='.length),
          nickname: result[5]
        },
        coverImgUrl: result[1].slice(0, -('?param=50y50'.length)),
        name: result[3],
        id: result[2].slice('/playlist?id='.length)
      });
    }
    return { status: codes.Success, data: { playlists }, cookie: [] };
  } catch (error) {
    throw new Boom(error, {
      statusCode: codes.InternalServer
    });
  }
}

/**
 * 发送歌单私信
 *
 * @param {string} id 歌单 id
 * @param {string} [message=''] 私信内容
 * @param {array} [userIds=[]] 发送用户 ids
 * @param {object} cookie
 * @returns
 */
async function send(id, message = '', userIds = [], cookie) {
  const data = {
    id,
    type: 'playlist',
    msg: message,
    userIds: `[${userIds.join(',')}]`
  };

  const url = '/weapi/msg/private/send';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取相似歌单列表
 *
 * @param {string} id 歌单 id
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

  const url = '/weapi/discovery/simiPlaylist';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取排行榜单
 *
 * @param {string} id 排行榜单 id
 *  - 3779629: 云音乐新歌榜
 *  - 3778678: 云音乐热歌榜
 *  - 2884035: 云音乐原创榜
 *  - 19723756: 云音乐飙升榜
 *  - 10520166: 云音乐电音榜
 *  - 180106: UK排行榜周榜
 *  - 60198: 美国Billboard周榜
 *  - 21845217: KTV嗨榜
 *  - 11641012: iTunes榜
 *  - 120001: Hit FM Top榜
 *  - 60131: 日本Oricon周榜
 *  - 3733003: 韩国Melon排行榜周榜
 *  - 60255: 韩国Mnet排行榜周榜
 *  - 46772709: 韩国Melon原声周榜
 *  - 112504: 中国TOP排行榜(港台榜)
 *  - 64016: 中国TOP排行榜(内地榜)
 *  - 10169002: 香港电台中文歌曲龙虎榜
 *  - 4395559: 华语金曲榜
 *  - 1899724: 中国嘻哈榜
 *  - 27135204: 法国 NRJ EuroHot 30周榜
 *  - 112463: 台湾Hito排行榜
 *  - 3812895: Beatport全球电子舞曲榜
 *  - 71385702: 云音乐ACG音乐榜
 *  - 991319590: 云音乐嘻哈榜
 * @param {object} cookie
 * @returns
 */
async function fetchTop(id = '3779629', cookie) {
  const data = {
    id,
    n: 10000
  };

  const url = '/weapi/v3/playlist/detail';

  const options = { crypto: 'linux', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取精品歌单列表
 *
 * @param {string} [category='01'] 歌单类型
 *  - 01: 全部
 *  - 02: 华语
 *  - 03: 欧美
 *  - 04: 韩语
 *  - 05: 日语
 *  - 06: 粤语
 *  - 07: 小语种
 *  - 08: 运动
 *  - 09: ACG
 *  - 10: 影视原声
 *  - 11: 流行
 *  - 12: 摇滚
 *  - 13: 后摇
 *  - 14: 古风
 *  - 15: 民谣
 *  - 16: 轻音乐
 *  - 17: 电子
 *  - 18: 器乐
 *  - 19: 说唱
 *  - 20: 古典
 *  - 21: 爵士
 * @param {number} [lastTime=0] 歌单 updateTime
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchHighQualityList(category = '01', lastTime = 0, pageSize = 20, cookie) {
  const data = {
    cat: CategoriesMap[category] || '全部',
    before: lastTime,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/playlist/highquality/list';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取热门歌单列表
 *
 * @param {string} [category='01'] 歌单类型
 *  - 01: 全部
 *  - 02: 华语
 *  - 03: 欧美
 *  - 04: 韩语
 *  - 05: 日语
 *  - 06: 粤语
 *  - 07: 小语种
 *  - 08: 运动
 *  - 09: ACG
 *  - 10: 影视原声
 *  - 11: 流行
 *  - 12: 摇滚
 *  - 13: 后摇
 *  - 14: 古风
 *  - 15: 民谣
 *  - 16: 轻音乐
 *  - 17: 电子
 *  - 18: 器乐
 *  - 19: 说唱
 *  - 20: 古典
 *  - 21: 爵士
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchHotList(category = '01', pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    cat: CategoriesMap[category] || '全部',
    order: 'hot',
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/playlist/list';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取新品歌单列表
 *
 * @param {string} [category='01'] 歌单类型
 *  - 01: 全部
 *  - 02: 华语
 *  - 03: 欧美
 *  - 04: 韩语
 *  - 05: 日语
 *  - 06: 粤语
 *  - 07: 小语种
 *  - 08: 运动
 *  - 09: ACG
 *  - 10: 影视原声
 *  - 11: 流行
 *  - 12: 摇滚
 *  - 13: 后摇
 *  - 14: 古风
 *  - 15: 民谣
 *  - 16: 轻音乐
 *  - 17: 电子
 *  - 18: 器乐
 *  - 19: 说唱
 *  - 20: 古典
 *  - 21: 爵士
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchNewList(category = '01', pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    cat: CategoriesMap[category] || '全部',
    order: 'new',
    offset: (pageIndex || 1) - 1,
    limit: pageSize,
    total: true
  };

  const url = '/weapi/playlist/list';

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchPersonalizedList,
  fetchCategories,
  create,
  fetchOne,
  fetchHotTags,
  subscribe,
  unsubscribe,
  addSongs,
  removeSongs,
  update,
  fetchDailyRecommendList,
  fetchRelatedList,
  send,
  fetchSimilarityList,
  fetchTop,
  fetchHighQualityList,
  fetchHotList,
  fetchNewList
};
