/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
import $ from 'jquery'
const api = {
    queryDefaultDate: async () => {
        // let date;
        // $.ajax({
        //     type: 'post',
        //     url: '/ysd' + '/voucher!queryVoucherDefaultDate',
        //     async: false,
        //     success: function(res) {
        //         date = res.msg;
        //     }
        // });
        const result = {'list': null, 'map': {}, 'msg': '2014-01-01', 'msgs': null, 'obj': null, 'status': null};
        return result.msg;
    },
    async getPingZhengNumOfMonthDataApi({type, date}) {
        //
        // const result = await $request({
        //     method: 'post',
        //     url: '/voucher!getVoucherMaxNum',
        //     data: Qs.stringify({
        //         'requestMap.voucherType': type,
        //         'requestMap.dateTime': date
        //     })
        // });
        return {'list': null, 'map': {}, 'msg': '001', 'msgs': null, 'obj': null, 'status': null};
    },
    async queryPrePingZhengNum({num, date}) {
        // let result = await $request({
        //     method: 'post',
        //     url: '/voucher!checkVouchNum',
        //     data: Qs.stringify({
        //         'requestMap.num': num,
        //         'requestMap.dateTime': date
        //     })
        // });
        const result = {
            'list': null,
            'map': {'next': null, 'pre': null},
            'msg': null,
            'msgs': null,
            'obj': null,
            'status': '200'
        };
        return {
            leftPingZhengNum: result.map['pre']
        };
    },
    async getVouchTypeDateApi() {
        // const result = await $request({
        //     url: '/getPingZheng!queryVouchType',
        //     method: 'get'
        // });
        const result = {
            'list': null,
            'map': {'PZVouchTypeList': [['1', '记', '1', ''], ['2', '转', '0', '']]},
            'msg': null,
            'msgs': null,
            'obj': null,
            'status': null
        };
        return result.map.PZVouchTypeList;
    },
    async queryDateSectionDataApi() {
        const result = {
            'list': null,
            'map': {},
            'msg': null,
            'msgs': null,
            'obj': ['2014-01-01', '2014-12-31'],
            'status': null
        };
        // const result = await $request({
        //     url: '/voucher!queryDateSection1',
        //     method: 'get'
        // });

        return result.obj;

    },
    async queryKeMuListApi({year}) {
        // let keMuList;
        //
        // let objs = {
        //     'parms.iyear': year
        // };
        // $.ajax({
        //     type: 'post',
        //     url: urlPath + '/getPingZheng!Query_KM',
        //     data: objs,
        //     async: false,
        //     dataType: 'JSON',
        //     success: (list) => {
        //         this.subs = list;
        //         keMuList = list;
        //         for (let i in this.subs) {
        //             this.subs[i].hide = false;
        //             this.subs[i].hide = false;
        //         }
        //         if (this.renderSubjectStart == true) {
        //             this.renderSubject();
        //         }
        //         if (callback != null) {
        //             this.$nextTick(function() {
        //                 callback();
        //             });
        //         }
        //     },
        //     error: function(error) {
        //         console.error(error);
        //     }
        // });
        return [{"ccode":"1001","ccodename":"现金","ccodepath":"现金"},{"ccode":"1002","ccodename":"银行存款","ccodepath":"银行存款"},{"ccode":"100901","ccodename":"外埠存款","ccodepath":"其他货币资金\/外埠存款"},{"ccode":"100902","ccodename":"银行本票","ccodepath":"其他货币资金\/银行本票"},{"ccode":"100903","ccodename":"银行汇票","ccodepath":"其他货币资金\/银行汇票"},{"ccode":"100904","ccodename":"信用卡","ccodepath":"其他货币资金\/信用卡"},{"ccode":"100905","ccodename":"信用证保证金","ccodepath":"其他货币资金\/信用证保证金"},{"ccode":"100906","ccodename":"存出投资款","ccodepath":"其他货币资金\/存出投资款"},{"ccode":"110101","ccodename":"股票","ccodepath":"短期投资\/股票"},{"ccode":"110102","ccodename":"债券","ccodepath":"短期投资\/债券"},{"ccode":"110103","ccodename":"基金","ccodepath":"短期投资\/基金"},{"ccode":"110110","ccodename":"其他","ccodepath":"短期投资\/其他"},{"ccode":"1102","ccodename":"短期投资跌价准备","ccodepath":"短期投资跌价准备"},{"ccode":"1111","ccodename":"应收票据","ccodepath":"应收票据"},{"ccode":"1121","ccodename":"应收股利","ccodepath":"应收股利"},{"ccode":"1122","ccodename":"应收利息","ccodepath":"应收利息"},{"ccode":"1131","ccodename":"应收账款","ccodepath":"应收账款"},{"ccode":"1133","ccodename":"其他应收款","ccodepath":"其他应收款"},{"ccode":"1141","ccodename":"坏账准备","ccodepath":"坏账准备"},{"ccode":"1151","ccodename":"预付账款","ccodepath":"预付账款"},{"ccode":"1161","ccodename":"应收补贴款","ccodepath":"应收补贴款"},{"ccode":"1201","ccodename":"物资采购","ccodepath":"物资采购"},{"ccode":"1211","ccodename":"原材料","ccodepath":"原材料"},{"ccode":"1221","ccodename":"包装物","ccodepath":"包装物"},{"ccode":"1231","ccodename":"低值易耗品","ccodepath":"低值易耗品"},{"ccode":"1232","ccodename":"材料成本差异","ccodepath":"材料成本差异"},{"ccode":"1241","ccodename":"自制半成品","ccodepath":"自制半成品"},{"ccode":"1243","ccodename":"库存商品","ccodepath":"库存商品"},{"ccode":"1244","ccodename":"商品进销差价","ccodepath":"商品进销差价"},{"ccode":"1251","ccodename":"委托加工物资","ccodepath":"委托加工物资"},{"ccode":"1261","ccodename":"委托代销商品","ccodepath":"委托代销商品"},{"ccode":"1271","ccodename":"受托代销商品","ccodepath":"受托代销商品"},{"ccode":"1281","ccodename":"存货跌价准备","ccodepath":"存货跌价准备"},{"ccode":"1291","ccodename":"分期收款发出商品","ccodepath":"分期收款发出商品"},{"ccode":"1301","ccodename":"待摊费用","ccodepath":"待摊费用"},{"ccode":"140101","ccodename":"股票投资","ccodepath":"长期股权投资\/股票投资"},{"ccode":"140102","ccodename":"其他股权投资","ccodepath":"长期股权投资\/其他股权投资"},{"ccode":"140201","ccodename":"债券投资","ccodepath":"长期债权投资\/债券投资"},{"ccode":"140202","ccodename":"其他债权投资","ccodepath":"长期债权投资\/其他债权投资"},{"ccode":"1421","ccodename":"长期投资减值准备","ccodepath":"长期投资减值准备"},{"ccode":"143101","ccodename":"本金","ccodepath":"委托贷款\/本金"},{"ccode":"143102","ccodename":"利息","ccodepath":"委托贷款\/利息"},{"ccode":"143103","ccodename":"减值准备","ccodepath":"委托贷款\/减值准备"},{"ccode":"1501","ccodename":"固定资产","ccodepath":"固定资产"},{"ccode":"1502","ccodename":"累计折旧","ccodepath":"累计折旧"},{"ccode":"1505","ccodename":"固定资产减值准备","ccodepath":"固定资产减值准备"},{"ccode":"160101","ccodename":"专用材料","ccodepath":"工程物资\/专用材料"},{"ccode":"160102","ccodename":"专用设备","ccodepath":"工程物资\/专用设备"},{"ccode":"160103","ccodename":"预付大型设备款","ccodepath":"工程物资\/预付大型设备款"},{"ccode":"160104","ccodename":"为生产准备的工具及器具","ccodepath":"工程物资\/为生产准备的工具及器具"},{"ccode":"1603","ccodename":"在建工程","ccodepath":"在建工程"},{"ccode":"1605","ccodename":"在建工程减值准备","ccodepath":"在建工程减值准备"},{"ccode":"1701","ccodename":"固定资产清理","ccodepath":"固定资产清理"},{"ccode":"1801","ccodename":"无形资产","ccodepath":"无形资产"},{"ccode":"1805","ccodename":"无形资产减值准备","ccodepath":"无形资产减值准备"},{"ccode":"1815","ccodename":"未确认融资费用","ccodepath":"未确认融资费用"},{"ccode":"1901","ccodename":"长期待摊费用","ccodepath":"长期待摊费用"},{"ccode":"191101","ccodename":"待处理流动资产损溢","ccodepath":"待处理财产损溢\/待处理流动资产损溢"},{"ccode":"191102","ccodename":"待处理固定资产损溢","ccodepath":"待处理财产损溢\/待处理固定资产损溢"},{"ccode":"2101","ccodename":"短期借款","ccodepath":"短期借款"},{"ccode":"2111","ccodename":"应付票据","ccodepath":"应付票据"},{"ccode":"2121","ccodename":"应付账款","ccodepath":"应付账款"},{"ccode":"2131","ccodename":"预收账款","ccodepath":"预收账款"},{"ccode":"2141","ccodename":"代销商品款","ccodepath":"代销商品款"},{"ccode":"2151","ccodename":"应付工资","ccodepath":"应付工资"},{"ccode":"2153","ccodename":"应付福利费","ccodepath":"应付福利费"},{"ccode":"2161","ccodename":"应付股利","ccodepath":"应付股利"},{"ccode":"21710101","ccodename":"进项税额","ccodepath":"应交税金\/应交增值税\/进项税额"},{"ccode":"21710102","ccodename":"已交税金","ccodepath":"应交税金\/应交增值税\/已交税金"},{"ccode":"21710103","ccodename":"转出未交增值税","ccodepath":"应交税金\/应交增值税\/转出未交增值税"},{"ccode":"21710104","ccodename":"减免税款","ccodepath":"应交税金\/应交增值税\/减免税款"},{"ccode":"21710105","ccodename":"销项税额","ccodepath":"应交税金\/应交增值税\/销项税额"},{"ccode":"21710106","ccodename":"出口退税","ccodepath":"应交税金\/应交增值税\/出口退税"},{"ccode":"21710107","ccodename":"进项税额转出","ccodepath":"应交税金\/应交增值税\/进项税额转出"},{"ccode":"21710108","ccodename":"出口抵减内销产品应纳税额","ccodepath":"应交税金\/应交增值税\/出口抵减内销产品应纳税额"},{"ccode":"21710109","ccodename":"转出多交增值税","ccodepath":"应交税金\/应交增值税\/转出多交增值税"},{"ccode":"217102","ccodename":"未交增值税","ccodepath":"应交税金\/未交增值税"},{"ccode":"217103","ccodename":"应交营业税","ccodepath":"应交税金\/应交营业税"},{"ccode":"217104","ccodename":"应交消费税","ccodepath":"应交税金\/应交消费税"},{"ccode":"217105","ccodename":"应交资源税","ccodepath":"应交税金\/应交资源税"},{"ccode":"217106","ccodename":"应交所得税","ccodepath":"应交税金\/应交所得税"},{"ccode":"217107","ccodename":"应交土地增值税","ccodepath":"应交税金\/应交土地增值税"},{"ccode":"217108","ccodename":"应交城市维护建设税","ccodepath":"应交税金\/应交城市维护建设税"},{"ccode":"217109","ccodename":"应交房产税","ccodepath":"应交税金\/应交房产税"},{"ccode":"217110","ccodename":"应交土地使用税","ccodepath":"应交税金\/应交土地使用税"},{"ccode":"217111","ccodename":"应交车船使用税","ccodepath":"应交税金\/应交车船使用税"},{"ccode":"217112","ccodename":"应交个人所得税","ccodepath":"应交税金\/应交个人所得税"},{"ccode":"217115","ccodename":"印花税","ccodepath":"应交税金\/印花税"},{"ccode":"2176","ccodename":"其他应交款","ccodepath":"其他应交款"},{"ccode":"218101","ccodename":"法人垫付","ccodepath":"其他应付款\/法人垫付"},{"ccode":"218102","ccodename":"代扣个税","ccodepath":"其他应付款\/代扣个税"},{"ccode":"2191","ccodename":"预提费用","ccodepath":"预提费用"},{"ccode":"2201","ccodename":"待转资产价值","ccodepath":"待转资产价值"},{"ccode":"2211","ccodename":"预计负债","ccodepath":"预计负债"},{"ccode":"2301","ccodename":"长期借款","ccodepath":"长期借款"},{"ccode":"231101","ccodename":"债券面值","ccodepath":"应付债券\/债券面值"},{"ccode":"231102","ccodename":"债券溢价","ccodepath":"应付债券\/债券溢价"},{"ccode":"231103","ccodename":"债券折价","ccodepath":"应付债券\/债券折价"},{"ccode":"231104","ccodename":"应计利息","ccodepath":"应付债券\/应计利息"},{"ccode":"2321","ccodename":"长期应付款","ccodepath":"长期应付款"},{"ccode":"2331","ccodename":"专项应付款","ccodepath":"专项应付款"},{"ccode":"2341","ccodename":"递延税款","ccodepath":"递延税款"},{"ccode":"310101","ccodename":"朱松","ccodepath":"实收资本（或股本）\/朱松"},{"ccode":"3103","ccodename":"已归还投资","ccodepath":"已归还投资"},{"ccode":"311101","ccodename":"资本（或股本）溢价","ccodepath":"资本公积\/资本（或股本）溢价"},{"ccode":"311102","ccodename":"接受捐赠非现金资产准备","ccodepath":"资本公积\/接受捐赠非现金资产准备"},{"ccode":"311103","ccodename":"接受现金捐赠","ccodepath":"资本公积\/接受现金捐赠"},{"ccode":"311104","ccodename":"股权投资准备","ccodepath":"资本公积\/股权投资准备"},{"ccode":"311105","ccodename":"拨款转入","ccodepath":"资本公积\/拨款转入"},{"ccode":"311106","ccodename":"外币资本折算差额","ccodepath":"资本公积\/外币资本折算差额"},{"ccode":"311107","ccodename":"其他资本公积","ccodepath":"资本公积\/其他资本公积"},{"ccode":"312101","ccodename":"法定盈余公积","ccodepath":"盈余公积\/法定盈余公积"},{"ccode":"312102","ccodename":"任意盈余公积","ccodepath":"盈余公积\/任意盈余公积"},{"ccode":"312103","ccodename":"法定公益金","ccodepath":"盈余公积\/法定公益金"},{"ccode":"312104","ccodename":"储备基金","ccodepath":"盈余公积\/储备基金"},{"ccode":"312105","ccodename":"企业发展基金","ccodepath":"盈余公积\/企业发展基金"},{"ccode":"312106","ccodename":"利润归还投资","ccodepath":"盈余公积\/利润归还投资"},{"ccode":"3131","ccodename":"本年利润","ccodepath":"本年利润"},{"ccode":"314101","ccodename":"其他转入","ccodepath":"利润分配\/其他转入"},{"ccode":"314102","ccodename":"提取法定盈余公积","ccodepath":"利润分配\/提取法定盈余公积"},{"ccode":"314103","ccodename":"提取法定公益金","ccodepath":"利润分配\/提取法定公益金"},{"ccode":"314104","ccodename":"提取储备基金","ccodepath":"利润分配\/提取储备基金"},{"ccode":"314105","ccodename":"提取企业发展基金","ccodepath":"利润分配\/提取企业发展基金"},{"ccode":"314106","ccodename":"提取职工奖励及福利基金","ccodepath":"利润分配\/提取职工奖励及福利基金"},{"ccode":"314107","ccodename":"利润归还投资","ccodepath":"利润分配\/利润归还投资"},{"ccode":"314108","ccodename":"应付优先股股利","ccodepath":"利润分配\/应付优先股股利"},{"ccode":"314109","ccodename":"提取任意盈余公积","ccodepath":"利润分配\/提取任意盈余公积"},{"ccode":"314110","ccodename":"应付普通股股利","ccodepath":"利润分配\/应付普通股股利"},{"ccode":"314111","ccodename":"转作资本（或股本）的普通股股利","ccodepath":"利润分配\/转作资本（或股本）的普通股股利"},{"ccode":"314115","ccodename":"未分配利润","ccodepath":"利润分配\/未分配利润"},{"ccode":"410101","ccodename":"基本生产成本","ccodepath":"生产成本\/基本生产成本"},{"ccode":"410102","ccodename":"辅助生产成本","ccodepath":"生产成本\/辅助生产成本"},{"ccode":"4105","ccodename":"制造费用","ccodepath":"制造费用"},{"ccode":"4107","ccodename":"劳务成本","ccodepath":"劳务成本"},{"ccode":"5101","ccodename":"主营业务收入","ccodepath":"主营业务收入"},{"ccode":"5102","ccodename":"其他业务收入","ccodepath":"其他业务收入"},{"ccode":"5201","ccodename":"投资收益","ccodepath":"投资收益"},{"ccode":"5203","ccodename":"补贴收入","ccodepath":"补贴收入"},{"ccode":"530101","ccodename":"小微企业免税额","ccodepath":"营业外收入\/小微企业免税额"},{"ccode":"5401","ccodename":"主营业务成本","ccodepath":"主营业务成本"},{"ccode":"5402","ccodename":"主营业务税金及附加","ccodepath":"主营业务税金及附加"},{"ccode":"5405","ccodename":"其他业务支出","ccodepath":"其他业务支出"},{"ccode":"550101","ccodename":"工资薪金","ccodepath":"营业费用\/工资薪金"},{"ccode":"550102","ccodename":"办公费","ccodepath":"营业费用\/办公费"},{"ccode":"550111","ccodename":"残保金缴款","ccodepath":"营业费用\/残保金缴款"},{"ccode":"550112","ccodename":"印花税","ccodepath":"营业费用\/印花税"},{"ccode":"5502","ccodename":"管理费用","ccodepath":"管理费用"},{"ccode":"550301","ccodename":"手续费","ccodepath":"财务费用\/手续费"},{"ccode":"550302","ccodename":"利息","ccodepath":"财务费用\/利息"},{"ccode":"5601","ccodename":"营业外支出","ccodepath":"营业外支出"},{"ccode":"5701","ccodename":"所得税","ccodepath":"所得税"},{"ccode":"5801","ccodename":"以前年度损益调整","ccodepath":"以前年度损益调整"}]

    },
    // 获取摘要
    async queryAbstracts() {
        // const abstracts=[]
        // const objs = {};
        // const vmObj = this;
        // $.ajax({
        //     type: 'post',
        //     url: urlPath + '/getPingZheng!Query_ZY',
        //     data: objs,
        //     dataType: 'JSON',
        //     success: function(list) {
        //         vmObj.abstracts = list;
        //         for (const i in vmObj.abstracts) {
        //             vmObj.abstracts[i].hide = false;
        //         }
        //
        //     },
        //     error: function(xhr) {
        //         $('body').html(xhr.responseText);
        //     }
        // });
        const reuslt=[{"accabname":"取现","accabcid":"001"},{"accabname":"存款","accabcid":"002"},{"accabname":"销售收入","accabcid":"003"},{"accabname":"销售收款","accabcid":"004"},{"accabname":"结转成本","accabcid":"005"},{"accabname":"商品采购","accabcid":"006"},{"accabname":"采购付款","accabcid":"007"},{"accabname":"销售费用报销","accabcid":"008"},{"accabname":"管理费用报销","accabcid":"009"},{"accabname":"缴纳增值税","accabcid":"010"},{"accabname":"发放工资","accabcid":"011"},{"accabname":"计提工资","accabcid":"012"},{"accabname":"计提税金及附加","accabcid":"013"},{"accabname":"计提折旧","accabcid":"014"},{"accabname":"结转销项税额","accabcid":"015"},{"accabname":"结转损益","accabcid":"016"},{"accabname":"结转未分配利润","accabcid":"017"},{"accabname":"计提所得税","accabcid":"018"},{"accabname":"缴纳残保金","accabcid":"019"},{"accabname":"结转进项税额","accabcid":"020"},{"accabname":"缴税","accabcid":"021"}]
        return reuslt
    },
    async getDeptList(){
        const reulst={"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}

    },
    async GET_KMtypeOrdeDataApi(){
        const result=[{"ordervalue":"4-2-2-2"}]
        return result
    },
    async queryDeptListDataApi(){return {"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}.list},
    async queryPersonListDataApi (){return {"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}.list},
    async queryCustomerListDataApi(){return {"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}.list},
    async queryGYListDataApi (){return {"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}.list},
    async queryCHListDataApi (){return {"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}.list},
    async queryItemListDataApi (){return {"list":[],"map":{},"msg":null,"msgs":null,"obj":null,"status":null}.list},
};

function apiProcess() {
    return api;
}

export default apiProcess;
