const MusicApiProtocol = 'https';
const MusicApiDomain = 'music.163.com';
const MusicApiHost = `${MusicApiProtocol}://${MusicApiDomain}`;

const RegExps = {
  Phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
};

module.exports = {
  MusicApiProtocol,
  MusicApiDomain,
  MusicApiHost,
  RegExps
};
