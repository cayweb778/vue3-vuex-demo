/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// 请求封装
    $reuqest = (() => {
        return {
            get(url) {
                let result
                $.ajax({
                    url: url,
                    async: false,
                    success: (res) => result = res
                })
                return result
            }
        }
    })()
// 辅助核算标志
    window.FUZHUHESUANFLAG = {
        // 个人往来
        BPERSON: 'bperson',
        // 往来单位
        BRELATIVEUNIT: 'brelativeUnit',
        // 部门
        BDEPT: 'bdept',
        // 项目
        BITEM: 'bitem',
        // 存货
        BINVENTORY: 'binventory',
        // 客户
        BR: 'br',
        // 供应商
        BE: 'be'
    }


// 辅助核算模型
    function FuZhuHeSuanModel({
                                  // key
                                  key,
                                  // label
                                  label,
                                  // 编码
                                  num,
                                  // 名字
                                  name,
                                  // 实际对象
                                  target,
                                  // 唯一码
                                  uniqueCode,
                                  // 值
                                  value
                              }) {
        return {
            // key
            key,
            // label
            label,
            // 编码
            num,
            // 名字
            name,
            // 实际对象
            target,
            // 唯一码
            uniqueCode,
            // 值
            value
        }
    }

// // 辅助核算APi
//     function fuZhuHeSuanApi() {
//         function getList(obj) {
//             return obj.list
//         }
//
//         return {
//             queryDeptList: async () => getList(await $reuqest.get(urlPath + "/assist!getDeptList")),
//             queryPersonList: async () => getList(await $reuqest.get(urlPath + "/assist!getPersonList")),
//             queryCustomerList: async () => getList(await $reuqest.get(urlPath + "/assist!getCustomList")),
//             queryGYList: async () => getList(await $reuqest.get(urlPath + "/assist!getSupList")),
//             queryCHList: async () => getList(await $reuqest.get(urlPath + "/assist!getStockList")),
//             queryItemList: async () => getList(await $reuqest.get(urlPath + "/assist!getItemList"))
//         }
//     }
//
//     const {
//         queryDeptList,
//         queryPersonList,
//         queryCustomerList,
//         queryGYList,
//         queryCHList,
//         queryItemList
//     } = fuZhuHeSuanApi()

    // async function getFuZhuHeSuanList(fuZhuHeSuanName) {
    //     if (fuZhuHeSuanName == 'fzDept') {
    //         let a = (await queryDeptList()).map(item =>
    //             new FuZhuHeSuanModel({
    //                 key: item['num'],
    //                 name: item['num'] + ' ' + item['name'],
    //                 value: item['num'],
    //                 num: item['num'],
    //                 uniqueCode: item['uniqueCode'],
    //                 label: item['name'],
    //                 target: item
    //             }),
    //         )
    //         return a
    //     }
    //     if (fuZhuHeSuanName == 'fzEmp') {
    //         return (await queryPersonList()).map(item =>
    //             new FuZhuHeSuanModel({
    //                 key: item['empNum'],
    //                 uniqueCode: item['uniqueCode'],
    //                 name: item['empNum'] + ' ' + item['empName'],
    //                 value: item['empNum'],
    //                 num: item['empNum'],
    //                 label: item['empName'],
    //                 target: item
    //             })
    //         )
    //     }
    //     if (fuZhuHeSuanName == 'fzCustomer') {
    //         return (await queryCustomerList()).map(item =>
    //             new FuZhuHeSuanModel({
    //                 key: item['fzCusNum'],
    //                 name: item['fzCusNum'] + ' ' + item['fzCusName'],
    //                 value: item['fzCusNum'],
    //                 uniqueCode: item['uniqueCode'],
    //                 num: item['fzCusNum'],
    //                 label: item['fzCusName'],
    //                 target: item
    //             })
    //         )
    //     }
    //     if (fuZhuHeSuanName == 'fzSupplier') {
    //         return (await queryGYList()).map(item => new FuZhuHeSuanModel({
    //                 key: item['fzSupNum'],
    //                 name: item['fzSupNum'] + ' ' + item['fzSupName'],
    //                 value: item['fzSupNum'],
    //                 num: item['fzSupNum'],
    //                 uniqueCode: item['uniqueCode'],
    //                 label: item['fzSupName'],
    //                 target: item
    //             })
    //         )
    //     }
    //     if (fuZhuHeSuanName == 'fzCunHuo') {
    //         return (await queryCHList()).map(item =>
    //             new FuZhuHeSuanModel({
    //                 key: item['fzStNum'],
    //
    //                 name: item['fzStNum'] + ' ' + item['fzStName'],
    //                 value: item['fzStNum'],
    //                 num: item['fzStNum'],
    //                 uniqueCode: item['uniqueCode'],
    //                 label: item['fzStName'],
    //                 target: item
    //             })
    //         )
    //     }
    //     if (fuZhuHeSuanName == 'fzXiangMuMulu') {
    //         return (await queryItemList()).map(item =>
    //             new FuZhuHeSuanModel({
    //                 key: item['fzProNum'],
    //                 name: item['fzProNum'] + ' ' + item['fzProName'],
    //                 value: item['fzProNum'],
    //                 num: item['fzProNum'],
    //                 uniqueCode: item['uniqueCode'],
    //                 label: item['fzProName'],
    //                 target: item
    //             })
    //         )
    //     }
    // }

    // const fuZhuHeSuanApi2={
    //   async getDeptList() {
    //     const state=this.$store.state
    //     if (state.deptList == null) {
    //       state.deptList =  (await queryDeptList()).map(item =>
    //           new FuZhuHeSuanModel({
    //             key: item['num'],
    //             name: item['num'] + ' ' + item['name'],
    //             value: item['num'],
    //             num: item['num'],
    //             uniqueCode: item['uniqueCode'],
    //             label: item['name'],
    //             target: item
    //           })
    //       )
    //     }
    //     return state.deptList
    //   },
    //   async getPersonList(){
    //     const state=this.$store.state
    //     if (state.personList == null) {
    //       state.personList =   (await queryPersonList()).map(item =>
    //           new FuZhuHeSuanModel({
    //             key: item['empNum'],
    //             uniqueCode: item['uniqueCode'],
    //             name: item['empNum'] + ' ' + item['empName'],
    //             value: item['empNum'],
    //             num: item['empNum'],
    //             label: item['empName'],
    //             target: item
    //           })
    //       )
    //     }
    //     return state.personList
    //
    //   },
    //   async getCustomerList(){
    //     const state=this.$store.state
    //     if (state.customerList == null) {
    //       state.customerList =   (await queryCustomerList()).map(item =>
    //           new FuZhuHeSuanModel({
    //             key: item['fzCusNum'],
    //             name: item['fzCusNum'] + ' ' + item['fzCusName'],
    //             value: item['fzCusNum'],
    //             uniqueCode: item['uniqueCode'],
    //             num: item['fzCusNum'],
    //             label: item['fzCusName'],
    //             target: item
    //           })
    //       )
    //     }
    //     return state.customerList
    //
    //   },
    //   async getGYList(){
    //
    //     const state=this.$store.state
    //     if (state.gyList == null) {
    //       state.gyList =   (await queryGYList()).map(item => new FuZhuHeSuanModel({
    //             key: item['fzSupNum'],
    //             name: item['fzSupNum'] + ' ' + item['fzSupName'],
    //             value: item['fzSupNum'],
    //             num: item['fzSupNum'],
    //             uniqueCode: item['uniqueCode'],
    //             label: item['fzSupName'],
    //             target: item
    //           })
    //       )
    //     }
    //     return state.gyList
    //
    //   },
    //   async getCHList(){
    //
    //     const state=this.$store.state
    //     if (state.chList == null) {
    //       state.chList =   (await queryCHList()).map(item =>
    //           new FuZhuHeSuanModel({
    //             key: item['fzStNum'],
    //
    //             name: item['fzStNum'] + ' ' + item['fzStName'],
    //             value: item['fzStNum'],
    //             num: item['fzStNum'],
    //             uniqueCode: item['uniqueCode'],
    //             label: item['fzStName'],
    //             target: item
    //           })
    //       )
    //     }
    //     return state.chList
    //
    //   },
    //   async getItemList(){
    //
    //     const state=this.$store.state
    //     if (state.itemList == null) {
    //       state.itemList =   (await queryItemList()).map(item =>
    //           new FuZhuHeSuanModel({
    //             key: item['fzProNum'],
    //             name: item['fzProNum'] + ' ' + item['fzProName'],
    //             value: item['fzProNum'],
    //             num: item['fzProNum'],
    //             uniqueCode: item['uniqueCode'],
    //             label: item['fzProName'],
    //             target: item
    //           })
    //       )
    //     }
    //     return state.itemList
    //
    //   }
    // }

  // exports.fuZhuHeSuanApi = fuZhuHeSuanApi
    export const fuZhuHeSuanlistMixin = ()=>({
        methods: {
            ...fuZhuHeSuanApi
        }
    })

