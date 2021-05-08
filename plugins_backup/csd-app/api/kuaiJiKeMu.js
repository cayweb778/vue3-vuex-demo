import $request from '/ysd/app/boozjs/2.0.0/lib/es/boozjs-request/boozjs-request.js'


export async function findKuaiJiKeMuByIyear(year) {
  return await $request({
    url: 'rest/kuaiJiKeMu/findByIyear?year=' + year,
    method: 'GET'
  });
}

export async function findCodeByHasPingZheng({year}) {
  return await $request({
    url: 'rest/pingZheng/findCodeByHasPingZheng?year='+year,
    type: 'GET'
  })

}
