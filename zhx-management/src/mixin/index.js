export default {
  computed: {
    adminRole() {
      if (JSON.parse(localStorage.getItem('adminInfo')).role === '2') {
        return true
      }
      return false
    },
  },
}