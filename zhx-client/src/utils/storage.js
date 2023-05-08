export default {

  setItem(key, obj) {
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'string') {
      localStorage.setItem(key, obj)
    } else {
      localStorage.setItem(key,JSON.stringify(obj))
    }
  },

  getItem(key) {
    return localStorage.getItem(key)
  },

  removeItem(key) {
    localStorage.removeItem(key)  
  },

  clear() {
    localStorage.clear()
  }

}