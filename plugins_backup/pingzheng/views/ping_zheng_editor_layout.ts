// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-nocheck
// import Vuex from '../../boozjs-vuex/3.x';
// import {openPrintPopup, singlePrintBoot} from '../views/print/print_popup';
// import pingzhengHelper from '../helper/pingzhengHelper';
// // import {useTextLoad} from '../../require-text/index';
// // import {useCssLoad} from '../../require-css/index';
// import {getVouchTypeApi, queryDateSectionApi} from '../api/pingzheng';
// import _$ from '../../boozjs-jquery/boozjs-jquery'
// import template  from 'raw-loader!./ping_zheng_editor_layout.html'
// window.urlPath = '/ysd';
//
// import '../assest/css/views/ping_zheng_editor_layout.css'
// import '../assest/css/views/ping_zheng_editor_layout.less.css'
//
// const {pingZhengModelApiHelper} = pingzhengHelper;
// const {getPingZhengNumOfMonth} = pingZhengModelApiHelper();
//
// function storeManagerMixin() {
//   return {
//     computed: Vuex.mapState([
//       'pingzhengloading',
//       'EditorType',
//       'pingZhengCache',
//       'pingZhengModel',
//       'keMuList',
//       'successCallback',
//       'switchData',
//       'save'
//     ])
//   };
// }
//
// function pingZhengPageMixin() {
//
//   return {
//     components: {
//       pingzhengPaging: {
//         computed: Vuex.mapState([
//           'EditorType',
//           'pingZhengCache',
//           'switchData'
//         ]),
//         template: `
//                            <div v-if="$store.state.showPingZhengPaing">
//                             <button :class="pingZhengCache.leftPingZhengNum!=null?'leftPointActive':'leftPoint'"
//                                 @click="$store.state.showPingzhengByNum(pingZhengCache.leftPingZhengNum)"
//                              style="cursor:pointer;float: left; background: inherit; border: none; margin-bottom: 5px;">
//                                 <img style="width: 30px; height: 30px;"></button>
//                              <button
//                                 :class="pingZhengCache.rightPingZhengNum!=null?'rightPointActive':'rightPoint'"
//                                 @click="$store.state.showPingzhengByNum(pingZhengCache.rightPingZhengNum)"
//                                  style="cursor:pointer;float: left; background: inherit; border: none; margin-left: 20px; margin-bottom: 5px;">
//                                 <img src="/ysd/common/svg/newVouch/右箭头.svg" style="width: 30px; height: 30px;"></button>
//                              </div>
//                             </div>
//
//                         `,
//         methods: {
//
//           afterPage() {
//             this.$store.state.templateType = 'show';
//           }
//         }
//       }
//     }
//   };
// }
//
// export const usePingZhengLayout = async () => {
//   return {
//     template,
//     mixins: [pingZhengPageMixin(), storeManagerMixin()],
//     provide: {vouchTableType: 'page_edit'},
//     data() {
//       return {
//         vouchTypes:[],
//         pingzhengData: {
//           value: '2020-12-12',
//           pickerOptions: {
//             disabledDate: () => {
//             },
//             shortcuts: [{
//               text: '今天',
//               onClick(picker) {
//                 picker.$emit('pick', new Date());
//               }
//             }, {
//               text: '昨天',
//               onClick(picker) {
//                 const date = new Date();
//                 date.setTime(date.getTime() - 3600 * 1000 * 24);
//                 picker.$emit('pick', date);
//               }
//             }, {
//               text: '一周前',
//               onClick(picker) {
//                 const date = new Date();
//                 date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
//                 picker.$emit('pick', date);
//               }
//             }]
//           }
//         },
//         successCallbackMet: function() {
//         },
//         financialTarget: {
//           dateSection: {}
//         },
//         forbidAdd: false
//       };
//     },
//     methods: {
//
//       thisHelp(title) {
//         let context = 'title';
//         $.ajax({
//           type: 'post',
//           url: urlPath + '/globalHelp!getOne',
//           data: {'gh.belongingGroup': 'PZ', 'gh.menuNum': 'tjpz'},
//           async: false,
//           success: function(res) {
//             context = res.obj.helpContent;
//           }
//         });
//         _$('#helpContent').html(context);
//         layer.open({
//           title: title
//           , content: _$('#choose-box-wrapper4').html()
//           , btn: ['关闭']
//           , area: ['800px', '410px']
//           , tipsMore: true
//           , btnAlign: 'c'
//           , success: function() {
//             _$('.layui-layer-btn .layui-layer-btn0').addClass('dy_button');
//             _$('.layui-layer-content .widget').css('margin', '0');
//           }
//         });
//       },
//       openPrint() {
//         singlePrintBoot.call(this);
//         openPrintPopup();
//       },
//       switchVouch(num) {
//         const vueObj = this;
//         $.ajax({
//           type: 'post',
//           url: urlPath + '/voucher!getNextVouch',
//           data: {
//             'requestMap.num': num,
//             'requestMap.dateTime': this.$refs[this.listPage].addVoucherData.dateTime,
//             'requestMap.voucherType': this.$refs[this.listPage].addVoucherData.vouchTypesSelect
//           },
//           async: false,
//           success: function(res) {
//             const parms = res.obj.parms;
//             const trs = [];
//             const assist = [];
//             for (const i in parms['vouchList']) {
//               const tr = {};
//               tr['id'] = parms['vouchList'][i]['id'];
//               tr['摘要'] = parms['vouchList'][i]['cdigest'];
//               tr['会计科目'] = parms['vouchList'][i]['ccode'] + ' ' + parms['vouchList'][i]['ccodepath'];
//               tr['借方金额'] = parms['vouchList'][i]['md'];
//               tr['贷方金额'] = parms['vouchList'][i]['mc'];
//               tr['orgin'] = '';
//               tr['kmye'] = '';
//               tr['assist'] = [];
//               if (parms['vouchList'][i].cdeptId != null) tr['assist']['部门'] = {
//                 'num': parms['vouchList'][i].cdeptId,
//                 'name': parms['vouchList'][i].deptName
//               };
//               if (parms['vouchList'][i].cpersonId != null) tr['assist']['个人往来'] = {
//                 'num': parms['vouchList'][i].cpersonId,
//                 'name': parms['vouchList'][i].personName
//               };
//               if (parms['vouchList'][i].ccusId != null) {
//                 tr['assist']['客户'] = {
//                   'num': parms['vouchList'][i].ccusId,
//                   'name': parms['vouchList'][i].fzCusName
//                 };
//               }
//               if (parms['vouchList'][i].csupId != null) tr['assist']['供应商'] = {
//                 'num': parms['vouchList'][i].csupId,
//                 'name': parms['vouchList'][i].fzSupName
//               };
//               if (parms['vouchList'][i].cstockId != null) tr['assist']['存货'] = {
//                 'num': parms['vouchList'][i].cstockId,
//                 'name': parms['vouchList'][i].fzStName
//               };
//               if (parms['vouchList'][i].citemId != null) tr['assist']['项目'] = {
//                 'num': parms['vouchList'][i].citemId,
//                 'name': parms['vouchList'][i].fzProName
//               };
//               trs.push(tr);
//             }
//             if (trs.length < 4) {
//               for (let i = trs.length; i < 4; i++) {
//                 trs.push({
//                   摘要: '',
//                   会计科目: '',
//                   借方金额: '',
//                   贷方金额: ''
//                 });
//               }
//             }
//             vueObj.listPage = 'addPageShow';
//             vueObj.listPageShow = false;
//             vueObj.listPageShow = true;
//             vueObj.$nextTick(function() {
//               vueObj.$refs[vueObj.listPage].switchPageData.voucherType = parms['type'];
//               vueObj.$refs[vueObj.listPage].accounted = parms['accounted'];
//               setTimeout(function() {
//                 vueObj.$refs[vueObj.listPage].voucherTypeNum = parms['num'];
//               }, 10);
//               vueObj.$refs[vueObj.listPage].addVoucherData.dateTime = parms['date'];
//               vueObj.$refs[vueObj.listPage].addVoucherData.zdr = parms['zdr'];
//               vueObj.$refs[vueObj.listPage].addVoucherData.num = parms['bill_num'];
//               vueObj.$refs[vueObj.listPage].switchPageData['coutno_id'] = num;
//               vueObj.$refs[vueObj.listPage].trs = trs;
//               vueObj.$refs[vueObj.listPage].assistClear();
//               vueObj.leftActive = res.map['pre'];
//
//               if (vueObj.listPage == 'addPageAdd') {
//                 vueObj.$nextTick(function() {
//                   vueObj.$refs[vueObj.listPage]['addVoucherData'].zdr = '${ConUser.UName}';
//                 });
//               } else {
//                 vueObj.rightActive = res.map['next'];
//               }
//             });
//
//           },
//           error: function(error, a, b) {
//             console.error(error);
//             console.error(a);
//             console.error(b);
//           }
//         })
//       },
//       // 获取凭证类型
//       async getVouchType() {
//         this.vouchTypes = await getVouchTypeApi();
//       },
//       // 切换分类
//       switchPage() {
//         const vueObj = this;
//         const datas = {
//           'requestMap.voucherType': this.pingZhengModel.props.type,
//           'requestMap.dateTime': this.pingZhengModel.props.date
//         };
//         $.ajax({
//           type: 'get',
//           url: urlPath + '/voucher!switchPage',
//           data: datas,
//           async: false,
//           dataType: 'JSON',
//           success: function(res) {
//             console.log(res);
//             vueObj.pingZhengModel.props.pingZhengNumOfMonth = res.map['voucherNum'];
//           },
//           error: function(error, a, b) {
//             console.error(error);
//             console.error(a);
//             console.error(b);
//           }
//         });
//       },
//       close() {
//         if (this.closeCallback != null) {
//           this.closeCallback();
//         }
//         if (this.$parent != null) {
//           this.$parent.popupPage = null;
//           return;
//         }
//         this.$emit('close');
//       },
//       // 查询可选区间
//       async queryDateSection() {
//         const _this = this;
//         _this.financialTarget.dateSection =await queryDateSectionApi()
//       }
//     },
//     created() {
//       // this.switchData.date = this.pingZhengModel.props.date
//       // this.switchData.type = this.pingZhengModel.props.type
//       // this.switchData.num = this.pingZhengModel.props.pingZhengNumOfMonth
//       // this.switchData.bill_num = this.pingZhengModel.props.danJuNum
//       // this.switchData.zdr = this.pingZhengModel.props.zdr
//       if(this.$refs['pingZhengLayout']!=null){
//         this.$refs['pingZhengLayout'].style.display='block'
//       }
//       this.getVouchType();
//       this.queryDateSection();
//     },
//     mounted() {
//       this.pingzhengData.pickerOptions.disabledDate = (time) => {
//         return time.getTime() < new Date(this.financialTarget.dateSection[0]).getTime() ||
//             time.getTime() > new Date(this.financialTarget.dateSection[1]).getTime();
//       };
//
//       this.$watch('pingZhengModel.props.date', async () => {
//         this.pingZhengModel.props.pingZhengNumOfMonth = await  getPingZhengNumOfMonth({
//           type: this.pingZhengModel.props.type,
//           date: this.pingZhengModel.props.date
//         });
//       });
//       // this.$watch('switchData.date', {
//       //     handler: (newVal, oldName) => {
//       //         this.$refs['editTemplateMainPage'].iyear = newVal.split("-")[0]
//       //     },
//       //     deep: true
//       // })
//
//       if (window.screen.width < 1400) {
//         _$('#pageEditZoom').css('zoom', _$('body').width() / _$('#pageEditZoom').width() * 0.6);
//       }
//
//       const vueObj = this;
//       setTimeout(function() {
//         if (vueObj.title != 'look') {
//           _$('.voucher-item table td:first textarea').focus();
//         }
//       }, 100);
//       _$('.voucher-item').scroll(function() {
//         _$('.ulX').hide();
//       });
//       const _this = this;
//
//     }
//   };
// };
