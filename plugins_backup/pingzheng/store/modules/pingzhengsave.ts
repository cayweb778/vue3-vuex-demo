/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
import system from '../../../csd-app/store/modules/system';
import {AssertProhibitToAddMsg, verifyPingZhengHandle} from './pingzhengsave-function';
import {saveInsertPingZheng, saveNewPingZheng} from '../../api/pingzhengsave';


export default {
  namespaced: true,
  state: () => ({
    prohibitToAdd: false
  }),
  modules: {
    system
  },
  mutations: {},
  actions: {
    /**
     * 使用保存接口
     * @returns {Promise<void>}
     */
    async useSavePingZheng({state, dispatch, rootState},apiExec) {
      AssertProhibitToAddMsg(state.prohibitToAdd);

      const {status} = await dispatch('verifyPingZhengModel');
      if (status === 'verifyError') {
        state.prohibitToAdd = false;
        return;
      }

      const apiData = await dispatch('getCurrentPingZhengApiData', null, {root: true});

      await apiExec({apiData})
      state.prohibitToAdd = false;

      rootState.successCallback({pingZhengModel:rootState.pingZhengModel, apiData, close:rootState.close, state:rootState});

      if (rootState.successMsg == null) {
        layer.msg('保存成功', (i) => {
          layer.close(i);
        });
      } else {
        rootState.successMsg();
      }
    },
    async verifyPingZhengModel({state, rootState}) {
      let status = 'startverify';
      let apiData = {};
      if (AssertProhibitToAddMsg(state.prohibitToAdd)) {
        return;
      }
      state.prohibitToAdd = true;

      if (!await verifyPingZhengHandle(rootState.pingZhengTableInstance)) {
        status = 'verifyError';

      } else {

        status = 'success';
      }
      return {status};
    },

    /**
     * 插入凭证
     * @param pingZhengRows
     */
    saveInsertPingZheng: async ({dispatch}) => {
      dispatch('useSavePingZheng', async ({apiData}) => await saveInsertPingZheng({apiData}));
    },
    /**
     * 新增凭证
     * @param pingZhengRows
     */
    saveNewPingZheng: async ({dispatch}) => {
      await dispatch('useSavePingZheng', async ({apiData}) => await saveNewPingZheng({apiData}));
    },

    /**
     * 保存新增凭证并继续新增
     * @returns {Promise<void>}
     */
    async saveNewPingZhengAndContinue({dispatch}) {
      await dispatch('saveNewPingZheng');
      layer.msg('保存成功,继续新增', (i) => layer.close(i));
      dispatch('newPingZheng', null, {root: true});
    }
  },

  getters: {}
};
