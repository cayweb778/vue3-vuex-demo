<template>
  <PingZhengLayer>
    <PingZhengLayout>
      <PingZhengTable />
    </PingZhengLayout>
    <template v-slot:bottomRightBtns>
      <div style="position:absolute;right:100px;    bottom: 95px;width:500px">

        <div style="float: right;margin-top:0px;">
          <!--                                    <button @click="alert('正在开发中')" style="font-size:12px" class="dy_button">-->
          <!--                                        凭证草稿-->
          <!--                                    </button>-->
          <button  style="cursor:pointer;font-size:12px" class="dy_button">
            放弃
          </button>
        </div>

      </div>
    </template>
  </PingZhengLayer>
</template>
<script setup lang="ts">
import '../assets/styles/boozui/boozui.css'
import PingZhengLayer from './pingzheng-layer/pingzheng-layer.vue'
import PingZhengLayout from './pingzheng/ping_zheng_editor_layout.vue'
import PingZhengTable from './pingzheng/ping_zheng_editor_table.vue'
</script>
