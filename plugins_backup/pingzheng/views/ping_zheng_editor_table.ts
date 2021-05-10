/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable */
import _$ from '../../boozjs-jquery/boozjs-jquery';
import {moneyHelper} from '../../boozjs-lang/money-util';
import Vuex from '../../boozjs-vuex/3.x';
import {queryFuZhuHeSuanApi} from '../api/fu_zhu_he_suan';
import apiProcess from '../data/data';
import fuZhuHeSuanHelper from '../helper/fu_zhu_he_suan_Helper';
import {convertCurrency} from '../helper/jizhangHelper';
import pingzhengHelper from '../helper/pingzhengHelper';
import {fuZhuHeSuanModel} from '../model/pingzheng_model';
import {fuZhuHeSuanPopup} from '../views/fu_zhu_he_suan_popup/fu_zhu_he_suan_popup';
import kuaiJiKeMuGrid from '../views/table/column-kuaiJiKeMu';
// import {useTextLoad} from '../../require-text/index';
import zhaiYaoGrid from '../views/table/column-zhaiYao';
import moneyGrid from '../views/table/money_grid';
import template  from 'raw-loader!./ping_zheng_editor_table.html'
const {toMoneyInputStr, toMoneyStr, toMoneyStr2} = moneyHelper();

const {pingZhengModelHelper} = pingzhengHelper;
const {createPingZhengRowModel} = pingZhengModelHelper();

window.checkEnter = (e) => {
    const et = e || window.event;
    const keycode = et.charCode || et.keyCode;
    if (keycode == 13) {
        if (window.event) {
            window.event.returnValue = false;
        } else {
            e.preventDefault(); //for firefox
        }
    }
};
import '../assest/css/views/ping_zheng_editor_table.css'

function moneyHandle() {
    return {
        handleZero({inputValue}) {
            if (inputValue == '0') {
                return '';
            }
            if (inputValue == 0) {
                return '';
            }
        },
        handleEqualKey({i, type, obj}) {
            console.log(this.billSumMoneyJM);
            console.log(this.billSumMoneyDM);
            if (type == 'jieMoney') {
                this.pingZhengModel.rows[i].daiMoney = '0';
                this.pingZhengModel.rows[i].jieMoney = '0';
                this.rowsWatch(this.pingZhengModel.rows, '');
                this.pingZhengModel.rows[i][type] = this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM);
            } else if (type == 'daiMoney') {
                this.pingZhengModel.rows[i].daiMoney = '0';
                this.pingZhengModel.rows[i].jieMoney = toMoneyStr2(0);
                this.rowsWatch(this.pingZhengModel.rows, '');
                this.pingZhengModel.rows[i][type] = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
            }
            setTimeout(() => {
                this.rowFeed(obj);
            }, 80);

        }
    };
}

const {handleZero, handleEqualKey} = moneyHandle();


function pingZhengRowCastRowFuzhuHeSuan(pingZhengRow) {
    const rowFuzhuHeSuan = {};
    Object.keys(pingZhengRow)
        .filter(key => key.substr(0, 2) == 'fz')
        .forEach(key => {
            if (pingZhengRow[key] != null) {
                rowFuzhuHeSuan[key] = pingZhengRow[key];
            }
        });
    return rowFuzhuHeSuan;
}

const {createNamespacedHelpers} = Vuex;

function storeManagerMixin() {
    return {
        computed: Vuex.mapState([
            'EditorType',
            'pingZhengRowHover',
            'pingZhengModel',
            'pingZhengFuZhuHeSuanHtml',
            'keMuList',
            'rows'
        ])
    };
}

// 浅监听凭证行数组
function shallowPingZhengRow() {

    this.$watch('pingZhengModel.rows',
        {
            handler: async (newPingZhengRows) => {
                const list = [];
                for (let i = 0; i < newPingZhengRows.length; i++) {
                    const pingZhengRow = newPingZhengRows[i];
                    // await store.getFuZhuHeSuan('fzDept')
                    const rowFuzhuHeSuan = pingZhengRowCastRowFuzhuHeSuan(pingZhengRow);
                    list.push(rowFuzhuHeSuan);
                }
                this.$store.state.pingZhengModel.rowsFuZhuHeSuan = list;

                this.$set(this.$store.state, 'pingZhengRowHover', this.$store.state.pingZhengRowHover =
                    Array.apply(null, {length: newPingZhengRows.length})
                        .map(() => false));
            },
            immediate: true
        });
}

// 深度监听辅助核算数组
function deepRowsFuZhuHeSuan() {
    // 合并辅助核算
    function assignFuZhuHeSuan(rowFuZhuHeSuan, pingZhengRow) {
        Object.keys(rowFuZhuHeSuan)
            .forEach(k => {
                if (rowFuZhuHeSuan[k] != null) {
                    pingZhengRow[k] = rowFuZhuHeSuan[k].split(' ')[0];
                }
            });
    }

    this.$watch('pingZhengModel.rowsFuZhuHeSuan',
        {
            handler: (newRows) => {
                newRows.forEach((row, rowIndex) => {
                    if (row != null) {
                        assignFuZhuHeSuan(row, this.pingZhengModel.rows[rowIndex]);
                    }
                });
            },
            deep: true,
            immediate: true
        });
}


const addColumnMethods = {
    // 添加辅助核算列
    addFuZhuHeSuanColumn() {

    }
};

function generateFuZhuHeSuanTableModel(number) {
    const rows = [];
    for (let i = 0; i < number; i++) {
        rows.push({show: false});
    }
    return rows;
}

const fuZhuHeSuanColumnApi = {
    queryFuZhuHeSuan: (params) => {
        let res;
        $.ajax({
            type: 'post',
            url: urlPath + '/subject!queryAssist',
            data: params,
            async: false,
            success: res1 => res = res1,
            error: function(xhr) {
                _$('body').html(xhr.responseText);
            }
        });
        return {
            then(exec) {
                exec(res);
            }
        };
    }
};
const {mapState, mapActions} = createNamespacedHelpers('fuZhuHeSuan/fuZhuHeSuanData');

const fuZhuHeSuanColumnMethods = {

    /**
     * 检查是否需要辅助核算
     * @param keMu 科目
     */
    fuZhuHeSuanClick(keMu, i, tr) {
        this.$nextTick(() => {
            this.openFuZhuHeSuan(i, tr);
            // if (this.queryAssist(keMu)) {
            // } else {
            //     return ''
            // }
        });
    },
    /**
     * 打开辅助核算页
     * @param i
     * @param tr
     */
    openFuZhuHeSuan(i, tr) {
        // debugger
        // this.assistTypes[i] = null
        // this.row.kuaiJiKeMuFullName = arguments[0]
        // this.proprowsWatch(this.rows)
        // setTimeout(function () {
        //     this.tShow(this.$refs['jGrid' + i][0].parentElement)
        // }.bind(this))
        this.tableFuZhuHeSuan.rows[0].show = true;
    }
};


