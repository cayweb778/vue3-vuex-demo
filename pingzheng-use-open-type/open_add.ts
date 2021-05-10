import useAddEditor from '../pingzheng-plugin-v3/editor/add-editor';
import {queryVoucherDefaultDate} from '../plugins_backup/pingzheng/api/pingzheng';

export default async function({typeListApi,numApi,zhiDanRen,zhaiyaoApi,kuaiJiKeMuApi,okApi,backApi}:any) {
    return useAddEditor({
        zhaiyaoApi,
        kuaiJiKeMuApi,
        okApi,backApi,
        model: {
            options: {
                title: '新增凭证'
            },
            props: {
                pingZhengFrom: '0',
                pingZhengNumOfMonth:await numApi({year:'2020',month:10}),
                date: await queryVoucherDefaultDate(),
                type: (await typeListApi({year:'2020',month:10}))[0],
                danJuNum: '0',
                zdr: zhiDanRen
            },
            rows: [
                {
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                },{
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                },{
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                },
                {
                    'zhaiYao': '',
                    'kuaiJiKeMuCode': '',
                    'kuaiJiKeMuText': '',
                    'jieMoney': '0.00',
                    'daiMoney': '0.00',
                    'kuaiJiKeMuPath': ''
                },
            ],
            rowsFuZhuHeSuan: []
        },
        success(pingZhengModel, apiData, instance) {
            console.log('pingZhengModel', pingZhengModel, '\napiData', apiData);
        }
    });

}
