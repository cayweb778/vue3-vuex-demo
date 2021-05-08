/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Vue from '../../boozjs-vue/2.x.js';

import {LaySkinMixin}  from './skin';

import {createBtnGroupModel}  from './use_just_add_template_btnGroup';
import {createStore}  from './use_just_add_template_store';
import {usePingZhengLayout} from '../views/ping_zheng_editor_layout';
import {usePingZhengTable} from '../views/ping_zheng_editor_table';
import Vuex from '../../boozjs-vuex/3.x';
const {mapActions}=Vuex
export const template =async ({
                      pingZhengModel,
                      successCallback,
                      saveBtnName,
                      cancelBtnName,
                      storeSup
                    }) => {

  const PingZhengLayout=await usePingZhengLayout()
  const PingZhengTable=await usePingZhengTable()
  const btnGroupModel = createBtnGroupModel({
    saveBtnName,
    cancelBtnName
  });
  const store = createStore({
    pingZhengModel,
    successCallback,
    storeSup
  });
  let a = Vue.extend({
    mixins: [LaySkinMixin()],
    store,
    async mounted() {
      setTimeout(() => {
        this.$store.state.firstStep();
      }, 200);
    },
    render: function(h) {
      return this.abcd(h, [
        // 新增凭证模版
        h(PingZhengLayout, [
              h(PingZhengTable, {slot: 'table'}),
              h({
                methods:{
                  ...mapActions('pingzhengsave', [
                    'saveNewPingZheng'
                  ])
                },
                template: `
                                 <div style="float: right;margin-top:0px;">
                                    <button @click="saveNewPingZheng()" style="font-size:12px" class="dy_button">
                                        ${btnGroupModel.saveBtnName}
                                    </button>
                                    <button @click="$store.state.close()" style="font-size:12px" class="dy_button">
                                        ${btnGroupModel.cancelBtnName}
                                    </button>
                                </div>
                            `
              }, {slot: 'bottomRightBtns'})
            ]
        )
      ]);
    }

  });
  return a;
};
