<template>
  <div
    class="subject_add"
    style="position:fixed;width:100%;height:100%;background:rgba(0,0,0,0.75);left:0;top:0;z-index: 2999000000"
  >
    <div
      style="width:30%;height:70%;position:absolute;left:34%;top:calc( (100% - 420px) / 2);width:420px;z-index:500;border-radius: 10px"
    >
      <div
        class="dy_ul_list"
        style="z-index:9999999999999999999999999;background:white;height: 280px;width:100%"
      >
        <h1 class="caption">
          新增科目
        </h1>
        <ul
          class="content"
          style="overflow-y:inherit;width:inherit;height: 170px"
        >
          <li>
            科目名称:
            <input
              type="text"
              v-model="dataPageKMAdd.addData.ccodeName"
              ref="KMNameInput"
              @keyup.enter="$refs['topSubjectInput'].click()"
              style="width:260px;"
            >
          </li>
          <li>
            上级科目:
            <div
              class="selectChoose"
              style="float: initial;display:inline"
            >
              <!-- <input type="hidden" v-model="dataPageKMAdd.queryData.like" v-model="dataPageKMAdd.queryData.like"/>-->
              <input
                type="text"
                ref="topSubjectInput"
                onclick="this.select();"
                @focus="$refs.dataList.style.display='block'"
                @blur="$refs.dataList.style.display='none'"
                @input="queryKM(dataPageKMAdd.queryData),$event.target.focus()"
                @keydown.up="if(chooseIndex>0)chooseIndex--"
                @keydown.down="if(chooseIndex< dataPageKMAdd.topNameList.length-1)chooseIndex++"
                @keyup.enter="$refs.dataList.getElementsByTagName('LI')[chooseIndex].click(),setTimeout(()=>{$refs['kuaiJiKeMuNumInput'].click()},100)"
                v-model="dataPageKMAdd.queryData.like"
                style="width:260px;cursor: pointer;text-align: center"
              >
              <ul
                ref="dataList"
                style="display:none;top:20px;left:0px;overflow: scroll;height:300px;text-align: left"
              >
                <li
                  v-for="(topObj,index) in dataPageKMAdd.topNameList"
                  @click="chooseTopKM(topObj.ccode,topObj.ccodename,topObj)"
                  @mousedown="$event.target.click()"
                  :class="index==chooseIndex?'active':''"
                >
                  {{ topObj.ccode }} {{ topObj.ccodename }}
                </li>
              </ul>
              <div style="clear: both" />
            </div>
          </li>
          <!--   <li>
                 科目类型:
                 <input type="text" placeholder="资产" readonly="readonly"  style="cursor: pointer"/>
             </li>-->
          <li>
            科目编码:
            <input
              type="text"
              ref="kuaiJiKeMuNumInput"
              readonly="readonly"
              onclick="this.select();"
              style="cursor: pointer"
              @keyup.enter="$refs['kmAddPageAffirm'].click()"
              v-model="dataPageKMAdd.addData.ccodeNum"
              style="width:260px;"
            >
          </li>

          <li style="display:none">
            余额方向:
            <div
              class="radioContainer"
              style="color:grey"
            >
              <template v-if="dataPageKMAdd.addData.bproperty==1">
                <div
                  class="radio"
                  @click="dataPageKMAdd.addData.bproperty=1"
                >
                  <i class="layui-anim layui-icon"></i>借
                </div>
                <div
                  class="radio"
                  style="margin-left:20px"
                  @click="dataPageKMAdd.addData.bproperty=0"
                >
                  <i class="layui-anim layui-icon"></i>贷
                </div>
              </template>
              <template v-if="dataPageKMAdd.addData.bproperty==0">
                <div
                  class="radio"
                  @click="dataPageKMAdd.addData.bproperty=1"
                >
                  <i class="layui-anim layui-icon"></i>借
                </div>
                <div
                  class="radio"
                  style="margin-left:20px"
                  @click="dataPageKMAdd.addData.bproperty=0"
                >
                  <i class="layui-anim layui-icon"></i>贷
                </div>
              </template>
            </div>
          </li>
        </ul>
        <div
          class="btnContainer"
          style="margin-top:10px"
        >
          <button
            class="dy_button"
            ref="kmAddPageAffirm"
            @click="addKM(dataPageKMAdd.addData),showPageAddKM=false"
          >
            确认添加
          </button>
          <button
            class="dy_button"
            @click="$emit('cancel')"
          >
            放弃
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
// import {useTextLoad} from '../../../require-text/index';


import {computed, onMounted} from 'vue';

