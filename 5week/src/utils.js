/**
 * import & export는 심화 강의를 통해 배우게 됩니다.
 * 그전에는 한 파일에서만 코드를 작성해도 해도 문제는 없습니다.
 */
export function $(querySelector) {
  return document.querySelector(querySelector);
}

export function $$(querySelector) {
  return document.querySelectorAll(querySelector);
}
