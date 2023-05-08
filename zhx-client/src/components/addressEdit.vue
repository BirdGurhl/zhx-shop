<template>
  <div class="container">
    <Topbar :title="opt === 'edit' ? '编辑收货地址' : '新增收货地址'" :cb="back"></Topbar>
    <div class="addrcontainer">
      <van-address-edit :area-list="areaList" :address-info="addrInfo" show-set-default :show-delete="opt === 'edit'"
        show-search-result :area-columns-placeholder="['请选择', '请选择']" :area-placeholder="'选择 校区 / 楼栋'" :columns-num="2" @save="onSave" @delete="onDelete" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
// import { areaList } from '@vant/area-data';
import {areaList} from '@/utils/addressData.js'
import serive from "@/api/user"
import Topbar from './topbar.vue';

export default {
  components: { Topbar },
  data() {
    return {
      areaList, // 地区列表	
      addrInfo: { // 收货人信息初始值
        id: '',     // 每条地址的唯一标识	
        name: '',   // 收货人姓名
        tel: '',    // 电话
        province: '',   // 校区
        city: '',       // 楼栋
        addressDetail: '',  //详细地址
        isDefault:false
      },
      opt: '',        // edit 编辑 add 添加
      addrId: '',
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    // 保存
    onSave(content) {
      this.addrInfo = content;
      console.log('content', content);
      this.addrInfo.userId = this.$store.state.userInfo.userId
      if (this.opt === 'add') {
        serive._addAddress(this.addrInfo).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$router.go(-1);
            Toast("添加成功");
          } else {
            Toast("添加失败");
          }
        })
      }
      if (this.opt === 'edit') {
        let editInfo = {
          ...this.addrInfo,
          addrId: this.addrId
        }
        serive._updateAddr(editInfo).then(res => {
          if (res.status === 200) {
            this.$router.go(-1);
            Toast("修改成功");
          }
        })
      }

    },
    // 删除
    onDelete() {
      if (this.addrId !== '') {
        serive._deleteAddr({ addrId: this.addrId }).then(res => {
          if (res.status === 200) {
            Toast("删除成功");
            this.$router.go(-1);

          }
        })

      }
    },
    getAddrInfo() {
      serive._getAddr({ addrId: this.addrId }).then(res => {
        res = res.data[0]
        let addrInfo = {
          id: res.address_id,
          name: res.receiver_name,
          tel: res.receiver_phone,
          province: res.receiver_province,
          city: res.receiver_city,
          addressDetail: res.receiver_address,
          areaCode: res.receiver_areaCode,
          isDefault:JSON.parse(res.isDefault)
        }
        this.addrInfo = addrInfo
      })
    }
  },
  created() {
    this.opt = this.$route.query.opt
    if (this.opt === 'edit') {
      this.addrId = this.$route.query.addrId
      this.getAddrInfo();
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  width: 100%;
  height: 0.5rem;
  background-color: #fff;
  border-bottom: 0.01rem solid #eee;

  >i {
    position: absolute;
    left: 0.15rem;
    font-size: 0.23rem;
    top: 50%;
    transform: translateY(-50%);
  }

  h1 {
    font-size: 0.18rem;
    width: 100%;
    text-align: center;
    line-height: 0.5rem;
  }
}


.addrcontainer {
  width: 100%;

}
</style>