const chooseIndex = 0;
/** 新增科目相关 **/
const dataPageKMAdd = {
  topNameList: [],
  queryData: {
    like: ''
  },
  addData: {
    num: '',         // 上级编码    +
    year: '',        // 当前年
    /* 新增数据 */
    ccodeNum: '',    // 编码 300501
    ccodeName: '',   // 科目名      +
    bproperty: '',   // 方向        +
    cclass: '',      // 科目大类    +
    igradeNum: ''    // 科目级次    +

  },
  showData: {},
  exportData: {
    obj: {},
    dom: {}
  }
};


const iyear = computed(function() {
  return this.$store.state.addvouchPageIyear;
});
// 凭证表高度
const vouchTableScrollY = computed(function() {
  return this.$store.state.vouchTableScrollY;
});
// body高度
const bodyWidth = computed(function() {
  return this.$store.state.bodyWidth;
});


// 查询所有科目
function queryKM(data) {
  let _this = this;
  let iyear;
  $.ajax({
    type: 'post',

    url: urlPath + '/voucher!queryKM',
    data: {
      'requestMap.like': $.trim(data.like),
      'requestMap.iyear': _this.iyear.split('-')[0]
    },
    async: false,
    success: function(res) {
      _this.dataPageKMAdd.topNameList = res.list;
    },
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
}

function chooseTopKM(ccode, ccodename, topObj) {
  let bol = false;
  //增加之前检查是否有期初、本期发生
  let objs = {
    year: this.iyear,
    ccodeNum: ccode
  };
  $.ajaxSettings.async = false;
  $.post(urlPath + '/findSubjectType!findByCode', objs, function(msg) {
    if (msg == 'no') {
      layer.open({
        type: 1,
        content: '此科目已做期初或本期发生。不能增加下级科目！',
        btn: ['确定'],
        success: function(layero, index) {
          this.escQuit = function(event) {
            if (event.keyCode === 0x1B) {
              layer.close(index);
              console.log('peace and love');
              return false; //阻止系统默认回车事件
            }
          };
          $(document).on('keydown', this.escQuit); //监听键盘事件
        },
        end: function() {
          $(document).off('keydown', this.escQuit); //解除键盘事件
        }
      });
      bol = true;
    } else {
      /*  if (parseInt(topObj.ccode.length) < parseInt(aaa)) {
        } else {
            layer.alert('已超出科目编码规则,请前往设置中心进行调整');
            bol = true
        }*/
    }
  });
  $.ajaxSettings.async = true;
  if (bol) {
    this.dataPageKMAdd.queryData.like = '';
    return;
  }
  this.dataPageKMAdd.addData.year = this.iyear;
  this.$set(this.$store.state, 'addvouchPageIyear', this.iyear);
  this.dataPageKMAdd.addData.igradeNum = parseInt(topObj.igrade) + 1;
  this.dataPageKMAdd.addData.cclass = topObj.cclass;
  this.dataPageKMAdd.addData.bproperty = topObj.bproperty;
  this.dataPageKMAdd.queryData.like = topObj.ccode + ' ' + topObj.ccodename;
  this.dataPageKMAdd.addData.num = topObj.ccode;
  this.dataPageKMAdd.addData.topName = topObj.ccodename;
  this.queryKMMaxNum();
  setTimeout(function() {
    this.$refs.KMNameInput.focus();
  }.bind(this));
}

// 授权新增会计科目编号
function queryKMMaxNum() {
  let _this = this;
  $.ajax({
    type: 'post',
    url: urlPath + '/voucher!queryKMMaxNum',
    data: {
      'requestMap.num': _this.dataPageKMAdd.addData.num,
      'requestMap.igrade': _this.dataPageKMAdd.addData.igradeNum,
      'requestMap.year': _this.dataPageKMAdd.addData.year
    },
    async: false,
    success: function(res) {
      console.log(res);
      _this.dataPageKMAdd.addData.ccodeNum = res.msg;
    },
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
}

// 增加科目
function addKM(data) {
  $.ajax({
    type: 'post',
    url: urlPath + '/addSubjectType!AddCode',
    data: this.dataPageKMAdd.addData,
    async: false,
    success: function(res) {
      this.$emit('success', this.dataPageKMAdd.addData.ccodeNum);
    }.bind(this),
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
}


// watch: {
//   'chooseIndex': function() {
//     this.$nextTick(function() {
//       let ulHeight = this.$refs.dataList.clientHeight;
//       let liHeight = this.$refs.dataList.getElementsByTagName('LI')[0].clientHeight;
//       let activePosY = this.$refs.dataList.getElementsByClassName('active')[0].offsetTop + liHeight;
//       if ((activePosY - ulHeight) > 0) {
//         this.$refs.dataList.scrollTop = activePosY - ulHeight - 2;
//       } else {
//         this.$refs.dataList.scrollTop = 0;
//       }
//     });
//   }
// },
onMounted(() => {
  this.queryKM('');
  setTimeout(function() {
    this.$refs.KMNameInput.focus();
  }.bind(this));
});
</script>
