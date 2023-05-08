<template>
  <div class="list-container">
    <Topbar title="收货地址" :cb="back"></Topbar>
    <ul>
      <li v-for="addr in addList" :key="addr.id">
        <div class="info-addr">
          <div class="icons">
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <div class="addr-conts">
            <h2>{{ addr.name }}<span>{{ addr.phone }}</span></h2>
            <p>{{ addr.detail }}</p>
            <p>{{ addr.info }}</p>
          </div>
        </div>
        <van-icon class="edit-icon" name="edit" color="#9e9e9e" size="0.2rem" @click.stop="toEdit(addr.id)" />
      </li>
    </ul>

    <div class="to-add">
      <button @click="addAddress">新增收货地址</button>
    </div>
  </div>
</template>

<script>
import service from "@/api/user"
import Topbar from "./topbar.vue"
export default {
  components: { Topbar },
  data() {
    return {
      userId: '',
      addList: []
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    addAddress() {
      this.$router.push({ path: '/addressEdit', query: { opt: 'add' } })
    },
    toEdit(addrId) {
      console.log(addrId);
      this.$router.push({ path: '/addressEdit', query: { opt: 'edit', addrId } })

    },
    getAddress() {
      return new Promise((resolve, reject) => {
        service._getAddress({ userId: this.userId }).then(res => {
          this.addList = [];
          let id, name, phone, detail, info;
          this.addList = (res.data.map(item => {
            id = item.address_id;
            name = item.receiver_name;
            phone = item.receiver_phone;
            detail = item.receiver_province + item.receiver_city
            info = item.receiver_address
            return {
              id, name, phone, detail, info
            }
          }))
          let index = res.data.findIndex(item => { return JSON.parse(item.isDefault) })
          if (index != -1) {
            this.addList.splice(index, 1)
            this.addList.unshift({
              id: res.data[index].address_id,
              name: res.data[index].receiver_name,
              phone: res.data[index].receiver_phone,
              detail: res.data[index].receiver_province + res.data[index].receiver_city,
              info: res.data[index].receiver_address
            })
          }
        })
      })
    }
  },
  created() {
    this.userId = this.$store.state.userInfo.userId;
    this.getAddress()
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .topTitle2 {
    width: 100%;
    height: 0.45rem;
    box-sizing: border-box;
    // padding: 0.15rem;
    display: flex;
    align-items: center;
    background-color: #fff;

    i {
      line-height: 0.45rem;
      font-size: 0.22rem;
      margin-right: 0.1rem;
    }

    h2 {
      line-height: 0.45rem;
      font-size: 0.18rem;

    }
  }

  ul {
    width: 100%;
    padding: 0 0.15rem;
    box-sizing: border-box;

    >li {
      width: 100%;
      margin-top: 0.1rem;
      padding: 0.1rem 0;
      background-color: #fff;
      border-radius: 0.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info-addr {
        display: flex;
        align-items: center;

        .icons {
          i {
            display: block;
            width: 0.2rem;
            font-size: 0.18rem;
            font-weight: 600;
            color: #f790a1;
          }
        }

        .addr-conts {
          h2 {
            width: 100%;
            font-size: 0.17rem;
            color: #f790a1;
            margin-bottom: 0.06rem;

            span {
              padding-left: 0.2rem;
              color: #333;
            }
          }

          p {
            font-size: 0.13rem;
            line-height: 0.2rem;
          }
        }
      }
    }
    >li:first-of-type {
      background-color: #ffb6ce82;
    }
  }
}

.edit-icon {
  margin-right: 0.2rem;
}

.to-add {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  >button {
    width: 2.1rem;
    height: 0.4rem;
    background-color: #fc9bbb;
    font-size: 0.15rem;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 0.2rem;

    transition: 0.3s;
  }

  >button:active {
    background-color: #f881a8;
  }
}
</style>