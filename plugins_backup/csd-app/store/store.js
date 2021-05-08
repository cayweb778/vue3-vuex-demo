define(function (require, exports) {

    // 原型
    const a = {
        kuaiJiKeMuCode: 1001,
        kuaiJiKeMuCodeName: '现金',
        qichu: {jie: '', dai: '', dir: '', money: ''},
        // range取当年第一张凭证月 ～ 最后凭证月
        range: [202003, 202010],
        rangeList: [
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''},
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''},
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''},
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''},
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''},
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''},
            {jieFangSum: '', daiFangSum: '', yearJieFangSum: '', yearDaiFangSum: '', dir: '', money: ''}
        ]
    }


    // API接口
    function getKuaiJieKeMuTotalPageData(year, kuaiJiKeMuCodeList, prefixUrl) {
        let result = []
        $.ajax({
            url: '/' + prefixUrl + '/SubjectType!getKuaiJieKeMuTotalPageData',
            data: {
                year: year,
                msg: JSON.stringify(kuaiJiKeMuCodeList)
            }, type: "post",
            dataType: "json",
            async: false,
            success: function (res) {
                result = res
            }
        });
        return result;
    }

// 指定科目总账数据接口
    function getPrintKuaiJiKeMuTotalData(year, kuaiJiKeMuCodeList) {
        const list = getKuaiJieKeMuTotalPageData(year, kuaiJiKeMuCodeList, 'ysd')

        const kuaiJiKeMuTotalModel = {
            props: {
                year: '',
                zdr: '',
                origin: ''
            },
            list
        }
        return kuaiJiKeMuTotalModel
    }

// 获取当年全部科目
    function getCurrentKeMuList() {

    }

// 打印单张
    const kuaiJiKeMuTotalDataModel = getPrintKuaiJiKeMuTotalData('2021', ['100110', '100111'])
    exports.getPrintKuaiJiKeMuTotalData = getPrintKuaiJiKeMuTotalData

// // 打印指定科目
// const kuaiJiKeMuTotalDataModel = getPrintKuaiJiKeMuTotalData('2020', ['1001', '1002'])
// // 打印全部科目
// const kuaiJiKeMuTotalDataModel = getPrintKuaiJiKeMuTotalData('2020', getCurrentKeMuList())

})
