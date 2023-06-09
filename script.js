// After 2.8s animation end
let loader = document.getElementById("animation-loading");

setTimeout(() => {
  loader.remove();
}, 2800);
window.onload = function (setTimeout) {};
