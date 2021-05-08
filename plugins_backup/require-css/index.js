import {define, require} from '../require/require.js';
if (window.require == null) {
  window.require = require;
  window.boozRquireDefine = define;

}

let aaa=new URL('..', import.meta.url).pathname
require.config({baseUrl: new URL('..', import.meta.url).pathname});
require.config({
  map: {
    '*': {
      'css': 'require-css/require-css'
    }
  }
});


function useCssLoad(contentPath) {
  return {
    loadCss: (arr) => {
      return require(arr.map(item => 'css!' + new URL(item, contentPath).pathname));
    }
  };
}

export {
  useCssLoad
};
