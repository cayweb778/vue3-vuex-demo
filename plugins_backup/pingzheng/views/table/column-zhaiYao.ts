/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import {useCssLoad} from '../../../require-css/index';
// useCssLoad(import.meta.url).loadCss([
//   'column-zhaiYao.css'
// ]);
export default {
  props: ['val', 'abstracts'],
  data() {
    return {
      textareaVal: this.val,
      dataListShow: false,
      showAll: false,
      chooseIndex: -1
    };
  },
  computed: {
    'abstractsForShow': function() {
      let list = [];
      for (let i in this.abstracts) {
        if (this.abstracts[i].hide == false) {
          list.push(this.abstracts[i]);
        }
      }
      return list;
    },
    // 凭证表高度
    'vouchTableScrollY': function() {
      return this.$store.state.vouchTableScrollY;
    },
    // body高度
    'bodyWidth': function() {
      return this.$store.state.bodyWidth;
    }
  },
  template: `
    <div class="abstractGrid" style="height:100%">
    <textarea onkeydown="checkEnter(event)"
              ref="abstractInput"
              v-model="textareaVal"
              onclick="javascript:this.focus();this.select();"
              @click="textareaClick()"
              @blur="$refs.dataList.style.display='none',setTimeout(function(){textareaVal!=''?$emit('change', textareaVal):''}.bind(this))"
              @keyup.ctrl.x="abstractUl($event.target)"
              @keydown.up="if(chooseIndex>0)chooseIndex--"
              @keydown.down="if(chooseIndex<abstractsForShow.length-1)chooseIndex++"
              @keyup.enter.stop="setVal(),$emit('next')"
              @input="chooseIndex=-1,listFitter($event.target),setTimeout(function(){$refs.dataList.style.display='block'}.bind(this))"
              class="ulToggle"
              style="box-sizing:border-box;background:inherit;display:block;font-size:15px;width:100%;height:100%;color:black;font-weight:800"></textarea>
    <ul class="ulX ulList" ref="dataList"
        style="text-align:left;position:fixed;width:200px;top:60px;margin:0;padding:0;background:white;border-bottom:solid 1px #d7d7d7;overflow-y: scroll;max-height:200px">
        <li v-for="(abstract,index) in abstractsForShow"
            @click="textareaVal=abstract.accabname,$refs.abstractInput.blur()"
            @mousedown="$event.target.click()"
            :class="index==chooseIndex?'active':''"
            style="font-size:13px;padding:10px 10px">{{abstract.accabname}}
        </li>
    </ul>
</div>

    `,
  methods: {
    setVal() {
      if (this.chooseIndex != -1) {
        this.$refs.dataList.getElementsByTagName('LI')[this.chooseIndex].click();
      } else {
        this.$refs.abstractInput.blur();
      }
    },
    enter(val) {
      if (this.textareaVal == '') {
        this.textareaVal = val;
      }

      this.$refs.abstractInput.focus();
    },
    // 过滤列表
    listFitter(obj) {
      let val = obj.value.trim();
      let bol = false;
      for (let i in this.abstracts) {
        if (val == '') {
          this.abstracts[i].hide = false;
        } else {
          if (this.abstracts[i].accabname.split(val).length > 1 || PinyinMatch.match(this.abstracts[i].accabname, val) != false) {
            bol = true;
            this.abstracts[i].hide = false;
          } else {
            this.abstracts[i].hide = true;
          }
        }
        this.$set(this.abstracts, i, this.abstracts[i]);
      }
      if (bol == false) {
        this.showAll = true;
      } else {
        this.showAll = false;
      }
    },
    textareaClick() {
      setTimeout(function() {
        this.onDataListPostion();
        this.$refs.dataList.style.display = 'block';
      }.bind(this));
    },
    // 监听位置改变,同步位置
    onDataListPostion() {
      if (this.$refs.dataList == null) return;
      this.$refs.dataList.style.display = 'none';
      this.$refs.dataList.style.left = this.$refs.abstractInput.getBoundingClientRect().x;
      this.$refs.dataList.style.top = (this.$refs.abstractInput.getBoundingClientRect().y + this.$refs.abstractInput.getBoundingClientRect().height) + 'px';
    }
  },
  components: {},
  watch: {
    'vouchTableScrollY': {
      handler: function(scrollTop) {
        this.onDataListPostion(this.vouchTableScrollY);
      }
    },
    'bodyWidth': {
      handler: function(scrollTop) {
        this.onDataListPostion(this.vouchTableScrollY);
      }
    },
    'chooseIndex': function(newVal) {
      if (newVal == -1) return;
      this.$nextTick(function() {
        let ulHeight = this.$refs.dataList.clientHeight;
        let liHeight = this.$refs.dataList.getElementsByTagName('LI')[0].clientHeight;
        let activePosY = this.$refs.dataList.getElementsByClassName('active')[0].offsetTop + liHeight;

        if ((activePosY - ulHeight) > 0) {
          this.$refs.dataList.scrollTop = activePosY - ulHeight - 2;
        } else {
          this.$refs.dataList.scrollTop = 0;
        }
      });
    },
    textareaVal: function(newVal) {

    }
  },
  created() {

    this.iyear = '2019-01-01';
  },
  mounted() {
    setTimeout(function() {
      this.onDataListPostion(this.vouchTableScrollY);
    }.bind(this));
  }
}
