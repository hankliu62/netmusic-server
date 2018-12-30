const crypto = require('crypto');

const request = require('../utils/request');

const loginByCellphone = async(phone, password) => {
  const data = {
    phone: phone,
    password: crypto.createHash('md5').update(password).digest('hex'),
    rememberLogin: 'true'
  };

  // return request(
  //   'POST', `https://music.163.com/weapi/login/cellphone`, data,
  //   {crypto: 'weapi', ua: 'pc', cookie: query.cookie, proxy: query.proxy}
  // )
  return await request.post('/weapi/login/cellphone', data, { crypto: 'we', userAgent: 'pc' });
};

module.exports = {
  loginByCellphone
};
