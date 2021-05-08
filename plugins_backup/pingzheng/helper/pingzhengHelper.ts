/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
import {fuZhuHeSuanModel} from '../model/pingzheng_model';
import {baseUrl} from '../../csd-app/config';
import Qs from 'qs'
import {$request} from '../../boozapp-request/boozapp-request';

export default {
  pingZhengModelHelper() {
    function createPingZhengModel(options, props, data) {
      return {
        // 凭证选项数据
        options,
        // 凭证属性
        props,
        // 凭证数据
        data
      };
    }

    function createPingZhengRowModel({
                                       zhaiYao,
                                       kuaiJiKeMuCode,
                                       kuaiJiKeMuFullName,
                                       jieMoney,
                                       daiMoney,
                                       fzDept,
                                       fzEmp,
                                       fzCustomer,
                                       fzSupplier,
                                       fzCunHuo,
                                       fzXiangMuMulu
                                     }) {
      return {
        // 摘要
        zhaiYao,
        // 科目编码
        kuaiJiKeMuCode,
        // 全限定名
        kuaiJiKeMuFullName,
        // 借方金额
        jieMoney,
        // 贷方金额
        daiMoney,
        // 辅助核算: 部门
        fzDept,
        // 辅助核算: 人员
        fzEmp,
        // 辅助核算: 客户
        fzCustomer,
        // 辅助核算: 供应商
        fzSupplier,
        // 辅助核算: 存货
        fzCunHuo,
        // 辅助核算: 项目目录
        fzXiangMuMulu
      };
    }

    function createPropsModel({date, type, pingZhengNumOfMonth, danJuNum, zdr, pingZhengNum, pingZhengFrom}) {
      return {
        // 日期 (例: 2020-01-01)
        date,
        // 类型 (例: 01(记)、转)
        type,
        // 编码 (例: 001...)
        pingZhengNumOfMonth,
        // 单据数 (例: n(张))
        danJuNum,
        // 制单人 (例: 张三)
        zdr,
        // 凭证号 (例: PZ000000000001)
        pingZhengNum,
        // 凭证来源
        pingZhengFrom
      };
    }

    function createOptionsModel({title, type}) {
      return {
        // 标题名
        title
        // btn组
        // ...
      };
    }

    return {

      createPingZhengModel,
      createOptionsModel,
      createPropsModel,
      createPingZhengRowModel,
      castPingZhengModel(apiData, {title}) {
        const pingZhengModel = {
          options: {
            title
          },
          props: {},
          rows: []
        };
        // 来源编号
        pingZhengModel.props.pingZhengFrom = apiData[0].from_num;
        // 添置凭证显示日期
        pingZhengModel.props.date = apiData[0].fillInDate;
        // 单据类型
        pingZhengModel.props.type = apiData[0].vouchType;
        // 单据月编号
        pingZhengModel.props.pingZhengNumOfMonth = apiData[0].inoId;
        // 制单人
        pingZhengModel.props.zdr = apiData[0].fillPsn;
        // 单据张
        pingZhengModel.props.danJuNum = apiData[0].voucherBillNum;


        pingZhengModel.rows = apiData.map(row => {
          return {
            // 摘要
            zhaiYao: row.cdigest,
            // 会计科目代号
            kuaiJiKeMuCode: row.ccode,
            // 借方金额
            jieMoney: row.md,
            // 贷方金额
            daiMoney: row.mc,
            // 部门
            fzDept: row.cdeptId,
            // 个人往来
            fzEmp: row.cpersonId,
            // 客户
            fzCustomer: row.ccusId,
            // 供应商
            fzSupplier: row.csupId,
            // 存货
            fzCunHuo: row.cstockId,
            // 项目
            fzXiangMuMulu: row.citemId
          };
        });
        return pingZhengModel;

      }
      // castApiData(pingZhengModel) {
      //     const props = pingZhengModel.props
      //     const data = pingZhengModel.data
      //     const apiData = data.map(item => {
      //         const pingZhengRowModel = createPingZhengRowModel()
      //             // 凭证数据
      //             (() => {
      //                 // 摘要
      //                 pingZhengRowModel.cdigest = item.cdigest
      //                 // 会计科目代号
      //                 pingZhengRowModel.ccode = item.ccode
      //                 // 科目大类
      //                 pingZhengRowModel.cclass = item.cclass
      //                 // 借方金额
      //                 pingZhengRowModel.md = item.md
      //                 // 贷方金额
      //                 pingZhengRowModel.mc = item.mc
      //                 // 凭证分录编号
      //                 pingZhengRowModel.inid = item.inid
      //             })();
      //         // 辅助核算
      //         (() => {
      //             // 部门
      //             pingZhengRowModel.cdeptId = item.cdeptId
      //             // 个人往来
      //             pingZhengRowModel.cpersonId = item.cpersonId
      //             // 客户
      //             pingZhengRowModel.ccusId = item.ccusId
      //             // 供应商
      //             pingZhengRowModel.csupId = item.csupId
      //             // 存货
      //             pingZhengRowModel.cstockId = item.cstockId
      //             // 项目
      //             pingZhengRowModel.citemId = item.citemId
      //         })();
      //         // 凭证信息
      //         (function () {
      //             // 来源编号
      //             pingZhengRowModel.fromNum = item.fromNum
      //             // 添置凭证显示日期
      //             pingZhengRowModel.fillInDate = item.fillInDate
      //             // 凭证唯一编号
      //             pingZhengRowModel.coutnoId = item.coutnoId
      //             // 单据类型
      //             pingZhengRowModel.vouchType = item.vouchType
      //             // 单据月编号
      //             pingZhengRowModel.inoId = item.inoId
      //             // 制单人
      //             pingZhengRowModel.fillPsn = item.fillPsn
      //             // 制单日期 年
      //             pingZhengRowModel.iyear = item.iyear
      //             // 制单日期 年月
      //             pingZhengRowModel.iyperiod = item.iyperiod
      //             // 制单日期 月
      //             pingZhengRowModel.iperiod = item.iperiod
      //             // 单据张
      //             pingZhengRowModel.voucherBillNum = item.voucherBillNum
      //         })()
      //         return pingZhengRowModel
      //     })
      //     return apiData
      // }
    };
  },

  pingZhengModelApiHelper() {

    const {getPingZhengNumOfMonth} = apiProcess();
    // async function getPingZhengNumOfMonth({type, date}) {
    //   let result = await $request({
    //     method: 'post',
    //     url: '/voucher!getVoucherMaxNum',
    //     data: Qs.stringify({
    //       'requestMap.voucherType': type,
    //       'requestMap.dateTime': date
    //     })
    //   });
    //   let pingZhengNumOfMonth=result.data.msg
    //   return pingZhengNumOfMonth;
    // }

    async function getKeMuList({year}) {

      let objs = {
        'parms.iyear': year
      };
      let result = await $request({
        method: 'post',
        url: '/getPingZheng!Query_KM',
        data: Qs.stringify(objs)
      });
      const keMuList=result.data;
      // $.ajax({
      //   type: 'post',
      //   url: baseUrl + '/getPingZheng!Query_KM',
      //   data: objs,
      //   async: false,
      //   dataType: 'JSON',
      //   success: (list) => {
      //     // this.subs = list;
      //     keMuList = list;
      //     // for (let i in this.subs) {
      //     //   this.subs[i].hide = false;
      //     //   this.subs[i].hide = false;
      //     // }
      //     // if (this.renderSubjectStart == true) {
      //     //   this.renderSubject();
      //     // }
      //   },
      //   error: function(error) {
      //     console.error(error);
      //   }
      // });
      return keMuList;
    }

    function createEmptyFuZhuHeSuanModel() {
      return fuZhuHeSuanModel({
        // 部门
        fzDept: null,
        // 个人往来
        fzEmp: null,
        // 客户
        fzCustomer: null,
        // 供应商
        fzSupplier: null,
        // 存货
        fzCunHuo: null,
        // 项目
        fzXiangMuMulu: null
      });
    }

    async function toPingZhengModel(pingzhengModel) {
      const keMuList = await getKeMuList({year: pingzhengModel.props.date.split('-')[0]});
      pingzhengModel.rows = pingzhengModel.rows.map(row => {
            let kemu = keMuList.filter(kemu => row.kuaiJiKeMuCode == kemu.ccode)[0];
            if (kemu != null) {
              row.kuaiJiKeMuPath = kemu.ccodepath;
              row.kuaiJiKeMuFullName = row.kuaiJiKeMuCode + ' ' + kemu.ccodepath;
            } else {
              row.kuaiJiKeMuPath = '';
              row.kuaiJiKeMuFullName = '';

            }

            row = {
              ...createEmptyFuZhuHeSuanModel(),
              ...row
            };
            return row;
          }
      );
      return pingzhengModel;
    }

    return {
      getPingZhengNumOfMonth,
      toPingZhengModel,
      async toAddPingZhengModel(pingzhengModel) {
        pingzhengModel.props.pingZhengNumOfMonth = await getPingZhengNumOfMonth({
          type: pingzhengModel.props.type,
          date: pingzhengModel.props.date
        });
        return await toPingZhengModel(pingzhengModel)
      },
      async toShowPingZhengModel(pingzhengModel) {
        return await toPingZhengModel(pingzhengModel);
      }
    };
  },

  pingZhengApiDataHelper() {
    function createPingZhengRowModel() {
      return {
        id: '',
        vouchType: '',
        flagInvaild: '',
        inoId: '',
        cclass: '',
        iyear: '',
        iperiod: '',
        iyperiod: '',
        iflag: '',
        fillPsn: '',
        fillCheck: '',
        fillAccnt: '',
        cdigest: '',
        inid: '',
        ccode: '',
        md: '',
        mc: '',
        ccodeEqual: '',
        csettle: '',
        cnId: '',
        cnDate: '',
        fillInDate: '',
        cdeptId: '',
        cpersonId: '',
        crelativeUni: '',
        ccusId: '',
        csupId: '',
        citemId: '',
        citemClass: '',
        coutnoId: '',
        cstockId: '',
        from_num: '',
        voucherBillNum: ''
      };
    }

    function isInVaildPingZhengRow(row) {
      let warnList = [];
      if (row.zhaiYao == '') {
        warnList.push('摘要为空');
        return false;
      }
      if (row.kuaiJiKeMuCode == '') {
        warnList.push('科目代码为空');
        return false;
      }
      if (row.jieMoney == '0.00' && row.daiMoney == '0.00') {
        warnList.push('凭证借贷金额为0.00');
        return false;
      }
      warnList
          .map(console.log);
      return true;
    }

    function castApiData(pingZhengModel) {
      const props = pingZhengModel.props;
      const rows = pingZhengModel.rows;
      let i = 1;
      return rows
          .filter(isInVaildPingZhengRow)
          .map(item => {
            const pingZhengRowModel = createPingZhengRowModel();
            if (pingZhengModel.props.pingZhengNum != null) {
              // 修改凭证
              pingZhengRowModel.coutnoId = pingZhengModel.props.pingZhengNum;
            }
            // 凭证数据
            ;(() => {
              // 摘要
              pingZhengRowModel.cdigest = item.zhaiYao;
              // 会计科目代号
              pingZhengRowModel.ccode = item.kuaiJiKeMuCode;
              // 科目大类
              pingZhengRowModel.cclass = item.kuaiJiKeMuCode.toString().substr(0, 1);
              // 借方金额
              pingZhengRowModel.md = item.jieMoney;
              // 贷方金额
              pingZhengRowModel.mc = item.daiMoney;
              // 凭证分录编号
              pingZhengRowModel.inid = i++;
            })();
            // 辅助核算
            (() => {
              // fzDept,
              //     fzEmp,
              //     fzCustomer,
              //     fzSupplier,
              //     fzCunHuo,
              //     fzXiangMuMulu

              // 部门
              pingZhengRowModel.cdeptId = item.fzDept;
              // 个人往来
              pingZhengRowModel.cpersonId = item.fzEmp;
              // 客户
              pingZhengRowModel.ccusId = item.fzCustomer;
              // 供应商
              pingZhengRowModel.csupId = item.fzSupplier;
              // 存货
              pingZhengRowModel.cstockId = item.fzCunHuo;
              // 项目
              pingZhengRowModel.citemId = item.fzXiangMuMulu;
            })();
            // 凭证信息
            (function() {
              // // 日期 (例: 2020-01-01)
              // date,
              //     // 类型 (例: 01(记)、转)
              //     type,
              //     // 编码 (例: 001...)
              //     pingZhengNumOfMonth,
              //     // 单据数 (例: n(张))
              //     danJuNum,
              //     // 制单人 (例: 张三)
              //     zdr,
              //     // 凭证号 (例: PZ000000000001)
              //     pingZhengNum,
              //     // 凭证来源
              //     pingZhengFrom


              // 来源编号
              pingZhengRowModel.from_num = props.pingZhengFrom;
              // 添置凭证显示日期
              pingZhengRowModel.fillInDate = props.date;
              // 单据类型
              pingZhengRowModel.vouchType = props.type;
              // 单据月编号
              pingZhengRowModel.inoId = props.pingZhengNumOfMonth;
              // 制单人
              pingZhengRowModel.fillPsn = props.zdr;
              // 制单日期 年
              pingZhengRowModel.iyear = props.date.split('-')[0];
              // 制单日期 年月
              pingZhengRowModel.iyperiod = props.date.split('-')[0] + props.date.split('-')[1];
              // 制单日期 月
              pingZhengRowModel.iperiod = props.date.split('-')[1];
              // 单据张
              pingZhengRowModel.voucherBillNum = props.danJuNum;
            })();
            return pingZhengRowModel;
          });
    }

    return {
      createPingZhengRowModel,
      castApiData
    };
  },

  cast4Row  (pingZhengRows)  {
    const {createPingZhengRowModel} = this.pingZhengModelHelper();
    let rowsLength = pingZhengRows.length;
    if (rowsLength < 4) {
      for (let i = 0; i < 4 - rowsLength; i++) {
        pingZhengRows.push(createPingZhengRowModel({
          zhaiYao: '',
          kuaiJiKeMuCode: '',
          jieMoney: '0.00',
          daiMoney: '0.00'
        }));
      }
    }
    return pingZhengRows;

  }

}
