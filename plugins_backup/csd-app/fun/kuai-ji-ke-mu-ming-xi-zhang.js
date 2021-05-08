import {findCodeByHasPingZheng} from '../api/kuaiJiKeMu.js';

function castQueryParam({arr,year}) {
  return arr.map(item => ({
    kuaiJiKeMuCode: item,
    'dateRange': [year + '01', year + '12']
  }));
}
async function print({year, jiCiQuJian, zhiBiaoRen, queryKuaiJiKeMuList}) {
  const queryListParam=castQueryParam({year,arr:queryKuaiJiKeMuList})
  const {$openKuaiJiKeMuAutoTablePdf} = await import('../store/modules/kuai-ji-ke-mu-ming-xi-zhang.js');
  const {getCompanyInfo} = await import ('../store/modules/company-info.js');
  const {adKehuNameFull: companyName} = getCompanyInfo();
  $openKuaiJiKeMuAutoTablePdf({
    year: year,
    jiCiQuJian: [1, 1],
    companyName,
    zhiBiaoRen: '',
    queryListParam
  });
};


async function printAll({year, jiCiQuJian, zhiBiaoRen}) {
  const queryKuaiJiKeMuList = await findCodeByHasPingZheng({year});
  print({year, jiCiQuJian, zhiBiaoRen, queryKuaiJiKeMuList});
}

window.print = print;
window.printAll = printAll;
