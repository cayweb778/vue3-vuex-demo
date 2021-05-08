/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Vue from '../../boozjs-vue/2.x.js';
import Vuex from '../../boozjs-vuex/3.x';
import apiProcess from '../data/data';
import {usePingZhengLayout} from '../views/ping_zheng_editor_layout';
import {usePingZhengTable} from '../views/ping_zheng_editor_table';
import {$request} from '../../boozapp-request/boozapp-request';
import {LaySkinMixin} from './skin';
import {createStore} from '../store/store';
import Qs from 'qs'


export const template =async ({pingZhengModel, successCallback, closeCallback, save}) => {
  const PingZhengLayout=await usePingZhengLayout()
  const PingZhengTable=await usePingZhengTable()
  const store = createStore();
  store.state.pingZhengModel = pingZhengModel;
  store.state.EditorType = 'show';
  store.state.successCallback = successCallback;

  const {queryPrePingZhengNum}=apiProcess()
  let layerIndex = 0;
  return Vue.extend({
    mixins: [LaySkinMixin()],
    store,
    computed: Vuex.mapState([
      'EditorType'
    ]),
    async mounted() {
      this.$store.state.instance = this;

      const {leftPingZhengNum} = await queryPrePingZhengNum({num: '', date: pingZhengModel.props.date});
      this.$store.state.pingZhengCache.leftPingZhengNum = leftPingZhengNum;


      setTimeout(() => {
        store.state.firstStep();
      }, 200);
    },

    render(h) {
      return this.abcd(h, [
        // 查看凭证模版
        h(PingZhengLayout, [
              h(PingZhengTable, {slot: 'table'}),
              h({
                template: `
                                 <div style="float: right;margin-top:0px;">
                                    <button @click="$store.state.close()" style="font-size:12px" class="dy_button">
                                        关闭
                                    </button>
                                </div>
                            `
              }, {slot: 'bottomRightBtns'})
            ]
        )
      ]);
    }

  });
};

