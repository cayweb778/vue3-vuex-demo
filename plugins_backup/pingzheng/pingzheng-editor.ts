/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import('../pingzheng');
import pingzheng from './pingzheng';

function createPingZhengModel() {
  const {
    createPingZhengModel: PingZhengModel,
    createOptionsModel: options,
    createPropsModel: props,
    createPingZhengRowModel: row
  } = pingzheng.pingZhengModelHelper();

  return PingZhengModel(
      options({
        title: '新增凭证'
      }),
      props({
        pingZhengFrom: '期间损益结转',
        date: '2021-01-01',
        type: '记',
        pingZhengNumOfMonth: '011',
        danJuNum: '5',
        zdr: '机器人01',
        pingZhengNum: 'PZ00000001'
      }),
      [
        row({
          zhaiYao: 1,
          kuaiJiKeMu: '1001 测试科目',
          jieMoney: 2.00,
          daiMoney: 0.00,
          fzDept: '001 采购部'
        }),
        row({
          zhaiYao: 1,
          kuaiJiKeMu: '1001 测试科目',
          jieMoney: 0.00,
          daiMoney: 2.00,
          fzDept: '001 技术部'
        })
      ]
  );
}

function createAddPingZhengModel({options, data}) {
  const {
    createPingZhengModel: PingZhengModel,
    createOptionsModel: optionsModel,
    createPropsModel: propsModel,
    createPingZhengRowModel: row
  } = pingzheng.pingZhengModelHelper();

  const _options = optionsModel({
    title: '新增凭证'
  });

  const _props = propsModel({
    pingZhengFrom: '0',
    date: '2021-01-01',
    type: '记',
    danJuNum: '5',
    zdr: '机器人01'
  });

  const _data = [
    row({
      zhaiYao: 1,
      kuaiJiKeMu: '1001 测试科目',
      jieMoney: 2.00,
      daiMoney: 0.00
    }),
    row({
      zhaiYao: 1,
      kuaiJiKeMu: '1001 测试科目',
      jieMoney: 0.00,
      daiMoney: 2.00
    })
  ];
  if (data == null) {
    data = _data;
  }
  return PingZhengModel(
      {
        ..._options,
        options
      },
      {
        ..._props,
        props
      },
      [
        ...data
      ]
  );
}

function createEditPingZhengModel({options, data}) {
  const {
    createPingZhengModel: PingZhengModel,
    createOptionsModel: optionsModel,
    createPropsModel: propsModel,
    createPingZhengRowModel: row
  } = pingzheng.pingZhengModelHelper();

  const _options = optionsModel({
    title: '新增凭证'
  });

  const _props = propsModel({
    pingZhengFrom: '0',
    date: '2021-01-01',
    type: '记',
    danJuNum: '5',
    zdr: '机器人01',
    pingZhengNum: ''
  });

  const _data = [
    row({
      zhaiYao: 1,
      kuaiJiKeMu: '1001 测试科目',
      jieMoney: 2.00,
      daiMoney: 0.00
    }),
    row({
      zhaiYao: 1,
      kuaiJiKeMu: '1001 测试科目',
      jieMoney: 0.00,
      daiMoney: 2.00
    })
  ];
  if (data == null) {
    data = _data;
  }
  return PingZhengModel(
      {
        ..._options,
        options
      },
      {
        ..._props,
        props
      },
      [
        ...data
      ]
  );
}

function createShowPingZhengModel({options, data}) {
  const {
    createPingZhengModel: PingZhengModel,
    createOptionsModel: optionsModel,
    createPropsModel: propsModel,
    createPingZhengRowModel: row
  } = pingzheng.pingZhengModelHelper();

  const _options = optionsModel({
    title: '新增凭证'
  });

  const _props = propsModel({
    pingZhengFrom: '0',
    date: '2021-01-01',
    type: '记',
    danJuNum: '5',
    zdr: '机器人01',
    pingZhengNum: ''
  });

  const _data = [
    row({
      zhaiYao: 1,
      kuaiJiKeMu: '1001 测试科目',
      jieMoney: 2.00,
      daiMoney: 0.00
    }),
    row({
      zhaiYao: 1,
      kuaiJiKeMu: '1001 测试科目',
      jieMoney: 0.00,
      daiMoney: 2.00
    })
  ];
  if (data == null) {
    data = _data;
  }
  return PingZhengModel(
      {
        ..._options,
        options
      },
      {
        ..._props,
        props
      },
      [
        ...data
      ]
  );
}

const usePingZhengModel = () => {
  return {
    // 创建一个凭证数据模型
    createPingZhengModel,
    // 创建一个新增凭证数据模型
    createAddPingZhengModel,
    // 创建一个编辑凭证数据模型
    createEditPingZhengModel,
    // 创建一个查看凭证数据模型
    createShowPingZhengModel
  };
};
Object.assign(exports, usePingZhengModel);

window.usePingZhengModel = usePingZhengModel;
})