function getBaseMixin() {
    return {
        props: ['proprows', 'isaddpage', 'stopSubjectMoneyUpdate', 'showPage', 'updatePage'],
        data() {
            return {
                updatePage: false,
                proprows1: [],
                // 禁止操作借贷金额
                tShowBan: false,
                // 查看页禁止focus
                action: true,
                btn: {
                    template: {
                        show: false
                    }
                },
                iyear: '',
                ccc: '没变',
                trBase: '',

                likeStr: ['a', 'b', 'c', 'd'],
                cwSubject: [],
                billSum: 30,
                zdr: '我是制单人',
                billTime: '',
                billSumMoneyJM: '',
                billSumMoneyDM: '',
                abstracts: [],    // 摘要集合
                subs: [{'': 'hello'}],          // 会计科目集合
                billSumMoneyJ: [],
                billSumMoneyD: [],
                vouchTypes: '',   // 凭证类型,
                billSumMoney2: '零元整',
                voucherTemplateShow: false,       // 显示凭证模板页
                voucherDraftShow: false,           // 显示凭证草稿页
                voucherDrafts: [],
                showPageAddKM: false,              // 显示科目页
                tableWidth: {
                    'zhaiYao': 220,
                    'kuaiJiKeMuFullName': 220,
                    'jieMoney': 220,
                    '贷款方金额': 220
                },
                renderSubjectStart: false,
                balanceData: {},
                /** 新增科目相关 **/
                dataPageKMAdd: {
                    topNameList: [],
                    queryData: {
                        like: ''
                    },
                    addData: {
                        num: '',         // 上级编码    +
                        year: '',        // 当前年
                        /* 新增数据 */
                        ccodeNum: '',    // 编码 300501
                        ccodeName: '',   // 科目名      +
                        bproperty: '',   // 方向        +
                        cclass: '',      // 科目大类    +
                        igradeNum: ''    // 科目级次    +

                    },
                    showData: {},
                    exportData: {
                        obj: {},
                        dom: {}
                    }
                },
                jici: [],
                billSubjectMoneys: {},
                assist: []
            };
        },
        computed: {
            isFuZhuHeSuan() {
                const i = this.pingZhengModel.rows.filter(item => {
                        // 部门
                        return item.fzDept != null ||
                            // 个人往来
                            item.fzEmp != null ||
                            // 客户
                            item.fzCustomer != null ||
                            // 供应商
                            item.fzSupplier != null ||
                            // 存货
                            item.fzCunHuo != null ||
                            // 项目
                            item.fzXiangMuMulu != null;
                    }
                ).length > 0;
                return i;
            }
        },
        provide() {
            return {
                getSubs: () => this.subs
            };
        },
        methods: {
            ...mapActions([
                'getDeptList',
                'getPersonList',
                'getCustomerList',
                'getGYList',
                'getCHList',
                'getItemList'
            ]),
            toMoneyInputStr,
            castFuZhuHeSuanHtml(row) {
                function take(obj, nameProp) {
                    const {[nameProp]: inputValue = null} = obj;
                    if (inputValue == null) {
                        return null;
                    }
                    return {key: nameProp, inputValue};
                }

                // const abc=await this.getDeptList()
                return [take(row, 'fzDept'),
                    take(row, 'fzEmp'),
                    take(row, 'fzCustomer'),
                    take(row, 'fzSupplier'),
                    take(row, 'fzCunHuo'),
                    take(row, 'fzXiangMuMulu')
                ]
                    .filter(item => item != null)
                    .map(item => {
                        if (item.key == 'fzDept') {
                            let inputValue = '';

                            if (item.inputValue != '') {
                                const object = this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.deptList.list.filter(option => option.value == item.inputValue)[0];
                                inputValue = object.label;

                            }
                            return this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.deptList.name + ': ' + inputValue;
                        }
                        if (item.key == 'fzEmp') {
                            let inputValue = '';

                            if (item.inputValue != '') {
                                inputValue = this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.personList.list.filter(option => option.value == item.inputValue)[0].label;
                            }
                            return this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.personList.name + ': ' + inputValue;
                        }
                        if (item.key == 'fzCustomer') {
                            let inputValue = '';

                            if (item.inputValue != '') {
                                inputValue = this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.customerList.list.filter(option => option.value == item.inputValue)[0].label;
                            }
                            return this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.customerList.name + ': ' + inputValue;
                        }
                        if (item.key == 'fzSupplier') {
                            let inputValue = '';

                            if (item.inputValue != '') {
                                inputValue = this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.gyList.list.filter(option => option.value == item.inputValue)[0].label;
                            }
                            return this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.gyList.name + ': ' + inputValue;
                        }
                        if (item.key == 'fzCunHuo') {
                            let inputValue = '';

                            if (item.inputValue != '') {
                                inputValue = this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.chList.list.filter(option => option.value == item.inputValue)[0].label;
                            }
                            return this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.chList.name + ': ' + inputValue;
                        }
                        if (item.key == 'fzXiangMuMulu') {
                            let inputValue = '';

                            if (item.inputValue != '') {
                                inputValue = this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.itemList.list.filter(option => option.value == item.inputValue)[0].label;
                            }
                            return this.$store.state.fuZhuHeSuan.fuZhuHeSuanData.itemList.name + ': ' + inputValue;
                        }
                    }).join('<br>');
            },
            async fuZhuHeSuanHandle(pingZhengRow) {
                fuZhuHeSuanHelper.clearFuZhuHeSuan(pingZhengRow);

                // 覆盖当前行辅助核算
                const res = await queryFuZhuHeSuanApi({
                    'iyear': this.pingZhengModel.props.date.split('-')[0],
                    'ccode': pingZhengRow.kuaiJiKeMuCode
                });
                const apiData = res.obj;
                const fuZhuHeSuanModel = fuZhuHeSuanHelper.apiDataCastFuZhuHeSuanModel(apiData);
                Object.assign(pingZhengRow, {...fuZhuHeSuanModel});
            },
            // 借贷余额计算
            jsye(type, val) {
                const _this = this;
                let money = 0;
                if (type == 0) {    //借
                    for (const i in _this.pingZhengModel.rows) {
                        if (_this.pingZhengModel.rows[i].kuaiJiKeMuFullName == val) {
                            const j = _this.pingZhengModel.rows[i].jieMoney;
                            const d = _this.pingZhengModel.rows[i].daiMoney;
                            money += parseFloat($.trim(j) == '' ? 0 : j);
                            money -= parseFloat($.trim(d) == '' ? 0 : d);

                        }
                    }
                } else {            //贷
                    for (const i in _this.pingZhengModel.rows) {
                        if (_this.pingZhengModel.rows[i].kuaiJiKeMuFullName == val) {
                            const j = _this.pingZhengModel.rows[i].jieMoney;
                            const d = _this.pingZhengModel.rows[i].daiMoney;
                            money += parseFloat($.trim(d) == '' ? 0 : d);
                            money -= parseFloat($.trim(j) == '' ? 0 : j);
                        }
                    }
                }
                return money;
            },
            listen(event) {
                al;
                if (event.keyCode === 13) {
                    this.send(); // 发送文本
                    event.preventDefault(); // 阻止浏览器默认换行操作
                    return false;
                }
            },
            // 查询末级科目余额表
            getBalance(obj, num, i) {
                const _this = this;
                const objs = {
                    'requestMap.iyear': _this.iyear,
                    'requestMap.ccode': num
                };
                const vmObj = this;
                $.ajax({
                    type: 'post',
                    url: urlPath + '/voucher!queryKMMoney',
                    data: objs,
                    success: function(res) {
                        if (res.map['orgin'] == '1') {
                            _thisye(1, num);
                        } else {
                            _this.jsye(0, num);

                        }
                        /*_this.$set(_this.pingZhengModel.rows[i], 'orgin', res.map['orgin'])
                        _this.$set(_this.pingZhengModel.rows[i], 'kmye', res.map['money'])*/
                        if (parseFloat(res) < 0) {
                            _$(obj).find('span').css('color', 'red');
                        } else {
                            _$(obj).find('span').css('color', 'grey');
                        }
                    },
                    error: function(xhr) {
                        _$('body').html(xhr.responseText);
                    }
                });
            },
            // 获取摘要
            async getAbstracts() {
                const {queryAbstracts} = apiProcess();
                const abstracts = await queryAbstracts();
                for (const i in abstracts) {
                    abstracts[i].hide = false;
                }
                this.abstracts = abstracts;
            },
            renderKMName() {
                this.getSubs();
                for (const i in this.pingZhengModel.rows) {
                    if (this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'] == '') continue;
                    const ccode = this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'].split(' ')[0];
                    this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'] = ccode + ' ' + this.findKMName(ccode);
                }
            },
            async keMuListApi({iyear:year, callback}) {
                const {queryKeMuListApi} = apiProcess();
                return await queryKeMuListApi({year});
            },
            // 获取会计科目
            async getSubs(callback) {
                const iyear = this.iyear.split('-')[0];
                const keMuList = await this.keMuListApi({iyear, callback});
                this.$store.state.keMuList = keMuList;
            },
            // 获取当前凭证
            getAddVoucherData() {
                const c = this.pingZhengModel.rows;
                const voucherList = [];
                const objs = {
                    'jsonRequest': {},
                    'msg': ''
                };
                let bol2 = false;
                for (const i in this.pingZhengModel.rows) {
                    if (this.pingZhengModel.rows[i].jieMoney == '' && this.pingZhengModel.rows[i].daiMoney == '') {
                        continue;
                    } else {
                        bol2 = true;
                        if (this.pingZhengModel.rows[i].zhaiYao == '') {
                            objs['msg'] = '摘要不能为空';
                            return objs;
                        }
                        if (this.pingZhengModel.rows[i].kuaiJiKeMuFullName == undefined || this.pingZhengModel.rows[i].kuaiJiKeMuFullName == '') {
                            objs['msg'] = '科目不能为空';
                            return objs;
                        }
                    }
                    const obj = {
                        'cdigest': this.pingZhengModel.rows[i].zhaiYao,
                        'ccode': this.pingZhengModel.rows[i].kuaiJiKeMuFullName.split(' ')[0],
                        'mc': this.pingZhengModel.rows[i].daiMoney,
                        'md': this.pingZhengModel.rows[i].jieMoney,
                        'inx': this.pingZhengModel.rows[i].daiMoney,
                        // 辅助核算
                        'fuZhuHeSuan': this.tableFuZhuHeSuan.rows[i] == null ? '' : this.tableFuZhuHeSuan.rows[i],
                        'msg': ''

                    };
                    voucherList.push(obj);
                }
                if (bol2 == false) {
                    objs['msg'] = '未填入数据';
                    return objs;
                }
                objs['jsonRequest'] = JSON.stringify(voucherList);
                if (this.billSumMoneyJM != this.billSumMoneyDM) {
                    layer.alert('借贷方金额不相等,不能保存');
                    return null;
                }
                if (true) {
                    const msg = ' ';
                }
                return objs;
            },
            exportData2() {
                const _this = this;
                const c = this.pingZhengModel.rows;
                const voucherList = [];
                const objs = {
                    'jsonRequest': {},
                    'msg': ''
                };
                let bol2 = false;
                // 检查会计科目
                const kjsubs = JSON.parse(JSON.stringify(this.pingZhengModel.rows));
                /* for(let i in _this.subs){
                     if($.trim(_this.subs[i].ccode)=='101115'){
                         console.log(_this.subs[i])
                         console.log(":::"+kjsubs[3].kuaiJiKeMuFullName)
                     }
                 }*/
                for (const i in kjsubs) {
                    let bol = false;
                    for (const j in _this.subs) {
                        if (((_this.subs[j].ccode + ' ' + _this.subs[j].ccodepath) == kjsubs[i].kuaiJiKeMuFullName) || $.trim(kjsubs[i].kuaiJiKeMuFullName) == '') {
                            bol = true;
                            break;
                        } else {
                            console.log(kjsubs[i].kuaiJiKeMuFullName);
                        }
                    }
                    if (bol == false) {
                        objs['msg'] = '会计科目错误,请检查';
                        return objs;
                    }
                }

                for (const i in this.pingZhengModel.rows) {
                    if (this.pingZhengModel.rows[i].jieMoney == '' && this.pingZhengModel.rows[i].daiMoney == '') {
                        continue;
                    } else {
                        bol2 = true;
                        if (this.pingZhengModel.rows[i].zhaiYao == '') {
                            objs['msg'] = '摘要不能为空';
                            return objs;
                        }

                        //debugger
                        if (this.pingZhengModel.rows[i].kuaiJiKeMuFullName == undefined || this.pingZhengModel.rows[i].kuaiJiKeMuFullName == '') {

                            objs['msg'] = '科目不能为空';
                            return objs;
                        }
                    }
                    const obj = {
                        'cdigest': this.pingZhengModel.rows[i].zhaiYao,
                        'ccode': this.pingZhengModel.rows[i].kuaiJiKeMuFullName.split(' ')[0],
                        'mc': this.pingZhengModel.rows[i].daiMoney,
                        'md': this.pingZhengModel.rows[i].jieMoney,
                        'inx': this.pingZhengModel.rows[i].daiMoney,
                        'msg': ''

                    };
                    voucherList.push(obj);
                }
                if (bol2 == false) {
                    objs['msg'] = '未填入数据';
                    return objs;
                }
                objs['jsonRequest'] = JSON.stringify(voucherList);
                if (this.billSumMoneyJM != this.billSumMoneyDM) {
                    layer.alert('借贷方金额不相等,不能保存');
                    return null;
                }
                if (true) {
                    msg = ' ';
                }
                return objs;
            },
            // 检查金额
            jieDaiInputHandle(i, type, obj) {
                const row = this.pingZhengModel.rows[i];
                const inputValue = this.pingZhengModel.rows[i][type];

                // 相等功能
                if (inputValue == '=') {
                    handleEqualKey.call(this, {i, type, obj});
                    return;
                }

                // 处理金额
                this.pingZhengModel.rows[i][type] = toMoneyInputStr(this.pingZhengModel.rows[i][type], 12);
            },
            focusJieGrid(rowIndex) {
                this.tShow(this.$refs['jGrid' + (rowIndex - 1)][0].parentElement);
            },
            focusKuaiJiKeMuGrid(rowIndex) {
                this.$refs['zhaiYaoGrid' + rowIndex][0].$refs.subInput.focus();
            },
            tShow(obj) {
                if (this.tShowBan == true) return;
                const _this = this;
                setTimeout(function() {
                    _$(obj).find('textarea').css('display', 'block');
                    setTimeout(function() {
                        _$(obj).find('textarea').focus();
                    }, 500);
                    _$(obj).find('textarea').select();
                    _$(obj).find('ul').hide();
                });
            },
            tHide(obj) {
                _$(obj).hide();
                _$(obj).closest('td').find('ul').show();
            },
            ulShowJ(obj) {
                _$('#app td .ulX').hide();
                _$(obj).parent().find('ul').show();
            },
            // 凭证显示
            pingzhengUlShow(obj) {
                _$('#app td .ulX').hide();
                _$(obj).parent().find('ul').show();
                _$(obj).parent().find('ul>li').removeClass('active');
                _$(obj).parent().find('ul>li:first').toggleClass('active');
            },
            ulShowD(obj) {
                _$('#app td .ulX').hide();
                _$(obj).parent().find('ul').show();
            },
            kjkmUlShow(obj) {
                _$(obj).closest('td').find('ul:first').css('top', (_$(obj).parent().offset().top + _$(obj).parent().height()) + 'px');
                _$(obj).closest('td').find('ul:first').css('left', _$(obj).parent().offset().left + 'px');
                _$(obj).closest('td').find('ul:eq(1)').css('top', (_$(obj).parent().offset().top + _$(obj).parent().height() + 200) + 'px');
                _$(obj).closest('td').find('ul:eq(1)').css('left', _$(obj).parent().offset().left + 'px');
                this.subFindSrowsAPI('');
                _$('#app td .ulX').hide();
                console.log(_$(obj).parent().find('ul').size());
                _$(obj).parent().find('ul').show();
                _$(obj).parent().find('ul').each(function() {
                    console.log(_$(this).css('display'));

                });
                _$(obj).parent().find('ul>li').removeClass('active');
                _$(obj).parent().find('ul>li:first').toggleClass('active');

            },
            hintForAbstract(obj) {
                // _$(obj).attr("placeholder",'摘要列表:"ctrl+x"键')
            },
            ulShow(obj) {
                this.subFindSrowsAPI('');
                _$('#app td .ulX').hide();
                _$(obj).parent().find('ul').show();
                _$(obj).parent().find('ul>li').removeClass('active');
                _$(obj).parent().find('ul>li:first').toggleClass('active');
            },
            ulHide(obj) {
                _$(obj).attr('placeholder', '');
                setTimeout(function() {
                    _$(obj).closest('td').find('ul').hide();
                }, 250);
            },
            ulHide2(obj) {
                _$(obj).closest('td').find('ul').hide();
            },
            // 键盘设置参数
            keyUpSetValJ(obj, type, code, path) {
                // parm1 行数 , parm2 属性名  if判断是否借贷框输入
                if (type == 'jieMoney' || type == 'daiMoney') {
                    this.ulShowJ(obj);
                    _$(obj).hide();
                } else {

                    this.getBalance(_$(obj).closest('li').find('.balance span'), _$(obj).attr('money'), _$(obj).closest('ul').index());
                    this.pingZhengModel.rows[_$(obj).closest('ul').index()][type + '_num'] = _$(obj).parent().find('.active').attr('money');
                    this.pingZhengModel.rows[_$(obj).closest('ul').index()][type] = $.trim(code) + ' ' + $.trim(path);
                    this.ulHide2(obj);
                    if (this.tShowBan == true) {
                        this.rowFeed(_$(obj).closest('tr'));

                    } else {
                        this.colFeedJ(obj);
                    }
                }
            },
            // 键盘设置参数
            keyUpSetVal(obj, type) {
                // parm1 行数 , parm2 属性名  if判断是否借贷框输入
                if (type == 'jieMoney' || type == 'daiMoney') {
                    this.ulShowJ(obj);
                    _$(obj).hide();
                } else {
                    this.pingZhengModel.rows[_$(obj).closest('tr').index()][type] = $.trim(_$(obj).text());
                    this.ulHide(obj);
                    this.colFeed(obj);
                }
            },
            textareaEnter(obj, type) {
                if ($.trim(_$(obj).next().find('.active').text()) == '') {
                    //this.pingZhengModel.rows[_$(obj).closest("tr").index()][type] = $.trim(_$(obj).next().find(".active").text())
                } else {
                    this.pingZhengModel.rows[_$(obj).closest('tr').index()][type] = $.trim(_$(obj).next().find('.active').text());
                }
                _$(obj).next().hide();
                /*setTimeout(function () {
                    vueObj.colFeed(obj)
                }, 100)*/
            },
            textareaEnter2(obj, type, event) {
                if (_$(obj).next().css('display') == 'block') {
                    this.pingZhengModel.rows[_$(obj).closest('tr').index()][type] = $.trim(_$(obj).next().find('.active').attr('ccode')) + ' ' + $.trim(_$(obj).next().find('.active').attr('ccodepath'));
                    this.pingZhengModel.rows[_$(obj).closest('tr').index()][type + '_num'] = _$(obj).next().find('.active').attr('money');
                }
                _$(obj).val(_$(obj).val().replace('\n', ''));
                this.getBalance(_$(obj).closest('td').find('.balance span'), _$(obj).next().find('.active').attr('money'), _$(obj).closest('tr').index());
                _$(obj).closest('td').find('ul').hide();
                if (this.tShowBan == true) {
                    this.rowFeed(_$(obj).closest('tr'));

                } else {
                    this.colFeedJ(obj);
                }
            },
            lineFeed(lineNum, abstractVal) {
                if (this.$refs['abstractGrid' + (lineNum + 1)] == null) {
                    this.addTr(lineNum);
                }
                this.$nextTick(function() {
                    this.$refs['abstractGrid' + (lineNum + 1)][0].enter(abstractVal);
                    if (this.billSumMoneyJM > this.billSumMoneyDM) {
                        if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
                            this.$nextTick(function() {
                                const obj = _$(this.$refs['dGrid' + (lineNum + 1)][0]);
                                this.clearLeftVal(obj);
                                this.rowsWatch(this.pingZhengModel.rows);
                                this.pingZhengModel.rows[lineNum + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
                                this.pingZhengModel.rows[lineNum + 1]['daiMoney1'] = this.formatMoneyAPI(this.pingZhengModel.rows[lineNum + 1].daiMoney == 0 ? '' : this.pingZhengModel.rows[lineNum + 1].daiMoney);
                                this.rowsWatch(this.pingZhengModel.rows);

                            });
                        }
                    } else {
                        if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
                            this.$nextTick(function() {
                                const obj = _$(this.$refs['jGrid' + (lineNum + 1)][0]);
                                this.clearRightVal(obj);
                                this.rowsWatch(this.pingZhengModel.rows);
                                this.pingZhengModel.rows[lineNum + 1].jieMoney = this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM);
                                this.pingZhengModel.rows[lineNum + 1]['jieMoney1'] = this.formatMoneyAPI(this.pingZhengModel.rows[lineNum + 1].jieMoney == 0 ? '' : this.pingZhengModel.rows[lineNum + 1].jieMoney);
                                this.rowsWatch(this.pingZhengModel.rows);
                            });

                        }
                    }
                    this.rowsWatch(this.pingZhengModel.rows);
                });
            },
            // 上下键选择列表
            ulKeyup(point, obj) {
                // 初始位置
                if (_$(obj).parent().find('.active').length == 0) {
                    _$('td>li').removeClass('active');
                    _$(obj).parent().find('li:first').toggleClass('active');
                    return;
                }
                if (point == 'up') {
                    if (_$(obj).parent().find('.active').index() != 0) {
                        const temp = _$(obj).parent().find('.active');
                        _$(obj).parent().find('.active').prev().addClass('active');
                        temp.removeClass('active');
                    }
                } else if (point == 'down') {
                    if (_$(obj).parent().find('.active').index() + 1 != _$(obj).parent().find('li').length) {
                        const temp = _$(obj).parent().find('.active');
                        _$(obj).parent().find('.active').next().addClass('active');
                        temp.removeClass('active');
                    }
                }
                const objPointerHeight = _$(obj).parent().find('.active')[0].offsetTop;
                const objHeight = _$(obj).parent().find('.active').outerHeight();
                if (objPointerHeight - 3 > objHeight * 4) {
                    _$(obj).closest('td').find('ul').scrollTop(objPointerHeight - objHeight * 4);
                }
            },
            openAddSubjectPage(tr, obj) {
                const _this = this;
                this.showPageAddKM = true;
                this.$nextTick(function() {
                    setTimeout(function() {
                        _this.$refs['chooseKM'].click();
                    });
                });
                this.dataPageKMAdd.exportData.obj = tr;
                this.dataPageKMAdd.exportData.dom = obj;
            },
            addKMTopChoose(target) {
                if (target._value.trim() == '') {
                    return;
                }
                const _this = this;
                const fireOnThis = _this.$refs['kmToplist'].firstElementChild;
                const evObj = document.createEvent('MouseEvents');
                evObj.initMouseEvent('mousedown', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
                fireOnThis.dispatchEvent(evObj);
            },
            // 换格
            colFeed(obj) {
                if (_$(obj).closest('td').index() + 1 != _$(obj).closest('tr').find('td').length) {
                    this.tShow(_$(obj).closest('td').next());
                    _$(obj).closest('td').next().find('textarea').focus();
                    if ($.trim(_$(obj).closest('td').next().find('textarea').val()) == '') {
                        this.kjkmUlShow(_$(obj).closest('td').next().find('textarea'));
                        _$(obj).closest('td').next().find('ul').show();
                        _$(obj).closest('td').next().find('ul>li:first').addClass('active');
                    }
                } else {  // 没有下格换行
                    this.rowFeed(_$(obj).closest('tr'));
                }
            },
            // 借方换格
            colFeedJ(obj) {
                if (_$(obj).closest('li').index() + 1 != _$(obj).closest('ul').find('>td').length) {
                    this.tShow(_$(obj).closest('li').next());
                    setTimeout(function() {
                        _$(obj).closest('li').next().find('ul').css('display', 'none');
                        _$(obj).closest('li').next().find('textarea').show();
                        _$(obj).closest('li').next().find('textarea').focus();
                        _$(obj).closest('li').next().find('ul').hide();
                    }, 200);
                } else {  // 没有下格换行
                    this.rowFeed(_$(obj).closest('ul'));
                }
            },
            // 贷方换格
            colFeedD(obj, i) {
                const vueObj = this;
                this.rowFeed(_$(obj).closest('tr'));
                if (this.billSumMoneyJM > this.billSumMoneyDM) {
                    if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
                        this.$nextTick(function() {
                            const o = _$(obj).closest('tr').next().find('td:last>textarea');
                            this.pingZhengModel.rows[i + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
                            o.val(this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM));
                            vueObj.formatMoney(o, 'daiMoney');
                        });


                    }
                } else {
                    if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
                        this.$nextTick(function() {
                            const o = _$(obj).closest('tr').next().find('td:eq(-2)>textarea');
                            this.pingZhengModel.rows[i + 1].jieMoney = this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM);
                            o.val(this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM));
                            vueObj.formatMoney(o, 'jieMoney');
                        });

                    }
                }
            },
            // 自动填借贷金额
            selfMotionNum(i) {
                if (this.pingZhengModel.rows[i + 1].daiMoney == '' && this.pingZhengModel.rows[i + 1].jieMoney == '') {
                    if ((this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM)) >= 0) {
                        for (const j in this.pingZhengModel.rows[i + 1]['jieMoney1']) {
                            this.pingZhengModel.rows[i + 1]['jieMoney1'][j] = '';
                        }
                        this.pingZhengModel.rows[i + 1].jieMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
                    } else {
                        for (const j in this.pingZhengModel.rows[i + 1]['daiMoney1']) {
                            this.pingZhengModel.rows[i + 1]['daiMoney1'][j] = '';
                        }
                        this.pingZhengModel.rows[i + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
                    }
                }
            },
            // 没有下一行新增一行
            rowFeed(obj) {
                if (_$(obj).index() + 1 == _$(obj).closest('ul').find('ul').length) {
                    this.pingZhengModel.rows.push(createPingZhengRowModel({
                        zhaiYao: '',
                        kuaiJiKeMuCode: '',
                        jieMoney: '0.00',
                        daiMoney: '0.00'
                    }));
                    this.$nextTick(function() {
                        _$('#app tbody>tr:eq(-2)>td:first>textarea').focus();
                        this.rowFeedInit(_$(obj).index());
                    });
                } else {
                    this.rowFeedInit(_$(obj).index());
                    _$(obj).closest('ul').next().find('td:first>textarea').focus();
                    _$(obj).closest('ul').addClass('trFocusColor');
                    _$('.voucher-item').scrollTop(_$('.voucher-item')[0].scrollHeight - _$('.voucher-item').height());
                }
                setTimeout(function() {
                    _$('.voucher-item').scrollTop(_$('.voucher-item')[0].scrollHeight);
                }, 100);
            },
            // 换行后执行的方法
            rowFeedInit(i) {
                // 复制上一行摘要
                this.pingZhengModel.rows[i + 1].zhaiYao = this.pingZhengModel.rows[i].zhaiYao;
            },
            // 转换金额格式
            formatMoney(obj, type) {
                // let moneyArr = this.formatMoneyAPI(_$(obj).val() == 0 ? "" : _$(obj).val());
                // this.pingZhengModel.rows[_$(obj).closest("ul").index()][type + "1"] = moneyArr;

            },
            // 摘要列表
            abstractUl(obj) {
                if (_$(obj).closest('td').find('ul').css('display') == 'none') {
                    this.abstractFindSrows(obj);
                } else {
                    _$(obj).closest('td').find('ul').hide();
                }
            },
            // 转换金额格式
            formatMoneyAPI(moneyArr) {
                moneyArr = String(moneyArr);
                moneyArr = moneyArr == null ? '' : moneyArr;
                if (moneyArr == 0) moneyArr = '';
                if (moneyArr.split('\.').length > 1 && moneyArr.split('\.')[1] == 0) {
                    moneyArr = moneyArr.split('\.')[0];
                }
                moneyArr = String(moneyArr).split('\.');
                if (moneyArr.length > 1) {
                    var empty = [];
                    if (parseInt(moneyArr[0]) < 0) {
                        moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
                    }
                    var num = moneyArr[0].split('');
                    for (let i = 0; i < Object.getOwnPropertyNames(_moneyBase).length - 2 - num.length - 1; i++) {
                        empty.push('');
                    }
                    const float = moneyArr[1].split('');
                    if (float.length == 1) {
                        float.push('0');
                    }
                    if (float[float.length - 1] == '\n') {
                        float.pop();
                    }
                    moneyArr = empty.concat(num.concat(float));
                } else {
                    var empty = [];
                    if (parseInt(moneyArr[0]) < 0) {
                        moneyArr[0] = moneyArr[0].substring(1, moneyArr[0].length);
                    }
                    var num = moneyArr[0].split('');
                    if (num[num.length - 1] == '\n') {
                        num.pop();
                    }
                    for (let i = 0; i < Object.getOwnPropertyNames(_moneyBase).length - 2 - num.length - 1; i++) {
                        empty.push('');
                    }
                    if (!moneyArr[0] == '') {
                        num.push('0');
                        num.push('0');
                    } else {
                        num.push('');
                        num.push('');
                    }
                    moneyArr = empty.concat(num);
                }
                return moneyArr;
            },
            // 清除借方金额
            clearLeftVal(obj) {
                _$(obj).closest('li').prev().find('textarea').hide();
                this.pingZhengModel.rows[_$(obj).closest('ul').index()].jieMoney = toMoneyStr2(0);
            },
            // 清除贷方金额
            clearRightVal(obj) {
                _$(obj).closest('li').next().find('textarea').hide();

                this.pingZhengModel.rows[_$(obj).closest('ul').index()].daiMoney = toMoneyStr2('0');
            },
            // 合计
            billSumMoneyMet() {
                let sum = 0;
                for (const tr in this.pingZhengModel.rows) {
                    sum += row.jieMoney + row.daiMoney;
                }
            },
            //减法函数
            Subtr(arg1, arg2) {
                let r1, r2, m, n;
                try {
                    r1 = arg1.toString().split('.')[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split('.')[1].length;
                } catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2));
                //last modify by deeka
                //动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            }, /**
             * 加法
             * @param arg1
             * @param arg2
             * @returns {Number}
             */
            accAdd(arg1, arg2) {
                let r1, r2, m, c;
                try {
                    r1 = arg1.toString().split('.')[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split('.')[1].length;
                } catch (e) {
                    r2 = 0;
                }
                c = Math.abs(r1 - r2);
                m = Math.pow(10, Math.max(r1, r2));
                if (c > 0) {
                    const cm = Math.pow(10, c);
                    if (r1 > r2) {
                        arg1 = Number(arg1.toString().replace('.', ''));
                        arg2 = Number(arg2.toString().replace('.', '')) * cm;
                    } else {
                        arg1 = Number(arg1.toString().replace('.', '')) * cm;
                        arg2 = Number(arg2.toString().replace('.', ''));
                    }
                } else {
                    arg1 = Number(arg1.toString().replace('.', ''));
                    arg2 = Number(arg2.toString().replace('.', ''));
                }
                return (arg1 + arg2) / m;
            },
            kjkmUlHide(obj) {
                this.subFindSrowsAPI('');
                this.$nextTick(function() {
                    _$(obj).closest('td').find('ul').hide();
                });
            },
            // 摘要模糊查询
            abstractFindSrows(obj) {
                _$(obj).val(_$(obj).val().replace('\n', ''));
                const arr = [];
                let bol = false;
                for (const i in this.abstracts) {
                    if ($.trim(_$(obj).val()) == '') {
                        bol = true;
                        this.abstracts[i].hide = false;
                        continue;
                    }
                    if (this.abstracts[i].accabname.split($.trim(_$(obj).val())).length > 1) {
                        this.abstracts[i].hide = false;
                        bol = true;
                    } else {

                        this.abstracts[i].hide = true;
                    }
                }
                if (bol) {
                    _$(obj).closest('td').find('ul').show();
                } else {
                    _$(obj).closest('td').find('ul').hide();
                }
            },
            // 会计科目模糊查询
            subFindSrows(obj) {
                _$(obj).closest('td').find('.balance span').text('');
                _$(obj).removeAttr('num');
                _$(obj).val(_$(obj).val().replace('\n', ''));
                const arr = [];
                this.subFindSrowsAPI($.trim(_$(obj).val()));
                setTimeout(function() {
                    _$(obj).closest('td').find('ul').show();
                    _$(obj).closest('td').find('ul>li').removeClass('active');
                    _$(obj).closest('td').find('ul>li:first').addClass('active');
                }, 550);
            },
            // 会计科目模糊查询Api
            subFindSrowsAPI(val) {
                for (const i in this.subs) {
                    if (val == '') {
                        this.subs[i].hide = false;
                        continue;
                    }
                    if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 1 || this.subs[i].ccodename.split(val).length > 1 || ($.trim(this.subs[i].ccode) + ' ' + $.trim(this.subs[i].ccodepath)).split(val).length > 1) {
                        this.subs[i].hide = false;
                    } else if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 2 || $.trim(this.subs[i].ccode) + ' ' + $.trim(this.subs[i].ccodepath) == val) {
                        this.subs[i].hide = false;
                    } else {
                        this.subs[i].hide = true;
                    }
                }
            },
            findSrows(arr, like) {
                const likeArr = [];
                for (const a in arr) {
                    if (a.split(like).length > 1) {
                        likeArr.push(a);
                    }
                }
                return likeArr;
            },
            checkKJKMData(obj, ix) {
                const vueObj = this;
                this.$nextTick(function() {
                    let bol = false;
                    for (const i in vueObj.subs) {
                        if ((vueObj.subs[i].ccode + ' ' + vueObj.subs[i].ccodepath) == _$(obj).val()) {
                            bol = true;
                        }
                    }
                    if (!bol) {
                        vueObj.rows[ix]['kuaiJiKeMuFullName'] = '';
                    }
                });
                _$(obj).closest('td').find('ul').hide();
            },
            addTr(i) {

                this.assist.splice(i + 1, 0, {});
                this.pingZhengModel.rows.push(createPingZhengRowModel({
                    zhaiYao: '',
                    kuaiJiKeMuCode: '',
                    jieMoney: '0.00',
                    daiMoney: '0.00'
                }));
                // setTimeout(function () {
                //     _$(".voucher-item").scrollTop(_$(".voucher-item")[0].scrollHeight);
                // }, 100)
            },
            insertTr(i) {
                this.pingZhengModel.rows.splice(i, 0, createPingZhengRowModel({
                    zhaiYao: '',
                    kuaiJiKeMuCode: '',
                    jieMoney: '0.00',
                    daiMoney: '0.00'
                }));

                // this.assist.splice(i + 1, 0, {})
                // this.pingZhengModel.rows.splice(i + 1, 0, JSON.parse(JSON.stringify(_trBase)));
                // this.pingZhengModel.rows[i + 1] = this.pingZhengModel.rows[i]
                // this.pingZhengModel.rows[i] = JSON.parse(JSON.stringify(_trBase))
                // this.assist[i + 1] = this.assist[i]
                // this.assist[i] = {}
                // setTimeout(function () {
                //     _$(".voucher-item").scrollTop(_$(".voucher-item")[0].scrollHeight);
                // }, 100)
            },
            delTr(i) {
                this.pingZhengModel.rows.splice(i, 1);
                this.assist.splice(i, 1);
                if (this.pingZhengModel.rows.length < 4) {
                    const obj = JSON.parse(JSON.stringify(this.pingZhengModel.rows[0]));
                    obj.zhaiYao = '';
                    obj.kuaiJiKeMuFullName = '';
                    obj.jieMoney = toMoney(0);
                    obj.daiMoney = toMoneyStr2(0);
                    this.pingZhengModel.rows.push(obj);
                    this.jdRenderUl();
                }
                this.proprowsWatch(this.pingZhengModel.rows, this.pingZhengModel.rows);
            },
            trBeShow(i) {
                for (const j in this.pingZhengModel.rows) {
                    this.trBeHide(j);
                }
                this.pingZhengModel.rows[i].showTrBe = true;
                this.$set(this.pingZhengModel.rows, i, this.pingZhengModel.rows[i]);
            },
            trBeHide(i) {
                this.pingZhengModel.rows[i].showTrBe = null;
                this.$set(this.pingZhengModel.rows, i, this.pingZhengModel.rows[i]);
            },
            rowsWatch(newVal) {
                let billSumMoneyJnum = 0;
                let billSumMoneyDnum = 0;
                this.billSubjectMoneys = {};
                for (const i in newVal) {
                    // if (newVal[i].kuaiJiKeMuFullName == null) continue
                    // if (this.billSubjectMoneys[newVal[i].kuaiJiKeMuFullName.split(" ")[0]] == null) {
                    //     this.billSubjectMoneys[newVal[i].kuaiJiKeMuFullName.split(" ")[0]] = {
                    //         'j': 0,
                    //         'd': 0
                    //     }
                    // }
                    let j = parseFloat(newVal[i].jieMoney);
                    let d = parseFloat(newVal[i].daiMoney);
                    if (isNaN(j)) j = 0;
                    if (isNaN(d)) d = 0;
                    // this.billSubjectMoneys[newVal[i].kuaiJiKeMuFullName.split(" ")[0]]['j'] += parseFloat(j.toFixed(2))
                    // this.billSubjectMoneys[newVal[i].kuaiJiKeMuFullName.split(" ")[0]]['d'] += parseFloat(d.toFixed(2))
                    billSumMoneyJnum = this.accAdd(billSumMoneyJnum, newVal[i].jieMoney);
                    this.formatMoneyAPI(String(billSumMoneyJnum));
                    billSumMoneyDnum = this.accAdd(billSumMoneyDnum, newVal[i].daiMoney);
                }

                if (billSumMoneyJnum == 0) {
                    this.billSumMoney2 = '零元整';
                } else if (billSumMoneyJnum != billSumMoneyDnum) {
                    this.billSumMoney2 = '';
                } else {
                    this.billSumMoney2 = convertCurrency(billSumMoneyJnum);

                }
                this.billSumMoneyJM = billSumMoneyJnum;
                this.billSumMoneyDM = billSumMoneyDnum;
                this.billSumMoneyJ = this.formatMoneyAPI(String(billSumMoneyJnum));
                this.billSumMoneyD = this.formatMoneyAPI(String(billSumMoneyDnum));
                return [billSumMoneyJnum, billSumMoneyDnum];
            },
