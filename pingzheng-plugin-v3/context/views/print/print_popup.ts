/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import './print';
import './export';
import {convertCurrency} from '../../helper/jizhangHelper';
import {initExportData} from './print';
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
// 预备打印
export function openPrintPopup() {
  layui.use('layer', () => {
    layui.layer.open({
      type: 2,
      title: '打印选项',
      maxmin: false,
      shadeClose: true, //点击遮罩关闭层
      area: ['530px', '460px'],
      content: '/ysd/cwerp/jizhang/component/print_optionp'
    });
  });
}

export function singleInitExportData2(dom, voucherData) {
  let tables = [];
  // 对应数据
  let vouchRow = voucherData;
  let sumMoneyChina;
  if (vouchRow.sumMoney == 0) {
    sumMoneyChina = '零元整';
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
      '凭证号': vouchRow.vouchType + '-' + vouchRow.inoId,
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
    success: function(res) {
      table.info['核算单位'] = res.obj['adKehuNameFull'];           // 核算单位

    },
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
  $('.table_body').find('>ul').each(function() {
    let row = [];
    row[0] = $(this).find('.col1 textarea').val();
    row[1] = $(this).find('.col2 textarea').val();
    row[2] = $(this).find('.col-jie textarea').val();
    row[3] = $(this).find('.col-dai textarea').val();
    row[2] = row[2] == '0' || $.trim(row[2]) == '' || row[2] == '0.00' ? '' : addThousands(changeTwoDecimal_f(row[2]));
    row[3] = row[3] == '0' || $.trim(row[3]) == '' || row[3] == '0.00' ? '' : addThousands(changeTwoDecimal_f(row[3]));
    let rowObj = {
      'z': row[0],
      'k': row[1],
      'd': addThousands(row[3]),
      'j': addThousands(row[2])
    };
    table.body.push(rowObj);
  });
  table.body = table.body.slice(1, table.body.length);
  tables.push(table);
  // debugger
  initExportData('记账凭证', tables, urlPath + '/cwerp/jizhang/component/list/export');
}

export function singlePrintBoot(dom, voucherData) {
  // 填入数据
  let vouchRow = {
    sumMoney: 10,
    inoId: this.$store.state.pingZhengModel.props.pingZhengNumOfMonth,
    vouchType: this.$store.state.pingZhengModel.props.pingZhengNumOfMonth,
    fillInDate: this.$store.state.pingZhengModel.props.date,
    voucherBillNum: this.$store.state.pingZhengModel.props.danJuNum,
    fillPsn: this.$store.state.pingZhengModel.props.zdr
  };
  singleInitExportData2($('.voucher-item'), vouchRow);
}

