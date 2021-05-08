/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import pingzhengHelper from '../helper/pingzhengHelper';
import {queryFuZhuHeSuanApi} from '../api/fu_zhu_he_suan';
import fuZhuHeSuanHelper from '../helper/fu_zhu_he_suan_Helper';

const {toAddPingZhengModel} = pingzhengHelper.pingZhengModelApiHelper();

export  async function castJustAddPingZhengModel(data) {

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
