export function addThousands(num) {
  if (num == null) return "";
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  if (num && num.toString().indexOf('.') == -1) {
    return (num + '').replace(reg, '$&,');
  } else {
    return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ",";
    });
  }
}
