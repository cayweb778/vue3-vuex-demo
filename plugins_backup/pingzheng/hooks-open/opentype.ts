/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
// const addPingZhengState=require('pingzheng/store/modules/template/addPingZheng').store

// const {openPingZhengCopy}   from 'pingzheng/hooks-open/open_editor_copy')
// const {openPingZhengShow}   from 'pingzheng/hooks-open/open_editor_show')
// const {openPingZhengShowUpdate}   from 'pingzheng/hooks-open/open_editor_show_update')
// const {openPingZhengInsert}   from 'pingzheng/hooks-open/open_editor_insert')
// const {openPingZhengEdit}   from 'pingzheng/hooks-open/open_editor_insert')
import pingzhengHelper from '../helper/pingzhengHelper';
import {usePingZhengEditor} from '../pingzheng';
import {$request} from '../../boozapp-request/boozapp-request';

const {pingZhengModelHelper} = pingzhengHelper;


const {castPingZhengModel} = pingZhengModelHelper();

const {
  useJustAddEditor,
  useJustEditEditor
} = usePingZhengEditor();


async function getPingZhengModelByPingZhengNum({pingZhengNum, title}) {
  const apiData = await $request({
    url: '/rest/pingZheng/findPingZhengByPingZhengNum?pingZhengNum=' + pingZhengNum,
    method: 'get'
  });

  const pingZhengModel = castPingZhengModel(apiData.data, {title});
  return pingZhengModel;
}

/**
 * 打开默认
 */
export function openDefaultPingZheng() {
}

/**
 * 打开显示页
 * @param pingZhengType
 * @param pingZhengNumOfMonth
 */
export function openShowPingZheng(pingZhengType, pingZhengNumOfMonth) {

  const pingZhengModel = getPingZhengModelByPingZhengNum(pingZhengNum);
}

/**
 * 打开插入页
 * @param pingZhengType
 * @param pingZhengNumOfMonth
 */
export function openInsertPingZheng(pingZhengType, pingZhengNumOfMonth) {
  getPingZhengModelByPingZhengNum({pingZhengNum, title: '插入凭证'})
      .then(pingZhengModel => {
        useJustAddEditor({
          data: pingZhengModel,
          saveBtnName: '插入凭证',
          close: () => {
          }
        });
      });
}

/**
 * 打开修改凭证编辑器
 * @param pingZhengNum
 */
export function openEditPingZheng(pingZhengNum) {

  getPingZhengModelByPingZhengNum({pingZhengNum, title: '修改凭证'})
      .then(pingZhengModel => {
        pingZhengModel.props.pingZhengNum = pingZhengNum;
        useJustEditEditor({
          data: pingZhengModel,
          saveBtnName: '确认修改',
          successMsg: () =>
              layer.msg('修改成功', (i) => {
                layer.close(i);
              })
          ,
          success(pingZhengModel, apiData, instance) {
            instance.$store.state.close();
            window.refreshPingZhengList();
          },
          close: () => {
          }
        });
      });

}

/**
 * 打开复制凭证页
 * @param pingZhengNum
 */
export function openCopyPingZheng(pingZhengNum) {
  getPingZhengModelByPingZhengNum({pingZhengNum, title: '复制凭证'})
      .then(pingZhengModel => {
        useJustAddEditor({
          data: pingZhengModel,
          saveBtnName: '复制凭证',
          successMsg: () =>
              layer.msg('保存成功', (i) => {
                layer.close(i);
              })
          ,
          success(pingZhengModel, apiData, instance) {
            instance.$store.state.close();
          },
          close: () => {
          }
        });
      });
}

/**
 * 打开冲销页
 * @param pingZhengNum
 */
export {openPingZhengChongxiao} from './open_editor_chongxiao';
import openPingZhengAdd from './open_editor_add';
export {
  openPingZhengAdd
}
