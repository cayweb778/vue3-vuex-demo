/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {createDom} from '../../boozjs-lang/dom';

import {template as getJustAddPingZhengEditor} from './use_just_add_template'
import  {castJustAddPingZhengModel} from './use_just_add_helper'

export default async function ({el, data, success, closeCallback, saveBtnName, cancelBtnName, successMsg}) {

  const addPingZhengModel =await castJustAddPingZhengModel(data);

  const storeSup = {state: {}};

  storeSup.state.successMsg = successMsg;
  const AddPingZhengEditor =await getJustAddPingZhengEditor({
    storeSup,
    saveBtnName,
    cancelBtnName,
    pingZhengModel: addPingZhengModel,
    successCallback: (pingZhengModel, apiData, instance, state) => {
      success(pingZhengModel, apiData, instance);
    },
    closeCallback() {
      console.log('关闭了页面');
    }
  });
  const addPingZhengEditor = new AddPingZhengEditor({
    el: createDom(),
    mounted: function() {
      // const {themeEl, layOpenId} = useTheme(this.$el)
      // storeSup.state.themeDiv = themeEl
      // storeSup.state.layOpenId = layOpenId
    }
  });

  addPingZhengEditor.$store.state.EditorType = 'add-default';
  addPingZhengEditor.$store.state.showPingZhengPaing = false;

  // appPingZhengEditor.$el.remove()
}


