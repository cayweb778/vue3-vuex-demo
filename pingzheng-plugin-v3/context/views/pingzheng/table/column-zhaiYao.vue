<template>
  <div
      class="abstractGrid"
      style="height:100%"
  >
    <textarea
        @keydown="checkEnter(event)"
        ref="zhaiYaoInput"
        v-model="textareaVal"
        onclick="javascript:this.focus();this.select();"
        @click="textareaClick"
        @blur="textareaBlur"
        @keyup.ctrl.x="abstractUl($event.target)"
        @keydown.up="textareaKeyUp"
        @keydown.down="textareaKeyDown"
        @keyup.enter.stop="setVal()"
        @input="chooseIndex=-1,listFitter($event.target),setTimeout(function(){$refs.dataList.value.style.display='block'}.bind(this))"
        class="ulToggle"
        style="box-sizing:border-box;background:inherit;display:block;font-size:15px;width:100%;height:100%;color:black;font-weight:800"
    />
    <ul
        class="ulX ulList"
        ref="dataList"
        style="text-align:left;position:fixed;width:200px;top:60px;margin:0;padding:0;background:white;border-bottom:solid 1px #d7d7d7;overflow-y: scroll;max-height:200px"
    >
      <li
          v-for="(zhaiYao,index) in zhaiYaoList"
          @click="ulLiClick(zhaiYao)"
          @mousedown="$event.target.click()"
          :class="index==chooseIndex?'active':''"
          style="font-size:13px;padding:10px 10px"
      >
        {{ zhaiYao.accabname }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {computed, defineProps, getCurrentInstance, nextTick, ref, useContext, watch} from 'vue';
import PinyinMatch from '../../../plugins/pinyin-match';
import {zhaiYaoStore} from '../../../store/modules/zhaiYao';
import {checkEnter} from '../../../util/key';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import {useCssLoad} from '../../../require-css/index';
// useCssLoad(import.meta.url).loadCss([
//   'column-zhaiYao.css'
// ]);
const {emit} = useContext();
const zhaiYaoInput = ref(null);
const dataList = ref(null);
const props = defineProps({
  val: {}
});
const val=null
const zhaiYaoList = computed(() => zhaiYaoStore.getZhaiYaoList);

function setVal() {
  if (this.chooseIndex != -1) {
    dataList.value.getElementsByTagName('LI')[this.chooseIndex].click();
  } else {
    zhaiYaoInput.value.blur();
  }
}

function enter(val) {
  if (textareaVal.value == '') {
    textareaVal.value = val;
  }

  zhaiYaoInput.value.focus();
}

// 过滤列表
function listFitter(obj) {
  let val = obj.value.trim();
  let bol = false;
  for (let i in zhaiYaoList) {
    if (val == '') {
      zhaiYaoList[i].hide = false;
    } else {
      if (zhaiYaoList[i].accabname.split(val).length > 1 || PinyinMatch.match(zhaiYaoList[i].accabname, val) != false) {
        bol = true;
        zhaiYaoList[i].hide = false;
      } else {
        zhaiYaoList[i].hide = true;
      }
    }
    this.$set(zhaiYaoList, i, zhaiYaoList[i]);
  }
  if (bol == false) {
    this.showAll = true;
  } else {
    this.showAll = false;
  }
}

function textareaClick() {
  onDataListPostion()
      dataList.value.style.display = 'block'
}

// 监听位置改变,同步位置
function onDataListPostion() {
  if (dataList == null) return;
  dataList.value.style.display = 'none';
  dataList.value.style.left = zhaiYaoInput.value.getBoundingClientRect().x;
  dataList.value.style.top = (zhaiYaoInput.value.getBoundingClientRect().y + zhaiYaoInput.value.getBoundingClientRect().height) + 'px';
}


const textareaVal = ref(val);
const dataListShow = false;
const showAll = false;
const chooseIndex = ref(-1);
const zhaiYaoListForShow = computed(() => {
  let list = [];
  for (let i in zhaiYaoList.value) {
    if (zhaiYaoList.value[i].hide == false) {
      list.push(zhaiYaoList.value[i]);
    }
  }
  return list;
});

// 凭证表高度
const vouchTableScrollY = computed(function() {
  return this.$store.state.vouchTableScrollY;
});
// body高度
const bodyWidth = computed(function() {
  return this.$store.state.bodyWidth;
});

// watch
// 'vouchTableScrollY': {
//   handler: function(scrollTop) {
//     this.onDataListPostion(this.vouchTableScrollY);
//   }
// },
// 'bodyWidth': {
//   handler: function(scrollTop) {
//     this.onDataListPostion(this.vouchTableScrollY);
//   }
// },
watch(chooseIndex, function(newVal) {
  if (newVal == -1) return;
  nextTick(function() {
    let ulHeight = dataList.value.clientHeight;
    let liHeight = dataList.value.getElementsByTagName('LI')[0].clientHeight;
    let activePosY = dataList.value.getElementsByClassName('active')[0].offsetTop + liHeight;

    if ((activePosY - ulHeight) > 0) {
      dataList.value.scrollTop = activePosY - ulHeight - 2;
    } else {
      dataList.value.scrollTop = 0;
    }
  })
})
setTimeout(function() {
  onDataListPostion();
}.bind(this));


function textareaKeyUp() {
  if (chooseIndex.value > 0) chooseIndex.value--;
}

function textareaKeyDown() {
  if (chooseIndex.value < zhaiYaoList.value.length - 1){
    chooseIndex.value++;
  }
}

function textareaBlur() {
  dataList.value.style.display = 'none';
  setTimeout(function() {
    textareaVal.value != '' ? emit('change', textareaVal.value) : '';
  }.bind(this));
}
function ulLiClick(zhaiYao){
  textareaVal.value=zhaiYao.accabname
  zhaiYaoInput.value.blur()
}
emit('ref',getCurrentInstance())
</script>
<style src="./column-zhaiYao.css"></style>

