const request = require('../utils/request');

/**
 * 发送私信
 *
 * @param {string} [message=''] 私信内容
 * @param {array} [userIds=[]] 发送用户 ids
 * @param {object} cookie
 * @returns
 */
async function send(message = '', userIds = [], cookie) {
  const data = {
    type: 'text',
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

module.exports = {
  send
};
