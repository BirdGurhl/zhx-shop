export default {
  bind(el, binding) { },
  inserted(el, binding) {
    if (JSON.parse(localStorage.getItem("adminInfo")).role === '1') {
      el.style.display="none"
    }
  }
}