export function checkEnter(e) {
  var et = e || window.event;
  var keycode = et.charCode || et.keyCode;
  if (keycode == 13) {
    if (window.event) {
      window.event.returnValue = false;
    } else {
      e.preventDefault(); //for firefox
    }
  }
}
