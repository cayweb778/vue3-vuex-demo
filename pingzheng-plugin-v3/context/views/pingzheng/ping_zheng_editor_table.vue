<template>
  <!-- 凭证表格页 -->
  <div
    class="addKmPage"
    style="clear:both;margin:0 auto"
  >
    <div
      id="choose-box-wrapper4"
      style="display: none"
    >
      <div
        class="widget flat radius-bordered"
        style="padding:0 10px 0;"
      >
        <div
          style="width: 755px;height: 276px;overflow:auto;"
          id="helpContent"
        />
      </div>
    </div>
    <div
      class="container"
      :class="isFuZhuHeSuan?'hasCol3':''"
      @keydown=" if($event.ctrlKey == true && $event.keyCode == 83) {event.preventDefault();}"
      @keyup="saveKeyup($event)"
    >
      <ul class="table_head">
        <li class="col-serial title_name">
          序号
        </li>
        <li class="col1 title_name">
          摘要
        </li>
        <li class="col2 title_name">
          会计科目
        </li>
        <li
          class="col3 title_name"
          style="padding-top:18px"
        >
          辅助核算
        </li>
        <li class="col4" />
        <li
          class="col-jie"
          style="position: relative"
        >
          <div class="title_name">
            借方金额
          </div>

          <ul
            class="moneyGrid"
            style="height:15px;text-align: center"
          >
            <li
              v-for="unit in _moneyBase"
              style=";font-size:12px"
            >
              {{ unit }}
            </li>
          </ul>
        </li>
        <li
          class="col-dai"
          style="position: relative"
        >
          <div class="title_name">
            贷方金额
          </div>
          <ul
            class="moneyGrid"
            style="height:15px;text-align: center;width:100.95%"
          >
            <li
              v-for="unit in _moneyBase"
              style=";font-size:12px"
            >
              {{ unit }}
            </li>
          </ul>
        </li>
      </ul>
      <div
        class="voucher-item"
        style="overflow-y:auto;height:241px;clear: both"
      >
        <ul
          class="table_body"
          :style="EditorType=='show'?'pointer-events: none;':''"
        >
          <ul
            v-for="(row,i) in pingZhengModel.rows"
            @mouseover="$set( pingZhengRowHover,i,true)"
            @mouseout="$set(pingZhengRowHover,i,false)"
            class="firstRow"
            style="position: relative"
          >
            <template v-if="!showPage">
              <div
                style="width:0;float:left;padding:0;display:block;border:0;left: 0;position:absolute;-moz-user-select:none;"
                colspan="0"
                unselectable="on"
                onselectstart="return false;"
              >
                <div
                  v-show="pingZhengRowHover[i]"
                  @click="insertTr(i),setTimeout(function(){trBeShow(i)}.bind(this))"
                  style="    position: absolute;
    left: -49px;width:50px;height: 60px;"
                >
                  <img
                    style="position:absolute;left:-2px;cursor:pointer;margin-top:16px;margin-left:29px;width:20px"
                    class="subtractionImg"
                  >
                </div>
              </div>
            </template>
            <li class="col-serial">
              {{ i + 1 }}
            </li>
            <li class="col1">
              <zhaiYaoGrid
                :ref="'abstractGrid'+i"
                :val="row.zhaiYao"
                :abstracts="abstracts"
                :key="row.zhaiYao"
                @next="setTimeout(function(){focusKuaiJiKeMuGrid(i)}.bind(this))"
                @change="row.zhaiYao=$event"
              />
            </li>
            <li class="col2">
              <!--              <kuaiJiKeMuGrid-->
              <!--                :ref="'zhaiYaoGrid'+i"-->
              <!--                v-if="subs.length"-->
              <!--                :val="row.kuaiJiKeMuFullName"-->
              <!--                :update-page="updatePage"-->
              <!--                :row-index="i+1"-->
              <!--                :assist-val="assist[i]"-->
              <!--                :iyear="iyear"-->
              <!--                :subs="subs"-->
              <!--                :key="row.kuaiJiKeMuFullName"-->
              <!--                @change="kemuChange(i,arguments)"-->
              <!--              />-->
            </li>

            <li
              class="col3"
              style=""
            >
              <el-popover
                popper-class="fuzhuhesuan_popover"
                placement="bottom"
                title="需要辅助核算"
                @show="$refs['fuZhuHeSuanPopup'][i].focusFirstFuZhuHeSuanSelect()"
                trigger="click"
              >
                <fuZhuHeSuanPopup
                  ref="fuZhuHeSuanPopup"
                  @ok="setTimeout(()=>tShow($refs['jGrid' + i][0].parentElement),500)"
                  v-model="pingZhengModel.rows[i]"
                />
                <div
                  slot="reference"
                  style="height:100%"
                >
                  <fuZhuHeSuanHtml
                    ref="fuZhuHeSuanHtml"
                    :value="castFuZhuHeSuanHtml(row)"
                  />
                </div>
              </el-popover>
            </li>
            <li class="col4" />
            <li
              class="col-jie"
              style="position: relative"
            >
              <textarea
                :ref="'jGrid'+i"
                onkeydown="checkEnter(event)"
                @blur="row.jieMoney=row.jieMoney==''?'0.00':row.jieMoney,row.jieMoney!=0?clearRightVal($event.target):'',keyUpSetVal($event.target,'jieMoney'),formatMoney($event.target,'jieMoney'),rowsWatch(pingZhengModel.rows)"
                class="textx"
                v-model="row.jieMoney"
                @input="jieDaiInputHandle(i,'jieMoney',$event.target)"
                @keyup.enter.stop="row.jieMoney==''||row.jieMoney=='0.00'?colFeedJ($event.target):lineFeed(i,row.zhaiYao)"
                style="box-sizing:border-box;display:none;height:60px !important;line-height: 50px"
              />
              <money-grid @click="tShow($event.parentElement)">
                {{ row.jieMoney }}
              </money-grid>
            </li>
            <li
              class="col-dai"
              style="position: relative"
            >
              <textarea
                :ref="'dGrid'+i"
                v-model="row.daiMoney"
                @blur="row.daiMoney=row.daiMoney==''?'0.00':row.daiMoney,row.daiMoney!=0?clearLeftVal($event.target):'',keyUpSetVal($event.target,'daiMoney'),row.daiMoney=parseFloat(row.daiMoney).toFixed(2),rowsWatch(pingZhengModel.rows)"
                onkeydown="checkEnter(event)"
                @input="jieDaiInputHandle(i,'daiMoney',$event.target)"
                @keyup.enter="lineFeed(i,row.zhaiYao)"
                class="textx"
                style="box-sizing:border-box;display:none;height:60px !important;line-height: 50px"
              />
              <money-grid @click="tShow($event.parentElement)">
                {{ row.daiMoney }}
              </money-grid>
            </li>
            <template v-if="!showPage">
              <div
                style="width:0;padding:0;display:block;border:0;position:absolute;right: 0;-moz-user-select:none;"
                colspan="0"
                unselectable="on"
                onselectstart="return false;"
              >
                <div
                  v-show="pingZhengRowHover[i]"
                  @click="delTr(i),trBeHide(i),trBeShow(i+1)"
                  style="    width: 31px;
    height: 60px;
    position: absolute;
    right: -32px;
    text-align: right;
    cursor: pointer;"
                >
                  <img
                    class="addImg"
                    style="width:20px;margin-top:16px;-moz-user-select:none;"
                    unselectable="on"
                    onselectstart="return false;"
                  >
                </div>
              </div>
            </template>
            <li style="clear: both" />
          </ul>
          <li style="clear:both;" />
        </ul>
      </div>
      <ul
        class="table_sumRow"
        style="margin-top:-1px"
      >
        <li
          class="sumCol"
          style="padding-top: 20px;"
        >
          <span style="font-weight: 600; font-size: 17px;">合计：</span>
          <span
            style="font-size:17px;font-weight: 900"
          >{{ billSumMoney2 }}</span>
        </li>
        <li
          class="col-jie"
          style="position: relative"
        >
          <money-grid>{{ billSumMoneyJM }}</money-grid>
        </li>
        <li
          class="col-dai"
          style="position: relative"
        >
          <money-grid>{{ billSumMoneyDM }}</money-grid>
        </li>
      </ul>
      <div style="clear:both" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {pingZhengModelStore} from '../../store/modules/pingZhengModel';
