/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
// import {useCssLoad} from '../../require-css/index';
import layer from '../../boozjs-layer/boozjs-layer.es';
import $ from '../../boozjs-jquery/boozjs-jquery.js';
// useCssLoad(import.meta.url).loadCss(['skin.css']);
import './skin.css'
export const LaySkin = function() {
    return {
    data() {
      return {
        id: ''
      };
    },
    methods: {
      getId() {

      },
      close() {
        layui.layer.close(this.id);
      }
    },
    mounted() {
        this.id = layer.open({
          type: 1,
          maxmin: true,
          skin: 'pingZhengTheme-default', //加上边框
          area: ['1300px', '705px'], //宽高
          content: $(this.$refs['content']),
          end: () => {
            this.$store.state.close();
          }

        });
        this.$store.state.laySkinId = this.id;
    },
    template: `<div ref="content"><slot/></div>`
  };
};
export const LaySkinMixin = function(){
  return {
    methods: {
      abcd:  function(h, children) {
       return h(LaySkin(), {ref: 'laySkin'}, children)
      }
    },
    created: function() {
      this.$store.state.instance = this;
      const _this = this;
      this.$store.state.close = () => {
        if (_this.$refs['laySkin'] != null) {
         layer.closeAll();
          setTimeout(() => {
            _this.$destroy();
            _this.$el.remove();
          }, 1000);
        }

      };
    }
  }
};
