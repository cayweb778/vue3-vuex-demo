
function httprequest() {
  return {
    get: function(url, fn) {
      // XMLHttpRequest对象用于在后台与服务器交换数据
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
          // 从服务器获得数据
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function(url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, false);
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send(data);
    }
  };
}

async function loadText(contentPath) {
  return await fetch(contentPath)
      .then(async res => await res.text());
}

function useTextLoad(contentPath) {
  return {
    load: async (path) => {
      return await loadText(new URL(path, contentPath).pathname);
    }
  };
}

export {
  useTextLoad
};
