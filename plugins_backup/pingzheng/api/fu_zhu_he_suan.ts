import apiProcess from '../../../../aaabbbb/plugins_backup/pingzheng/data/data';

export function queryFuZhuHeSuanApi(params) {
  let res;
  $.ajax({
    type: 'post',
    url: urlPath + '/subject!queryAssist',
    data: params,
    async: false,
    success: res1 => res = res1,
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
  return {
    then(exec) {
      exec(res);
    }
  };
}

const {
  queryDeptListDataApi,
  queryPersonListDataApi,
  queryCustomerListDataApi,
  queryGYListDataApi,
  queryCHListDataApi,
  queryItemListDataApi
} = apiProcess();
export const queryDeptList = async () =>    await queryDeptListDataApi()
export const queryPersonList = async () =>   await queryPersonListDataApi()
export const queryCustomerList = async () =>  await queryCustomerListDataApi()
export const queryGYList = async () =>      await queryGYListDataApi()
export const queryCHList = async () =>      await queryCHListDataApi()
export const queryItemList = async () =>    await queryItemListDataApi()

