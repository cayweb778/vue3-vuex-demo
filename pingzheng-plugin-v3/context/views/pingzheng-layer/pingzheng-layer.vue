<template>
  <div>
    <div ref="abc">
      <slot />
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
import '@/assets/styles/skin.css'
// @ts-nocheck
// import {useCssLoad} from '../../require-css/index';
import layer from '../../../../plugins_backup/boozjs-layer/boozjs-layer.es';
const abc=ref(null)
import $ from 'jquery'
onMounted(()=>{
  const id = layer.open({
    type: 1,
    maxmin: true,
    skin: 'pingZhengTheme-default', //加上边框
    area: ['1300px', '705px'], //宽高
    content: $(abc.value),
    end: () => {
      this.$store.state.close();
    }

  });
})
console.log(layer);
// import $ from 'jquery';
// // useCssLoad(import.meta.url).loadCss(['skin.css']);

// export const LaySkin = function() {
//   return {
//     data() {
//       return {
//         id: ''
//       };
//     },
//     methods: {
//       getId() {
//
//       },
//       close() {
//         layui.layer.close(this.id);
//       }
//     },
//     mounted() {
//       this.id = layer.open({
//         type: 1,
//         maxmin: true,
//         skin: 'pingZhengTheme-default', //加上边框
//         area: ['1300px', '705px'], //宽高
//         content: $(this.$refs['content']),
//         end: () => {
//           this.$store.state.close();
//         }
//
//       });
//       this.$store.state.laySkinId = this.id;
//     },
//     template: `<div ref="content"><slot/></div>`
//   };
// };
// export const LaySkinMixin = function(){
//   return {
//     methods: {
//       abcd:  function(h, children) {
//         return h(LaySkin(), {ref: 'laySkin'}, children)
//       }
//     },
//     created: function() {
//       this.$store.state.instance = this;
//       const _this = this;
//       this.$store.state.close = () => {
//         if (_this.$refs['laySkin'] != null) {
//           layer.closeAll();
//           setTimeout(() => {
//             _this.$destroy();
//             _this.$el.remove();
//           }, 1000);
//         }
//
//       };
//     }
//   }
// };

</script>
