<template>
  <div id="main" class="container">
    <el-container style="height: 100%">
      <el-aside width="200px" style="background-color: #2f4054">
        <el-menu class="menuText" @select="toPath" @open="handleOpen" @close="handleClose">
          <!-- <el-menu-item index="1">
            <i class="el-icon-picture-outline-round"></i>
            <span slot="title">仪表板</span>
          </el-menu-item> -->
          <el-submenu index="6" v-if="role">
            <template slot="title">
              <i class="el-icon-menu"></i>管理员管理</template>
            <el-menu-item-group>
              <el-menu-item index="6-1">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>商品管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">商品<span v-if="adminRole">列表</span><span v-else>查看</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-menu"></i>分类管理</template>
            <el-menu-item-group>
              <el-menu-item index="9-1">分类<span v-if="adminRole">列表</span><span v-else>查看</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">用户<span v-if="adminRole">列表</span><span v-else>查看</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">订单<span v-if="adminRole">列表</span><span v-else>查看</span></el-menu-item>
              <el-menu-item index="4-2">退货<span v-if="adminRole">列表</span><span v-else>查看</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>公告管理</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">公告<span v-if="adminRole">列表</span><span v-else>查看</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 头部用户栏 -->
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span class="welcomeTitle">尊敬的<span v-if="!adminRole">超级</span>管理员，欢迎您</span>
          <el-dropdown @command="handleCommand">
            <!-- <i class="el-icon-setting" style="margin-right: 15px">caidan </i> -->
            <span class="el-dropdown-link usernick" v-text="adminInfo.adminName"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 面包屑 -->
        <nav class="nav-section">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(route, index) in breadArr" :key="index">
              <router-link :to="{ path: route.path }">{{ route.title }}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </nav>
        <!-- 主体部分 -->
        <el-main class="main-bgc">
          <!-- enter-active-class="animate__animated animate__fadeInUp" -->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import mixin from "@/mixin/index"
export default {
  mixins: [mixin],
  data() {
    return {
      adminInfo: {},
      breadArr: [],
    }
  },
  computed: {
    role() {
      return JSON.parse(localStorage.getItem("adminInfo")).role === "1"
    }
  },
  methods: {
    toPath(index) {
      if (index === '1') {
        this.$router.push('/dashboard')
      }
      if (index === '2-1') {
        this.$router.push('/goodsShow')
      }

      if (index === '9-1') {
        this.$router.push('/typeManage')
      }
      if (index === '3-1') {
        this.$router.push('/vipManage')
      }
      if (index === '3-2') {
        this.$router.push('/401')
      }
      if (index === '4-1') {
        this.$router.push('/order')
      }
      if (index === '4-2') {
        this.$router.push('/returnOrder')
      }
      if (index === '5-1') {
        this.$router.push('/notice')
      }
      if (index === '6-1') {
        this.$router.push('/adminManage')
      }
      // let flag = 1
      // this.breadArr.forEach((item) => {
      //   if (item.title === this.formatRouter(this.$route).title) {
      //     flag = -1
      //   }
      // })

      // if (flag === 1) {
      //   this.breadArr.push(this.formatRouter(this.$route))
      // }
      // console.log(this.$route);
    },
    handleOpen(key, keyPath) {
      console.log(1, key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(7, key, keyPath)
    },
    handleCommand(command) {
      // localStorage.clear(userInfo);
      // localStorage.clear(token);
      if (command == 'logOut') {
        localStorage.clear()
        window.location.reload()
      }
    },

    formatRouter(route) {
      return {
        allPath: { path: route.path },
        title: route.meta.title,
      }
    },
  },
  watch: {
    '$route'() {
      this.breadArr = this.$route.meta.breadCrumb
    }
  },
  created() {
    // console.log("111", this.$store.state.userInfo);
    this.adminInfo = this.$store.state.adminInfo
    this.breadArr = this.$route.meta.breadCrumb
  },
}
</script>
<style>
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-menu-item-group {
  background-color: #1f2d3d;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
  /* transition: transform ease-in 0.5s; */
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.main-bgc {
  background-color: #f1f4f6;
}

.usernick {
  font-size: 20px;
  display: inline-block;
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
}

.welcomeTitle {
  font-size: 15px;
  display: inline-block;
  color: #bbbbbb;
  cursor: none;
}

.nav-section {
  box-sizing: border-box;

  padding: 10px 20px;

  background-color: #f1f4f6;
}
</style>
<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
}

.menuText {
  background-color: #2f4054;
  color: #fff;
}

.main-bgc {
  .container {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px 10px;
    box-shadow: 0 0 10px #eee;
    border-radius: 5px;
  }
}
</style>
<style scoped>
/* eslint-disable */

.container /deep/ .el-submenu__title {
  color: #b1cbd9;
}

.container /deep/ .el-menu-item-group__title {
  color: #b1cbd9;
}

.container /deep/ .el-menu-item {
  color: #b1cbd9;
}

.container /deep/ .el-submenu__title:hover {
  background-color: #263445;
}

.container /deep/ .el-menu-item:hover {
  background-color: #001528;
}

.container /deep/ .el-menu-item.is-active {
  background-color: #1f2d3d;
}

.container /deep/ .el-header {
  background-color: #fff;
  box-shadow: 0 0 10px #dddddd;
}

.el-submenu .el-menu-item {
  display: flex;
}
</style>
