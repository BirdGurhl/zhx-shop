export default {
  bind(el, binding) { },
  inserted(el, binding) {
    el.onfocus = function () {
      el.className = 'changeBotton'
    },
    el.onblur = function () {
      el.className = ''
    }
  }
}