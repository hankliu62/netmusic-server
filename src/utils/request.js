const axios = require('axios');
const querystring = require('querystring');
const Boom = require('boom');

const constants = require('../constants');
const errors = require('../constants/error');
const codes = require('../constants/code');
const encrypt = require('./encrypt');
const logger = require('./logger');

const generateUserAgent = (userAgent) => {
  const userAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
    'Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586'
  ];
  let index = 0;
  switch (userAgent) {
    case undefined: {
      index = Math.floor(Math.random() * userAgents.length);
      break;
    }
    case 'mobile': {
      index = Math.floor(Math.random() * 7);
      break;
    }
    case 'pc': {
      index = Math.floor(Math.random() * 5) + 8;
      break;
    }
    default:
      return userAgent;
  }

  return userAgents[index];
};

axios.interceptors.request.use((config) => {
  const headers = {
    'User-Agent': generateUserAgent(config.userAgent)
  };
  delete config.userAgent;

  const { url } = config;
  if (!/^https?:?\/\//.test(url)) {
    config.url = `${constants.MusicApiHost}${url}`;
  }

  if (config.url.includes(constants.MusicApiDomain)) {
    headers['Referer'] = constants.MusicApiHost;
  }

  if (config.method.toUpperCase() === 'POST') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (config.cookie) {
    let cookie;
    if (typeof config.cookie === 'object') {
      cookie = Object.keys(config.cookie).map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(config.cookie[key])}`
      ).join('; ');
    } else {
      cookie = config.cookie;
    }

    headers['Cookie'] = cookie;
    delete config.cookie;
  }
  if (config.crypto === 'linux') {
    config.data = config.data || {};
    config.data = encrypt.linux({
      method: config.method,
      url: config.url.replace(/\w*api/, 'api'),
      params: config.data
    });
    headers['User-Agent'] =
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36';
    config.url = `${constants.MusicApiHost}/api/linux/forward`;
    delete config.crypto;
  } else if (config.crypto === 'we') {
    const csrfToken = (headers['Cookie'] || '').match(/_csrf=([^(;|$)]+)/);
    config.data = config.data || {};
    config.data.csrf_token = csrfToken ? csrfToken[1] : '';
    config.data = encrypt.we(config.data);
    config.url = config.url.replace(/\w*api/, 'weapi');
    delete config.crypto;
  }

  if (config.data) {
    config.data = querystring.stringify(config.data);
  }

  config.headers = {...(config.headers || {}), ...headers};

  return config;
}, (error) => Promise.reject(error));
axios.interceptors.response.use((response) => {
  // 记录日志
  logger.apiInfo(response);
  const result = {};
  result.cookie = (response.headers['set-cookie'] || []).map(
    (x) => x.replace(/\s*Domain=[^(;|$)]+;*/, '')
  );

  result.data = response.data;

  result.status = response.data.code || response.status;
  result.status = result.status > 100 && result.status < 600 ? result.status : codes.InternalServer;

  if (result.status === codes.Success) {
    return Promise.resolve(result);
  }
  throw new Boom(new Error(response.data.msg || errors.Messages.InternalServer), {
    statusCode: 1000 + parseInt(result.status, 10)
  });
}, (err) => {
  // 记录日志
  logger.apiInfo(err);
  throw new Boom(err, {
    statusCode: 1000 + codes.InternalServer
  });
});

module.exports = {
  post(url, data, options = {}) {
    return axios({
      method: 'post',
      url,
      data,
      ...options
    });
  },
  put(url, data, options = {}) {
    return axios({
      method: 'put',
      url,
      data,
      ...options
    });
  },
  get(url, params, options = {}) {
    return axios({
      method: 'get',
      url,
      params,
      ...options
    });
  },
  delete(url, params, options = {}) {
    return axios({
      method: 'delete',
      url,
      params,
      ...options
    });
  }
};
