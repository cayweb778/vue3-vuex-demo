import '../../../context/pingzheng'
import {pingZhengModelStore} from '../../../context/store/modules/pingZhengModel';
export default function(data:any) {
    pingZhengModelStore.commitPingZhengModel({
        'options': {'title': '新增凭证'},
        'props': {
            'pingZhengFrom': '0',
            'date': '2023-05-04',
            'type': '记',
            'danJuNum': '0',
            'zdr': 1,
            'pingZhengNumOfMonth': '028'
        },
        'rows': [{
            'zhaiYao': '1',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }, {
            'zhaiYao': '2',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }, {
            'zhaiYao': '3',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }, {
            'zhaiYao': '4',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }],
        'rowsFuZhuHeSuan': []
    })
    return null
}
