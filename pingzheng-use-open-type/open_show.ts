import {queryVoucherDefaultDate} from '../plugins_backup/pingzheng/api/pingzheng';
import useShowJustEditor from '../pingzheng-plugin-v3/editor/show_just_editor';

export default async function({api,model,zhiDanRen}:any) {
    return useShowJustEditor({model});
}
