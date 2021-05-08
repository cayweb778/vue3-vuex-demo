/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export    function createBtnGroupModel({saveBtnName, cancelBtnName}) {
        if (saveBtnName == null) {
            saveBtnName = '保存'
        }
        if (cancelBtnName == null) {
            cancelBtnName = '关闭'
        }
        return {saveBtnName, cancelBtnName}
    }
