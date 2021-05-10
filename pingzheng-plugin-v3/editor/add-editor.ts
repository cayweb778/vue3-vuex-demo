import {kuaiJiKeMuStore} from '../context/store/modules/kuaiJiKeMu';
import {pingZhengModelStore} from '../context/store/modules/pingZhengModel';
import {showPingZhengStore} from '../context/store/modules/showPingZheng';
import {zhaiYaoStore} from '../context/store/modules/zhaiYao';
export default async function({zhiDanRen,zhaiyaoApi,kuaiJiKeMuApi,okApi,backApi,model}:any) {
    import('../context/pingzheng')
    pingZhengModelStore.commitPingZhengModel(model)
    kuaiJiKeMuStore.commitKuaiJiKeMuList(await kuaiJiKeMuApi())
    zhaiYaoStore.commitZhaiYaoList(await zhaiyaoApi())
    return null
}
