import jsPDF from '../../../../boozjs-pdf-autotable/dist/boozpdf-autotable.es.js';
import '../../../../boozjs-pdf-autotable/fonts/font-pu-hui-ti.js';
import {jsPdfRender} from './use_kuai_ji_ke_mu_ming_xi_pdf_render.js';


function cast40Row(arr) {
  let length = arr.length;
  for (let i = length; i < 25; i++) {
    arr.push([]);
  }
  return arr
}



function castKeMuMingXiTablePdfModel(keMuMingXiTablePrintData) {
  const {list, companyName, zhiBiaoRen, qujian} = keMuMingXiTablePrintData;
  return list.map((kuaiJiKeMu) => {
    const {head, body} = getKeMuMingXiTableRowModel(kuaiJiKeMu);
    return jsPdfRender(head, body, kuaiJiKeMu, companyName, zhiBiaoRen, qujian);
  });

}

function getKeMuMingXiTableRowModel(kuaiJiKeMu) {
  const year = kuaiJiKeMu.range[0].slice(0, 4);


  const kuaiJiKeMuAutoPdfModel = {
    head: [['日期', '凭证号', '摘要', '借方', '贷方', '方向', '余额']],
    body: []
  };
  const {head, body} = kuaiJiKeMuAutoPdfModel;
  body.push(['', '', '期初余额', '', '', '', '']);

  kuaiJiKeMu.month.filter((item) => item.details.length != 0).forEach((month) => {
    let monthStr = (kuaiJiKeMu.month.indexOf(month) + 1).toString();
    if (monthStr.length == 1) {
      monthStr = '0' + monthStr;
    }

    function toMoneyStr(moneyStr) {
      if (moneyStr == '0.00') {
        return '';
      }
      return moneyStr;
    }

    month.details.forEach(detail => {
      body.push([detail.yearMonthDay, detail.type, detail.rowZhaiYao, toMoneyStr(detail.rowJieFangMoney), toMoneyStr(detail.rowDaiFangMoney), detail.rowDir, toMoneyStr(detail.rowMoney)]);
    });
    body.push([year + '-' + monthStr, null, '本月合计', toMoneyStr(month.monthJieFangSum), toMoneyStr(month.monthDaiFangSum), month.monthDir, toMoneyStr(month.monthMoney)]);
    body.push([year + '-' + monthStr, null, '本年累计', toMoneyStr(month.yearJieFangSum), toMoneyStr(month.yearDaiFangSum), month.monthDir, toMoneyStr(month.monthMoney)]);
  });
  kuaiJiKeMuAutoPdfModel.body=cast40Row(kuaiJiKeMuAutoPdfModel.body)
  return kuaiJiKeMuAutoPdfModel;
}

function useKuaiJiKeMuAutoPdfCore(keMuMingXiTablePrintData) {

  const doc = new jsPDF('l', 'px', 'a4', true);
  const model = castKeMuMingXiTablePdfModel(keMuMingXiTablePrintData);
  model.forEach((item) => {
    doc.autoTable(item);
    if (model.indexOf(item) < model.length - 1) {
      doc.addPage();
    }
  });
  // doc.save('table.pdf');
  return doc.output('datauristring');
}

export async function castKuaiJiKeMuAutoTablePdfData({data}) {
  return useKuaiJiKeMuAutoPdfCore(data);
}

export async function toKuaiJiKeMuMingXiPdfBase64({data}) {
  return await castKuaiJiKeMuAutoTablePdfData({data});
}

