import {queryVoucherDefaultDate} from '../../../plugins_backup/pingzheng/api/pingzheng';
import useAddEditor from './editor/add-editor'
export default async function({zhiDanRen}) {
    return useAddEditor({
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
        }
    });

}
