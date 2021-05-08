/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import ('../../../require-css/index').then(({useCssLoad})=>{
//   useCssLoad(import.meta.url).loadCss([
//     'money_grid.css'
//   ]);
// });
/* eslint-disable */
let abc = `
        <div></div>
    `;

// 转换金额格式
function formatMoneyAPI(moneyStr) {
  moneyStr = String(moneyStr);
  moneyStr = moneyStr == null ? '' : moneyStr;
  if (moneyStr == 0) moneyStr = '';
  if (moneyStr.split('\.').length > 1 && moneyStr.split('\.')[1] == 0) {
    moneyStr = moneyStr.split('\.')[0];
  }
  moneyStr = String(moneyStr).split('\.');
  if (moneyStr.length > 1) {
    var empty = [];
    if (parseInt(moneyStr[0]) < 0) {
      moneyStr[0] = moneyStr[0].substring(1, moneyStr[0].length);
    }
    var num = moneyStr[0].split('');
    for (let i = 0; i < Object.getOwnPropertyNames(_moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    let float = moneyStr[1].split('');
    if (float.length == 1) {
      float.push('0');
    }
    if (float[float.length - 1] == '\n') {
      float.pop();
    }
    moneyStr = empty.concat(num.concat(float));
  } else {
    var empty = [];
    if (parseInt(moneyStr[0]) < 0) {
      moneyStr[0] = moneyStr[0].substring(1, moneyStr[0].length);
    }
    var num = moneyStr[0].split('');
    if (num[num.length - 1] == '\n') {
      num.pop();
    }
    for (let i = 0; i < Object.getOwnPropertyNames(_moneyBase).length - 2 - num.length - 1; i++) {
      empty.push('');
    }
    if (!moneyStr[0] == '') {
      num.push('0');
      num.push('0');
    } else {
      num.push('');
      num.push('');
    }
    moneyStr = empty.concat(num);
  }
  return moneyStr;
}

function getChineseMoneyGrid(h) {
  const chineseMoneyArr = [
    '百',
    '十',
    '亿',
    '千',
    '百',
    '十',
    '万',
    '千',
    '百',
    '十',
    '元',
    '角',
    '分'
  ];
  const moneyGrid = h('ul',
      {
        attrs: {
          class: 'moneyGrid',
          style: 'height:15px;text-align: center;font-size:12px'
        },
        on: {
          'click': (value) => {
            this.showUl = false;
          }
        }
      },
      Array.apply(null, {length: 13}).map((row, i) => {
        return h('li', {
          on: {
            click: () => {
              this.$emit('click', this.$el);
            }
          }
        }, chineseMoneyArr[i]);
      }));
  return moneyGrid;
}

export default {
  mounted() {
  },
  // template: moneyGridTpl,
  render(h) {
    if (this.$slots.default == null) {
      return getChineseMoneyGrid(h);
    }
    const moneyArr = (formatMoneyAPI(this.$slots.default[0].text));
    const isNeg = this.$slots.default[0].text < 0;
    return h('ul',
        {
          attrs: {
            class: 'moneyGrid ' + (isNeg ? 'isNeg' : ''),
            style: ' width: 101.04%; position: absolute; top: 0px; z-index: 2; font-size: 20px; font-weight: 700; height: 100%;'
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
  }
}

