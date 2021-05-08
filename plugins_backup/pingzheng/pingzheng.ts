/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */

/** 凭证 2.0.0 **/
import layer from '../boozjs-layer/layer';
import '../boozjs-elementui/2.x.js';
import {findPingZhengByPingZhengNum, queryVoucherDefaultDateApi} from './api/pingzheng';
import pingzhengHelper from './helper/pingzhengHelper';
const {pingZhengApiDataHelper, pingZhengModelApiHelper, pingZhengModelHelper}=pingzhengHelper
import {baseUrl} from '../csd-app/config';
import './helper/jizhangHelper';

import'./model/data';

import '../pinyin-match/pinyin-match';

import '../boozui/boozui.css'
import '../boozjs-elementui/css/elementui.css'
import '../boozjs-elementui/css/boozelementui.css'




/**
 * 检查产品到期
 * @returns {boolean}
 */
function isProductEndExpired({date}) {
  let productEndExpired = false;
  $.ajax({
    type: 'get',
    url: baseUrl + '/system!checkAuthorDate',
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


export function usePingZhengEditor() {
  return {
    /**
     * 添置凭证页
     * @param el
     * @param pingZhengModel
     * @param success
     * @returns {*}
     */
    useAddEditor:async (data)=>import('./hooks/use_add').then(editor=>editor.default(data)),
    useJustAddEditor:null,
    /**
     * 修改凭证
     */
    useJustEditEditor:null,
    useJustShowEditor:null,


    /**
     * 插入凭证页
     * @param el
     * @param pingZhengModel
     * @param success
     * @returns {*}
     */
    useInsertEditor:null,
    /**
     * 查看凭证页
     * @param el
     * @param pingZhengModel
     * @param success
     * @returns {*}
     */
    useShowEditor: ({el, data, success, closeCallback}) => {
    },
    /**
     * 编辑凭证页
     * @param el
     * @param pingZhengModel
     * @param success
     * @returns {*}
     */
    useEditEditor: ({el, pingZhengModel, success}) => {
    },
    /**
     *  凭证模型 工具
     */
    pingZhengModelHelper,
    /**
     * api工具
     * @param el
     * @param pingZhengModel
     * @param success
     * @returns {*}
     */
    apiHelper() {

      const {castPingZhengModel} = pingZhengModelHelper();
      return {
        queryVoucherDefaultDateApi,
        findPingZhengByPingZhengNum,
        castKuaiJiKeMuFull(code) {
          const path = '测试科目';
          return code + ' ' + path;
        }
      };
    },
    pingZhengApiDataHelper: pingZhengApiDataHelper
  };
}


export default {
  pingZhengModelHelper,
  pingZhengModelApiHelper,
  pingZhengApiDataHelper,
  usePingZhengEditor
}
