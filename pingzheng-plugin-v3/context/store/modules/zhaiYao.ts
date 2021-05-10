import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {store} from '../index';

const NAME = 'zhaiYao';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class ZhaiYaoModel extends VuexModule {
    private zhaiYaoList=[]
    get getZhaiYaoList(){
        return this.zhaiYaoList
    }
    @Mutation
    commitZhaiYaoList(zhaiYaoList: any): void {
        this.zhaiYaoList = zhaiYaoList;
    }
}

export const zhaiYaoStore = getModule<ZhaiYaoModel>(ZhaiYaoModel);
