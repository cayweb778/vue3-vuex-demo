/**
 * 会计科目明细账
 */
import $request from '../../../boozjs-request/boozjs-request.js'
import {addThousands} from '../../../money-add-thousands/money-add-thousands.js';
// import $requ
import {findKuaiJiKeMuByIyear,findCodeByHasPingZheng} from '../../api/kuaiJiKeMu.js'

$request.usePrefixUrl({url: '/ysd'})

async function $openKuaiJiKeMuAutoTablePdf({year, jiCiQuJian, companyName,zhiBiaoRen,queryListParam}) {



  const kuaiJiKeMuMingXiList = await getKuaiJieKeMuMXPageData({
    year,
    jiCiQuJian,
    queryListParam
  })
  const kuaiJiKeMuList = await findKuaiJiKeMuByIyear(year)
  let abc={
    data: {
      list: kuaiJiKeMuMingXiList.map(kuaiJiKeMu => {
        kuaiJiKeMu.month.forEach(item=>{
          item.details.forEach(item=>{
            item.rowDaiFangMoney=addThousands(item.rowDaiFangMoney)
            item.rowJieFangMoney=addThousands(item.rowJieFangMoney)
            item.rowMoney=addThousands(item.rowMoney)

          })
          item.monthDaiFangSum=addThousands(item.monthDaiFangSum)
          item.monthJieFangSum=addThousands( item.monthJieFangSum)
          item.monthMoney=addThousands(item.monthMoney)
          item.yearDaiFangSum=addThousands( item.yearDaiFangSum)
          item.yearJieFangSum=addThousands( item.yearJieFangSum)
        })
        const kuaiJiKeMuFirstLevelCode = kuaiJiKeMu.kuaiJiKeMuCode.slice(0, 4)
        kuaiJiKeMu.kuaiJiKeMuFirstLevelFullName =queryKuaiJiKeMuFirstLevelFullName(kuaiJiKeMuList,kuaiJiKeMuFirstLevelCode)
        return kuaiJiKeMu
      }),
      companyName,
      zhiBiaoRen,
      qujian: [year+' - 01', year+' - 12']
    }
  }
  await parent.openKuaiJiKeMuAutoTablePdf(abc)
}

async function getKuaiJieKeMuMXPageData({year,jiCiQuJian, queryListParam}) {

  const jici = {'jici': jiCiQuJian[0], 'jici2': jiCiQuJian[1]}

  return (
      await $request({
        url: 'SubjectType!getKuaiJieKeMuMXPageData',
        type: 'POST',
        data: {
          year,
          jici: jici.jici,
          jici2: jici.jici2,
          msg: JSON.stringify(queryListParam)
        },
      })
  ).list
}

function queryKuaiJiKeMuFirstLevelFullName(kuaiJiKeMuList,kuaiJiKeMuFirstLevelCode) {
  const filter = kuaiJiKeMuList.filter(codeObject => codeObject.ccode == kuaiJiKeMuFirstLevelCode)[0]
  return filter.ccodename+'明细账'
}

export{
  $openKuaiJiKeMuAutoTablePdf
}


