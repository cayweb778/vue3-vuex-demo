/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import pingzhengHelper from '../helper/pingzhengHelper';

import  fuZhuHeSuanHelper from '../helper/fu_zhu_he_suan_Helper';


import  {queryFuZhuHeSuanApi} from '../api/fu_zhu_he_suan';
import  {createDom} from '../../boozjs-lang/dom';

import  {template as getJustShowPingZhengEditor} from './use_just_show_template';
export default async  function ({pingZhengNum, close}) {
  const data = {
    options: {
      title: '查看凭证'
    },
    props: {
      pingZhengFrom: '0',
      date: '2021-01-01',
      type: '记',
      danJuNum: '0'
    },
    rows: []
  };
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

  if (close == null) {
    close = () => {
      dom.remove();
    };
  }

  const AddPingZhengEditor =await getJustShowPingZhengEditor({
    pingZhengModel: addPingZhengModel,
    successCallback: (pingZhengModel, apiData, instance, state) => {
      success(pingZhengModel, apiData, instance);
    },
    closeCallback() {
      console.log('关闭了页面');
    }
  });

  //页面层
  let showPingZhengEditor = {};

  showPingZhengEditor = new AddPingZhengEditor(
      {
        el: createDom()
      });
  showPingZhengEditor.$store.state.showPingzhengByNum(pingZhengNum);


  showPingZhengEditor.$store.state.showPingZhengPaing = false;
  // appPingZhengEditor.$el.remove()
}


