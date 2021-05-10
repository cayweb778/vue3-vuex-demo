<template>
  <div style="height: 100%;border-bottom: 0;" ref="abc"/>
</template>
<script setup lang="ts">
import {getCurrentInstance, h, onMounted, ref, render, useContext} from 'vue';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import './money_grid.css';

const {slots} = useContext();
const abc = ref(null);

const moneyBase = ['百', '十', '亿', '千', '百', '十', '万', '千', '百', '十', '元', '角', '分'];

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
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
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
    for (let i = 0; i < Object.getOwnPropertyNames(moneyBase).length - 2 - num.length - 1; i++) {
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

const {emit} = useContext();

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

        class: 'moneyGrid',
        style: 'height:15px;text-align: center;font-size:12px',

      },
      Array.apply(null, {length: 13}).map((row, i) => {
        return h('li', {
          on: {
            click: () => {
              // emit('click', this.$el);
            }
          }
        }, chineseMoneyArr[i]);
      }));
  return moneyGrid;
}
const a=getCurrentInstance()

onMounted(() => {
  if (slots.default == null) {
    render(getChineseMoneyGrid(h), abc.value);
    return;
  }
  const text = slots.default()[0].children;
  const moneyArr = (formatMoneyAPI(text));
  const isNeg = text < 0;
  render(h('ul',
      {
        // onClick: (e) => {
        //   e
        //   this.showUl = false;
        // },
        class: 'moneyGrid ' + (isNeg ? 'isNeg' : ''),
        style: ' width: 101.04%; position: absolute; top: 0px; z-index: 2; font-size: 20px; font-weight: 700; height: 100%;'
      },
      Array.apply(null, {length: 13}).map((row, i) => {
        return h('li', {
          style: 'line-height: 58px; width: 15px !important;height:100%;float:left',
          click: () => {
            this.$emit('click', this.$el);
          }
        }, moneyArr[i]);
      })), abc.value);
});

</script>
