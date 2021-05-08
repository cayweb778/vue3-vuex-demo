/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */

// @ts-nocheck
import Vuex from '../../../boozjs-vuex/3.x';
import {useEditPingZhengMixin} from '../../views/fu_zhu_he_suan_popup/fu_zhu_he_suan_popup_store';

// import ('../../../require-css/index').then(({useCssLoad}) => {
  // useCssLoad(import.meta.url).loadCss([
    // '../../assest/css/views/fu_zhu_he_suan_popup.css'
  // ]);
// });


function toFuZhuHeSuanRender({instance, h, requireFuZhuList, row}) {

  const elSelectList = [];
  instance.abx = elSelectList;
  return h('el-form', {
    ref: 'elForm',
    attrs: {
      style: 'margin-bottom:0'
    },
    props: {
      labelPosition: 'left'
    }
  }, [
    ...requireFuZhuList
        .filter(select => row[select.columnName] != null)
        .map(select => {
          let selectValue = row[select.columnName];
          if (selectValue == null) {
            selectValue = '';
          }


          const elSelect = h('el-select', {
                ref: 'elSelect',
                props: {
                  value: selectValue,
                  defaultFirstOption: true
                },
                on: {
                  'input': function(value) {
                    const currentElSelectIndex = elSelectList.indexOf(elSelect);
                    const nextElSelectIndex = currentElSelectIndex + 1;
                    if (elSelectList[nextElSelectIndex] != null) {
                      elSelect.componentInstance.blur();

                      setTimeout(() => {
                        elSelectList[nextElSelectIndex].elm.click();
                      }, 100);
                    } else {
                      instance.ok();
                    }
                    // this.hello[select.name]=value
                    row[select.columnName] = value;
                  }
                }
              },
              [
                ...select.list.map(option => {
                  return h('el-option', {
                    props: option
                  });
                })
              ]);
          elSelectList.push(elSelect);
          return h('el-form-item', {
            attrs: {
              style: 'text-align:center',
              class: 'fuzhuhesuan-form-item'
            },
            props: {
              label: select.name + ':',
              labelWidth: '75px'
            }
          }, [
            elSelect
          ]);
        }),
    h({
      template: `
                    <el-form-item style="text-align: center;margin-top:5px" class="fuzhuhesuan_form_item_bottom">
                        <el-button @click="$parent.$parent.ok()" type="primary">确认</el-button>
                        <el-button @click="$parent.$parent.$parent.showPopper=false">取消</el-button>
                    </el-form-item>
                `
    })
  ]);
}

export const fuZhuHeSuanPopup = {
  mixins: [useEditPingZhengMixin()],
  props: ['value', 'pingZhengRow'],
  data() {
    return {
      requireFuZhuList: []
    };
  },
  computed: {
    ...Vuex.mapState([
      'pingZhengModel'
    ]),
    cc: function() {
      return this.value;
    }
  },

  // template: require('pingzheng/views/fu_zhu_he_suan_popup/fu_zhu_he_suan_popup.html'),
  directives: {
    focus: function(el) {
      el.focus();
    }
  },
  methods: {
    focusFirstFuZhuHeSuanSelect() {
      let _this = this;
      const interval = setInterval(() => {
        if (_this.abx != null && _this.abx.length != 0) {
          _this.abx[0].elm.click();
          window.clearInterval(interval);

        }
      }, 100);

    },
    ok() {
      this.$parent.showPopper = false;
      this.$emit('ok');
    },
    // 边界检测
    boundsdDtection(isOpen) {
      if (isOpen) {
        window.onclick = function(event) {
          if (this.value != '') {
            this.boundsdDtection(false);
            // this.confirmAbandon('辅助核算必填项,是否放弃')
          } else {
            this.$emit('assistSet', this.value);
          }
        }.bind(this);
      } else {
        window.onclick = null;
      }
    }
  },
  // template:'<div>{{cc}}</div>',
  async mounted() {
    this.$watch('value', {
      deep: true,
      handler: async (value) => {
        const handleRequireFuZhuHeSuan = async () => {
          return [
            await this.getDeptList(),
            await this.getPersonList(),
            await this.getCustomerList(),
            await this.getGYList(),
            await this.getCHList(),
            await this.getItemList()
          ];
        };
        this.requireFuZhuList = await handleRequireFuZhuHeSuan();
      },
      immediate: true
    });
  },
  render(h) {
    if (this.requireFuZhuList < 1) {
      return h('div');
    } else if (this.requireFuZhuList == null) {
      return h('div');
    } else {
      return toFuZhuHeSuanRender({instance: this, h, requireFuZhuList: this.requireFuZhuList, row: this.value});
    }

  }
};

