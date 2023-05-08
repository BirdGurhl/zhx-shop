<template>
  <div class="container">
    <!-- <div class="topTitle3">
      <i class="iconfont icon-zuojiantou1" @click="back"></i>
      <h2>我的信息</h2>
    </div> -->
    <Topbar title="我的信息" :cb="back"></Topbar>
    <div class="imghead">
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
    </div>

    <div class="form">
      <div class="user-phone">
        <span>手机号:</span>
        <input v-inputfocus disabled type="text" v-model="userPhone">
      </div>
      <div class="user-phone">
        <span>昵称:</span>
        <input v-inputfocus type="text" v-model="userNick">
      </div>
      <div class="user-phone">
        <span>个人简介:</span>
        <!-- <input v-inputfocus type="text" placeholder="请输入邮箱" v-model="userEmail"> -->
        <van-field v-model="userDesc" name="message" rows="2" autosize type="textarea" maxlength="50" show-word-limit
          placeholder="这个人很懒，没有留下简介..." :rules="[
            { required: true, message: '' }]" />
      </div>
      <section>
        <span>去修改密码</span>
      </section>
      <div class="submit">
        <button @click="checkUpdate">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import serivce from "@/api/user"
import Storage from '@/utils/storage'
import { Toast } from 'vant'
import Topbar from "./topbar.vue"
export default {
  components: { Topbar },
  data() {
    return {
      fileList: [],
      userPhone: "",
      userEmail: "",
      userNick: "",
      userId: "",
      userDesc: '',
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      console.log(file);
      let data = new FormData();
      data.append('file', file.file)
      serivce._upload(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          file.status = 'success';
          file.message = '上传成功';
          this.fileList = []
          this.fileList.push({ url: res.imgInfo.url })
        }
      })
    },
    getUserInfo() {
      serivce._getUserInfo({ userId: this.userId }).then(res => {
        console.log(res);
        this.fileList = []
        if (res.status === 200) {
          this.userPhone = res.data[0].userphone + "  (暂不提供修改)"
          this.userNick = res.data[0].nickname
          if (res.data[0].headImg !== null) {
            this.fileList.push({ url: res.data[0].headImg })
          }
          if (res.data[0].email !== null) {
            this.userEmail = res.data[0].email
          }
          if (res.data[0].userDesc !== null) {
            this.userDesc = res.data[0].userDesc
          }
        }
      })
    },
    checkUpdate() {
      let data = {
        userId: this.userId,
        nickName: this.userNick,
        email: this.userEmail,
        headImg: this.fileList.length === 0 ? '' : this.fileList[0].url,
        userDesc:JSON.stringify(this.userDesc)
        // userDesc: this.userDesc
      }
      serivce._updateUserInfo(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          Toast("修改成功")
          // this.getUserInfo()
          Storage.setItem('userInfo', {
            ...this.$store.state.userInfo,
            ...data,
            nickname:data.nickName,
            userDesc:this.userDesc
          })
          this.$router.push("/myInfo")
        }
      })
      console.log(data);
    }
  },
  created() {
    this.userId = this.$store.state.userInfo.userId
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .topTitle3 {
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

  .imghead {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.3rem;
  }
}

.form {
  width: 100%;
  box-sizing: border-box;
  // padding: 0.15rem;
  padding: 0 0.15rem;
  margin-top: 0.2rem;

  >div {
    margin: 0.25rem 0.1rem;
    display: flex;
    align-items: center;

    >span {
      width: 22%;
      font-size: 0.15rem;
      color: #6d6d6d;
    }
  }

  section {
    margin: 0.25rem 0.1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    >span {
      width: 25%;
      font-size: 0.15rem;
      color: #6d6d6d94;
    }
  }

  input {
    box-sizing: border-box;
    display: block;
    outline: none;
    border: none;
    margin: 0 auto;
    width: 80%;
    height: 0.38rem;
    font-size: 0.15rem;
    border-bottom: 0.01rem solid #d9d9d9;
    padding-left: 0.12rem;
    color: #6d6d6d;
    transition: border-bottom 0.3s;
  }

  input::-webkit-input-placeholder {
    font-size: 0.13rem;
    color: #bdbdbd;
    letter-spacing: 0.01rem;
  }
}

.span-title {
  height: 0.3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;

  span:first-of-type {
    font-size: 0.13rem;
    color: #848484;
    line-height: 0.3rem;

    .icon-youjiantou {
      font-size: 0.15rem;
    }
  }
}

.submit {
  button {
    width: 100%;
    height: 0.43rem;
    border-radius: 0.05rem;
    outline: none;
    border: none;
    margin-top: 0.25rem;
    background-color: #fc9bbb;
    color: #fff;
    transition: all 0.3s;
  }

  button:active {
    background-color: rgb(101, 197, 235);
  }
}

::v-deep .van-field__control {
  color: #6d6d6d;

}
</style>