import {asyncLoad, syncLoad} from './loadxhr';

let config = {
  baseUrl: '../',
  map: {
    text: 'boozjs-load-text/boozjs-load-text'
  }
};

async function resolve(type) {
  const a = {
    text(pathArr, {async}) {
      if (!async) {
        return syncLoad(pathArr);
      }
      return asyncLoad(pathArr);
    }
  };
  return a[type]
}

export function $load(pathArr, json) {
  if (json == null) {
    json = {};
  }
  if (json.async == null) {
    json.async = true;
  }

  const {async} = json;
  return pathArr.map(item => {
    if (item.indexOf('!') == -1) {
      throw new Error('错误类型');
    }
    const type = item.split('!')[0];
    return resolve(type, pathArr, {async});
  });
}

$load.config = function({map, baseUrl}) {

  if (baseUrl != null) {
    config.baseUrl = baseUrl;
  }
  config.map = {
    ...config.map,
    ...map
  };
};

$load.config({
  baseUrl: '../',
  map: {
    text: 'boozjs-load-text/boozjs-load-text'
  }
});


