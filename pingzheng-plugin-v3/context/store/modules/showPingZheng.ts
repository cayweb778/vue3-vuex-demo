/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {store} from '../index';



const NAME = 'ShowPingZheng';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class ShowPingZheng extends VuexModule {
    private showPingZheng = false;

    get getShowPingZheng() {
        return this.showPingZheng;
    }
    @Mutation
    commitShowPingZheng(showPingZheng: boolean): void {
        this.showPingZheng = showPingZheng;
    }

}

export const showPingZhengStore = getModule<ShowPingZheng>(ShowPingZheng);
