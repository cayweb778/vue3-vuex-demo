/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
import Vue from '../../boozjs-vue/2.x.js';
import Vuex from '../../boozjs-vuex/3.x.js';
import Qs from 'qs'
import apiProcess from '../data/data';
import {LaySkinMixin} from'./skin';


import pingzhengHelper from'../helper/pingzhengHelper';
import {usePingZhengLayout} from '../views/ping_zheng_editor_layout';
import {usePingZhengTable} from '../views/ping_zheng_editor_table';
import {$request} from '../../boozapp-request/boozapp-request';

const {toAddPingZhengModel} = pingzhengHelper.pingZhengModelApiHelper();
const {queryPrePingZhengNum}=apiProcess()
const {mapActions}=Vuex
export const template = async ({pingZhengModel, successCallback, closeCallback, save}) => {
  const PingZhengLayout=await usePingZhengLayout()
  const PingZhengTable=await usePingZhengTable()
  const title = JSON.parse(JSON.stringify(pingZhengModel.options.title));
  const {createStore} =await import('../store/store');
  const store = createStore();

  store.state.pingZhengModel = pingZhengModel;

  store.state.successCallback = successCallback;




  return Vue.extend({
    mixins: [LaySkinMixin()],
    store,
    methods: {
      useTemplate({type}) {
      }
    },
    async mounted() {
      this.$store.state.instance = this;

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


      return this.abcd(h, [
        h({
          computed: Vuex.mapState([
            'EditorType'
          ]),
          render() {
            let renderInstance;
            let defaultRender = h('div', {
              attrs: {
                // style:"display:none",

              }
            }, [
              // ??????????????????
              h(PingZhengLayout, [
                    h(PingZhengTable, {slot: 'table'}),
                    h({

                      template: `
                                 <div style="float: right;margin-top:0px;">
<!--                                    <button @click="alert('???????????????')" style="font-size:12px" class="dy_button">-->
<!--                                        ????????????-->
<!--                                    </button>-->
                                    <button @click="window.top.openPingzhengMoban()" style="font-size:12px" class="dy_button">
                                        ????????????
                                    </button>
                                    <button @click="saveNewPingZhengAndContinue(),refreshPingZhengList()" style="font-size:12px" class="dy_button">
                                        ???????????????
                                    </button>
                                    <button @click="saveNewPingZhengAndContinue(),refreshPingZhengList()" style="font-size:12px" class="dy_button">
                                        ??????
                                    </button>
                                    <button @click="$store.state.close()" style="font-size:12px" class="dy_button">
                                        ??????
                                    </button>
                                </div>
                            `,
                      methods: {
                        ...mapActions('pingzhengsave', [
                          'saveNewPingZhengAndContinue'
                        ]),
                        refreshPingZhengList() {
                          if (window.refreshPingZhengList != null) {
                            window.refreshPingZhengList();
                          }
                        }
                      }
                    }, {slot: 'bottomRightBtns'})
                  ]
              )
            ]);
            let pingzhengFromRender = h('div', {
              attrs: {
                style: 'display:none'

              }
            }, [
              // ??????????????????
              h(PingZhengLayout, [
                    h(PingZhengTable, {slot: 'table'}),
                    h({
                      template: `
                                 <div style="float: right;margin-top:0px;">
                                    <button @click="$parent.save($parent.trs)" style="font-size:12px" class="dy_button">
                                        ??????
                                    </button>
                                    <button @click="$parent.$parent.close()" style="font-size:12px" class="dy_button">
                                        ??????
                                    </button>
                                </div>
                            `
                    }, {slot: 'bottomRightBtns'})
                  ]
              )
            ]);

            let defaultRender2 = h('div',
                [
                  // ??????????????????
                  h(PingZhengLayout, [
                        h(PingZhengTable, {slot: 'table'}),
                        h({
                          template: `
                                                 <div style="float: right;margin-top:0px;">
                                                    
<!--                                                    <button  @click="goback" style="font-size:12px" class="dy_button">-->
<!--                                                        ??????-->
<!--                                                    </button>-->
                                                    
                                                    <button  @click="goNewPingZheng" style="font-size:12px" class="dy_button">
                                                        ?????????????????????
                                                    </button>
                                                    <button  @click="goback" style="font-size:12px" class="dy_button">
                                                        ??????????????????
                                                    </button>
                                                    
                                                </div>
                                            `,
                          methods: {
                            async goNewPingZheng() {
                              const {leftPingZhengNum} = await queryPrePingZhengNum({
                                num: '',
                                date: pingZhengModel.props.date
                              });
                              this.$store.state.pingZhengCache.leftPingZhengNum = leftPingZhengNum;

                              this.$store.state.EditorType = 'add-default';
                              this.$store.state.pingZhengModel = toAddPingZhengModel({
                                options: {
                                  title: '????????????'
                                },
                                props: pingZhengModel.props,
                                rows: pingzhengHelper.cast4Row([])
                              });
                              this.$store.state.pingZhengModel.props.danJuNum = '0';

                            },
                            async goback() {
                              const {leftPingZhengNum} = await queryPrePingZhengNum({
                                num: '',
                                date: pingZhengModel.props.date
                              });
                              this.$store.state.pingZhengCache.leftPingZhengNum = leftPingZhengNum;

                              this.$store.state.leftPingZhengNum = null;
                              this.$store.state.EditorType = 'add-default';
                              this.$store.state.pingZhengModel = this.$store.state.pingZhengCache.addPingZhengModelCache;
                            }

                          }
                        }, {slot: 'bottomRightBtns'})
                      ]
                  )
                ]
            );
            if (this.EditorType == 'add-default') {

              store.state.pingZhengModel.options.title = title;
              renderInstance = defaultRender;
            } else if (this.EditorType == 'add-pingzhengForm') {
              renderInstance = pingzhengFromRender;
            } else {
              if (store.state.pingZhengModel.options.title == null) {
                store.state.pingZhengModel.options.title = '????????????';
              }
              renderInstance = defaultRender2;
            }
            return renderInstance;
          }
        })
      ]);
    }

  });
};
