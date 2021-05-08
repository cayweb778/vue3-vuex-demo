/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Qs from 'qs'
import Vue from '../../boozjs-vue/2.x.js';
import Vuex from '../../boozjs-vuex/3.x';
import apiProcess from '../data/data';
import {usePingZhengLayout} from '../views/ping_zheng_editor_layout';
import {usePingZhengTable} from '../views/ping_zheng_editor_table';
import {LaySkinMixin} from './skin';
import {createStore} from '../store/store';
import {$request} from '../../boozapp-request/boozapp-request';

const {mapState,mapActions} = Vuex;
export const template = async ({
                                 pingZhengModel,
                                 successCallback,
                                 saveBtnName,
                                 cancelBtnName,
                                 storeSup
                               }) => {
  const PingZhengLayout = await usePingZhengLayout();
  const PingZhengTable = await usePingZhengTable();

  const title = pingZhengModel.options.title;

  const store = createStore(storeSup.state);
  store.state.pingZhengModel = pingZhengModel;
  store.state.successCallback = successCallback;

  const {queryPrePingZhengNum}=apiProcess()
    return {
      leftPingZhengNum: result.data.map['pre']
    };
  }

  let layerIndex = 0;
  return Vue.extend({
    mixins: [LaySkinMixin()],
    store,

    async mounted() {
      const {leftPingZhengNum} = await queryPrePingZhengNum({num: '', date: pingZhengModel.props.date});
      this.$store.state.pingZhengCache.leftPingZhengNum = leftPingZhengNum;


      setTimeout(() => {
        store.state.firstStep();
      }, 200);
      // setTimeout(() => {
      //     this.$nextTick(() => {
      //         dom.style.display = 'block'
      //     })
      // }, 1000)
    },
    render(h) {
      return this.abcd(h, [h({
        computed: Vuex.mapState([
          'EditorType'
        ]),
        render() {
          if (saveBtnName == null) {
            saveBtnName = '保存';
          }
          if (cancelBtnName == null) {
            cancelBtnName = '关闭';
          }
          return h('div', {
            attrs: {
              // style:"display:none",

            }
          }, [
            // 新增凭证模版
            h(PingZhengLayout, [
                  h(PingZhengTable, {slot: 'table'}),
                  h({
                    computed:{
                      ...mapState({
                        pingZhengModel: state => state.pingZhengModel,
                      })
                    },
                    methods:{
                      ...mapActions('pingzhengsave', [
                        'saveNewPingZheng',
                        'saveInsertPingZheng',

                      ])
                    },
                    template: `
                                 <div style="float: right;margin-top:0px;">
                                    <button @click="saveInsertPingZheng(pingZhengModel)" style="font-size:12px" class="dy_button">
                                        ${saveBtnName}
                                    </button>
                                    <button @click="$store.state.close()" style="font-size:12px" class="dy_button">
                                        ${cancelBtnName}
                                    </button>
                                </div>
                            `
                  }, {slot: 'bottomRightBtns'})
                ]
            )
          ]);
        }
      })]);
    }

  });
};

