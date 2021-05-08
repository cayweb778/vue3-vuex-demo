/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {$request} from '../../boozapp-request/boozapp-request';

export async function saveNewPingZheng({apiData}) {
  await $request({
    url: '/rest/pingZheng/savePingZheng',
    method: 'post',
    data: {pingZhengList: apiData}
  });
}

export async function saveInsertPingZheng({apiData}) {
  await $request({
    url: '/rest/pingZheng/saveInsertPingZheng',
    method: 'post',
    data: {pingZhengList: apiData}
  });
}
