const request = require('../utils/request');

/**
 * 获取首页横幅轮播图
 *
 * @returns
 */
async function fetchList() {
  const data = {
    clientType: 'pc'
  };

  return await request.post('/api/v2/banner/get', data, { crypto: 'linux' });
}

module.exports = {
  fetchList
};
