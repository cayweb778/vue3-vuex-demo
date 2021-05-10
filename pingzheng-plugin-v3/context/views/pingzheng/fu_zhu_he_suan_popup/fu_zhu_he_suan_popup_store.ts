// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-nocheck
//
// /* eslint-disable */
// // import Vuex from '../../../boozjs-vuex/3.x';
// import {
//   queryCHList,
//   queryCustomerList,
//   queryDeptList,
//   queryGYList,
//   queryItemList,
//   queryPersonList
// } from '../../../api/fu_zhu_he_suan';
//
//
// // 辅助核算模型
// function FuZhuHeSuanModel({
//                             // key
//                             key,
//                             // label
//                             label,
//                             // 编码
//                             num,
//                             // 名字
//                             name,
//                             // 实际对象
//                             target,
//                             // 唯一码
//                             uniqueCode,
//                             // 值
//                             value
//                           }) {
//   return {
//     // key
//     key,
//     // label
//     label,
//     // 编码
//     num,
//     // 名字
//     name,
//     // 实际对象
//     target,
//     // 唯一码
//     uniqueCode,
//     // 值
//     value
//   };
// }
//
//
// const createStoreModel = () => ({
//   namespaced: true,
//   state: {
//     deptList: null,
//     personList: null,
//     customerList: null,
//     gyList: null,
//     chList: null,
//     itemList: null
//   },
//   actions: {
//     async getDeptList({commit, state}) {
//       if (state.deptList == null) {
//         let a = (await queryDeptList());
//         state.deptList = {
//           name: '部门',
//           columnName: 'fzDept',
//           list: [
//             ...a.map(item =>
//                 new FuZhuHeSuanModel({
//                   key: item['num'],
//                   name: item['num'] + ' ' + item['name'],
//                   value: item['uniqueCode'],
//                   num: item['num'],
//                   uniqueCode: item['uniqueCode'],
//                   label: item['name'],
//                   target: item
//                 })
//             )
//           ]
//         };
//       }
//       return state.deptList;
//     },
//     async getPersonList({commit, state}) {
//
//       if (state.personList == null) {
//         state.personList = {
//           name: '人员',
//           columnName: 'fzEmp',
//
//           list: (await queryPersonList())
//               .map(item =>
//                   new FuZhuHeSuanModel({
//                     key: item['empNum'],
//                     uniqueCode: item['uniqueCode'],
//                     name: item['empNum'] + ' ' + item['empName'],
//                     value: item['uniqueCode'],
//                     num: item['empNum'],
//                     label: item['empName'],
//                     target: item
//                   })
//               )
//         };
//       }
//       return state.personList;
//
//     },
//     async getCustomerList({commit, state}) {
//
//       if (state.customerList == null) {
//         state.customerList = {
//           name: '客户',
//           columnName: 'fzCustomer',
//
//           list: (await queryCustomerList()).map(item =>
//               new FuZhuHeSuanModel({
//                 key: item['fzCusNum'],
//                 name: item['fzCusNum'] + ' ' + item['fzCusName'],
//                 value: item['uniqueCode'],
//                 uniqueCode: item['uniqueCode'],
//                 num: item['fzCusNum'],
//                 label: item['fzCusName'],
//                 target: item
//               })
//           )
//         };
//       }
//       return state.customerList;
//
//     },
//     async getGYList({commit, state}) {
//
//
//       if (state.gyList == null) {
//         state.gyList = {
//           name: '供应商',
//
//           columnName: 'fzSupplier',
//           list: (await queryGYList()).map(item => new FuZhuHeSuanModel({
//                 key: item['fzSupNum'],
//                 name: item['fzSupNum'] + ' ' + item['fzSupName'],
//                 value: item['uniqueCode'],
//                 num: item['fzSupNum'],
//                 uniqueCode: item['uniqueCode'],
//                 label: item['fzSupName'],
//                 target: item
//               })
//           )
//         };
//       }
//       return state.gyList;
//
//     },
//     async getCHList({commit, state}) {
//
//
//       if (state.chList == null) {
//         state.chList = {
//           name: '存货档案',
//
//           columnName: 'fzCunHuo',
//           list: (await queryCHList()).map(item =>
//               new FuZhuHeSuanModel({
//                 key: item['fzStNum'],
//
//                 name: item['fzStNum'] + ' ' + item['fzStName'],
//                 value: item['uniqueCode'],
//                 num: item['fzStNum'],
//                 uniqueCode: item['uniqueCode'],
//                 label: item['fzStName'],
//                 target: item
//               })
//           )
//         };
//       }
//       return state.chList;
//
//     },
//     async getItemList({commit, state}) {
//
//
//       if (state.itemList == null) {
//         state.itemList = {
//           name: '项目档案',
//           columnName: 'fzXiangMuMulu',
//           list: (await queryItemList()).map(item =>
//               new FuZhuHeSuanModel({
//                 key: item['fzProNum'],
//                 name: item['fzProNum'] + ' ' + item['fzProName'],
//                 value: item['uniqueCode'],
//                 num: item['fzProNum'],
//                 uniqueCode: item['uniqueCode'],
//                 label: item['fzProName'],
//                 target: item
//               })
//           )
//
//         };
//       }
//       return state.itemList;
//
//     }
//   }
// });
//
// const createComputed = () => ({
//   ...mapState({
//     pingZhengNum: state => state.pingZhengNum,
//     pingZhengModel: state => state.pingZhengModel
//   })
// });
//
//
// const {mapState, mapActions} = createNamespacedHelpers('fuZhuHeSuan/fuZhuHeSuanData');
//
// export const useEditPingZhengMixin = () => ({
//   computed: createComputed(),
//   methods: {
//     ...mapActions([
//       'getDeptList',
//       'getPersonList',
//       'getCustomerList',
//       'getGYList',
//       'getCHList',
//       'getItemList'
//     ])
//   },
//   beforeCreate() {
//     if (!this.$store.hasModule(['fuZhuHeSuan', 'fuZhuHeSuanData'])) {
//       this.$store.registerModule(['fuZhuHeSuan'], {namespaced: true});
//       this.$store.registerModule(['fuZhuHeSuan', 'fuZhuHeSuanData'], createStoreModel());
//     }
//   }
// });
