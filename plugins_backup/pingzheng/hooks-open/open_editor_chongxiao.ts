/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
import {getPingZhengModelByPingZhengNum} from '../api/pingzheng';

import {usePingZhengEditor} from '../pingzheng';

const {useJustAddEditor} = usePingZhengEditor();

export const openPingZhengChongxiao = (pingZhengNum) => {
  getPingZhengModelByPingZhengNum({pingZhengNum, title: '冲销凭证'})
      .then(pingZhengModel => {
        pingZhengModel.rows
            .forEach(item => {
              item.zhaiYao = '【冲销' + pingZhengModel.props.date + '-' + pingZhengModel.props.type + '' + pingZhengModel.props.pingZhengNumOfMonth + '号】' + item.zhaiYao;
              item.jieMoney = -1 * item.jieMoney;
              item.daiMoney = -1 * item.daiMoney;
            });
        useJustAddEditor({
          data: pingZhengModel,
          saveBtnName: '冲销凭证',
          successMsg: () =>
              layer.msg('保存成功', (i) => {
                layer.close(i);
              })
          ,
          success(pingZhengModel, apiData, instance) {
            instance.$store.state.close();
          },
          close: () => {
          }
        });
      });
};
