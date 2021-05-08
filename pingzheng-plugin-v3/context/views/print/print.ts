/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// 检查回车
function checkEnter(e) {
    var et = e || window.event;
    var keycode = et.charCode || et.keyCode;
    if (keycode == 13) {
        if (window.event) {
            window.event.returnValue = false;
        } else {
            e.preventDefault(); //for firefox
        }
    }
}

window. dataPrint=function(type) {
    exportVM.printType=type
    exportVM.print()
}

function dataExport() {
    exportVM.export()
}

function tausendstelFormat(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}

export function addThousands(num) {
    if (num == null) return "";
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    if (num && num.toString().indexOf('.') == -1) {
        return (num + '').replace(reg, '$&,');
    } else {
        return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
            return $1 + ",";
        });
    }
}

export function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}


function initExportData2() {
    let tables = [];
    $(".vouchRow .selected").each(function () {
        // 对应数据
        let inx = $(this).find("input[name='inx']").val();
        let vouchRow = app.voucherListForPage[inx][0];
        let sumMoneyChina;
        if (vouchRow.sumMoney == 0) {
            sumMoneyChina = "零元整"
        } else {
            sumMoneyChina = convertCurrency(vouchRow.sumMoney);
        }

        let table = {
            title: {
                摘要: 'z',
                科目: 'k',
                借方: 'j',
                贷方: 'd'
            },
            body: [
                {
                    'z': '',
                    'k': '',
                    'j': '',
                    'd': ''
                }
            ],
            footer: {
                'vouchNum': '',
                'num': '',
                'sum': addThousands(toDecimal2(vouchRow.sumMoney))
            },
            info: {
                '附单据数': vouchRow.voucherBillNum,
                '核算单位': '',
                '日期': vouchRow.fillInDate,
                '凭证号': vouchRow.vouchType + "-" + vouchRow.inoId,
                '记账': '',
                '审核': '',
                '出纳': '',
                '制单': vouchRow.fillPsn,
                '合计': addThousands(sumMoneyChina)
            }
        };
        $.ajax({
            type: 'post',
            url: urlPath + '/customer!get',
            async: false,
            success: function (res) {
                table.info['核算单位'] = res.obj['adKehuNameFull']           // 核算单位

            },
            error: function (xhr) {
                $('body').html(xhr.responseText)
            }
        });
        $(this).find(" table tbody tr").each(function () {
            let row = [];
            $(this).find("td").each(function (i) {
                row.push($(this).text())
            });
            let rowObj = {
                'z': row[0],
                'k': row[1],
                'd': addThousands(row[3]),
                'j': addThousands(row[2])
            };
            table.body.push(rowObj)
        });
        table.body = table.body.slice(1, table.body.length - 1);
        tables.push(table)
    });
    initExportData('记账凭证', tables, urlPath + '/cwerp/jizhang/component/list/export')
}

function singleInitExportData2(dom, voucherData) {
    let tables = [];
    // 对应数据
    let vouchRow = voucherData;
    let sumMoneyChina;
    if (vouchRow.sumMoney == 0) {
        sumMoneyChina = "零元整"
    } else {
        sumMoneyChina = convertCurrency(vouchRow.sumMoney);
    }

    let table = {
        title: {
            摘要: 'z',
            科目: 'k',
            借方: 'j',
            贷方: 'd'
        },
        body: [
            {
                'z': '',
                'k': '',
                'j': '',
                'd': ''
            }
        ],
        footer: {
            'vouchNum': '',
            'num': '',
            'sum': addThousands(toDecimal2(vouchRow.sumMoney))
        },
        info: {
            '附单据数': vouchRow.voucherBillNum,
            '核算单位': '',
            '日期': vouchRow.fillInDate,
            '凭证号': vouchRow.vouchType + "-" + vouchRow.inoId,
            '记账': '',
            '审核': '',
            '出纳': '',
            '制单': vouchRow.fillPsn,
            '合计': addThousands(sumMoneyChina)
        }
    };
    $.ajax({
        type: 'post',
        url: urlPath + '/customer!get',
        async: false,
        success: function (res) {
            table.info['核算单位'] = res.obj['adKehuNameFull']           // 核算单位

        },
        error: function (xhr) {
            $('body').html(xhr.responseText)
        }
    });
    $(dom).find(" table tbody tr").each(function () {
        let row = [];
        row[0] = $(this).find("td:eq(1) textarea").val()
        row[1] = $(this).find("td:eq(2) textarea").val()
        row[2] = $(this).find("td:eq(3) textarea").val()
        row[3] = $(this).find("td:eq(4) textarea").val()
        row[2] = row[2] == '0' || $.trim(row[2]) == '' || row[2] == '0.00' ? '' : addThousands(changeTwoDecimal_f(row[2]))
        row[3] = row[3] == '0' || $.trim(row[3]) == '' || row[3] == '0.00' ? '' : addThousands(changeTwoDecimal_f(row[3]))
        let rowObj = {
            'z': row[0],
            'k': row[1],
            'd': addThousands(row[3]),
            'j': addThousands(row[2])
        };
        table.body.push(rowObj)
    });
    table.body = table.body.slice(1, table.body.length - 1);
    tables.push(table);
    initExportData('记账凭证', tables, urlPath + '/cwerp/jizhang/component/list/export')
}


export function initExportData(tableName, tables, utilUrl) {
    exportVM.exportName = tableName;
    exportVM.utilUrl = utilUrl;
    exportVM.tables = tables
}

function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    f_x = Math.round(f_x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}
