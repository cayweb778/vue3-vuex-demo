<template>
  <div class="subGrid">
    <el-popover
        placement="top-start"
        title="标题"
        :width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <textarea
            slot="reference"
            ref="subInput"
            v-model="textareaVal"
            @focus="textareaFocus"
            @blur="textareaBlur"
            @input="listFitter($event.target)"
            @keydown.up="textareaKeyUp"
            @keydown.down="textareaKeyDown"
            @keyup.enter.stop="enterEvent()"
            onclick="javascript:this.focus();this.select();"
            style="box-sizing:border-box;background:inherit;display:block;height:60px;font-size:15px; color:black;font-weight:800;"
        />
      </template>
    </el-popover>


    <div
      ref="dataList"
      class="dataList"
    >
      <ul class="ulList">
        <li
          v-for="(kuaiJiKeMu,index) in kuaiJiKeMuList"
          :class="index==chooseIndex?'active':''"
          @click="ulLiClick(kuaiJiKeMu)"
          @mousedown.stop="$event.target.click()"
          style="font-size:13px;padding:10px 10px"
        >
          {{ kuaiJiKeMu.ccode }} {{ kuaiJiKeMu.ccodepath }}
        </li>
      </ul>
      <ul
        @click="showPageAddKM=true"
        style="box-shadow: rgb(59, 128, 169) 0px 1px 20px 0px inset;cursor:pointer;z-index:999999;margin-top:300px;background: rgb(40, 180, 164);font-weight:700;text-align: center;margin:0;padding:5px 0 0;width:416px;overflow-y: scroll;border-bottom:solid 1px grey;height:30px;color:white;"
      >
        <li @mousedown="$store.state.openAddKeMu(rowIndex)">
          新增科目
        </li>
      </ul>
    </div>


    <!--    <div v-if="textareaVal!='' && textareaVal!=null" class="balance"  style="position:absolute;bottom:0;color:grey;pointer-events:none;" >-->
    <!--            余额:-->
    <!--            <span  :style="{'color':moneyComputed<0?'red':''}">{{moneyComputed}}</span>-->
    <!--            元-->
    <!--    </div>-->
    <addSubjectPage
      ref="addSubjectPage"
      v-if="addSubjectPageShow"
      @change="kuaiJiKeMuChange"
      @cancel="subInput.focus(),addSubjectPageShow=false"
    />
  </div>
</template>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import {useCssLoad} from '../../../require-css/index';
// useCssLoad(import.meta.url).loadCss([
// 'column-kuaiJiKeMu.css'
// ]);
import {computed, defineProps, nextTick, onMounted, ref, useContext} from 'vue';
import {kuaiJiKeMuStore} from '../../../store/modules/kuaiJiKeMu';
import addSubjectPage from  '../kuai_ji_ke_mu_popup/kuai_ji_ke_mu_add_popup'
const kuaiJiKeMuList=computed(()=>kuaiJiKeMuStore.getKuaiJiKeMuList)
const dataList=ref(null)
const api = {
  // 检查是否需要辅助核算
  queryAssist() {
    return true;
    // let bol = false // true 直接完成,false需要进行辅助核算
    // let objs = {
    //     'iyear': this.$store.state.addvouchPageIyear,
    //     'ccode': this.ccode
    // };
    // $.ajax({
    //     type: 'post',
    //     url: urlPath + '/subject!queryAssist',
    //     data: objs,
    //     async: false,
    //     success: function (res) {
    //         this.assistTypes = []
    //         dataList.value.style.display = 'none'
    //         if (res.obj.bperson == '1') this.assistTypes['个人往来'] = {}
    //         if (res.obj.brelativeUnit == '1') this.assistTypes['往来单位'] = {}
    //         if (res.obj.bdept == '1') this.assistTypes['部门'] = {}
    //         if (res.obj.bitem == '1') this.assistTypes['项目'] = {}
    //         if (res.obj.binventory == '1') this.assistTypes['存货'] = {}
    //         if (res.obj.br == '1') this.assistTypes['客户'] = {}
    //         if (res.obj.be == '1') this.assistTypes['供应商'] = {}
    //         if (Object.keys(this.assistTypes).length == 0) {
    //             bol = true
    //         } else {
    //             // this.openAssistSet = true
    //         }
    //
    //     }.bind(this),
    //     error: function (xhr) {
    //         $('body').html(xhr.responseText)
    //     }
    // });
    // return bol
  }
  // // 查询余额
  // queryMoney() {
  //     let objs = {
  //         'requestMap.iyear': this.iyear,
  //         'requestMap.ccode': this.ccode
  //     };
  //     $.ajax({
  //         type: 'post',
  //         url: urlPath + '/voucher!queryKMMoney',
  //         data: objs,
  //         success: function (res) {
  //             this.money = res.map['money']
  //             this.orgin = res.map['orgin']
  //             if(this.updatePage){
  //                 if (this.orgin == 1) {
  //                     this.money-=(parseFloat(this.billSubjectMoneys.j) - parseFloat(this.billSubjectMoneys.d)).toFixed(2)
  //                 } else {
  //                     this.money-= (parseFloat(this.billSubjectMoneys.d) - parseFloat(this.billSubjectMoneys.j)).toFixed(2)
  //                 }
  //             }
  //         }.bind(this),
  //         error: function (xhr) {
  //             $('body').html(xhr.responseText)
  //         }
  //     });
  // }
};

