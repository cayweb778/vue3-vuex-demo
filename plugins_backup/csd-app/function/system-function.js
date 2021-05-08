/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
import $ from '../../boozjs-jquery/boozjs-jquery';
/**
 * 检查产品到期
 * @returns {boolean}
 */
export async function queryProductEndExpired({date}) {
  let productEndExpired = false;
  $.ajax({
    type: 'get',
    url: urlPath + '/system!checkAuthorDate',
    async: false,
    success: function(res) {
      if (date > res.msg) {
        productEndExpired = true;
      }
    },
    error: function(error, a, b) {
    }
  });
  if (productEndExpired) {
    layer.alert('选定日期授权失效,请检查注册日期');
  }
  return productEndExpired;
}
