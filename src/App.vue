<template>
  <el-button @click="openAddPingZheng">
    打开新增凭证
  </el-button>
  <el-button @click="openShowPingZheng">
    打开查看凭证
  </el-button>
  <el-button>打开插入凭证</el-button>
  <!--  <PingZheng />-->
</template>
<script setup lang="ts">
import {useOpenAdd} from '../pingzheng-plugin-v3/pingzheng';

function openAddPingZheng() {
  useOpenAdd({zhiDanRen: '机器人01'});
}
function openShowPingZheng() {
  useOpenAdd({zhiDanRen: '机器人01'});
}
</script>
