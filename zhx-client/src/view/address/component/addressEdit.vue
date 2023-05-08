<template>
  <div class="container">
    <van-address-edit :area-list="areaList" show-postal :show-delete="false"  show-search-result :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import serive from "@/api/user"
export default {
  data() {
    return {
      areaList,
      addrInfo:null,
      opt:'',
    };
  },
  methods: {
    onSave(content) {
      console.log(content);
      this.addrInfo = content;
      this.addrInfo.userId = this.$store.state.userInfo.userId
      serive._addAddress(this.addrInfo).then(res=>{
        if(res.status === 200){
          this.$emit("checkPage","list");
          Toast("添加成功");
        }else{
          Toast("添加失败");
        }
      })
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
  },
  
}
</script>

<style lang="scss" scoped>
</style>