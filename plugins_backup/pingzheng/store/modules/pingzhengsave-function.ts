/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
import $ from '../../../boozjs-jquery/boozjs-jquery';
import pingzhengHelper from '../../helper/pingzhengHelper';
import {$request} from '../../../boozapp-request/boozapp-request';
import system from '../../../csd-app/store/modules/system';
import {queryProductEndExpired} from '../../../csd-app/function/system-function';

function AssertProhibitToAddMsg(prohibitToAdd) {
  if(prohibitToAdd){
    alert('添加处理中，禁止重复添加')
    return true
  }
}
async function verifyPingZhengHandle( instance) {
  let errorMassages = {
    options: [],
    rows: []
  };
  let warnMassages = {
    rows: []
  };
  const isProductEndExpired = await queryProductEndExpired({date: instance.pingZhengModel.props.date});
  if (isProductEndExpired) {
    errorMassages.options.push('产品已到期');
  }

  let rowIndex = 0;
  instance.$store.state.pingZhengModel.rows
      .map(row => {
        rowIndex++;
        let errorMassage = {
          rowIndex: rowIndex,
          data: []
        };
        let warnMassage = {
          rowIndex: rowIndex,
          data: []
        };
        // 0 0.00 0.0 null ''
        if ($.trim(row.jieMoney) == '') {
          errorMassage.data.push('借方金额错误: 不能空字符串');
        }
        if ($.trim(row.daiMoney) == '') {
          errorMassage.data.push('贷方金额错误: 不能空字符串');
        }
        if (row.jieMoney == '0.00' && row.daiMoney == '0.00') {
          warnMassage.data.push('借方金额与贷方金额都为空');
        } else {
          if (row.zhaiYao == '') {
            errorMassage.data.push('摘要不能为空');
          }
          if (row.kuaiJiKeMuFullName == '') {
            errorMassage.data.push('科目不能为空');
          }
        }
        if (errorMassage.data.length > 0) {
          errorMassages.rows.push(errorMassage);
        }
        if (warnMassage.data.length > 0) {
          warnMassages.rows.push(warnMassage);
        }

      });
  if (instance.billSumMoneyJM != instance.billSumMoneyDM) {
    errorMassages.options.push('单据的借方金额与贷方金额不相等');
  }

  const isError = errorMassages.options.length > 0 || errorMassages.rows.length > 0;

  if (isError) {
    let msg = '';
    errorMassages.rows
        .map(item => {
          msg += '第' + item.rowIndex + '行: <span style="color:red">';
          item.data.forEach(errorMsg => {
            msg += errorMsg + '，';
          });
          msg = msg.slice(0, msg.length - 1);
          msg += '</span><br>';
        });
    if (errorMassages.options.length > 0) {
      msg += '单据错误:<span style="color:red">';
      Object.keys(errorMassages.options)
          .map(key => msg += errorMassages.options[key] + '<br>');
      msg += '</span>';
    }

    layer.alert(msg);
  }
  return !isError;
}
export {
  AssertProhibitToAddMsg,
  verifyPingZhengHandle
}
