- pingzheng/pingzheng:
    - pingZhengModelHelper
        - castPingZhengModel(apiData)
            - 通过api接口数据转为凭证模型数据
        - castApiData(pingZhengModel)
            - 通过凭证模型数据转为api接口数据
        - 用法:
            ```
            const {castPingZhengModel,castApiData} = require('pingzheng/pingzheng').pingZhengModelHelper()
            ```

    ```
    boozjs.use(['pingzheng/pingzheng'])
        可以通过凭证模型打开凭证编辑器添加凭证数据
    ```


- pingzheng
    ```
    boozjs.use(['pingzheng'])
        凭证组件接口
    ```
