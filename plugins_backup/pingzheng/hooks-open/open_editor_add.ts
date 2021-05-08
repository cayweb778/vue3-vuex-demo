/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
// 新增凭证
import {queryVoucherDefaultDate} from '../api/pingzheng';
import {usePingZhengEditor} from '../pingzheng';
const {useAddEditor} = usePingZhengEditor();

export default async function({zhiDanRen}) {
  useAddEditor({
    data: {
      options: {
        title: '新增凭证'
      },
      props: {
        pingZhengFrom: '0',
        date: await queryVoucherDefaultDate(),
        type: '记',
        danJuNum: '0',
        zdr: zhiDanRen
      },
      rows: [],
      rowsFuZhuHeSuan: []
    },
    success(pingZhengModel, apiData, instance) {
      console.log('pingZhengModel', pingZhengModel, '\napiData', apiData);
    },
    cancel() {

    }
  });
}
