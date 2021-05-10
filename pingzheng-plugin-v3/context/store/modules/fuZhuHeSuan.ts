/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';

import {
    queryCHList,
    queryCustomerList,
    queryDeptList,
    queryGYList,
    queryItemList,
    queryPersonList
} from '../../api/fu_zhu_he_suan.ts';
import {store} from '../index';

const NAME = 'fuZhuHeSuan';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class FuZhuHeSuanModel extends VuexModule {
    private deptList = null;
    private personList = null;
    private customerList = null;
    private gyList = null;
    private chList = null;
    private itemList = null;
    private kuaiJiKeMuList = [];

    get getKuaiJiKeMuList() {
        return this.kuaiJiKeMuList;
    }

    @Action
    public async setPageLoadingAction(loading: boolean): Promise<string> {
        return 'asadsa';
    }

    @Action
    public async getDeptList({commit, state}) {
        if (state.deptList == null) {
            const a = (await queryDeptList());
            state.deptList = {
                name: '部门',
                columnName: 'fzDept',
                list: [
                    ...a.map(item =>
                        new FuZhuHeSuanModel({
                            key: item['num'],
                            name: item['num'] + ' ' + item['name'],
                            value: item['uniqueCode'],
                            num: item['num'],
                            uniqueCode: item['uniqueCode'],
                            label: item['name'],
                            target: item
                        })
                    )
                ]
            };
        }
        return state.deptList;
    }

    @Action
    public async getPersonList({commit, state}) {

        if (state.personList == null) {
            state.personList = {
                name: '人员',
                columnName: 'fzEmp',

                list: (await queryPersonList())
                    .map(item =>
                        new FuZhuHeSuanModel({
                            key: item['empNum'],
                            uniqueCode: item['uniqueCode'],
                            name: item['empNum'] + ' ' + item['empName'],
                            value: item['uniqueCode'],
                            num: item['empNum'],
                            label: item['empName'],
                            target: item
                        })
                    )
            };
        }
        return state.personList;

    }

    @Action
    public async getCustomerList({commit, state}) {

        if (state.customerList == null) {
            state.customerList = {
                name: '客户',
                columnName: 'fzCustomer',

                list: (await queryCustomerList()).map(item =>
                    new FuZhuHeSuanModel({
                        key: item['fzCusNum'],
                        name: item['fzCusNum'] + ' ' + item['fzCusName'],
                        value: item['uniqueCode'],
                        uniqueCode: item['uniqueCode'],
                        num: item['fzCusNum'],
                        label: item['fzCusName'],
                        target: item
                    })
                )
            };
        }
        return state.customerList;

    }

    @Action
    public async getGYList({commit, state}) {


        if (state.gyList == null) {
            state.gyList = {
                name: '供应商',

                columnName: 'fzSupplier',
                list: (await queryGYList()).map(item => new FuZhuHeSuanModel({
                        key: item['fzSupNum'],
                        name: item['fzSupNum'] + ' ' + item['fzSupName'],
                        value: item['uniqueCode'],
                        num: item['fzSupNum'],
                        uniqueCode: item['uniqueCode'],
                        label: item['fzSupName'],
                        target: item
                    })
                )
            };
        }
        return state.gyList;

    }

    @Action
    public async getCHList({commit, state}) {


        if (state.chList == null) {
            state.chList = {
                name: '存货档案',

                columnName: 'fzCunHuo',
                list: (await queryCHList()).map(item =>
                    new FuZhuHeSuanModel({
                        key: item['fzStNum'],

                        name: item['fzStNum'] + ' ' + item['fzStName'],
                        value: item['uniqueCode'],
                        num: item['fzStNum'],
                        uniqueCode: item['uniqueCode'],
                        label: item['fzStName'],
                        target: item
                    })
                )
            };
        }
        return state.chList;

    }

    @Action
    public async getItemList({commit, state}) {


        if (state.itemList == null) {
            state.itemList = {
                name: '项目档案',
                columnName: 'fzXiangMuMulu',
                list: (await queryItemList()).map(item =>
                    new FuZhuHeSuanModel({
                        key: item['fzProNum'],
                        name: item['fzProNum'] + ' ' + item['fzProName'],
                        value: item['uniqueCode'],
                        num: item['fzProNum'],
                        uniqueCode: item['uniqueCode'],
                        label: item['fzProName'],
                        target: item
                    })
                )

            };
        }
        return state.itemList;

    }
}

export const fuZhuHeSuanMuStore = getModule<FuZhuHeSuanModel>(FuZhuHeSuanModel);
