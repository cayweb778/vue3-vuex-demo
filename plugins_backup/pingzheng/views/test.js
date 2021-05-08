const createStoreModel = () => ({
  state: {
    pingZhengNum: 'PZ00000000000002',
    pingZhengModel: {
      options: {      // 可选
        title: ''
      },
      props: {},
      data: []
    }
  },
  actions: {
    pingZhengSubmit() {
      // 修改凭证
    }
  }
});

const createComputed = () => ({
  ...mapState('pingZheng/pingZhengData', {
    pingZhengNum: state => state.pingZhengNum,
    pingZhengModel: state => state.pingZhengModel
  })
});

export const useEditPingZhengMixin = () => ({
  computed: createComputed(),
  beforeCreate() {
    this.$store.registerModule(['pingZheng', 'pingZhengData'], createStoreModel());
  }
});
