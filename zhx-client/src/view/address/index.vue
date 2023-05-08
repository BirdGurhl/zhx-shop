<template>
  <div class="container">
      <div v-if="opt==='add' || opt === 'edit'">
        <addr-edit @checkPage="checkPage"/>
      </div>
      <div v-if="opt === 'list'">
        <address-list @toEdit="checkEdit"/>
      </div>
  </div>
</template>

<script>
import addrEdit from "./component/addressEdit.vue"
import AddressList from './component/addressList.vue'
import addrList from "./component/addressList.vue"
export default {
  components:{
    addrEdit,
    AddressList
  },
  data(){
    return {
      opt:'',
    }
  },
  computed:{},
  methods:{
    checkEdit(opt){
      this.opt = opt
    },
    checkPage(opt){
      this.opt =opt
    }
  },
  created(){
    this.opt = this.$route.query.opt
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100%;
}

</style>