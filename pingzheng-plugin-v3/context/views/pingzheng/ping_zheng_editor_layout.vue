<template>
  <div class="chanjetDialog">
    <div>
      <h1 style="font-weight: 700 !important;font-family: 微软雅黑;text-align: center;font-size:30px;margin-top:0">
        {{ pingZhengModel.options.title }}
      </h1>
      <div style="margin: -8px auto 0px; width: 1200px; position: relative;">
        <div
            id="collected"
            class="div_padding"
            style="border-radius:20px;position: absolute; bottom: 0px; width: 150px; background: rgb(68, 187, 72); color: white; padding: 6px 10px;"
        >
          {{ pingZhengModel.props.date }}
        </div>
        <div style="margin-left: 160px; height: 37px;"/>
        <div style="position: absolute; font-weight: 900; right: 64px; bottom: 0px; float: right; margin-bottom: 10px;">
          <img
              src="../../assets/images/questionMark.png"
              title="帮助"
              @click="thisHelp('《凭证-新增凭证》操作帮助')"
              style="height: 22px; cursor: pointer; float: left; margin-top: 3%;"
          >
          <div
              class="div_padding"
              @click="openPrint()"
              style="width: 100px; cursor: pointer; float: left; background: white; color: rgb(40, 180, 164); border: 1px solid rgb(40, 180, 164); margin-left: 30px;border-radius: 20px"
          >
            打印凭证
          </div>
        </div>
      </div>
      <div id="pageEditZoom">
        <span
            class="dijitDialogCloseIcon"
            @click="$parent.popupPage=null"
        />
        <div style="margin:30px auto 0;">
          <div
              :style="showPingZheng?'pointer-events: none;':''"
              style="width:1060px;margin:0 auto;height: 10px"
          >
            <div style="float:left;margin-top:-10px;margin-left:0px;">
              <select v-model="pingZhengModel.props.type"
                  @change="switchPage()"
                  class="pageEditZoomSelect">
                <option v-for="v in vouchTypes">
                  {{ v[1] }}
                </option>
              </select>
              字 第
              <input type="text"
                  v-model="pingZhengModel.props.pingZhengNumOfMonth"
                  class="voucherNum pageEditZoomInput">
              号
            </div>

            <div class="pageEditZoomDate"
            >
              <span style="vertical-align: bottom">日期：</span>
              <el-time-picker
                  v-model="pingZhengModel.props.date"
                  format="YYYY-MM-DD"
                  type="date"
              >
              </el-time-picker>
            </div>
            <div style="float:right;color:grey">
              附单据
              <input
                type="text"
                style="color:black;text-align:center; border:none;border-bottom:solid 1px black;width:50px;border-radius: 0 !important;"
                v-model="pingZhengModel.props.danJuNum"
            >张
            </div>
          </div>
          <div
              v-loading="pingzhengloading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <slot/>
          </div>
        </div>
        <div style="width:1060px;margin:0 auto;padding-top:10px">
          <span style="margin-top:5px;color:#d7d7d7">制单人：{{ pingZhengModel.props.zdr }}</span>
          <slot name="bottomRightBtns"/>
        </div>
        <div
            class="noselect"
            style="position: absolute;     bottom: 46px;left: 528px;"
        >
          <!--          <pingzhengPaging />-->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
import {pingZhengModelStore} from '../../store/modules/pingZhengModel';
import {showPingZhengStore} from '../../store/modules/showPingZheng';

const showPingZheng = computed(() => showPingZhengStore.getShowPingZheng);
const pingzhengloading = null;
const vouchTypes = [
  ['记', '记']
];
const pingzhengData = {
  value: '2020-12-12',
  pickerOptions: {
    disabledDate: () => {
      alert(1);
    },
    shortcuts: [{
      text: '今天',
      onClick(picker) {
        picker.$emit('pick', new Date());
      }
    }, {
      text: '昨天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', date);
      }
    }, {
      text: '一周前',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', date);
      }
    }]
  }
};
const financialTarget = {
  dateSection: {}
};
const forbidAdd = false;


const pingZhengModel = pingZhengModelStore.getPingZhengModel;
const EditorType = null;
</script>
<style src="../../assets/styles/ping_zheng_editor_layout.css"/>
<style src="../../assets/styles/ping_zheng_editor_layout.less.css"/>
<style scoped>
#pageEditZoom {
  border-radius: 5px;
  -moz-border-radius: 5px;
  height: 546px;
  position: relative;
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
  width: 1200px;
  padding: 20px 0;
  border: 1px solid rgb(215, 215, 215);
  background: white
}

#pageEditZoom .pageEditZoomSelect {

  font-size: 13px;
  color: black;
  background-color: #fbfbfb;
  border: 1px solid #d5d5d5;
  padding: 6px 12px;
  border: none;
  width: 90px;
  text-align: center;
  text-align-last: center;
  border-bottom: 1px solid black
}

#pageEditZoom .pageEditZoomInput {
  border-radius: 0 !important;
  font-size: 13px;text-align:center;color: #858585;background-color: #fbfbfb;padding: 6px 12px;box-sizing:border-box;width:65px;    border:none !important;border-bottom: solid 1px black !important; color: black !important;

}

#pageEditZoom .pageEditZoomDate {
position:absolute;top:49px;text-align:center;color: grey;margin:0 auto;left:calc((100% - 145px)/2) !important;

}
</style>
