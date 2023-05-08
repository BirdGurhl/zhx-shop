
import inputFocus from "./focus"

const install = function (Vue) {
  Vue.directive('inputfocus',inputFocus)
}

export default install