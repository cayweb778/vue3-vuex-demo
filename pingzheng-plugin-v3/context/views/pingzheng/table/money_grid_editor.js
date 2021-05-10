/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
const {useCssLoad} = await import ('../../../require-css/index');
useCssLoad(import.meta.url).loadCss([
  'money_grid.css'
]);
import('money_grid');

// 检查回车
function isEnter(e) {
  var et = e || window.event;
  var keycode = et.charCode || et.keyCode;
  if (keycode == 13) {
    if (window.event) {
      window.event.returnValue = false;
    } else {
      e.preventDefault(); //for firefox
    }
    return true;
  }
  return false;
}

// 转换金额格式
function formatMoneyAPI(moneyArr) {
  moneyArr = String(moneyArr);
  moneyArr = moneyArr == null ? '' : moneyArr;
  if (moneyArr == 0) moneyArr = '';
  if (moneyArr.split('\.').length > 1 && moneyArr.split('\.')[1] == 0) {
    moneyArr = moneyArr.split('\.')[0];
  }
  moneyArr = String(moneyArr).split('\.');
  if (moneyArr.length > 1) {
    var empty = [];
    if (parseInt(moneyArr[0]) < 0) {
      moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
    }
    var num = moneyArr[0].split('');
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    let float = moneyArr[1].split('');
    if (float.length == 1) {
      float.push('0');
    }
    if (float[float.length - 1] == '\n') {
      float.pop();
    }
    moneyArr = empty.concat(num.concat(float));
  } else {
    var empty = [];
    if (parseInt(moneyArr[0]) < 0) {
      moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
    }
    var num = moneyArr[0].split('');
    if (num[num.length - 1] == '\n') {
      num.pop();
    }
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    if (!moneyArr[0] == '') {
      num.push('0');
      num.push('0');
    } else {
      num.push('');
      num.push('');
    }
    moneyArr = empty.concat(num);
  }
  return moneyArr;
}

// 检查金额
function checkNumProportion(value) {
  // 相等功能
  if (value == '=') {
    this.$emit('evenUp');
  }
  if (value == '0') {
    value = '';
  }

  if (value == 0) {
    value = '';
  }
  value = String(value).replace(/[。]+/, '.');
  let moneySplit = value.split('\.');
  if (moneySplit.length > 2) {
    value = moneySplit[0] + '.' + moneySplit[1];
  }
  if (value.split('\.').length > 1) {
    if (value.split('\.')[0].length > 11) {
      value = value.split('\.')[0].substring(0, value.split('\.')[0].length - 1) + '.' + value.split('\.')[1];
      return;
    }
  }
  if (value.split('\.').length == 1 && value.length > 11) {
    value = value.substring(0, value.length - 1);
  } else if (value.split('\.').length > 1 && value.split('\.')[1].length == 0 && value.length > 12) {
    value = parseFloat(value.split('\.')[0].substring(0, 11) + '.' + value.split('\.')[1]).toFixed(2);
    return;
  } else if (value.split('\.').length > 1 && value.split('\.')[1].length == 2 && value.length > 14) {
    value = value.substring(0, value.length - 1);
  }/*
            else if(value.split("\.").length>1 && value.split("\.")[1].length==1 && value.length > 13){
                value = value.substring(0, value.length - 1)
            }*/

  if (value.split('\.').length > 1 && value.split('\.')[1].length > 2) {
    value = value.split('\.')[0] + '.' + value.split('\.')[1].substring(0, 2);
  }
  value = String(value).replace(/[^0-9-.]+/, '');
}

Object.assign(exports, {
  props: ['value'],
  data() {
    return {
      textareaValue: '',
      showUl: true
    };
  },
  // template: moneyGridTpl,
  render(h) {


    const moneyArr = (formatMoneyAPI(this.value));
    const isNeg = this.value < 0;

    let textAreaStyle = 'display:none;height:60px !important;line-height: 50px';
    let ulStyle = 'width: 101.04%; position: absolute; top: 0px; z-index: 2; font-size: 20px; font-weight: 700; height: 100%;';
    if (isNeg) {
      ulStyle += ';color:red';
    }
    if (!this.showUl) {
      ulStyle += 'display:none';
      textAreaStyle += 'display:block';
    }

    const moneyGrid = h('ul',
        {
          attrs: {
            class: 'moneyGrid',
            style: ulStyle
          },
          on: {
            'click': (value) => {
              this.showUl = false;
            }
          }
        },
        Array.apply(null, {length: 13}).map((row, i) => {
          return h('li', {
            attrs: {
              style: 'line-height: 58px; width: 15px !important;height:100%;float:left'
            },
            on: {
              click: () => {
                this.$emit('click', this.$el);
              }
            }
          }, moneyArr[i]);
        }));
    this.textareaValue = this.value;
    return h('div', [
      h('textarea', {
        attrs: {
          style: textAreaStyle,
          class: 'textx',
          value: this.textareaValue
        },
        on: {
          'blur': (value) => {
            this.$emit('blur');
          },
          'input': (value) => {
            this.textareaValue = checkNumProportion(value);
            // this.$emit('input',value)
          },
          'blur': (value) => {
            this.showUl = true;
          },
          'keydown': (e) => {
            if (isEnter(e)) {
              this.$emit('next', value);
            }
          }
        }
      }),
      moneyGrid
    ]);

  }
});

