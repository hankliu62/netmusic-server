const MusicApiProtocol = 'https';
const MusicApiDomain = 'music.163.com';
const MusicApiHost = `${MusicApiProtocol}://${MusicApiDomain}`;

const RegExps = {
  Phone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  Email: /\b[\w.-]+@[\w.-]+.\w{2,4}\b/gi
};

const ResourceTypePrefix = {
  Album: 'R_AL_3_', // 专辑
  DJ: 'A_DJ_1_', // 电台
  Song: 'R_SO_4_', // 歌曲
  MV: 'R_MV_5_', // MV
  PlayList: 'A_PL_0_', // 歌单
  Video: 'R_VI_62_' // 视频
};

module.exports = {
  MusicApiProtocol,
  MusicApiDomain,
  MusicApiHost,
  RegExps,
  ResourceTypePrefix
};