const props = defineProps([
  'rowIndex',
  'val',
  'subBillMoney',
  'iyear',
  'billSubjectMoneys',
  'assistVal',
  'subs',
  'updatePage'
]);
const textareaVal = ref(props.val);
const dataListShow = false;
const addSubjectPageShow = false;
const chooseIndex = ref(0);
const openAssistSet = false;
const money = 0;
const orgin = 0;
const assistTypes = {};

//
// const kuaiJiKeMuList=function() {
//   let list = [];
//   for (let i in this.subs) {
//     if (this.subs[i].hide == false) {
//       list.push(this.subs[i]);
//     }
//   }
//   return list;
// }
const moneyComputed= function() {
  if (this.billSubjectMoneys == null) {
    return parseFloat(this.money).toFixed(2);
  }
  if (this.orgin == 1) {
    return ((parseFloat(this.money) + parseFloat(this.billSubjectMoneys.j) - parseFloat(this.billSubjectMoneys.d))).toFixed(2);
  } else {
    return ((parseFloat(this.money) + parseFloat(this.billSubjectMoneys.d) - parseFloat(this.billSubjectMoneys.j))).toFixed(2);
  }
}
// 凭证表高度
const vouchTableScrollY= function() {
  return this.$store.state.vouchTableScrollY;
}
// body高度
const bodyWidth= function() {
  return this.$store.state.bodyWidth;
}
// ccde
const ccode= function() {
  return this.textareaVal.split(' ')[0];
}

function kuaiJiKeMuChange(event) {
  this.addSubjectPageShow = false;
  this.$emit('refresh', function() {
    this.textareaVal = this.getDescribe(event), this.$nextTick(function() {
      this.queryAssist() ? this.$emit('change', this.textareaVal) : '';
    });
  }.bind(this));
}
// ...api,
function enterEvent() {
  dataList.value.getElementsByTagName('LI')[this.chooseIndex].click();
  this.chooseIndex = -1;
}
// function initSubs() {
//   for (let i in this.subs) {
//     this.subs[i].hide = false;
//     this.$set(this.subs, i, this.subs[i]);
//   }
// }
// 过滤列表
// function listFitter(obj) {
//   let val = $(obj).val();
//   if (val.indexOf('\n') != -1) {
//     this.textareaVal = $.trim(val);
//     return;
//   }
//   val = $.trim(val);
//   for (let i in this.subs) {
//     if (val == '') {
//       this.subs[i].hide = false;
//       this.$set(this.subs, i, this.subs[i]);
//       continue;
//     }
//     if (PinyinMatch.match(this.subs[i].ccodepath, val) != false || this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 1 || this.subs[i].ccodename.split(val).length > 1 || ($.trim(this.subs[i].ccode) + ' ' + $.trim(this.subs[i].ccodepath)).split(val).length > 1) {
//
//       this.subs[i].hide = false;
//       this.$set(this.subs, i, this.subs[i]);
//     } else if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 2 || $.trim(this.subs[i].ccode) + ' ' + $.trim(this.subs[i].ccodepath) == val) {
//       this.subs[i].hide = false;
//       this.$set(this.subs, i, this.subs[i]);
//     } else {
//       this.subs[i].hide = true;
//       this.$set(this.subs, i, this.subs[i]);
//     }
//   }
// }
const {emit}=useContext()
const subInput=ref(null)
// 监听位置改变,同步位置
function onDataListPostion(scrollTop) {
  if (dataList == null) return;
  // dataList.value.style.display = 'none'
  dataList.value.style.left = subInput.value.getBoundingClientRect().x;
  dataList.value.style.top = (subInput.value.getBoundingClientRect().y + subInput.value.getBoundingClientRect().height) + 'px';
}
function focus() {
  subInput.value.focus();
}
function getDescribe(ccode) {

  for (let j in this.subs) {
    if (this.subs[j].ccode == ccode) {
      return this.subs[j].ccode + ' ' + this.subs[j].ccodepath;
    }
  }
}
onMounted(()=>{
  setTimeout(() => {
    onDataListPostion(vouchTableScrollY);
  }, 2500);
})
// watch: {
//   'vouchTableScrollY': function(scrollTop) {
//     this.onDataListPostion(scrollTop);
//   },
//   'bodyWidth': function() {
//     this.onDataListPostion(this.vouchTableScrollY);
//   },
//   'chooseIndex': function(newVal) {
//     if (newVal == -1) return;
//     this.$nextTick(function() {
//       let ulHeight = dataList.value.clientHeight;
//       let liHeight = dataList.value.getElementsByTagName('LI')[0].clientHeight;
//       let activePosY = dataList.value.getElementsByClassName('active')[0].offsetTop + liHeight;
//       if ((activePosY - ulHeight) > 0) {
//         dataList.value.getElementsByClassName('ulList')[0].scrollTop = activePosY - ulHeight + liHeight - 8;
//       } else {
//         dataList.value.getElementsByClassName('ulList')[0].scrollTop = 0;
//       }
//     });
//   }
// }
function textareaFocus() {
  dataList.value.style.display='block'
  onDataListPostion(vouchTableScrollY)
}
function textareaKeyUp(){
if(chooseIndex>0)chooseIndex.value--
}
function textareaKeyDown(){
      if(chooseIndex<kuaiJiKeMuList.length-1)chooseIndex.value++
}
function textareaBlur(){
  dataList.value.style.display='none'
}
function ulLiClick(kuaiJiKeMu){
  textareaVal.value=kuaiJiKeMu.ccode+' '+kuaiJiKeMu.ccodepath
  nextTick(()=>emit('change',textareaVal))
}
</script>
<style src="./column-kuaiJiKeMu.css"></style>
