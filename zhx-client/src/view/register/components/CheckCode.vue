<template>
  <div class="container">
    <div class="back" @click="exit">
      <i class="iconfont icon-guanbi1"></i>
    </div>
    <div class="Codebox">
      <p>请输入五位验证码:</p>
      <van-password-input :value="value" :mask="false" :gutter="16" :focused="showKeyboard" @focus="showKeyboard = true" length="5" />
      <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
    </div>
  </div>
</template>

<script>
import service  from "@/api/user.js"
import { Toast } from 'vant'
export default {
  props: {
    userInfo: Object
  },
  data() {
    return {
      value: '',
      errorInfo: '',
      showKeyboard: true,
    }
  },
  computed:{},
  methods:{
    exit(){
      this.$emit("exit")
    }
  },
  watch:{
    value(value){
      if(value.length === 5){
         let data = this.userInfo
          service._register(data).then(res=>{
            if(res.status === 201){
               Toast(res.msg)
               this.$emit("exit")
            }else if(res.status === 200){
               Toast(res.msg)
               this.$router.push("/login")
            }
          })
      }
    }
    
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
  box-sizing: border-box;
  padding: 0.17rem;

  .Codebox {
    > p {
      margin-bottom: 0.2rem;
      font-size: 0.16rem;
      color: #b7b7b7;
    }
    width: 100%;
    margin-top: 40%;
  }
}
</style>