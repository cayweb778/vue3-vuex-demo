/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Vue from '../../boozjs-vue/2.x.js';
import {queryFuZhuHeSuanApi} from '../api/fu_zhu_he_suan';
import fuZhuHeSuanHelper from '../helper/fu_zhu_he_suan_Helper';

import pingzhengHelper from '../helper/pingzhengHelper';
import {template as getJustEditPingZhengEditor} from './use_just_edit_template';
import {createDom} from '../../boozjs-lang/dom';

export async  function castJustAddPingZhengModel(data) {
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
      const fuZhuHeSuanModel = fuZhuHeSuanHelper.apiDataCastFuZhuHeSuanModel(apiData);
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
      // Object.assign(row, {...fuZhuHeSuanModel, ...JSON.parse(JSON.stringify(row))})
      // debugger
    });

    return row;
  });
  return addPingZhengModel;
}

export default async function({el, data, success, closeCallback, saveBtnName, cancelBtnName, successMsg}) {
  const pingZhengNumOfMonth = data.props.pingZhengNumOfMonth;
  const date = data.props.date;
  const addPingZhengModel = await castJustAddPingZhengModel(data);
  addPingZhengModel.props.pingZhengNumOfMonth = pingZhengNumOfMonth;
  addPingZhengModel.props.date = date;
  const storeSup = {state: {}};

  storeSup.state.successMsg = successMsg;
  const EditPingZhengEditor = await getJustEditPingZhengEditor({
    storeSup,
    saveBtnName,
    cancelBtnName,
    pingZhengModel: addPingZhengModel,
    successCallback: (pingZhengModel, apiData, instance, state) => {
      success(pingZhengModel, apiData, instance);
    },
    closeCallback() {
      console.log('关闭了页面');
    }
  });

  const editPingZhengEditor = new EditPingZhengEditor({
    el: createDom(),
    created() {

    },
    mounted: function() {
    }
  });

  editPingZhengEditor.$store.state.EditorType = 'add-default';
  editPingZhengEditor.$store.state.showPingZhengPaing = false;

  // appPingZhengEditor.$el.remove()
}


