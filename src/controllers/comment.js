const request = require('../utils/request');

/**
 * 获取专辑/电台/歌曲/MV/歌单/视频的评论
 *
 * @param {number} id 专辑/电台/歌曲/MV/歌单/视频 Id
 * @param {string} type 专辑/电台/歌曲/MV/歌单/视频对应的类型
 *   - R_AL_3_: 专辑
 *   - A_DJ_1_: 电台
 *   - R_SO_4_: 歌曲
 *   - R_MV_5_: MV
 *   - A_PL_0_: 歌单
 *   - R_VI_62_: 视频
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchList(id, type, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    rid: id,
    limit: pageSize,
    offset: (pageIndex || 1) - 1
  };

  const url = `/weapi/v1/resource/comments/${type}${id}`;

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 获取专辑/电台/歌曲/MV/歌单/视频的热门评论
 *
 * @param {number} id 专辑/电台/歌曲/MV/歌单/视频 Id
 * @param {string} type 专辑/电台/歌曲/MV/歌单/视频对应的类型
 *   - R_AL_3_: 专辑
 *   - A_DJ_1_: 电台
 *   - R_SO_4_: 歌曲
 *   - R_MV_5_: MV
 *   - A_PL_0_: 歌单
 *   - R_VI_62_: 视频
 * @param {number} [pageIndex=1]
 * @param {number} [pageSize=20]
 * @param {object} cookie
 * @returns
 */
async function fetchHotList(id, type, pageIndex = 1, pageSize = 20, cookie) {
  const data = {
    rid: id,
    limit: pageSize,
    offset: (pageIndex || 1) - 1
  };

  const url = `/weapi/v1/resource/hotcomments/${type}${id}`;

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 点赞专辑/电台/歌曲/MV/歌单/视频的某条评论
 *
 * @param {number} id 专辑/电台/歌曲/MV/歌单/视频 Id
 * @param {string} type 专辑/电台/歌曲/MV/歌单/视频对应的类型
 *   - R_AL_3_: 专辑
 *   - A_DJ_1_: 电台
 *   - R_SO_4_: 歌曲
 *   - R_MV_5_: MV
 *   - A_PL_0_: 歌单
 *   - R_VI_62_: 视频
 * @param {number} commentId 评论 Id
 * @param {object} cookie
 * @returns
 */
async function like(id, type, commentId, cookie) {
  const data = {
    threadId: type + id,
    commentId
  };

  const url = '/weapi/v1/comment/like';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 点赞专辑/电台/歌曲/MV/歌单/视频的某条评论
 *
 * @param {number} id 专辑/电台/歌曲/MV/歌单/视频 Id
 * @param {string} type 专辑/电台/歌曲/MV/歌单/视频对应的类型
 *   - R_AL_3_: 专辑
 *   - A_DJ_1_: 电台
 *   - R_SO_4_: 歌曲
 *   - R_MV_5_: MV
 *   - A_PL_0_: 歌单
 *   - R_VI_62_: 视频
 * @param {number} commentId 评论 Id
 * @param {object} cookie
 * @returns
 */
async function unlike(id, type, commentId, cookie) {
  const data = {
    threadId: type + id,
    commentId
  };

  const url = '/weapi/v1/comment/unlike';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 新增专辑/电台/歌曲/MV/歌单/视频的评论
 *
 * @param {number} id 专辑/电台/歌曲/MV/歌单/视频 Id
 * @param {string} type 专辑/电台/歌曲/MV/歌单/视频对应的类型
 *   - R_AL_3_: 专辑
 *   - A_DJ_1_: 电台
 *   - R_SO_4_: 歌曲
 *   - R_MV_5_: MV
 *   - A_PL_0_: 歌单
 *   - R_VI_62_: 视频
 * @param {string} content 评论内容
 * @param {object} cookie
 * @returns
 */
async function create(id, type, content, cookie) {
  const data = {
    threadId: type + id,
    content
  };

  const url = '/weapi/resource/comments/add';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

/**
 * 删除专辑/电台/歌曲/MV/歌单/视频的某条评论
 *
 * @param {number} id 专辑/电台/歌曲/MV/歌单/视频 Id
 * @param {string} type 专辑/电台/歌曲/MV/歌单/视频对应的类型
 *   - R_AL_3_: 专辑
 *   - A_DJ_1_: 电台
 *   - R_SO_4_: 歌曲
 *   - R_MV_5_: MV
 *   - A_PL_0_: 歌单
 *   - R_VI_62_: 视频
 * @param {number} commentId 评论 Id
 * @param {object} cookie
 * @returns
 */
async function deleteComment(id, type, commentId, cookie) {
  const data = {
    threadId: type + id,
    commentId
  };

  const url = '/weapi/resource/comments/delete';

  if (cookie) {
    cookie.os = 'pc';
  }

  const options = { crypto: 'we', cookie };

  return await request.post(url, data, options);
}

module.exports = {
  fetchList,
  fetchHotList,
  like,
  unlike,
  create,
  delete: deleteComment
};
