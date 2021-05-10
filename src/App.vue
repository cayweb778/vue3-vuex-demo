<template>
  <div>
    <el-button @click="openAddPingZheng">
      打开新增凭证
    </el-button>
    <el-button @click="openShowPingZheng">
      打开查看凭证
    </el-button>
    <el-button>打开插入凭证</el-button>
  </div>
  <!--  <PingZheng />-->
</template>
<script setup lang="ts">
import {openAddPingZheng,openShowPingZheng } from './open-type/open-type'

</script>