// 借贷手动渲染
            jdRenderUl() {
                this.rowsWatch(this.pingZhengModel.rows);
                for (const i in this.pingZhengModel.rows) {
                    if (this.pingZhengModel.rows[i].jieMoney == 0) this.pingZhengModel.rows[i].jieMoney = toMoneyStr2(0);
                    if (this.pingZhengModel.rows[i].daiMoney == 0) this.pingZhengModel.rows[i].daiMoney = toMoneyStr2(0);

                }
            },
            findKMName(ccode) {
                this.getSubs();
                for (const i in this.subs) {
                    if (ccode == this.subs[i].ccode) {
                        return this.subs[i].ccodename;
                    }
                }
            },
            // 设置数据
            setData(data) {
                this.getSubs();
                const rows = [];
                for (const i in data) {
                    const tr = {
                        'zhaiYao': data[i]['zhaiYao'],
                        'kuaiJiKeMuFullName': data[i]['kuaiJiKeMuFullName'] + ' ' + this.findKMName(data[i]['kuaiJiKeMuFullName']),
                        'jieMoney': data[i].jieMoney,
                        'daiMoney': data[i].daiMoney,
                        'money': '',
                        'orgin': '',
                        showTrBe: null
                    };
                    rows.push(tr);
                }
                if (rows.length < 4) {
                    for (let i = 0; i <= 4 - rows.length; i++) {
                        rows.push({
                            'zhaiYao': '',
                            'kuaiJiKeMuFullName': '',
                            'jieMoney': toMoneyStr2(0),
                            'daiMoney': toMoneyStr2(0)
                        });
                    }
                }
                this.pingZhengModel.rows = rows;

                this.proprows1 = rows;
                this.renderKMName();
                this.jdRenderUl(); // 渲染数据
            },
            // 补空数据
            supplementrows() {
                if (this.pingZhengModel.rows.length < 4) {
                    for (let i = 0; i <= 4 - this.pingZhengModel.rows.length; i++) {
                        this.pingZhengModel.rows.push({
                            'zhaiYao': '',
                            'kuaiJiKeMuFullName': '',
                            'jieMoney': toMoneyStr2(0),
                            'daiMoney': toMoneyStr2(0)
                        });
                    }
                    this.jdRenderUl(this.pingZhengModel.rows);
                }
            },
            checkJD() {
                if (this.billSumMoneyJM != this.billSumMoneyDM) {
                    this.$parent.$parent.popupPage = null;
                    layer.alert('错误,借贷方不相等');
                }
            },
            // 手动渲染会计科目
            renderSubject() {
                for (const rowsI in this.pingZhengModel.rows) {
                    for (const subI in this.subs) {
                        if (this.subs[subI].ccode == this.pingZhengModel.rows[rowsI]['kuaiJiKeMuFullName']) {
                            this.pingZhengModel.rows[rowsI].kuaiJiKeMuFullName = this.subs[subI].ccode + ' ' + this.subs[subI].ccodename;
                            this.getBalance(_$('#voucherBill tr:eq(' + rowsI + ')>td:eq(1)').find('.balance span'), this.subs[subI].ccode, rowsI);
                        }
                    }
                }
            },
            kmSelectChoose() {
                _$('.selectChoose').on('click', function() {
                    _$(this).find('ul').toggle();
                });
                _$('.selectChoose button').on('blur', function() {
                    const _this = this;
                    setTimeout(function() {
                        _$(_this).closest('div').find('ul').hide();
                    }, 100);
                });
                _$('.selectChoose').on('mouseleave', function() {
                    const _this = this;
                    setTimeout(function() {
                        _$(_this).find('ul').hide();
                    }, 100);
                });
            },
            // 查询所有科目
            queryKM(data) {
                /*let _this = this;
                let iyear;
                $.ajax({
                    type: 'post',

                    url: urlPath + '/voucher!queryKM',
                    data: {
                        'requestMap.like': $.trim(data.like),
                        'requestMap.iyear': _this.iyear.split("-")[0]
                    },
                    async: false,
                    success: function (res) {
                        _this.dataPageKMAdd.topNameList = res.list
                    },
                    error: function (xhr) {
                        _$('body').html(xhr.responseText)
                    }
                });*/
            },
            clearAddKMData() {
                this.dataPageKMAdd = {
                    topNameList: [],
                    queryData: {
                        like: ''
                    },
                    addData: {
                        num: '',         // 上级编码    +
                        year: '',        // 当前年
                        /* 新增数据 */
                        ccodeNum: '',    // 编码 300501
                        ccodeName: '',   // 科目名      +
                        bproperty: '',   // 方向        +
                        cclass: '',      // 科目大类    +
                        igradeNum: ''    // 科目级次    +

                    },
                    showData: {},
                    exportData: {
                        obj: {}
                    }
                };
                this.queryKM(this.dataPageKMAdd.queryData);

            },
            backkm(obj) {
                _$(obj).closest('td').find('textarea').click();
            },
            kmulShow(obj) {
                _$(obj).next().show();
            },
            kmulShow1(obj) {
                _$(obj).next().toggle();
            },
            kmulHide(obj) {
                _$(obj).closest('.selectChoose').find('ul').hide();
            },
            chooseTopKM(obj, topObj) {
                const ordervalue = this.jici[0].ordervalue;
                let aaa = 0;
                for (let i = 0; i < ordervalue.split("-").length; i++) {
                    aaa = aaa + parseInt(ordervalue.split('-')[i]);
                }
                this.kmulHide(obj);
                let bol = false;
                //增加之前检查是否有期初、本期发生
                $.ajaxSettings.async = false;
                $.post(urlPath + '/findSubjectType!findByCode', {
                    year: this.iyear,
                    ccodeNum: topObj.ccode
                }, function(list) {
                    console.log(list[0].md_d + '>>' + list[0].md_j + '>>' + list[0].yearf_d + '>>' + list[0].yearf_j);
                    if ((parseFloat(list[0].md_d) != 0 || parseFloat(list[0].md_j) != 0) && (parseFloat(list[0].yearf_d) != 0 || parseFloat(list[0].yearf_j) != 0)) {
                        layer.open({
                            type: 1,
                            content: '此科目已做期初或本期发生。不能增加下级科目！',
                            btn: ['确定'],
                            success: function(layero, index) {
                                this.escQuit = function(event) {
                                    if (event.keyCode === 0x1B) {
                                        layer.close(index);
                                        console.log('peace and love');
                                        return false; //阻止系统默认回车事件
                                    }
                                };
                                _$(document).on('keydown', this.escQuit); //监听键盘事件
                            },
                            end: function() {
                                _$(document).off('keydown', this.escQuit); //解除键盘事件
                            }
                        });
                        bol = true;
                    } else {
                        if (parseInt(topObj.ccode.length) < parseInt(aaa)) {
                        } else {
                            layer.alert('已超出科目编码规则,请前往设置中心进行调整');
                            bol = true;
                        }
                    }
                });
                $.ajaxSettings.async = true;
                if (bol) {
                    this.dataPageKMAdd.queryData.like = '';
                    return;
                }
                this.dataPageKMAdd.addData.year = this.iyear;
                this.$set(this.$store.state, 'addvouchPageIyear', this.iyear);
                this.dataPageKMAdd.addData.igradeNum = parseInt(topObj.igrade) + 1;
                this.dataPageKMAdd.addData.cclass = topObj.cclass;
                this.dataPageKMAdd.addData.bproperty = topObj.bproperty;
                this.dataPageKMAdd.queryData.like = topObj.ccode + ' ' + topObj.ccodename;
                this.dataPageKMAdd.addData.num = topObj.ccode;
                this.dataPageKMAdd.addData.topName = topObj.ccodename;
                this.queryKMMaxNum();
                const _this = this;
                setTimeout(function() {
                    _this.$refs['KMNameInput'].focus();
                });
            },
            scrollChange(obj) {
                this.$set(this.$store.state, 'vouchTableScrollY', obj.scrollTop);
            },
            proprowsWatch(newVal, oldName) {
                this.pingZhengModel.rows = newVal;
                for (const i in this.pingZhengModel.rows) {
                    if (this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'].split(' ')[0]] == null) {
                        this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'].split(' ')[0]] = {
                            'j': 0,
                            'd': 0
                        };
                    }
                    if (this.pingZhengModel.rows[i]['assist'] != null) {
                        this.assist[i] = {};
                        if (this.pingZhengModel.rows[i]['assist']['部门'] != null) this.assist[i]['部门'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['部门']);
                        if (this.pingZhengModel.rows[i]['assist']['个人往来'] != null) this.assist[i]['个人往来'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['个人往来']);
                        if (this.pingZhengModel.rows[i]['assist']['客户'] != null) this.assist[i]['客户'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['客户']);
                        if (this.pingZhengModel.rows[i]['assist']['供应商'] != null) this.assist[i]['供应商'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['供应商']);
                        if (this.pingZhengModel.rows[i]['assist']['项目'] != null) this.assist[i]['项目'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['项目']);
                        if (this.pingZhengModel.rows[i]['assist']['存货'] != null) this.assist[i]['存货'] = JSON.stringify(this.pingZhengModel.rows[i]['assist']['存货']);
                    }
                    this.$set(this.assist, i, this.assist[i]);
                    this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'].split(' ')[0]]['j'] += this.pingZhengModel.rows[i].jieMoney;
                    this.billSubjectMoneys[this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'].split(' ')[0]]['d'] += this.pingZhengModel.rows[i].daiMoney;
                    if (this.pingZhengModel.rows.orgin == undefined) this.pingZhengModel.rows[i].orgin = '';
                    if (this.pingZhengModel.rows.money == undefined) this.pingZhengModel.rows[i].money = '';

                    if ($.trim(this.pingZhengModel.rows[i].zhaiYao) != '' || $.trim(this.pingZhengModel.rows[i].kuaiJiKeMuFullName) != '') {
                        this.getBalance(_$('#voucherBill tbody tr:eq(' + i + ') td:eq(1) ul'), this.rows[i].kuaiJiKeMuFullName.split(' ')[0], i);
                    }
                    this.pingZhengModel.rowsWatch(this.pingZhengModel.rows);

                }
            }
        },
        components: {
            'fuZhuHeSuanHtml': {
                props: ['value'],
                data() {
                    return {
                        tipId: ''
                    };
                },
                methods: {
                    openFuZhuHeSuanDetail(dom, html) {
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
                    },
                    close(tipId) {
                        layer.close(tipId);
                    }
                },

                template: `
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
                `
            },
            zhaiYaoGrid,
            kuaiJiKeMuGrid,
            fuZhuHeSuanPopup
        },
       async  created() {
           //获取科目编码规则
           const {GET_KMtypeOrdeDataApi}=apiProcess()

           this.jici = await GET_KMtypeOrdeDataApi()

           this.$watch('pingZhengModel', {
                handler: (v) => {
                    const pingZhengModel = this.pingZhengModel;
                    const year = pingZhengModel.props.date.split('-')[0];

                    this.iyear = year;


                    this.rowsWatch(this.pingZhengModel.rows);
                    // 辅助核算
                    this.$set(this.$store.state, 'vouchTableScrollY', 0);
                    this.getSubs();
                    this.queryKM(this.dataPageKMAdd.queryData);
                    this.rowsWatch(this.pingZhengModel.rows, this.pingZhengModel.rows);
                    this.cwSubject = JSON.parse(JSON.stringify(cwSubject));
                    this.getAbstracts();
                    for (let i = 0; i < this.pingZhengModel.rows.length; i++) {
                        if (this.pingZhengModel.rows[i].jieMoney == '') {
                            this.pingZhengModel.rows[i].jieMoney = toMoneyStr2(0);
                        }
                        if (this.pingZhengModel.rows[i].daiMoney == '') {
                            this.pingZhengModel.rows[i].daiMoney = toMoneyStr2(0);
                        }
                        this.pingZhengModel.rows[i].jieMoney1 = this.formatMoneyAPI(this.pingZhengModel.rows[i].jieMoney);
                        this.pingZhengModel.rows[i].daiMoney1 = this.formatMoneyAPI(this.pingZhengModel.rows[i].daiMoney);
                    }

                    this.$nextTick(() => {
                        if (this.showPage) {
                            _$('#voucherBill').css('pointer-events', 'none');
                        } else {
                            // setTimeout(()=>{
                            this.$store.state.firstStep = () => {
                                this.$refs.abstractGrid0[0].enter('');
                            };
                            // this.$refs.abstractGrid0[0].$nextTick(() => {
                            //     this.$refs.abstractGrid0[0].enter("")
                            // })
                            // },2000)
                        }
                        window.onresize = function() {
                            this.$set(this.$store.state, 'bodyWidth', document.body.clientWidth);
                        }.bind(this);


                        this.kmSelectChoose();
                        _$('.voucher-item').scroll(() => _$('.ulX').hide());
                    });
                },
                immediate: true
            });
        },
        mounted() {

            this.$watch('pingZhengModel.rows', rows => {
                if (this.tableFuZhuHeSuan.rows.length != rows.length) {
                    this.$set(this.tableFuZhuHeSuan, 'pingZhengModel.rows', generateFuZhuHeSuanTableModel(rows.length));
                }
                // console.log('8888888')
                // console.log(this.pingZhengModel)
                this.rowsWatch(this.pingZhengModel.rows);
            });
            this.$store.state.pingZhengTableInstance = this;
            // 浅监听凭证行数组
            shallowPingZhengRow.apply(this);
            // 深度监听辅助核算数组
            deepRowsFuZhuHeSuan.apply(this);


        },
        watch: {
            billSumMoneyJM(val) {
                if (parseInt(val) < 0) {
                    _$('.jSum').css('color', 'red');
                } else {
                    _$('.jSum').css('color', 'black');
                }
            },
            billSumMoneyDM(val) {
                if (parseInt(val) < 0) {
                    _$('.dSum').css('color', 'red');
                } else {
                    _$('.dSum').css('color', 'black');
                }
            },
            iyear(val) {
                this.getSubs();
                this.queryKM(this.dataPageKMAdd.queryData);
                this.$set(this.$store.state, 'addvouchPageIyear', this.iyear);
            }
        }
    };
}

