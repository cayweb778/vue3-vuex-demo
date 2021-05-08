export default {
  props: ['minDate', 'maxDate'],
  mounted() {
    //年月选择器
    layui.use('laydate', () => layui.laydate.render({
          elem: this.$el,
          type: 'month',
          min: this.minDate,
          max: this.maxDate,
          value: this.value,
          done: (value, date, endDate) => {
            this.$emit('change', {value, date, endDate});
          }
        })
    );
  },
  render(h) {
    return h({
      template: `
                  <input type="text" class="layui-input" id="test3"
                       style="cursor:pointer;width: 140px;height: 25px;text-align: center;border: 1px solid #7b7a7a; border-radius: 4px;padding-left: 0px;display: inline-block;"
                       readonly="readonly">`
    });
  }
};
