<template>
  <div class='canvasCode'>
    <canvas ref="canvas" @click="drawCode"> </canvas>
  </div>
</template>

<script>
export default {
  name: 'canvasCode',
  data() {
    return {
      code: ''
    }
  },
  props: ['inputCode'],
  computed: {},
  components: {},
  created() { },
  mounted() {
    this.drawCode()
  },
  methods: {
    drawCode() {
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d')
      let code = ''
      let codeLength = 4 // 验证码长度
      let width = canvas.width
      let height = canvas.height
      let bgColor = '#f0f0f0' // 背景颜色
      let colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF', '#C0C0C0'] // 随机颜色
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // 绘制背景
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)

      // 随机生成验证码
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * colors.length)
        let char = String.fromCharCode(Math.floor(Math.random() * 26 + 97))
        ctx.font = '20px Arial'
        ctx.fillStyle = colors[index]
        ctx.fillText(char, 15 + i * 25, 25)
        code += char
      }

      this.code = code // 保存验证码
    },

    checkCode() {
      let canvas = this.$refs.canvas
      let ctx = canvas.getContext('2d')
      let code = this.code
      let inputCode = this.inputCode

      if (inputCode.toUpperCase() === code.toUpperCase()) {
        // 验证码正确，允许用户登录
        console.log('验证码正确')
        return true
      } else {
        // 验证码错误，提示用户重新输入
        console.log('验证码错误')
        this.$toast('验证码错误')
        this.drawCode()
        this.$emit('update:inputCode','')
        return false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.canvasCode {
  height: 100%;
  width: 50%;
  canvas{
    width: 100%;
    height: 100%;
  }
}
</style>
