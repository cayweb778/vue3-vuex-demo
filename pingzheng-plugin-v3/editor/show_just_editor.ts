import {pingZhengModelStore} from '../context/store/modules/pingZhengModel';
import {showPingZhengStore} from '../context/store/modules/showPingZheng';
export default function({model}:any) {
    import('../context/pingzheng')
    pingZhengModelStore.commitPingZhengModel(model)
    showPingZhengStore.commitShowPingZheng(true)
    return null
}