import {moneyHelper} from '../../../../plugins_backup/boozjs-lang/money-util';
import {queryFuZhuHeSuanApi} from '../../../../plugins_backup/pingzheng/api/fu_zhu_he_suan';
import apiProcess from '../../../../plugins_backup/pingzheng/data/data';
import fuZhuHeSuanHelper from '../../../../plugins_backup/pingzheng/helper/fu_zhu_he_suan_Helper';
import {convertCurrency} from '../../../../plugins_backup/pingzheng/helper/jizhangHelper';

const pingZhengModel = pingZhengModelStore.getPingZhengModel;
const pingZhengRowHover = pingZhengModelStore.getPingZhengRowHover;

const {toMoneyInputStr, toMoneyStr, toMoneyStr2} = moneyHelper();
// ...mapActions([
//   'getDeptList',
//   'getPersonList',
//   'getCustomerList',
//   'getGYList',
//   'getCHList',
//   'getItemList'
// ])

    function castFuZhuHeSuanHtml(row) {
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
    }

async function fuZhuHeSuanHandle(pingZhengRow) {
  fuZhuHeSuanHelper.clearFuZhuHeSuan(pingZhengRow);

  // 覆盖当前行辅助核算
  const res = await queryFuZhuHeSuanApi({
    'iyear': this.pingZhengModel.props.date.split('-')[0],
    'ccode': pingZhengRow.kuaiJiKeMuCode
  });
  const apiData = res.obj;
  const fuZhuHeSuanModel = fuZhuHeSuanHelper.apiDataCastFuZhuHeSuanModel(apiData);
  Object.assign(pingZhengRow, {...fuZhuHeSuanModel});
}

