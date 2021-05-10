import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {store} from '../index';

const NAME = 'kuaiJiKeMu';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class KuaiJiKeMuModel extends VuexModule {
    private kuaiJiKeMuList=[]
    get getKuaiJiKeMuList(){
        return this.kuaiJiKeMuList
    }
    @Mutation
    commitKuaiJiKeMuList(kuaiJiKeMuList: any): void {
        this.kuaiJiKeMuList = kuaiJiKeMuList;
    }

}

export const kuaiJiKeMuStore = getModule<KuaiJiKeMuModel>(KuaiJiKeMuModel);
