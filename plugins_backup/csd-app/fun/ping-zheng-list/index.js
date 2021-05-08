import v2LayDate from './v2-lay-date.js';

import {queryDateMixin} from './ping-zheng-query-date-mixin.js';



vueApp.config({
      components: {
        'tableVouch': urlPath + '/cwerp/jizhang/component/table_vouch',
        'pageShow': urlPath + '/cwerp/jizhang/component/page_show',
        'pageEdit': urlPath + '/cwerp/jizhang/component/page_edit',
        'pageCopy': urlPath + '/cwerp/jizhang/component/page_copy',
        'pageInsert': urlPath + '/cwerp/jizhang/component/page_insert'
      }
    }, () => {

      function createBoozVouchPlugin(pluginOptions) {
        return {
          popups: {
            pageEdit: () => ''
          },
          install(vue, opt) {
            // 维护一个模型
            const model = {
              pageShow: null,
              pageEdit: null,
              pageCopy: null,
              pageInsert: null
            };
            const componentLibs = {...model, ...pluginOptions.components};

            // 检查插件完整性
            let msgs = [];
            if (componentLibs.pageShow == null) {
              msgs.push('pageShow未找到');
            }

            // 异常处理
            if (msgs.length > 0) {
              alert('泊舟凭证插件不完整,更多信息请查看控制台');
              console.error('--- 泊舟凭证插件不完整 ---\n', msgs);
              return;
            }
            const vouchOptions = {
              vocuherOptions: (
                  {
                    // 日期 默认添置凭证日期
                    date,
                    // 凭证号 PZ000000001
                    coutnoId,
                    // 类型 记、转
                    type,
                    // 编码 001...
                    num,
                    // 单据 n(张)
                    billNum,
                    // 制单人 王五
                    zdr
                  }
              ) => {
                return {
                  coutnoId,
                  date,
                  type,
                  num,
                  billNum,
                  zdr
                };
              },
              propsOptions: (model = {
                switchData: {
                  // 日期
                  date: '',
                  // 类型
                  type: '',
                  // 编码
                  num: '',
                  // 编码
                  bill_num: '',
                  // 制单人
                  zdr: '',
                  // 凭证号
                  coutno_id: ''
                },
                // 凭证数据
                trs: [],
                // 添置成功后回调
                successCallbackMet: () => ''
              }) => model
            };
            // 挂载到Vue链上
            const $boozVouch = {
              options: vouchOptions,
              popups: {
                async createBoozVouchPageEdit
                    ({
                       options,
                       data,
                       success,
                       setup
                     }) {


                  const context = {
                    options: vouchOptions.vocuherOptions({}),
                    data,
                    success,
                    source: {
                      propOptions: null
                    }
                  };

                  // 执行setup
                  if (setup != null) {
                    await setup(context);
                  }

                  // 补充
                  if (options != null) {
                    context.options = option;
                  }


                  // model完整性校验
                  // ...

                  // 覆盖模型数据
                  context.source.propOptions = vouchOptions.propsOptions({
                    switchData: {
                      // 日期 (例: 2020-01-01)
                      date: context.options.date,
                      // 类型 (例: 01(记)、转)
                      type: context.options.type,
                      // 编码 (例: 001...)
                      num: context.options.num,
                      // 单据数 (例: n(张))
                      bill_num: context.options.billNum,
                      // 制单人 (例: 张三)
                      zdr: context.options.zdr,
                      // 凭证号 (例: PZ000000000001)
                      coutno_id: context.options.coutnoId
                    },
                    trs: context.data,
                    successCallbackMet: success
                  });

                  // 生成dom
                  const dom = document.createElement('div');
                  document.body.appendChild(dom);
                  const store = new Vuex.Store({state: {}});
                  const instance = new componentLibs.pageEdit({
                    el: dom,
                    store
                  });
                  instance['trs'] = [];

                  // 业务处理
                  instance.switchData = {...instance.switchData, ...context.source.propOptions.switchData};
                  instance['trs'] = context.source.propOptions.trs;

                  function closePage() {
                    instance.$el.parentNode.removeChild(instance.$el);
                    instance.$destroy(true);
                  }

                  instance.$on('ok', (props = {}) => {
                    closePage();
                    context.source.propOptions.successCallbackMet(props);
                  });
                  instance.$on('close', (props = {}) => {
                    closePage();
                  });
                }
              }
            };
            Vue.prototype.$boozVouch = $boozVouch;
            return;
          }
        };
      }

      const boozVouchPlugin = createBoozVouchPlugin({
        components: {
          pageShow: Vue.options.components.pageShow,
          pageEdit: Vue.options.components.pageEdit,
          pageCopy: Vue.options.components.pageCopy,
          pageInsert: Vue.options.components.pageInsert
        }
      });
      Vue.use(boozVouchPlugin);
      window.app = new Vue({
        el: '#app',
        components: {
          v2LayDate
        },
        mixins: [
          //  基础
          baseMixin(),
          queryDateMixin()
        ],

        methods: {

          // 当前凭证列表通用数据
          getCurrentPageData: commonMethods.getCurrentPageData,
          // 打开-冲销页
          openChongxiaoPage: openPageMethods.openChongxiaoPage,
          // 打开-凭证查看页
          openLookVoucherPage: openPageMethods.openLookVoucherPage,
          // 打开-凭证复制页
          openCopyVoucherPage: openPageMethods.openCopyVoucherPage,
          // 打开-凭证插入页
          openInsertVoucherPage: openPageMethods.openInsertVoucherPage,
          // 打开-凭证修改页
          openEditVoucherPage: openPageMethods.openEditVoucherPage,
          // 凭证操作-整理断号
          breakNumTidy: vouchListApi.breakNumTidy,
          // 凭证操作-作废凭证
          doVouchInvaild: vouchListApi.doVouchInvaild,
          // 凭证状态-禁用
          pingzhengdisable: pingzhengState.pingzhengdisable,
          // api-结账
          querySettle: query.querySettle,
          // 列表帮助
          thisHelp: openPageMethods.thisHelp

        }
      });
    }
);
