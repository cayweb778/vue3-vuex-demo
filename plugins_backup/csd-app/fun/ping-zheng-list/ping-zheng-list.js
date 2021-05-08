import {baseUrl} from '../../config.js';

export function queryYearSelect() {
  let yearselect = {};
  // 查询可选年
  $.ajax({
    type: 'post',
    url: baseUrl + '/voucher!queryYearSelect',
    async: false,
    success: function(res) {
      yearselect.currentYear = res.obj[res.obj.length - 1];
      yearselect.qujian = [res.obj[0] + '0101', res.obj[res.obj.length - 1] + '1201'];
    },
    error: function(xhr) {

    }
  });
  return yearselect;
}

export function queryVoucherMaxDate({months, voucherType, voucherTypeNum}) {
  let a = {
    hasPingZheng: true,
    hasPingZhengMaxYearMonth: ''
  };
  $.ajax({
    type: 'post',
    url: baseUrl + '/voucher!queryVoucherMaxDate',
    data: {months, voucherType, voucherTypeNum},
    async: false,
    success: function(res) {
      if (res.map['year'] == 'null') {
        a.hasPingZheng = false;
      }
      a.hasPingZhengMaxYearMonth = res.map['year'] + res.map['month'];
    },
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
  return a;
}
