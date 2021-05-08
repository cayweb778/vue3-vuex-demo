/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck

import pingzhengsave from './modules/pingzhengsave';
import Vuex from '../../boozjs-vuex/3.x';
import Vue from '../../boozjs-vue/2.x.js';
import pingzhengHelper from '../helper/pingzhengHelper';
import {baseUrl} from '../../csd-app/config';
import $ from '../../boozjs-jquery/boozjs-jquery';
import {queryPingZhengPageInfoByNum} from '../api/pingzheng';

const {pingZhengModelHelper, pingZhengModelApiHelper} = pingzhengHelper;
const {toShowPingZhengModel, toAddPingZhengModel} = pingZhengModelApiHelper();

const {castPingZhengModel} = pingZhengModelHelper();




export const createStore = () => {
  const store = new Vuex.Store({
    modules: {
      pingzhengsave
    },
    state: {
      showPingZhengPaing: true,
      showPingzhengByNum: async (num) => {
        store.state.pingzhengloading = true;
        store.state.templateType = 'show';

        const {preNum,nextNum,pingZhengData}=await queryPingZhengPageInfoByNum(num)
        const EditorType = store.state.EditorType;
        store.state.EditorType = 'show';
        store.state.pingZhengCache.leftPingZhengNum = preNum;
        store.state.pingZhengCache.rightPingZhengNum = nextNum;
        if (EditorType == 'add-default') {
          store.state.pingZhengCache.addPingZhengModelCache = store.state.pingZhengModel;
        }
        const pingZhengModel = castPingZhengModel(pingZhengData, {title: '查看凭证'});
        toShowPingZhengModel(pingZhengModel);
        pingZhengModel.rows = pingzhengHelper.cast4Row(pingZhengModel.rows);
        store.state.pingZhengModel = pingZhengModel;
        store.state.pingzhengloading = false;
      },
      openPingzhengByNum: (num) => {
        store.state.pingzhengloading = true;
        $.ajax({
          type: 'post',
          url: baseUrl + '/voucher!getNextVouch',
          data: {
            'requestMap.num': num,
            'requestMap.dateTime': store.state.pingZhengModel.props.date,
            'requestMap.voucherType': store.state.pingZhengModel.props.type
          },
          success: (res) => {
            const EditorType = store.state.EditorType;
            store.state.pingZhengCache.leftPingZhengNum = res.map.pre;
            store.state.pingZhengCache.rightPingZhengNum = res.map.next;
            if (EditorType == 'add-default') {
              store.state.pingZhengCache.addPingZhengModelCache = store.state.pingZhengModel;
            }
            const pingZhengModel = castPingZhengModel(res.obj.parms['vouchList'], {title: '修改凭证'});
            toShowPingZhengModel(pingZhengModel);
            pingZhengModel.rows = pingzhengHelper.cast4Row(pingZhengModel.rows);
            store.state.pingZhengModel = pingZhengModel;

            store.state.pingzhengloading = false;
          }
        });
      },
      async openAddKeMu(rowIndex) {
        const createDom = () => document.body.appendChild(document.createElement('div'));

        const component = await (await import('../views/kuai_ji_ke_mu_popup/kuai_ji_ke_mu_add_popup')).kuaiJiKeMuAddPopup();
        const KuaiJiKeMuAddPopup = Vue.extend(component);
        const kuaiJiKeMuAddPopupInstance = new KuaiJiKeMuAddPopup({
          store,
          el: createDom()
        });
        kuaiJiKeMuAddPopupInstance.$on('success', (kuaiJiKeMuCode) => {
          debugger
          store.state.pingZhengTableInstance.focusJieGrid(rowIndex);
          kuaiJiKeMuAddPopupInstance.$destroy();
          kuaiJiKeMuAddPopupInstance.$el.remove();
          this.pingZhengTableInstance.getSubs();
          const kuaiJiKeMuObject = this.pingZhengTableInstance.subs.filter(item => item.ccode == kuaiJiKeMuCode)[0];

          store.state.pingZhengModel.rows[rowIndex - 1].kuaiJiKeMuCode = kuaiJiKeMuObject.ccode;
          store.state.pingZhengModel.rows[rowIndex - 1].kuaiJiKeMuFullName = kuaiJiKeMuObject.ccode + ' ' + kuaiJiKeMuObject.ccodepath;
          debugger
        });
        kuaiJiKeMuAddPopupInstance.$on('cancel', () => {
          store.state.pingZhengTableInstance.focusKuaiJiKeMuGrid(rowIndex);
          kuaiJiKeMuAddPopupInstance.$destroy();
          kuaiJiKeMuAddPopupInstance.$el.remove();
        });
      },
      successMsg: () => '',
      themeDiv: {},
      layOpenId: 0,
      instance: {},
      pingZhengTableInstance: {},
      // 凭证编辑器类型
      EditorType: 'add-default',
      pingzhengloading: false,
      // 凭证模型
      pingZhengModel: {},
      // 辅助核算HTML
      pingZhengFuZhuHeSuanHtml: {},
      // 凭证行hover事件
      pingZhengRowHover: [],
      // 凭证缓存
      pingZhengCache: {
        leftPingZhengNum: null,
        rightPingZhengNum: null,
        addPingZhengModelCache: {}
      },
      vouchTableScrollY: 0,
      successCallback: () => '',

      keMuList: [],
      closeCallback: () => '',
      trs: [],
      switchData: {
        'date': '',
        'type': '',
        'num': '',
        'bill_num': ''
      },
      fuZhuHeSuanApiData: {
        fzDept: {list: []},
        fzEmp: {list: []},
        fzCustomer: {list: []},
        fzSupplier: {list: []},
        fzCunHuo: {list: []},
        fzXiangMuMulu: {list: []}
      },
      firstStep: () => '',

      async clearRows() {
        this.pingZhengModel.rows = pingzhengHelper.cast4Row([]);
      },

      queryVoucherDefaultDate() {
        let date;
        $.ajax({
          type: 'post',
          url: urlPath + '/voucher!queryVoucherDefaultDate',
          async: false,
          success: function(res) {
            date = res.msg;
          }
        });
        return date;
      },

      close() {
        layui.layer.close(this.layOpenId);
        this.themeDiv.remove();
        this.instance.$el.remove();
        // closeCallback()
      }
    },
    actions:{
      async getCurrentPingZhengApiData({rootState}) {
        const {castApiData} = pingzhengHelper.pingZhengApiDataHelper();
        const apiData = castApiData(rootState.pingZhengModel);
        return apiData
      },
      async newPingZheng({state}){
        state.clearRows();
        const pingZhengModel = await toAddPingZhengModel(state.pingZhengModel);

        pingZhengModel.props.date = state.queryVoucherDefaultDate();
        pingZhengModel.props.danJuNum = 0;
        state.pingZhengModel = pingZhengModel;
        setTimeout(() => {
          state.firstStep();
        }, 200);
      }
    }
  });
  Object.assign(store.state, pingzhengsave);
  return store;
};
