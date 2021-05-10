<template>
  <div>
    {{bbbb}}
  </div>
</template>
<script setup>
import {getCurrentInstance, onMounted} from 'vue';

const bbbb='cnm'
onMounted(()=>{
  console.log(getCurrentInstance());
})
</script>
