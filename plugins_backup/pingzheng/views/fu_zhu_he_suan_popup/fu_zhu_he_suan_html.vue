<template>
  <div @mouseover="if($event.target,value!='')tipId=openFuZhuHeSuanDetail($event.target,value)"
       @mouseout="close(tipId)" style="“user-select:none;cursor:pointer" onselectstart="return false;">


    <div

        v-html="value"
        style="  overflow: hidden;
                                                          text-overflow: ellipsis;
                                                          display: -webkit-box;
                                                          -webkit-line-clamp: 3;
                                                          height: 100%;
                                                          width:100%;
                                                          -webkit-box-orient: vertical;width:100%;line-height: 20px;
                                                    padding-left: 5px;font-size:12px;"/>
    <div>
    </div>
  </div>

</template>
<script>
import zhaiYaoGrid from '../table/column-zhaiYao';
const layer=null
import {defineProps} from 'vue';
const value=defineProps(['value'])
const tipId=''
function openFuZhuHeSuanDetail(dom, html) {
  layer.close(this.tipId);
  // if(this.tipId==null){
  return layer.tips(html, dom, {
    tips: [1, '#3595CC'],
    time: 0,
    area: ['200px', 'auto']
  });
  // }
  // layer.open({
  //     type: 1,
  //     content: html,
  //     btn: ['关闭']
  // })
}
function close(tipId) {
  layer.close(tipId);
}

</script>
