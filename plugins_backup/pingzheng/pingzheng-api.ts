/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import('../pingzheng')
    import pingzheng from './pingzheng'

    const {toAddPingZhengModel} = pingzheng.pingZhengModelApiHelper()
    const {castApiData} = pingzheng.pingZhengApiDataHelper()

  export const pingZhengApi={
      addPingZheng: async (pingZhengModel) => {
          const apiData = castApiData(toAddPingZhengModel(pingZhengModel))

          await $request({
              url: '/rest/pingZheng/savePingZheng',
              method: 'post',
              data: {pingZhengList: apiData},
              success() {
                  this.forbidAdd = false
              }
          })
      }
  }

  window.pingZhengApi = pingZhengApi
