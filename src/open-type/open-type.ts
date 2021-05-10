import {use_open_add, use_open_show} from '../../pingzheng-use-open-type/pingzheng';

export function openAddPingZheng() {

    const typeListApi = async ({year,month}) => {
        return ['记','转']
    };
    const numApi = async ({type,year,month}) => {
        return '001'
    };
    const zhaiyaoApi = async () => {
        return [{"accabname":"取现","accabcid":"001"},{"accabname":"存款","accabcid":"002"},{"accabname":"销售收入","accabcid":"003"},{"accabname":"销售收款","accabcid":"004"},{"accabname":"结转成本","accabcid":"005"},{"accabname":"商品采购","accabcid":"006"},{"accabname":"采购付款","accabcid":"007"},{"accabname":"销售费用报销","accabcid":"008"},{"accabname":"管理费用报销","accabcid":"009"},{"accabname":"缴纳增值税","accabcid":"010"},{"accabname":"发放工资","accabcid":"011"},{"accabname":"计提工资","accabcid":"012"},{"accabname":"计提税金及附加","accabcid":"013"},{"accabname":"计提折旧","accabcid":"014"},{"accabname":"结转销项税额","accabcid":"015"},{"accabname":"结转损益","accabcid":"016"},{"accabname":"结转未分配利润","accabcid":"017"},{"accabname":"计提所得税","accabcid":"018"},{"accabname":"缴纳残保金","accabcid":"019"},{"accabname":"结转进项税额","accabcid":"020"},{"accabname":"缴税","accabcid":"021"}]
    };
    const kuaiJiKeMuApi = async () => {
        const kuaiJiKeMuList=[{"ccode":"1001","ccodename":"库存现金","ccodepath":"库存现金"},{"ccode":"1002","ccodename":"银行存款","ccodepath":"银行存款"},{"ccode":"1012","ccodename":"其他货币资金","ccodepath":"其他货币资金"},{"ccode":"110101","ccodename":"股票","ccodepath":"短期投资\/股票"},{"ccode":"110102","ccodename":"债券","ccodepath":"短期投资\/债券"},{"ccode":"110103","ccodename":"基金","ccodepath":"短期投资\/基金"},{"ccode":"1121","ccodename":"应收票据","ccodepath":"应收票据"},{"ccode":"1122","ccodename":"应收账款","ccodepath":"应收账款"},{"ccode":"1123","ccodename":"预付账款","ccodepath":"预付账款"},{"ccode":"1131","ccodename":"应收股利","ccodepath":"应收股利"},{"ccode":"1132","ccodename":"应收利息","ccodepath":"应收利息"},{"ccode":"1133","ccodename":"应收出口退税款","ccodepath":"应收出口退税款"},{"ccode":"1221","ccodename":"其他应收款","ccodepath":"其他应收款"},{"ccode":"1401","ccodename":"材料采购","ccodepath":"材料采购"},{"ccode":"1402","ccodename":"在途物资","ccodepath":"在途物资"},{"ccode":"1403","ccodename":"原材料","ccodepath":"原材料"},{"ccode":"1404","ccodename":"材料成本差异","ccodepath":"材料成本差异"},{"ccode":"1405","ccodename":"库存商品","ccodepath":"库存商品"},{"ccode":"1407","ccodename":"商品进销差价","ccodepath":"商品进销差价"},{"ccode":"1408","ccodename":"委托加工物资","ccodepath":"委托加工物资"},{"ccode":"141101","ccodename":"包装物","ccodepath":"周转材料\/包装物"},{"ccode":"141102","ccodename":"低值易耗品","ccodepath":"周转材料\/低值易耗品"},{"ccode":"1421","ccodename":"消耗性生物资产","ccodepath":"消耗性生物资产"},{"ccode":"1501","ccodename":"长期债券投资","ccodepath":"长期债券投资"},{"ccode":"1511","ccodename":"长期股权投资","ccodepath":"长期股权投资"},{"ccode":"1601","ccodename":"固定资产","ccodepath":"固定资产"},{"ccode":"1602","ccodename":"累计折旧","ccodepath":"累计折旧"},{"ccode":"1604","ccodename":"在建工程","ccodepath":"在建工程"},{"ccode":"1605","ccodename":"工程物资","ccodepath":"工程物资"},{"ccode":"1606","ccodename":"固定资产清理","ccodepath":"固定资产清理"},{"ccode":"1621","ccodename":"生产性生物资产","ccodepath":"生产性生物资产"},{"ccode":"1622","ccodename":"生产性生物资产累计折旧","ccodepath":"生产性生物资产累计折旧"},{"ccode":"1701","ccodename":"无形资产","ccodepath":"无形资产"},{"ccode":"1702","ccodename":"累计摊销","ccodepath":"累计摊销"},{"ccode":"1801","ccodename":"长期待摊费用","ccodepath":"长期待摊费用"},{"ccode":"190101","ccodename":"待处理流动资产损溢","ccodepath":"待处理财产损溢\/待处理流动资产损溢"},{"ccode":"190102","ccodename":"待处理非流动资产损溢","ccodepath":"待处理财产损溢\/待处理非流动资产损溢"},{"ccode":"2001","ccodename":"短期借款","ccodepath":"短期借款"},{"ccode":"2201","ccodename":"应付票据","ccodepath":"应付票据"},{"ccode":"2202","ccodename":"应付账款","ccodepath":"应付账款"},{"ccode":"2203","ccodename":"预收账款","ccodepath":"预收账款"},{"ccode":"221101","ccodename":"应付职工工资","ccodepath":"应付职工薪酬\/应付职工工资"},{"ccode":"221102","ccodename":"应付奖金、津贴和补贴","ccodepath":"应付职工薪酬\/应付奖金、津贴和补贴"},{"ccode":"221103","ccodename":"应付福利费","ccodepath":"应付职工薪酬\/应付福利费"},{"ccode":"221104","ccodename":"应付社会保险费","ccodepath":"应付职工薪酬\/应付社会保险费"},{"ccode":"221105","ccodename":"应付住房公积金","ccodepath":"应付职工薪酬\/应付住房公积金"},{"ccode":"221106","ccodename":"应付工会经费","ccodepath":"应付职工薪酬\/应付工会经费"},{"ccode":"221107","ccodename":"应付教育经费","ccodepath":"应付职工薪酬\/应付教育经费"},{"ccode":"221108","ccodename":"非货币性福利","ccodepath":"应付职工薪酬\/非货币性福利"},{"ccode":"221109","ccodename":"辞退福利","ccodepath":"应付职工薪酬\/辞退福利"},{"ccode":"221110","ccodename":"其他应付职工薪酬","ccodepath":"应付职工薪酬\/其他应付职工薪酬"},{"ccode":"22210101","ccodename":"进项税额","ccodepath":"应交税费\/应交增值税\/进项税额"},{"ccode":"22210102","ccodename":"销项税额抵减","ccodepath":"应交税费\/应交增值税\/销项税额抵减"},{"ccode":"22210103","ccodename":"已交税金","ccodepath":"应交税费\/应交增值税\/已交税金"},{"ccode":"22210104","ccodename":"转出未交增值税","ccodepath":"应交税费\/应交增值税\/转出未交增值税"},{"ccode":"22210105","ccodename":"减免税款","ccodepath":"应交税费\/应交增值税\/减免税款"},{"ccode":"22210106","ccodename":"出口抵减内销产品应纳税额","ccodepath":"应交税费\/应交增值税\/出口抵减内销产品应纳税额"},{"ccode":"22210107","ccodename":"销项税额","ccodepath":"应交税费\/应交增值税\/销项税额"},{"ccode":"22210108","ccodename":"出口退税","ccodepath":"应交税费\/应交增值税\/出口退税"},{"ccode":"22210109","ccodename":"进项税额转出","ccodepath":"应交税费\/应交增值税\/进项税额转出"},{"ccode":"22210110","ccodename":"转出多交增值税","ccodepath":"应交税费\/应交增值税\/转出多交增值税"},{"ccode":"222102","ccodename":"未交增值税","ccodepath":"应交税费\/未交增值税"},{"ccode":"222103","ccodename":"预交增值税","ccodepath":"应交税费\/预交增值税"},{"ccode":"222104","ccodename":"待抵扣进项税额","ccodepath":"应交税费\/待抵扣进项税额"},{"ccode":"222105","ccodename":"待认证进项税额","ccodepath":"应交税费\/待认证进项税额"},{"ccode":"222106","ccodename":"待转销项税额","ccodepath":"应交税费\/待转销项税额"},{"ccode":"222107","ccodename":"增值税留抵税额","ccodepath":"应交税费\/增值税留抵税额"},{"ccode":"222108","ccodename":"简易计税","ccodepath":"应交税费\/简易计税"},{"ccode":"222109","ccodename":"转让金融商品应交增值税","ccodepath":"应交税费\/转让金融商品应交增值税"},{"ccode":"222110","ccodename":"代扣代交增值税","ccodepath":"应交税费\/代扣代交增值税"},{"ccode":"222111","ccodename":"增值税检查调整","ccodepath":"应交税费\/增值税检查调整"},{"ccode":"222112","ccodename":"应交营业税","ccodepath":"应交税费\/应交营业税"},{"ccode":"222113","ccodename":"应交消费税","ccodepath":"应交税费\/应交消费税"},{"ccode":"222114","ccodename":"应交资源税","ccodepath":"应交税费\/应交资源税"},{"ccode":"222115","ccodename":"应交所得税","ccodepath":"应交税费\/应交所得税"},{"ccode":"222116","ccodename":"应交土地增值税","ccodepath":"应交税费\/应交土地增值税"},{"ccode":"222117","ccodename":"应交城市维护建设税","ccodepath":"应交税费\/应交城市维护建设税"},{"ccode":"222118","ccodename":"应交房产税","ccodepath":"应交税费\/应交房产税"},{"ccode":"222119","ccodename":"应交城镇土地使用税","ccodepath":"应交税费\/应交城镇土地使用税"},{"ccode":"222120","ccodename":"应交车船使用税","ccodepath":"应交税费\/应交车船使用税"},{"ccode":"222121","ccodename":"应交个人所得税","ccodepath":"应交税费\/应交个人所得税"},{"ccode":"222122","ccodename":"教育费附加","ccodepath":"应交税费\/教育费附加"},{"ccode":"222123","ccodename":"矿产资源补偿费","ccodepath":"应交税费\/矿产资源补偿费"},{"ccode":"222124","ccodename":"排污费","ccodepath":"应交税费\/排污费"},{"ccode":"222125","ccodename":"应交印花税","ccodepath":"应交税费\/应交印花税"},{"ccode":"222126","ccodename":"地方教育附加","ccodepath":"应交税费\/地方教育附加"},{"ccode":"2231","ccodename":"应付利息","ccodepath":"应付利息"},{"ccode":"2232","ccodename":"应付利润","ccodepath":"应付利润"},{"ccode":"2241","ccodename":"其他应付款","ccodepath":"其他应付款"},{"ccode":"2401","ccodename":"递延收益","ccodepath":"递延收益"},{"ccode":"2501","ccodename":"长期借款","ccodepath":"长期借款"},{"ccode":"2701","ccodename":"长期应付款","ccodepath":"长期应付款"},{"ccode":"3001","ccodename":"实收资本","ccodepath":"实收资本"},{"ccode":"3002","ccodename":"资本公积","ccodepath":"资本公积"},{"ccode":"310101","ccodename":"法定盈余公积","ccodepath":"盈余公积\/法定盈余公积"},{"ccode":"310102","ccodename":"任意盈余公积","ccodepath":"盈余公积\/任意盈余公积"},{"ccode":"3103","ccodename":"本年利润","ccodepath":"本年利润"},{"ccode":"310401","ccodename":"其他转入","ccodepath":"利润分配\/其他转入"},{"ccode":"310402","ccodename":"提取法定盈余公积","ccodepath":"利润分配\/提取法定盈余公积"},{"ccode":"310403","ccodename":"提取职工奖励及福利基金","ccodepath":"利润分配\/提取职工奖励及福利基金"},{"ccode":"31040401","ccodename":"123","ccodepath":"利润分配\/提取任意盈余公积\/123"},{"ccode":"310405","ccodename":"应付利润","ccodepath":"利润分配\/应付利润"},{"ccode":"310406","ccodename":"未分配利润","ccodepath":"利润分配\/未分配利润"},{"ccode":"4001","ccodename":"生产成本","ccodepath":"生产成本"},{"ccode":"4101","ccodename":"制造费用","ccodepath":"制造费用"},{"ccode":"4301","ccodename":"研发支出","ccodepath":"研发支出"},{"ccode":"4401","ccodename":"工程施工","ccodepath":"工程施工"},{"ccode":"4403","ccodename":"机械作业","ccodepath":"机械作业"},{"ccode":"5001","ccodename":"主营业务收入","ccodepath":"主营业务收入"},{"ccode":"5051","ccodename":"其他业务收入","ccodepath":"其他业务收入"},{"ccode":"5111","ccodename":"投资收益","ccodepath":"投资收益"},{"ccode":"530101","ccodename":"非流动资产处置净收益","ccodepath":"营业外收入\/非流动资产处置净收益"},{"ccode":"530102","ccodename":"政府补助","ccodepath":"营业外收入\/政府补助"},{"ccode":"530103","ccodename":"捐赠收益","ccodepath":"营业外收入\/捐赠收益"},{"ccode":"530104","ccodename":"盘盈收益","ccodepath":"营业外收入\/盘盈收益"},{"ccode":"530105","ccodename":"确实无法偿付的应付账款","ccodepath":"营业外收入\/确实无法偿付的应付账款"},{"ccode":"530106","ccodename":"已作坏账损失处理后又收回的应收账款","ccodepath":"营业外收入\/已作坏账损失处理后又收回的应收账款"},{"ccode":"530107","ccodename":"出租包装物和商品的租金收入","ccodepath":"营业外收入\/出租包装物和商品的租金收入"},{"ccode":"530108","ccodename":"逾期未退包装物押金收益","ccodepath":"营业外收入\/逾期未退包装物押金收益"},{"ccode":"530109","ccodename":"汇兑收益","ccodepath":"营业外收入\/汇兑收益"},{"ccode":"530110","ccodename":"违约金收益","ccodepath":"营业外收入\/违约金收益"},{"ccode":"5401","ccodename":"主营业务成本","ccodepath":"主营业务成本"},{"ccode":"5402","ccodename":"其他业务成本","ccodepath":"其他业务成本"},{"ccode":"5403","ccodename":"税金及附加","ccodepath":"税金及附加"},{"ccode":"560101","ccodename":"销售人员职工薪酬","ccodepath":"销售费用\/销售人员职工薪酬"},{"ccode":"560102","ccodename":"商品维修费","ccodepath":"销售费用\/商品维修费"},{"ccode":"560103","ccodename":"运输费","ccodepath":"销售费用\/运输费"},{"ccode":"560104","ccodename":"广告费","ccodepath":"销售费用\/广告费"},{"ccode":"560105","ccodename":"业务宣传费","ccodepath":"销售费用\/业务宣传费"},{"ccode":"560201","ccodename":"管理人员职工薪酬","ccodepath":"管理费用\/管理人员职工薪酬"},{"ccode":"560202","ccodename":"办公费","ccodepath":"管理费用\/办公费"},{"ccode":"560203","ccodename":"业务招待费","ccodepath":"管理费用\/业务招待费"},{"ccode":"560204","ccodename":"开办费","ccodepath":"管理费用\/开办费"},{"ccode":"560205","ccodename":"差旅费","ccodepath":"管理费用\/差旅费"},{"ccode":"560206","ccodename":"交通费","ccodepath":"管理费用\/交通费"},{"ccode":"560207","ccodename":"固定资产折旧","ccodepath":"管理费用\/固定资产折旧"},{"ccode":"560208","ccodename":"长期待摊费用摊销","ccodepath":"管理费用\/长期待摊费用摊销"},{"ccode":"560209","ccodename":"研究费用","ccodepath":"管理费用\/研究费用"},{"ccode":"560210","ccodename":"折旧费","ccodepath":"管理费用\/折旧费"},{"ccode":"560301","ccodename":"利息费用","ccodepath":"财务费用\/利息费用"},{"ccode":"560302","ccodename":"汇兑损失","ccodepath":"财务费用\/汇兑损失"},{"ccode":"560303","ccodename":"银行手续费","ccodepath":"财务费用\/银行手续费"},{"ccode":"560304","ccodename":"现金折扣","ccodepath":"财务费用\/现金折扣"},{"ccode":"571101","ccodename":"非流动资产处置净损失","ccodepath":"营业外支出\/非流动资产处置净损失"},{"ccode":"571102","ccodename":"赞助支出","ccodepath":"营业外支出\/赞助支出"},{"ccode":"571103","ccodename":"捐赠支出","ccodepath":"营业外支出\/捐赠支出"},{"ccode":"571104","ccodename":"盘亏损失","ccodepath":"营业外支出\/盘亏损失"},{"ccode":"571105","ccodename":"坏账损失","ccodepath":"营业外支出\/坏账损失"},{"ccode":"571106","ccodename":"存货毁损报废损失","ccodepath":"营业外支出\/存货毁损报废损失"},{"ccode":"571107","ccodename":"无法收回的长期债券投资损失","ccodepath":"营业外支出\/无法收回的长期债券投资损失"},{"ccode":"571108","ccodename":"无法收回的长期股权投资损失","ccodepath":"营业外支出\/无法收回的长期股权投资损失"},{"ccode":"571109","ccodename":"自然灾害等不可抗力因素造成的损失","ccodepath":"营业外支出\/自然灾害等不可抗力因素造成的损失"},{"ccode":"571110","ccodename":"税收滞纳金","ccodepath":"营业外支出\/税收滞纳金"},{"ccode":"571111","ccodename":"罚没损失","ccodepath":"营业外支出\/罚没损失"},{"ccode":"5801","ccodename":"所得税费用","ccodepath":"所得税费用"},{"ccode":"5901","ccodename":"以前年度损益调整","ccodepath":"以前年度损益调整"}]

        return kuaiJiKeMuList
    };
    const okApi = async () => {
        return []
    };

    const backApi = async () => {
        return []
    };
    // const fuZhuHeSuanApi = async () => {
    //     return []
    // };
    use_open_add({
        typeListApi,
        numApi,
        zhaiyaoApi,
        kuaiJiKeMuApi,
        okApi,
        backApi,
        eventNames:['确认','返回'],
        // fuZhuHeSuanApi,
        zhiDanRen: '机器人01'
    });
}
export function openShowPingZheng() {
    use_open_show({
        // api:'',
        model:{
            'options': {'title': '新增凭证'},
            'props': {
                'pingZhengFrom': '0',
                'date': '2023-05-04',
                'type': '记',
                'danJuNum': '0',
                'zdr': 1,
                'pingZhengNumOfMonth': '028'
            },
            'rows': [{
                'zhaiYao': '1',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '1 测试科目1',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '2',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '2 测试科目2',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '3',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '3 测试科目3',
                'jieMoney': '2.00',
                'daiMoney': '0.00',
                'kuaiJiKeMuPath': ''
            }, {
                'zhaiYao': '4',
                'kuaiJiKeMuCode': '',
                'kuaiJiKeMuText': '4 测试科目4',
                'jieMoney': '0.00',
                'daiMoney': '2.00',
                'kuaiJiKeMuPath': ''
            }],
            'rowsFuZhuHeSuan': []
        },
        zhiDanRen: '机器人01'
    });
}
