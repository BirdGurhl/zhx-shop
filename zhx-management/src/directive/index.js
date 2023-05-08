import role from './role'

const install = function (Vue) {
  Vue.directive('role', role)
}

export default install
