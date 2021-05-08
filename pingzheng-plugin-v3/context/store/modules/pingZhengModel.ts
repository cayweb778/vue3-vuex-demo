import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {store} from '../index';

const NAME = 'app';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class PingZhengModel extends VuexModule {
    // Page loading status
    private pingZhengModel = {
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
    };
    private pingZhengRowHover = {
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
            'zhaiYao': '',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }, {
            'zhaiYao': '',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }, {
            'zhaiYao': '',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }, {
            'zhaiYao': '',
            'kuaiJiKeMuCode': '',
            'kuaiJiKeMuFullName': '',
            'jieMoney': '0.00',
            'daiMoney': '0.00',
            'kuaiJiKeMuPath': ''
        }],
        'rowsFuZhuHeSuan': []
    };

    // project config

    // set main overflow hidden
    private lockMainScrollState = false;

    get getPingZhengModel() {
        return this.pingZhengModel;
    }
   get getPingZhengRowHover() {
        return this.pingZhengRowHover;
    }

    get getLockMainScrollState() {
        return this.lockMainScrollState;
    }


    @Mutation
    commitPingZhengModel(pingZhengModel: any): void {
        this.pingZhengModel = pingZhengModel;
    }

    @Mutation
    commitLockMainScrollState(lock: boolean): void {
        this.lockMainScrollState = lock;
    }


    @Action
    public async setPageLoadingAction(loading: boolean): Promise<string> {
        return 'asadsa';
    }
}

export const pingZhengModelStore = getModule<PingZhengModel>(PingZhengModel);