// 辅助核算列 混入
const getFuZhuHeSuanColumnMixin = function() {
    return {
        data() {
            return {
                openAssistSet: false,
                tableFuZhuHeSuan: {
                    rows: [
                        {}
                    ]
                },
                assistTypes: {
                    '个人往来': {}
                },
                keMuFuZhuObject: {}
            };
        },
        methods: {
            saveKeyup(e) {

                e.preventDefault();
                var currKey = 0, e = e || event || window.event;
                currKey = e.keyCode || e.which || e.charCode;
                if (currKey == 83 && (e.ctrlKey || e.metaKey)) {
                    this.$store.state.saveNewPingZhengAndContinue();
                    return false;
                }
            },
            // 查询辅助核算
            queryFuZhuHeSuan: fuZhuHeSuanColumnMethods.queryFuZhuHeSuan,
            // 辅助核算检查
            fuZhuHeSuanClick: fuZhuHeSuanColumnMethods.fuZhuHeSuanClick,
            // 打开辅助核算页
            openFuZhuHeSuan: fuZhuHeSuanColumnMethods.openFuZhuHeSuan,
            // 添加辅助核算
            addFuZhuHeSuanColumn: addColumnMethods.addFuZhuHeSuanColumn,
            // 辅助核算改变事件
            fuZhuHeSuanChange(data, i) {
                Object.keys(this.tableFuZhuHeSuan.rows[i].required).map(key => {
                    this.tableFuZhuHeSuan.rows[i].required[key] = data[key];
                    this.tableFuZhuHeSuan.rows[i].show = false;
                    this.focusJie(i);
                });
            },
            getFuZhuHeSuanName(key) {
                // 辅助核算中文标志
                const CHINESEFUZHUHESUANFLAG = {
                    // 个人往来
                    bperson: '个人往来',
                    // 往来单位
                    brelativeUnit: '往来单位',
                    // 部门
                    bdept: '部门',
                    // 项目
                    bitem: '项目',
                    // 存货
                    binventory: '存货',
                    // 客户
                    br: '客户',
                    // 供应商
                    be: '供应商'
                };
                return CHINESEFUZHUHESUANFLAG[key];
            },
            // 绑定辅助核算
            bindFuZhuHeSuan(fuZhuHeSuanObject, item) {
                debugger
                // 辅助核算标志
                const FUZHUHESUANFLAG = {
                    // 个人往来
                    BPERSON: 'bperson',
                    // 往来单位
                    BRELATIVEUNIT: 'brelativeUnit',
                    // 部门
                    BDEPT: 'bdept',
                    // 项目
                    BITEM: 'bitem',
                    // 存货
                    BINVENTORY: 'binventory',
                    // 客户
                    BR: 'br',
                    // 供应商
                    BE: 'be'
                };
                this.$set(item, 'required', {});
                if (parseInt(fuZhuHeSuanObject[FUZHUHESUANFLAG.BPERSON]) === 1) {
                    item.required[FUZHUHESUANFLAG.BPERSON] = '';
                }
                if (parseInt(fuZhuHeSuanObject[FUZHUHESUANFLAG.BDEPT]) === 1) {
                    item.required[FUZHUHESUANFLAG.BDEPT] = '';
                }
                if (parseInt(fuZhuHeSuanObject[FUZHUHESUANFLAG.BITEM]) === 1) {
                    item.required[FUZHUHESUANFLAG.BITEM] = '';
                }
                if (parseInt(fuZhuHeSuanObject[FUZHUHESUANFLAG.BINVENTORY]) === 1) {
                    item.required[FUZHUHESUANFLAG.BINVENTORY] = '';
                }
                if (parseInt(fuZhuHeSuanObject[FUZHUHESUANFLAG.BR]) === 1) {
                    item.required[FUZHUHESUANFLAG.BR] = '';
                }
                if (parseInt(fuZhuHeSuanObject[FUZHUHESUANFLAG.BE]) === 1) {
                    item.required[FUZHUHESUANFLAG.BE] = '';
                }
            }
            ,
            // 是否显示辅助核算列

            isShowFuZhuHeSuanColumn() {
                let isShowFuZhuHeSuanColumn = false;
                this.tableFuZhuHeSuan.rows.forEach((item, i) => {
                    if (item.required == null) {
                        return true;
                    }
                    if (Object.keys(item.required).length != 0) {
                        isShowFuZhuHeSuanColumn = true;
                        return false;
                    }
                });
                return isShowFuZhuHeSuanColumn;
            },
            checkTableFuZhuHeSuan() {
            }
        },
        created() {
            //         if (res.obj.bperson == '1') this.assistTypes['个人往来'] = {}
            //         if (res.obj.brelativeUnit == '1') this.assistTypes['往来单位'] = {}
            //         if (res.obj.bdept == '1') this.assistTypes['部门'] = {}
            //         if (res.obj.bitem == '1') this.assistTypes['项目'] = {}
            //         if (res.obj.binventory == '1') this.assistTypes['存货'] = {}
            //         if (res.obj.br == '1') this.assistTypes['客户'] = {}
            //         if (res.obj.be == '1') this.assistTypes['供应商'] = {}

            // setInterval(()=>this.op enAssistSet=!this.openAssistSet,1000)
        }
    };
};

