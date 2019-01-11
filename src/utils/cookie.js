const parser = (request) => {
  const cookie = {};
  for (const pair of (request.headers.cookie || '').split(/\s*;\s*/)) {
    const crack = pair.indexOf('=');
    if (crack < 1 || crack === pair.length - 1) {
      continue;
    }

    cookie[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim();
  }

  return cookie;
};

module.exports = {
  parser
};
