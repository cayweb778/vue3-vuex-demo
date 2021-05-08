export const jsPdfRender = (head, body, tableData, companyName, zhiBiaoRen, qujian) => ({
  rowPageBreak: 'always',
  didDrawPage: function({doc, settings, cursor}) {
    doc.setFont('mitubachi');
    var pageHeight = settings.startY;
    doc.setFontSize(11);
    doc.text('单位:元', cursor.x - 28, pageHeight - 15);
    doc.setFontSize(18);

    function boozPdfCenter(doc, txt, options, x, y) {
      options = options || {};
      if (options.align == 'center') {
        var fontSize = doc.internal.getFontSize();
        var pageWidth = doc.internal.pageSize.width;
        let txtWidth = doc.getStringUnitWidth(txt) * fontSize / doc.internal.scaleFactor;
        x = (pageWidth - txtWidth) / 2;
      }
      doc.text(txt, x, y);
    }

    boozPdfCenter(doc, tableData['kuaiJiKeMuFirstLevelFullName'], {align: 'center'}, 0, settings.startY - 25);
    doc.setFontSize(10.7);
    doc.text(
        '会计科目:' + tableData['kuaiJiKeMuCode'] + '-' + tableData['kuaiJiKeMuCodeName'],
        settings.margin.left,
        settings.startY - 6
    );
    doc.text(
        '期间: ' + qujian[0] + ' ~ ' + qujian[1],
        cursor.x - 100, settings.startY - 6
    );
    doc.text(
        '核算单位： ' + companyName,
        settings.margin.left,
        cursor.y + 10
    );
  },
  head: head,
  body,
  foot: [
  ],
  margin: {top: 58},
  tableLineColor: [112, 112, 112],
  tableLineWidth: 0.1,
  styles: {
    font: 'mitubachi',
    fontStyle: 'normal',
    overflow: 'linebreak',
    fillColor: false,
    textColor: 20,
    halign: 'left',
    valign: 'top',
    fontSize: 10,
    cellPadding: 2,
    cellWidth: 'auto',
    minCellHeight: 0,
    minCellWidth: 0,
    lineColor: [112, 112, 112],
    lineWidth: 0.2
  },
  headStyles: {
    cellPadding: 2,
    halign: 'center',
    // fillColor: [233, 232, 232],
    textColor: [0, 0, 0],
    fontSize: 11,
    padding: 0
  },
  footStyles: {
    fontSize: 15
  },
  bodyStyles: {
    textColor: [0, 0, 0]
  },
  alternateRowStyles: {
    fillColor: [255, 255, 255]

  },
  columnStyles: {
    0: {cellWidth: 50, halign: 'center'},
    1: {cellWidth: 50, halign: 'center'},
    2: {cellWidth: 121, halign: 'left'},
    3: {cellWidth: 100, halign: 'right'},
    4: {cellWidth: 100, halign: 'right'},
    5: {cellWidth: 50, halign: 'center'},
    6: {cellWidth: 100, halign: 'right'}
  },
  allSectionHooks: true,
  didParseCell: function(data) {
    if (data.cell.raw == '期初余额' || data.cell.raw == '本月合计' || data.cell.raw == '本年累计') {
      data.cell.styles.halign = 'center';
    }
  }
});