function moneyGridMixin() {
    return {
        components: {
            moneyGrid
        }
    };
}


export const usePingZhengTable = async function() {
    return {
        mixins: [moneyGridMixin(), storeManagerMixin(), getBaseMixin(), getFuZhuHeSuanColumnMixin()],
        data() {
            return {
                hasCol3: false
            };
        },
        methods: {

            // focus到指定行添置借方金额
            focusJie(i) {
                this.tShow(this.$refs['jGrid' + i][0].parentElement);
            },
            focusJieMoneyGrid(rowIndex) {
                setTimeout(function() {
                    this.tShow(this.$refs['jGrid' + rowIndex][0].parentElement);
                }.bind(this));
            },
            focusFuZhuHeSuan(rowIndex) {

                this.$refs['fuZhuHeSuanHtml'][rowIndex].$el.click();
            },

            rowFuZhuHeSuanModelSsFuZhuHeSuan(rowFuZhuHeSuanModel) {
                let isFuZheHeSuan = false;
                Object.keys(rowFuZhuHeSuanModel).forEach(key => {
                    if (rowFuZhuHeSuanModel[key] != null) {
                        isFuZheHeSuan = true;
                    }
                });
                return isFuZheHeSuan;
            },
            kemuChange: async function(rowIndex, [kuaiJiKeMuFullName]) {
                const row = this.pingZhengModel.rows[rowIndex];
                row['kuaiJiKeMuFullName'] = kuaiJiKeMuFullName;
                row['kuaiJiKeMuCode'] = kuaiJiKeMuFullName.split(' ')[0];
                await this.fuZhuHeSuanHandle(row);
                const rowFuZhuHeSuanModel = fuZhuHeSuanModel(row);
                this.rowFuZhuHeSuanModelSsFuZhuHeSuan(rowFuZhuHeSuanModel) ? this.focusFuZhuHeSuan(rowIndex) : this.focusJieMoneyGrid(rowIndex);
            }
        },
        template
    };
};