// 借贷余额计算
function jsye(type, val) {
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
}

function listen(event) {
  al;
  if (event.keyCode === 13) {
    this.send(); // 发送文本
    event.preventDefault(); // 阻止浏览器默认换行操作
    return false;
  }
}

// 查询末级科目余额表
function getBalance(obj, num, i) {
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
        $(obj).find('span').css('color', 'red');
      } else {
        $(obj).find('span').css('color', 'grey');
      }
    },
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
}

// 获取摘要
async function getAbstracts() {
  const {queryAbstracts} = apiProcess();
  const abstracts = await queryAbstracts();
  for (const i in abstracts) {
    abstracts[i].hide = false;
  }
  this.abstracts = abstracts;
}

function renderKMName() {
  this.getSubs();
  for (const i in this.pingZhengModel.rows) {
    if (this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'] == '') continue;
    const ccode = this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'].split(' ')[0];
    this.pingZhengModel.rows[i]['kuaiJiKeMuFullName'] = ccode + ' ' + this.findKMName(ccode);
  }
}

async function keMuListApi({iyear: year, callback}) {
  const {queryKeMuListApi} = apiProcess();
  return await queryKeMuListApi({year});
}

// 获取会计科目
async function getSubs(callback) {
  const iyear = this.iyear.split('-')[0];
  const keMuList = await this.keMuListApi({iyear, callback});
  this.$store.state.keMuList = keMuList;
}

// 获取当前凭证
function getAddVoucherData() {
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
}

function exportData2() {
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
}

// 检查金额
function jieDaiInputHandle(i, type, obj) {
  const row = this.pingZhengModel.rows[i];
  const inputValue = this.pingZhengModel.rows[i][type];

  // 相等功能
  if (inputValue == '=') {
    handleEqualKey.call(this, {i, type, obj});
    return;
  }

  // 处理金额
  this.pingZhengModel.rows[i][type] = toMoneyInputStr(this.pingZhengModel.rows[i][type], 12);
}

function focusJieGrid(rowIndex) {
  this.tShow(this.$refs['jGrid' + (rowIndex - 1)][0].parentElement);
}

function focusKuaiJiKeMuGrid(rowIndex) {
  this.$refs['zhaiYaoGrid' + rowIndex][0].$refs.subInput.focus();
}

function tShow(obj) {
  if (this.tShowBan == true) return;
  const _this = this;
  setTimeout(function() {
    $(obj).find('textarea').css('display', 'block');
    setTimeout(function() {
      $(obj).find('textarea').focus();
    }, 500);
    $(obj).find('textarea').select();
    $(obj).find('ul').hide();
  });
}

function tHide(obj) {
  $(obj).hide();
  $(obj).closest('td').find('ul').show();
}

function ulShowJ(obj) {
  $('#app td .ulX').hide();
  $(obj).parent().find('ul').show();
}

// 凭证显示
function pingzhengUlShow(obj) {
  $('#app td .ulX').hide();
  $(obj).parent().find('ul').show();
  $(obj).parent().find('ul>li').removeClass('active');
  $(obj).parent().find('ul>li:first').toggleClass('active');
}

function ulShowD(obj) {
  $('#app td .ulX').hide();
  $(obj).parent().find('ul').show();
}

function kjkmUlShow(obj) {
  $(obj).closest('td').find('ul:first').css('top', ($(obj).parent().offset().top + $(obj).parent().height()) + 'px');
  $(obj).closest('td').find('ul:first').css('left', $(obj).parent().offset().left + 'px');
  $(obj).closest('td').find('ul:eq(1)').css('top', ($(obj).parent().offset().top + $(obj).parent().height() + 200) + 'px');
  $(obj).closest('td').find('ul:eq(1)').css('left', $(obj).parent().offset().left + 'px');
  this.subFindSrowsAPI('');
  $('#app td .ulX').hide();
  console.log($(obj).parent().find('ul').size());
  $(obj).parent().find('ul').show();
  $(obj).parent().find('ul').each(function() {
    console.log($(this).css('display'));

  });
  $(obj).parent().find('ul>li').removeClass('active');
  $(obj).parent().find('ul>li:first').toggleClass('active');

}

function hintForAbstract(obj) {
  // $(obj).attr("placeholder",'摘要列表:"ctrl+x"键')
}

function ulShow(obj) {
  this.subFindSrowsAPI('');
  $('#app td .ulX').hide();
  $(obj).parent().find('ul').show();
  $(obj).parent().find('ul>li').removeClass('active');
  $(obj).parent().find('ul>li:first').toggleClass('active');
}

function ulHide(obj) {
  $(obj).attr('placeholder', '');
  setTimeout(function() {
    $(obj).closest('td').find('ul').hide();
  }, 250);
}

function ulHide2(obj) {
  $(obj).closest('td').find('ul').hide();
}

// 键盘设置参数
function keyUpSetValJ(obj, type, code, path) {
  // parm1 行数 , parm2 属性名  if判断是否借贷框输入
  if (type == 'jieMoney' || type == 'daiMoney') {
    this.ulShowJ(obj);
    $(obj).hide();
  } else {

    this.getBalance($(obj).closest('li').find('.balance span'), $(obj).attr('money'), $(obj).closest('ul').index());
    this.pingZhengModel.rows[$(obj).closest('ul').index()][type + '_num'] = $(obj).parent().find('.active').attr('money');
    this.pingZhengModel.rows[$(obj).closest('ul').index()][type] = $.trim(code) + ' ' + $.trim(path);
    this.ulHide2(obj);
    if (this.tShowBan == true) {
      this.rowFeed($(obj).closest('tr'));

    } else {
      this.colFeedJ(obj);
    }
  }
}

// 键盘设置参数
function keyUpSetVal(obj, type) {
  // parm1 行数 , parm2 属性名  if判断是否借贷框输入
  if (type == 'jieMoney' || type == 'daiMoney') {
    this.ulShowJ(obj);
    $(obj).hide();
  } else {
    this.pingZhengModel.rows[$(obj).closest('tr').index()][type] = $.trim($(obj).text());
    this.ulHide(obj);
    this.colFeed(obj);
  }
}

function textareaEnter(obj, type) {
  if ($.trim($(obj).next().find('.active').text()) == '') {
    //this.pingZhengModel.rows[$(obj).closest("tr").index()][type] = $.trim($(obj).next().find(".active").text())
  } else {
    this.pingZhengModel.rows[$(obj).closest('tr').index()][type] = $.trim($(obj).next().find('.active').text());
  }
  $(obj).next().hide();
  /*setTimeout(function () {
      vueObj.colFeed(obj)
  }, 100)*/
}

function textareaEnter2(obj, type, event) {
  if ($(obj).next().css('display') == 'block') {
    this.pingZhengModel.rows[$(obj).closest('tr').index()][type] = $.trim($(obj).next().find('.active').attr('ccode')) + ' ' + $.trim($(obj).next().find('.active').attr('ccodepath'));
    this.pingZhengModel.rows[$(obj).closest('tr').index()][type + '_num'] = $(obj).next().find('.active').attr('money');
  }
  $(obj).val($(obj).val().replace('\n', ''));
  this.getBalance($(obj).closest('td').find('.balance span'), $(obj).next().find('.active').attr('money'), $(obj).closest('tr').index());
  $(obj).closest('td').find('ul').hide();
  if (this.tShowBan == true) {
    this.rowFeed($(obj).closest('tr'));

  } else {
    this.colFeedJ(obj);
  }
}

function lineFeed(lineNum, abstractVal) {
  if (this.$refs['abstractGrid' + (lineNum + 1)] == null) {
    this.addTr(lineNum);
  }
  this.$nextTick(function() {
    this.$refs['abstractGrid' + (lineNum + 1)][0].enter(abstractVal);
    if (this.billSumMoneyJM > this.billSumMoneyDM) {
      if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
        this.$nextTick(function() {
          const obj = $(this.$refs['dGrid' + (lineNum + 1)][0]);
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
          const obj = $(this.$refs['jGrid' + (lineNum + 1)][0]);
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
}

// 上下键选择列表
function ulKeyup(point, obj) {
  // 初始位置
  if ($(obj).parent().find('.active').length == 0) {
    $('td>li').removeClass('active');
    $(obj).parent().find('li:first').toggleClass('active');
    return;
  }
  if (point == 'up') {
    if ($(obj).parent().find('.active').index() != 0) {
      const temp = $(obj).parent().find('.active');
      $(obj).parent().find('.active').prev().addClass('active');
      temp.removeClass('active');
    }
  } else if (point == 'down') {
    if ($(obj).parent().find('.active').index() + 1 != $(obj).parent().find('li').length) {
      const temp = $(obj).parent().find('.active');
      $(obj).parent().find('.active').next().addClass('active');
      temp.removeClass('active');
    }
  }
  const objPointerHeight = $(obj).parent().find('.active')[0].offsetTop;
  const objHeight = $(obj).parent().find('.active').outerHeight();
  if (objPointerHeight - 3 > objHeight * 4) {
    $(obj).closest('td').find('ul').scrollTop(objPointerHeight - objHeight * 4);
  }
}

function openAddSubjectPage(tr, obj) {
  const _this = this;
  this.showPageAddKM = true;
  this.$nextTick(function() {
    setTimeout(function() {
      _this.$refs['chooseKM'].click();
    });
  });
  this.dataPageKMAdd.exportData.obj = tr;
  this.dataPageKMAdd.exportData.dom = obj;
}

function addKMTopChoose(target) {
  if (target._value.trim() == '') {
    return;
  }
  const _this = this;
  const fireOnThis = _this.$refs['kmToplist'].firstElementChild;
  const evObj = document.createEvent('MouseEvents');
  evObj.initMouseEvent('mousedown', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null);
  fireOnThis.dispatchEvent(evObj);
}

// 换格
function colFeed(obj) {
  if ($(obj).closest('td').index() + 1 != $(obj).closest('tr').find('td').length) {
    this.tShow($(obj).closest('td').next());
    $(obj).closest('td').next().find('textarea').focus();
    if ($.trim($(obj).closest('td').next().find('textarea').val()) == '') {
      this.kjkmUlShow($(obj).closest('td').next().find('textarea'));
      $(obj).closest('td').next().find('ul').show();
      $(obj).closest('td').next().find('ul>li:first').addClass('active');
    }
  } else {  // 没有下格换行
    this.rowFeed($(obj).closest('tr'));
  }
}

// 借方换格
function colFeedJ(obj) {
  if ($(obj).closest('li').index() + 1 != $(obj).closest('ul').find('>td').length) {
    this.tShow($(obj).closest('li').next());
    setTimeout(function() {
      $(obj).closest('li').next().find('ul').css('display', 'none');
      $(obj).closest('li').next().find('textarea').show();
      $(obj).closest('li').next().find('textarea').focus();
      $(obj).closest('li').next().find('ul').hide();
    }, 200);
  } else {  // 没有下格换行
    this.rowFeed($(obj).closest('ul'));
  }
}

// 贷方换格
function colFeedD(obj, i) {
  const vueObj = this;
  this.rowFeed($(obj).closest('tr'));
  if (this.billSumMoneyJM > this.billSumMoneyDM) {
    if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
      this.$nextTick(function() {
        const o = $(obj).closest('tr').next().find('td:last>textarea');
        this.pingZhengModel.rows[i + 1].daiMoney = this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM);
        o.val(this.Subtr(this.billSumMoneyJM, this.billSumMoneyDM));
        vueObj.formatMoney(o, 'daiMoney');
      });


    }
  } else {
    if (this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM) != 0) {
      this.$nextTick(function() {
        const o = $(obj).closest('tr').next().find('td:eq(-2)>textarea');
        this.pingZhengModel.rows[i + 1].jieMoney = this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM);
        o.val(this.Subtr(this.billSumMoneyDM, this.billSumMoneyJM));
        vueObj.formatMoney(o, 'jieMoney');
      });

    }
  }
}

// 自动填借贷金额
function selfMotionNum(i) {
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
}

// 没有下一行新增一行
function rowFeed(obj) {
  if ($(obj).index() + 1 == $(obj).closest('ul').find('ul').length) {
    this.pingZhengModel.rows.push(createPingZhengRowModel({
      zhaiYao: '',
      kuaiJiKeMuCode: '',
      jieMoney: '0.00',
      daiMoney: '0.00'
    }));
    this.$nextTick(function() {
      $('#app tbody>tr:eq(-2)>td:first>textarea').focus();
      this.rowFeedInit($(obj).index());
    });
  } else {
    this.rowFeedInit($(obj).index());
    $(obj).closest('ul').next().find('td:first>textarea').focus();
    $(obj).closest('ul').addClass('trFocusColor');
    $('.voucher-item').scrollTop($('.voucher-item')[0].scrollHeight - $('.voucher-item').height());
  }
  setTimeout(function() {
    $('.voucher-item').scrollTop($('.voucher-item')[0].scrollHeight);
  }, 100);
}

// 换行后执行的方法
function rowFeedInit(i) {
  // 复制上一行摘要
  this.pingZhengModel.rows[i + 1].zhaiYao = this.pingZhengModel.rows[i].zhaiYao;
}

// 转换金额格式
function formatMoney(obj, type) {
  // let moneyArr = this.formatMoneyAPI($(obj).val() == 0 ? "" : $(obj).val());
  // this.pingZhengModel.rows[$(obj).closest("ul").index()][type + "1"] = moneyArr;

}

// 摘要列表
function abstractUl(obj) {
  if ($(obj).closest('td').find('ul').css('display') == 'none') {
    this.abstractFindSrows(obj);
  } else {
    $(obj).closest('td').find('ul').hide();
  }
}

// 转换金额格式
function formatMoneyAPI(moneyArr) {
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
}

// 清除借方金额
function clearLeftVal(obj) {
  $(obj).closest('li').prev().find('textarea').hide();
  this.pingZhengModel.rows[$(obj).closest('ul').index()].jieMoney = toMoneyStr2(0);
}

// 清除贷方金额
function clearRightVal(obj) {
  $(obj).closest('li').next().find('textarea').hide();

  this.pingZhengModel.rows[$(obj).closest('ul').index()].daiMoney = toMoneyStr2('0');
}

// 合计
function billSumMoneyMet(){
  let sum = 0;
  for (const tr in this.pingZhengModel.rows) {
    sum += row.jieMoney + row.daiMoney;
  }
}

//减法函数
function Subtr(arg1, arg2) {
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
}

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns {Number}
 */
function accAdd(arg1, arg2) {
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
}

function kjkmUlHide(obj) {
  this.subFindSrowsAPI('');
  this.$nextTick(function() {
    $(obj).closest('td').find('ul').hide();
  });
}

// 摘要模糊查询
function abstractFindSrows(obj) {
  $(obj).val($(obj).val().replace('\n', ''));
  const arr = [];
  let bol = false;
  for (const i in this.abstracts) {
    if ($.trim($(obj).val()) == '') {
      bol = true;
      this.abstracts[i].hide = false;
      continue;
    }
    if (this.abstracts[i].accabname.split($.trim($(obj).val())).length > 1) {
      this.abstracts[i].hide = false;
      bol = true;
    } else {

      this.abstracts[i].hide = true;
    }
  }
  if (bol) {
    $(obj).closest('td').find('ul').show();
  } else {
    $(obj).closest('td').find('ul').hide();
  }
}

// 会计科目模糊查询
function subFindSrows(obj) {
  $(obj).closest('td').find('.balance span').text('');
  $(obj).removeAttr('num');
  $(obj).val($(obj).val().replace('\n', ''));
  const arr = [];
  this.subFindSrowsAPI($.trim($(obj).val()));
  setTimeout(function() {
    $(obj).closest('td').find('ul').show();
    $(obj).closest('td').find('ul>li').removeClass('active');
    $(obj).closest('td').find('ul>li:first').addClass('active');
  }, 550);
}

// 会计科目模糊查询Api
function subFindSrowsAPI(val) {
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
}

function findSrows(arr, like) {
  const likeArr = [];
  for (const a in arr) {
    if (a.split(like).length > 1) {
      likeArr.push(a);
    }
  }
  return likeArr;
}

function checkKJKMData(obj, ix) {
  const vueObj = this;
  this.$nextTick(function() {
    let bol = false;
    for (const i in vueObj.subs) {
      if ((vueObj.subs[i].ccode + ' ' + vueObj.subs[i].ccodepath) == $(obj).val()) {
        bol = true;
      }
    }
    if (!bol) {
      vueObj.rows[ix]['kuaiJiKeMuFullName'] = '';
    }
  });
  $(obj).closest('td').find('ul').hide();
}

function addTr(i) {

  this.assist.splice(i + 1, 0, {});
  this.pingZhengModel.rows.push(createPingZhengRowModel({
    zhaiYao: '',
    kuaiJiKeMuCode: '',
    jieMoney: '0.00',
    daiMoney: '0.00'
  }));
  // setTimeout(function () {
  //     $(".voucher-item").scrollTop($(".voucher-item")[0].scrollHeight);
  // }, 100)
}

function insertTr(i) {
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
  //     $(".voucher-item").scrollTop($(".voucher-item")[0].scrollHeight);
  // }, 100)
}

function delTr(i) {
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
}

function trBeShow(i) {
  for (const j in this.pingZhengModel.rows) {
    this.trBeHide(j);
  }
  this.pingZhengModel.rows[i].showTrBe = true;
  this.$set(this.pingZhengModel.rows, i, this.pingZhengModel.rows[i]);
}

function trBeHide(i) {
  this.pingZhengModel.rows[i].showTrBe = null;
  this.$set(this.pingZhengModel.rows, i, this.pingZhengModel.rows[i]);
}

function rowsWatch(newVal) {
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
}

// 借贷手动渲染
function jdRenderUl() {
  this.rowsWatch(this.pingZhengModel.rows);
  for (const i in this.pingZhengModel.rows) {
    if (this.pingZhengModel.rows[i].jieMoney == 0) this.pingZhengModel.rows[i].jieMoney = toMoneyStr2(0);
    if (this.pingZhengModel.rows[i].daiMoney == 0) this.pingZhengModel.rows[i].daiMoney = toMoneyStr2(0);

  }
}

function findKMName(ccode) {
  this.getSubs();
  for (const i in this.subs) {
    if (ccode == this.subs[i].ccode) {
      return this.subs[i].ccodename;
    }
  }
}

// 设置数据
function setData(data) {
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
}

// 补空数据
function supplementrows() {
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
}

function checkJD() {
  if (this.billSumMoneyJM != this.billSumMoneyDM) {
    this.$parent.$parent.popupPage = null;
    layer.alert('错误,借贷方不相等');
  }
}

// 手动渲染会计科目
function renderSubject() {
  for (const rowsI in this.pingZhengModel.rows) {
    for (const subI in this.subs) {
      if (this.subs[subI].ccode == this.pingZhengModel.rows[rowsI]['kuaiJiKeMuFullName']) {
        this.pingZhengModel.rows[rowsI].kuaiJiKeMuFullName = this.subs[subI].ccode + ' ' + this.subs[subI].ccodename;
        this.getBalance($('#voucherBill tr:eq(' + rowsI + ')>td:eq(1)').find('.balance span'), this.subs[subI].ccode, rowsI);
      }
    }
  }
}

function kmSelectChoose() {
  $('.selectChoose').on('click', function() {
    $(this).find('ul').toggle();
  });
  $('.selectChoose button').on('blur', function() {
    const _this = this;
    setTimeout(function() {
      $(_this).closest('div').find('ul').hide();
    }, 100);
  });
  $('.selectChoose').on('mouseleave', function() {
    const _this = this;
    setTimeout(function() {
      $(_this).find('ul').hide();
    }, 100);
  });
}

// 查询所有科目
function queryKM(data) {
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
          $('body').html(xhr.responseText)
      }
  });*/
}

function clearAddKMData() {
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

}

function backkm(obj) {
  $(obj).closest('td').find('textarea').click();
}

function kmulShow(obj) {
  $(obj).next().show();
}

function kmulShow1(obj) {
  $(obj).next().toggle();
}

function kmulHide(obj) {
  $(obj).closest('.selectChoose').find('ul').hide();
}

function chooseTopKM(obj, topObj) {
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
          $(document).on('keydown', this.escQuit); //监听键盘事件
        },
        end: function() {
          $(document).off('keydown', this.escQuit); //解除键盘事件
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
}

function scrollChange(obj) {
  this.$set(this.$store.state, 'vouchTableScrollY', obj.scrollTop);
}

function proprowsWatch(newVal, oldName) {
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
      this.getBalance($('#voucherBill tbody tr:eq(' + i + ') td:eq(1) ul'), this.rows[i].kuaiJiKeMuFullName.split(' ')[0], i);
    }
    this.pingZhengModel.rowsWatch(this.pingZhengModel.rows);

  }
}
</script>
<style>
@import "../../assets/styles/ping_zheng_editor_table.css";
</style>
