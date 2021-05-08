/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
import Vue from '../../boozjs-vue/2.x.js';
import {queryFuZhuHeSuanApi} from '../api/fu_zhu_he_suan';
import fuZhuHeSuanHelper from '../helper/fu_zhu_he_suan_Helper';
import {createDom} from '../../boozjs-lang/dom';

import pingzhengHelper from '../helper/pingzhengHelper';
import {template as getAddPingZhengEditor} from './use_add_template';


async function createAddPingZhengEditorComponent({el, data, success, closeCallback}) {
  if (closeCallback == null) {
    closeCallback = () => {

      dom.remove();
    };
  }

  return await getAddPingZhengEditor({
    pingZhengModel: data,
    successCallback: (pingZhengModel, apiData, instance, state) => {
      success(pingZhengModel, apiData, instance);
    },
    closeCallback() {
      console.log('关闭了页面');
    }
  });
}


async function dataCastPingZhengModel(data) {
  const {toAddPingZhengModel} = pingzhengHelper.pingZhengModelApiHelper();
  let i = 0;
  data.rows = pingzhengHelper.cast4Row(data.rows);
  const addPingZhengModel = await toAddPingZhengModel(data);
  // 检查辅助核算
  addPingZhengModel.rows.forEach((row) => {
    if (row.kuaiJiKeMuCode == null || row.kuaiJiKeMuCode === 0) {
      alert('会计科目错误');
    }
    if (row.kuaiJiKeMuCode == '') {
      return row;
    }
    queryFuZhuHeSuanApi({
      'iyear': data.props.date.split('-')[0],
      'ccode': row.kuaiJiKeMuCode
    }).then(res => {
      const apiData = res.obj;
      // @ts-ignore
      const fuZhuHeSuanModel = fuZhuHeSuanHelper.apiDataCastFuZhuHeSuanModel(apiData);
      // @ts-ignore

      const [isError, {errorList}] = fuZhuHeSuanHelper.verifyKuaiJiKeMu(fuZhuHeSuanModel, row);
      if (isError) {
        alert('第' + i + '行会辅助核算出错：' + errorList.map(key => '接口数据错误,该科目没有【' + key + '】').join(','));
      }

      Object.keys(fuZhuHeSuanModel)
          .forEach(key => {
            if (row[key] == null) {
              Vue.set(row, key, fuZhuHeSuanModel[key]);
            }
          });
      // Object.assign(row, {...fuZhuHeSuanModel, ..ON.parse(JSON.stringify(row))})
      // debugger
    });

    return row;
  });
  return addPingZhengModel;
}


export default async function ({el, data, success, closeCallback}) {
  (async () => {
    const AddPingZhengEditor = await createAddPingZhengEditorComponent({
      el,
      data:await dataCastPingZhengModel(data),
      success,
      closeCallback
    });
    const addPingZhengEditor = new AddPingZhengEditor({
      el: createDom(),
      mounted() {
      }
    });
    addPingZhengEditor.$store.state.showPingZhengPaing = true;
  })();

}
