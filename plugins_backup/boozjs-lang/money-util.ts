/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
export function moneyHelper() {
  // 转成金额格式,清除非数字
  const toMoney = str =>
      str
          .replace(/^([^-]+)(?=-\S*)/, '') // 移除第一个负号之前的所有字符
          .replace(/(?<!^)-/g, '')         // 移除第一个负号之外的所有负号
          .replace(/[^0-9.-]/g, '')        // 移除数字 小数点 负号之外的所有字符
          .replace(/(?<!^[\d-]+)\./g, '')   // 移除第一个小数点之外的所有句点
          .replace(/^0*(-?\d+)(\.(\d{1,2}))?\S*?$/, '$1$2'); // 保留两位小数


  function isNumber(val) {

    var regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。

    if (regPos.test(val)) {
      return true;
    } else {
      return false;
    }

  }

  function handleLimitInteger({moneyNumberic, limitInteger}) {
    const reg = /(\d{limitInteger}).*\.(\d*)/g;
    return moneyNumberic.toString().replace(new RegExp(reg.toString().replace('limitInteger', limitInteger)), '$1.$2');
  }

  return {
    toMoneyInputStr(moneyStr, limitInteger, limitDecimal) {
      if (limitDecimal == null) {
        limitDecimal = 2;
      }
      moneyStr = moneyStr
          .replace(/[\u4e00-\u9fa5]+/g, '') //验证非汉字
          .replace(/(^0.)(.*)/g, '{zeroDot}$2')
          .replace(/(^0)(.*)/g, '0$2')
          .replace(/{zeroDot}/g, '0.')
          .replace(/(^\.)(.*)/g, '0.')
          .replace(/(^\-)(.*)/g, '{xx}$2')
          .replace(/-/g, '')
          .replace(/{xx}/, '-')
          .replace(/[^\-?\d.]/g, '') //清除"数字","-"和"."以外的字符
          .replace(/^\./g, '') //验证第一个字符是数字而不是
          .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') //只保留第一个小数点, 清除多余的
          .replace('-', '$#$').replace(/\-/g, '').replace('$#$', '-') //只保留第一个
          .replace(/^(\-)*(\d+)\.(\d{2}).*$/, '$1$2.$3');
      if (limitInteger != null && moneyStr.search('\\.') == -1) {
        moneyStr = moneyStr.slice(0, limitInteger);
      } else {
        let arr = moneyStr.split('\\.');
        if (arr.length > 1) {
          moneyStr = arr[0].slice(0, limitInteger) + '.' + arr[1];
        }
      }
      return moneyStr;

    },
    toMoneyStr2(number) {
      if (number == null || number == '') {
        number = 0;
      }
      return parseFloat(number).toFixed(2);
    },
    toMoney,
    numbericCastMoneyStr(numberic) {
      const moneyNumberic = parseFloat(toMoney(numberic.toString()));
      return moneyNumberic.toFixed(2);
    },
    filterStrCastMoneyStr(str) {
      const moneyNumberic = parseFloat(toMoney(str));
      return moneyNumberic.toFixed(2);
    },
    isNumber
    // toMoneyStr(val, limitInteger, limitDecimal) {
    //     if (limitDecimal == null) {
    //         limitDecimal = 2
    //     }
    //     if (val == null) {
    //         return "金额不能为NULL"
    //     }
    //
    //     const moneyStr = toMoney(val.toString())
    //
    //     if (moneyStr == '') {
    //         return moneyStr
    //     }
    //
    //     const moneyNumberic = parseFloat(moneyStr)
    //
    //     let moneyStrOnHandle = moneyNumberic
    //
    //     if (limitInteger != null) {
    //         moneyStrOnHandle = handleLimitInteger({moneyNumberic, limitInteger})
    //     }
    //
    //     return moneyStrOnHandle.toFixed(limitDecimal)
    // }
  };
}

