import {baseUrl} from '../../config.js';
export function getCompanyInfo() {
  let companyInfo = '';
  $.ajax({
    type: 'get',
    url: baseUrl + '/customer!get',
    async: false,
    success: function(res) {
      companyInfo = res.obj;
    },
    error: function(xhr) {
      $('body').html(xhr.responseText);
    }
  });
  // const {adKehuNameFull} =adKehuNameFull
  return companyInfo;
}
