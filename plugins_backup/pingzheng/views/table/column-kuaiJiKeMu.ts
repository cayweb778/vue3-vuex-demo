/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import {useCssLoad} from '../../../require-css/index';
// useCssLoad(import.meta.url).loadCss([
    // 'column-kuaiJiKeMu.css'
// ]);


    const api = {
        // 检查是否需要辅助核算
        queryAssist() {
            return true
            // let bol = false // true 直接完成,false需要进行辅助核算
            // let objs = {
            //     'iyear': this.$store.state.addvouchPageIyear,
            //     'ccode': this.ccode
            // };
            // $.ajax({
            //     type: 'post',
            //     url: urlPath + '/subject!queryAssist',
            //     data: objs,
            //     async: false,
            //     success: function (res) {
            //         this.assistTypes = []
            //         this.$refs.dataList.style.display = 'none'
            //         if (res.obj.bperson == '1') this.assistTypes['个人往来'] = {}
            //         if (res.obj.brelativeUnit == '1') this.assistTypes['往来单位'] = {}
            //         if (res.obj.bdept == '1') this.assistTypes['部门'] = {}
            //         if (res.obj.bitem == '1') this.assistTypes['项目'] = {}
            //         if (res.obj.binventory == '1') this.assistTypes['存货'] = {}
            //         if (res.obj.br == '1') this.assistTypes['客户'] = {}
            //         if (res.obj.be == '1') this.assistTypes['供应商'] = {}
            //         if (Object.keys(this.assistTypes).length == 0) {
            //             bol = true
            //         } else {
            //             // this.openAssistSet = true
            //         }
            //
            //     }.bind(this),
            //     error: function (xhr) {
            //         $('body').html(xhr.responseText)
            //     }
            // });
            // return bol
        },
        // // 查询余额
        // queryMoney() {
        //     let objs = {
        //         'requestMap.iyear': this.iyear,
        //         'requestMap.ccode': this.ccode
        //     };
        //     $.ajax({
        //         type: 'post',
        //         url: urlPath + '/voucher!queryKMMoney',
        //         data: objs,
        //         success: function (res) {
        //             this.money = res.map['money']
        //             this.orgin = res.map['orgin']
        //             if(this.updatePage){
        //                 if (this.orgin == 1) {
        //                     this.money-=(parseFloat(this.billSubjectMoneys.j) - parseFloat(this.billSubjectMoneys.d)).toFixed(2)
        //                 } else {
        //                     this.money-= (parseFloat(this.billSubjectMoneys.d) - parseFloat(this.billSubjectMoneys.j)).toFixed(2)
        //                 }
        //             }
        //         }.bind(this),
        //         error: function (xhr) {
        //             $('body').html(xhr.responseText)
        //         }
        //     });
        // }
    }
    export default {
        inject: ['getSubs'],
        props: [
            'rowIndex',
            'val',
            'subBillMoney',
            'iyear',
            'billSubjectMoneys',
            'assistVal',
            'subs',
            'updatePage'
        ],
        data() {
            return {
                textareaVal: this.val,
                dataListShow: false,
                addSubjectPageShow: false,
                chooseIndex: 0,
                openAssistSet: false,
                money: 0,
                orgin: 0,
                assistTypes: {}
            }
        },
        template: `
    <div class="subGrid">

    <el-popover
            title="'辅助核算'"
            placement="bottom"
            width="400"
            trigger="manual"
            v-model="openAssistSet">
<!--        <assist ref="assist" v-if="openAssistSet"-->
<!--                :assistTypes="assistTypes"-->
<!--                @assistSet='assistVal=$event,$emit("change",textareaVal,assistVal),openAssistSet=false'-->
<!--                @cancel="textareaVal='',openAssistSet=false,$refs.subInput.focus()">-->
<!--        </assist>-->

        <textarea slot="reference"
                  ref="subInput"
                  v-model="textareaVal"
                  @focus="initSubs(),onDataListPostion(vouchTableScrollY),$refs.dataList.style.display='block'"
                  @blur="$refs.dataList.style.display='none'"
                  @input="listFitter($event.target)"
                  @keydown.up="if(chooseIndex>0)chooseIndex--"
                  @keydown.down="if(chooseIndex<subsForShow.length-1)chooseIndex++"
                  @keyup.enter.stop="enterEvent()"
                  onclick="javascript:this.focus();this.select();"
                  style="box-sizing:border-box;background:inherit;display:block;height:60px;font-size:15px; color:black;font-weight:800;"></textarea>

    </el-popover>


    <div ref="dataList" class="dataList">
        <ul class="ulList">
            <li v-for="(sub,index) in subsForShow"
                :class="index==chooseIndex?'active':''"
                @click="textareaVal=sub.ccode+' '+sub.ccodepath,$nextTick(function(){$emit('change',textareaVal)})"
                @mousedown.stop="$event.target.click()"
                style="font-size:13px;padding:10px 10px">
                {{sub.ccode}} {{sub.ccodepath}}
            </li>
        </ul>
        <ul @click="showPageAddKM=true"
            style="box-shadow: rgb(59, 128, 169) 0px 1px 20px 0px inset;cursor:pointer;z-index:999999;margin-top:300px;background: rgb(40, 180, 164);font-weight:700;text-align: center;margin:0;padding:5px 0 0;width:416px;overflow-y: scroll;border-bottom:solid 1px grey;height:30px;color:white;">
            <li @mousedown="$store.state.openAddKeMu(rowIndex)">新增科目</li>
        </ul>
    </div>


<!--    <div v-if="textareaVal!='' && textareaVal!=null" class="balance"  style="position:absolute;bottom:0;color:grey;pointer-events:none;" >-->
<!--            余额:-->
<!--            <span  :style="{'color':moneyComputed<0?'red':''}">{{moneyComputed}}</span>-->
<!--            元-->
<!--    </div>-->
    <addSubjectPage ref="addSubjectPage" v-if="addSubjectPageShow"
                    @change="kuaiJiKeMuChange"
                    @cancel="$refs.subInput.focus(),addSubjectPageShow=false"></addSubjectPage>
</div>

    `,
        computed: {
            'subsForShow': function () {
                let list = []
                for (let i in this.subs) {
                    if (this.subs[i].hide == false) {
                        list.push(this.subs[i])
                    }
                }
                return list
            },
            'moneyComputed': function () {
                if (this.billSubjectMoneys == null) {
                    return parseFloat(this.money).toFixed(2)
                }
                if (this.orgin == 1) {
                    return ((parseFloat(this.money) + parseFloat(this.billSubjectMoneys.j) - parseFloat(this.billSubjectMoneys.d))).toFixed(2)
                } else {
                    return ((parseFloat(this.money) + parseFloat(this.billSubjectMoneys.d) - parseFloat(this.billSubjectMoneys.j))).toFixed(2)
                }
            },
            // 凭证表高度
            'vouchTableScrollY': function () {
                return this.$store.state.vouchTableScrollY
            },
            // body高度
            'bodyWidth': function () {
                return this.$store.state.bodyWidth
            },
            // ccde
            'ccode': function () {
                return this.textareaVal.split(" ")[0]
            }
        },

        methods: {
            kuaiJiKeMuChange(event) {
                this.addSubjectPageShow = false
                this.$emit('refresh', function () {
                    this.textareaVal = this.getDescribe(event), this.$nextTick(function () {
                        this.queryAssist() ? this.$emit('change', this.textareaVal) : ''
                    })
                }.bind(this))
            },
            ...api,
            enterEvent() {
                this.$refs.dataList.getElementsByTagName('LI')[this.chooseIndex].click()
                this.chooseIndex = -1
            },
            initSubs() {
                for (let i in this.subs) {
                    this.subs[i].hide = false
                    this.$set(this.subs, i, this.subs[i])
                }
            },
            // 过滤列表
            listFitter(obj) {
                let val = $(obj).val()
                if (val.indexOf('\n') != -1) {
                    this.textareaVal = $.trim(val)
                    return
                }
                val = $.trim(val)
                for (let i in this.subs) {
                    if (val == "") {
                        this.subs[i].hide = false
                        this.$set(this.subs, i, this.subs[i])
                        continue
                    }
                    if (PinyinMatch.match(this.subs[i].ccodepath, val) != false || this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 1 || this.subs[i].ccodename.split(val).length > 1 || ($.trim(this.subs[i].ccode) + " " + $.trim(this.subs[i].ccodepath)).split(val).length > 1) {

                        this.subs[i].hide = false
                        this.$set(this.subs, i, this.subs[i])
                    } else if (this.subs[i].ccode.substring(0, val.length) == val || this.subs[i].ccodename.split(val).length > 2 || $.trim(this.subs[i].ccode) + " " + $.trim(this.subs[i].ccodepath) == val) {
                        this.subs[i].hide = false
                        this.$set(this.subs, i, this.subs[i])
                    } else {
                        this.subs[i].hide = true
                        this.$set(this.subs, i, this.subs[i])
                    }
                }
            },
            // 监听位置改变,同步位置
            onDataListPostion(scrollTop) {
                if (this.$refs.dataList == null) return
                // this.$refs.dataList.style.display = 'none'
                this.$refs.dataList.style.left = this.$refs.subInput.getBoundingClientRect().x
                this.$refs.dataList.style.top = (this.$refs.subInput.getBoundingClientRect().y + this.$refs.subInput.getBoundingClientRect().height) + "px"
            },
            focus() {
                this.$refs.subInput.focus()
            },
            getDescribe(ccode) {

                for (let j in this.subs) {
                    if (this.subs[j].ccode == ccode) {
                        return this.subs[j].ccode + " " + this.subs[j].ccodepath
                    }
                }
            }
        },
        // components: {
        //     'assist': useComponent('/cwerp/jizhang/component/component/component/js/assist.js')
        // },
        // beforeCreate() {
        //     Object.assign(component.methods, api)
        // },
        mounted() {
            setTimeout(() => {
                this.onDataListPostion(this.vouchTableScrollY)
            }, 2500)
            // if (this.iyear != "" && this.ccode != "") {
            //     this.queryMoney()
            // }
        },
        watch: {
            'vouchTableScrollY': function (scrollTop) {
                this.onDataListPostion(scrollTop)
            },
            'bodyWidth': function () {
                this.onDataListPostion(this.vouchTableScrollY)
            },
            'chooseIndex': function (newVal) {
                if (newVal == -1) return
                this.$nextTick(function () {
                    let ulHeight = this.$refs.dataList.clientHeight
                    let liHeight = this.$refs.dataList.getElementsByTagName("LI")[0].clientHeight
                    let activePosY = this.$refs.dataList.getElementsByClassName("active")[0].offsetTop + liHeight
                    if ((activePosY - ulHeight) > 0) {
                        this.$refs.dataList.getElementsByClassName('ulList')[0].scrollTop = activePosY - ulHeight + liHeight - 8
                    } else {
                        this.$refs.dataList.getElementsByClassName('ulList')[0].scrollTop = 0
                    }
                })
            }
        }
    }
