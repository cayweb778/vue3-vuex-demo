import('./boozjs-elementui/2.x.js');
// import {useCssLoad} from './require-css/index.js';
import {usePingZhengEditor} from './pingzheng/pingzheng';
import {
  openCopyPingZheng,
  openDefaultPingZheng,
  openEditPingZheng,
  openInsertPingZheng,
  openPingZhengAdd,
  openPingZhengChongxiao,
  openShowPingZheng
} from './pingzheng/hooks-open/opentype';

// useCssLoad(import.meta.url).loadCss(['../elementui/css/elementui.css']);

const {
  apiHelper,
  pingZhengModelHelper,
  useAddEditor,
  useJustAddEditor,
  useJustShowEditor,
  useJustEditEditor,
  useEditEditor,
  useInsertEditor,
  useShowEditor
} = usePingZhengEditor();

export default {
  openPingZhengAdd,
  openPingZhengChongxiao,
  openCopyPingZheng,
  openEditPingZheng,
  openInsertPingZheng,
  openShowPingZheng,
  openDefaultPingZheng,
  // 使用仅修改编辑器
  useJustEditEditor,
  // 使用仅新增编辑器
  useJustAddEditor,
  // 使用仅查看编辑器
  useJustShowEditor,

  // 使用添置凭证编辑器
  useAddEditor,
  // 使用修改编辑器
  useEditEditor,
  // 使用插入编辑器
  useInsertEditor,
  // 使用查看编辑器
  useShowEditor,

  // 凭证模型工具
  pingZhengModelHelper,
  // 凭证Api接口
  apiHelper
}
