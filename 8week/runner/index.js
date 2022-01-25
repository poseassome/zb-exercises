let runner = document.querySelector(".runner-icon");
let up = 0,
  lt = 0;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode === 38) {
    up++;
    runner.style.top = "-" + up + "px";
  } else if (e.keyCode === 40) {
    up--;
    runner.style.top = "-" + up + "px";
  } else if (e.keyCode === 37) {
    lt--;
    runner.style.left = lt + "px";
  } else if (e.keyCode === 39) {
    lt++;
    runner.style.left = lt + "px";
  }
}
document.onkeydown = checkKey;
