import {openBoozJsV3DateLine} from '../../../boozjs-v3-dataline/boozjs-v3-dateline.js';
import {queryVoucherMaxDate, queryYearSelect} from './ping-zheng-list.js';

const {hasPingZhengMaxYearMonth} = queryVoucherMaxDate({
  months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  voucherType: '记',
  voucherTypeNum: ''
});


function castYearMonthStr(yearMonthStr) {
  const year = yearMonthStr.slice(0, 4);
  let month = yearMonthStr.slice(4, 6);
  if (month.length == 1) {
    month = '0' + month;
  }
  return year + '-' + month;
}

const {currentYear, qujian} = queryYearSelect();

export function queryDateMixin() {
  return {
    data() {
      return {
        listQueryQuJian: [],
        listCurrentYearMonth: '',
        // 查询结账
        settleMonth: []
      };
    },
    methods: {
      // 查询条件改变
      queryConditionChange({value}) {
        this.switchPageDataReal.year = value.substring(0, 4);
        this.switchPageDataReal.month = value.substring(5, 7);
        this.switchPageDataReal.interval = value;
        this.getVouch();
      }
    },
    mounted() {
      this.$watch('listCurrentYearMonth', (value) => {
        this.queryConditionChange({value});
      });

      const currentYearMonthNumber = hasPingZhengMaxYearMonth;

      const startYearMonthStr = castYearMonthStr(qujian[0].slice(0, 6));
      const endYearMonthStr = castYearMonthStr(qujian[1].slice(0, 6));
      const currentYearMonthStr = castYearMonthStr(currentYearMonthNumber);

      this.listQueryQuJian = [startYearMonthStr+'-01', endYearMonthStr+'-01'];

      this.listCurrentYearMonth = currentYearMonthStr;

      openBoozJsV3DateLine({
        dataQuJian: [qujian[0].slice(0, 6), qujian[1].slice(0, 6)],
        active: currentYearMonthNumber,
        change: ({active}) => this.listCurrentYearMonth = castYearMonthStr(active.toString())
      });
    }
  };
}
