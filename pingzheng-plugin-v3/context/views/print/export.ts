/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Vue from '../../../boozjs-vue/2.x.js';

window.exportVM = new Vue({
  data() {
    return {
      utilUrl: '',
      printSrc: '',
      showPage: true,
      tables: [],
      printType: null
    };
  },
  // method 初始方法
  created() {
    /*this.queryPrintDate()*/
  },
  methods: {
    // 查询打印数据
    queryPrintDate() {
      let _this;
      $.ajax({
        type: 'post',
        url: urlPath + '',
        data: {},
        async: false,
        success: function(res) {
          _this.table.body = res.list;
        }
      });
    },
    // 打印
    print() {
      if ($('#dataPrint').length == 1) $('#dataPrint').remove();
      let iframeHTML;
      if (this.printType == 'invoice') {
        iframeHTML = '<iframe id="dataPrint" src="' + this.utilUrl + '/component/print/printForInvoice.jsp" style="z-index:1000000;position:fixed;top:0;width:00%;height:000px"/>';
      } else if (this.printType != null && this.printType.indexOf('taoda-KPJ101') != -1) {
        iframeHTML = '<iframe id="dataPrint" src="' + this.utilUrl + '/component/print/printForTaoda.jsp" style="z-index:1000000;position:fixed;top:0;width:100%;height:000px"/>';
      } else if (this.printType != null && this.printType.indexOf('taoda-KPJ103') != -1) {
        iframeHTML = '<iframe id="dataPrint" src="' + this.utilUrl + '/component/print/printForTaodaKPJ103.jsp" style="z-index:1000000;position:fixed;top:0;width:00%;height:000px"/>';
      } else {
        iframeHTML = '<iframe id="dataPrint" src="' + this.utilUrl + '/component/print/print.jsp" style="z-index:1000000;position:fixed;top:0;width:00%;height:0000px"/>';
      }
      $('body').append(iframeHTML);
      let _this = this;
      $('#dataPrint')[0].onload = function() {
        $('#dataPrint')[0].contentWindow.dataJSON.tables = _this.tables;
        $('#dataPrint')[0].contentWindow.dataJSON.exportName = _this.exportName;
        let printVM = $('#dataPrint')[0].contentWindow.runVue();
      };
    },

    // 导出
    export() {
      let _this = this;
      let datas = {
        'exportTitle': _this.table.name,
        'tableTitleForJSON': JSON.stringify(_this.table.title),
        'tableBodyForJSON': JSON.stringify(_this.table.body)
      };
      $.fileDownload(urlPath + '/excel!export', {
        httpMethod: 'POST',
        data: datas,
        prepareCallback: function(url) {
          $('#exportBtn').attr('disabled', true);
          $('#exportBtn').html('正在导出');
        },
        successCallback: function(url) {
          $('#exportBtn').attr('disabled', false);
          $('#exportBtn').html('导出');
        },
        failCallback: function(html, url) {
          alert('导出失败');
        }
      });
    }
  }
});

