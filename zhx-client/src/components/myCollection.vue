<template>
  <div class="container">
    <!-- <div class="top">
      <i class="iconfont icon-zuojiantou1" @click="back"></i>
      <h1>我的收藏</h1>
    </div> -->
    <topbar title="我的收藏" :cb="back"></topbar>
    <div v-if="dataList.length === 0" class="list-section">
      <van-empty class="custom-image" :image="require('@/assets/custom-empty-image.png')" description="空空如也" />
    </div>
    <!-- 列表部分 -->
    <div class="list-section">
      <ul>
        <li v-for="goods in dataList" :key="goods.collId" @click="toDetail(goods.goodsId)">
          <div>
            <section>
              <div class="image">
                <img :src="goods.img[0].url">
              </div>
              <div class="contents">
                <p>{{goods.name}}</p>
                <span>{{goods.detail}}</span>
              </div>
              <div class="price">
              </div>
            </section>
            <div class="time">
              <span></span>
            </div>
            <div class="btn">
              <span>￥{{goods.price}}</span>
               <van-button round type="info" size="small" @click.stop="deleteCollection(goods.collId)">删除收藏</van-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import service from "@/api/user"
import request from "@/api/goods"
import { Dialog, Toast } from "vant"
import topbar from "./topbar.vue"
export default {
  components:{topbar},
  data() {
    return {
      payCode: '',
      userId: '',
      dataList: [],
      opt: ''
    }
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1)
    },
    toDetail(id){
      this.$router.push({path:'/detail',query:{id}})
    },
   getCollection(){
     service._getUsersCollection({userId:this.userId}).then(res=>{
       console.log(res);
       if(res.status === 200){
         this.dataList = res.data.map(item=>{
           return {
             collId:item.coll_id,
             detail:item.detail,
             img:JSON.parse(item.main_image),
             name:item.name,
             price:item.price,
             onSale:item.on_sale,
             goodsId:item.goods_id
           }
         })
       }
     })
   },
   deleteCollection(collId){
     request._deleteCollection({collId}).then(res=>{
       if(res.status === 200){
         Toast("删除收藏成功")
         this.getCollection()
       }
     })
   }
   
  },
  created() {
    
    this.userId = this.$store.state.userInfo.userId
    this.getCollection()
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;


  .list-section {
    width: 100%;
    padding: 0.1rem 0.15rem;
    overflow: auto;
    height: 90%;

    box-sizing: border-box;
    ul {
      width: 100%;
      box-sizing: border-box;

      li {
        width: 100%;
        box-sizing: border-box;
        padding: 0.1rem 0.15rem;
        background-color: #fff;
        border-radius: 0.1rem;
        margin: 0.1rem 0;
        h2 {
          width: 100%;
          font-size: 0.15rem;
          position: relative;
          span {
            margin-left: 0.1rem;
            color: #9c9c9c;
          }
          i{
            font-style: normal;
            position: absolute;
            width: 0.5rem;
            height: 0.25rem;
            right: 0;
            border-radius:0.15rem;
            color: #fff;
            font-size: 0.13rem;
            line-height: 0.25rem;
            text-align: center;

          }
        }

        > div {
          width: 100%;
          margin-top: 0.1rem;
          > section {
            display: flex;
            justify-content: space-between;
            .image {
              width: 0.85rem;
              height: 0.85rem;
              overflow: hidden;
              box-sizing: border-box;
              padding: 0.05rem;
              border-radius: 0.1rem;
              img {
                display: block;
                width: 100%;
              }
            }
            .contents {
              width: 2rem;
              > p {
                font-size: 0.15rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              span {
                font-size: 0.13rem;
                display: block;
                margin-top: 0.1rem;
                color: #9c9c9c;
              }
            }

            .price {
              width: 0.5rem;
            }
          }
          .time {
            width: 100%;
            margin: 0 0.05rem;

            span {
              line-height: 0.33rem;
              font-size: 0.13rem;
            }
          }
          .btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > span {
              color: #ff5933;
              font-size: 0.18rem;
            }
          }
        }
      }
    }
  }
}
</style>