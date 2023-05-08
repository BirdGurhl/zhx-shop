<template>
  <el-container class="allContainer">
    <el-header style="height: 20%; padding: 0">
      <div class="header">
        <h1>仲海鲜后台管理</h1>
      </div>
    </el-header>
    <el-main class="mainInput">
      <div class="user-login">
        <el-input class="userinput" v-model="adminInfo.adminName" placeholder="请输入用户名"></el-input>
        <el-input class="userinput" placeholder="请输入密码" v-model="adminInfo.password" show-password></el-input>
        <el-button type="primary" :loading="loading.flag" class="submit" @click="login">{{ loading.text }}</el-button>
      </div>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      flag: true,
      loading: {
        flag: false,
        text: "登录",
      },
      adminInfo: {
        adminName: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      this.loading = {
        flag: true,
        text: "加载中",
      };
      // console.log("111");
      this.$store
        .dispatch("login", this.adminInfo)
        .then((res) => {
          console.log("我在这里", res);
          if (res.data.status == 200) {
            console.log("2221");
            setTimeout(() => {
              this.loading = {
                flag: false,
                text: "登录",
              };
              Message({
                type: "success",
                message: res.data.msg,
              });
              if (this.$store.state.adminInfo.adminName == 'admin') {
                this.$router.push("/adminManage");

              }else {
                this.$router.push("/");
              }
            }, 500);
          }
        })
        .catch((err) => {
          this.loading = {
            flag: false,
            text: "登录",
          };
          Message({
            type: "error",
            message: err,
          });
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.allContainer {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
}

.header {
  width: 100%;
  height: 100%;

  /* background-color: #666; */
  h1 {
    width: 100%;
    line-height: 100px;
    text-align: center;
    color: #fff;
    font-size: 26px;
    letter-spacing: 5px;
    // margin: 50px 0;
    margin-top: 60px;
  }
}

.mainInput {
  width: 100%;
}

.user-login {
  width: 480px;
  margin: 0 auto;

  >div {
    margin: 10px 0;
  }
}

.userinput {
  background-color: #283443;
}

.submit {
  width: 100%;
}
</style>
<style scoped>
::v-deep .el-input__inner {
  height: 50px;
  border: 1px solid #3e4957;
  background-color: #283443 !important;
  color: #fff;
}</style>
