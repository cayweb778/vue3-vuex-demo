/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck
// import {useTextLoad} from '../../../require-text/index';

export const kuaiJiKeMuAddPopup =async ()=>{
const template =''
    return {
        data() {
        return {
            chooseIndex: 0,
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
            }
        };
    },
        computed: {
            'iyear': function() {
                return this.$store.state.addvouchPageIyear;
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
        template,
            methods: {
        // 查询所有科目
        queryKM(data) {
            let _this = this;
            let iyear;
            $.ajax({
                type: 'post',

                url: urlPath + '/voucher!queryKM',
                data: {
                    'requestMap.like': $.trim(data.like),
                    'requestMap.iyear': _this.iyear.split('-')[0]
                },
                async: false,
                success: function(res) {
                    _this.dataPageKMAdd.topNameList = res.list;
                },
                error: function(xhr) {
                    $('body').html(xhr.responseText);
                }
            });
        },
        chooseTopKM(ccode, ccodename, topObj) {
            let bol = false;
            //增加之前检查是否有期初、本期发生
            let objs = {
                year: this.iyear,
                ccodeNum: ccode
            };
            $.ajaxSettings.async = false;
            $.post(urlPath + '/findSubjectType!findByCode', objs, function(msg) {
                if (msg == 'no') {
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
                            $(document).on('keydown', this.escQuit); //监听键盘事件
                        },
                        end: function() {
                            $(document).off('keydown', this.escQuit); //解除键盘事件
                        }
                    });
                    bol = true;
                } else {
                    /*  if (parseInt(topObj.ccode.length) < parseInt(aaa)) {
                      } else {
                          layer.alert('已超出科目编码规则,请前往设置中心进行调整');
                          bol = true
                      }*/
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
            setTimeout(function() {
                this.$refs.KMNameInput.focus();
            }.bind(this));
        },
        // 授权新增会计科目编号
        queryKMMaxNum() {
            let _this = this;
            $.ajax({
                type: 'post',
                url: urlPath + '/voucher!queryKMMaxNum',
                data: {
                    'requestMap.num': _this.dataPageKMAdd.addData.num,
                    'requestMap.igrade': _this.dataPageKMAdd.addData.igradeNum,
                    'requestMap.year': _this.dataPageKMAdd.addData.year
                },
                async: false,
                success: function(res) {
                    console.log(res);
                    _this.dataPageKMAdd.addData.ccodeNum = res.msg;
                },
                error: function(xhr) {
                    $('body').html(xhr.responseText);
                }
            });
        },
        // 增加科目
        addKM(data) {
            $.ajax({
                type: 'post',
                url: urlPath + '/addSubjectType!AddCode',
                data: this.dataPageKMAdd.addData,
                async: false,
                success: function(res) {
                    this.$emit('success', this.dataPageKMAdd.addData.ccodeNum);
                }.bind(this),
                error: function(xhr) {
                    $('body').html(xhr.responseText);
                }
            });
        }
    },
        watch: {
            'chooseIndex': function() {
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
            }
        },
        mounted() {
        this.queryKM('');
        setTimeout(function() {
            this.$refs.KMNameInput.focus();
        }.bind(this));
    }
    };
}

