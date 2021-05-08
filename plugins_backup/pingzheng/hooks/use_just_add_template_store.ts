/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {createStore as createStore2} from '../store/store';

export const createStore = ({pingZhengModel, successCallback, storeSup}) => {
  const store = createStore2();
  // store.replaceState()
  // Object.assign(store,storeSup)
  store.state.pingZhengModel = pingZhengModel;
  store.state.successCallback = successCallback;
  return store;
};
