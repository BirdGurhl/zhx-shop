<template>
  <div class="container">
    <div v-if="isShow">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button v-role type="primary" icon="el-icon-circle-plus-outline" @click="addGoods">添加商品
            </el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="showTable">
            <el-table v-loading="loading" element-loading-text="处理中..." empty-text="空空如也" border
              element-loading-background="rgba(255, 255, 255, 0.6)" :data="tableData.filter(
                (data) =>
                  !search ||
                  data.name.toLowerCase().includes(search.toLowerCase())
              ).slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
                " style="width: 100%">
              <el-table-column label="排序" prop="order_id" align="center">
                <template slot-scope="scope">
                  <span v-text="scope.$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column label="ID" prop="id" align="center"></el-table-column>
              <el-table-column label="缩略图" prop="img" align="center">
                <template slot-scope="scope">
                  <el-image style="width: 60px; height: 60px" :src="scope.row.subImg"
                    :preview-src-list="[scope.row.subImg]">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column label="商品名称" prop="name" align="center"> </el-table-column>
              <el-table-column label="商品类型" prop="typeName" align="center">
              </el-table-column>
              <el-table-column label="价格" prop="price" align="center"> </el-table-column>
              <el-table-column label="剩余量" prop="count" align="center"> </el-table-column>
              <el-table-column label="是否在售" prop="onSale" align="center" v-if="adminRole">
                <template slot-scope="scoped">
                  <el-switch v-model="scoped.row.onSale" active-color="#13ce66" inactive-color="#ff4949"
                    @change="changeSale(scoped.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column align="center" v-if="adminRole">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" placeholder="根据名称关键字搜索" />
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="el-icon-info" icon-color="red"
                    @confirm="toDelete(scope.row)" title="确认删除嘛？">
                    <el-button slot="reference" size="mini" type="danger">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
              <template slot="empty">
                <el-empty description="空空如也"></el-empty>
              </template>
            </el-table>

          </div>
        </el-col>
      </el-row>
      <aside>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="page.currentPage" :page-sizes="[10, 50, 100, 150]" :page-size="10"
          layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </aside>
    </div>
    <transition name="fade-transform" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import axios from "axios"
import service from "@/api/user"
import { Message } from "element-ui";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },

  methods: {
    // 分页
    handleSizeChange(val) {
      // 更改页面显示个数时触发此函数
      console.log(val);
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;

    },

    addGoods() {
      this.$router.push({ path: '/addGoods', query: { opt: "add" } })
    },
    initData() {
      // 调用查询接口
      this.loading = true;
      service._allGoods().then((res) => {
        console.log(res);
        let data = res.data.res.map((item, index, arr) => {
          if (item.on_sale === "0") {
            item.on_sale = false;
          } else if (item.on_sale === "1") {
            item.on_sale = true;
          }
          return {
            id: item.goods_id,
            subImg: JSON.parse(item.main_image)[0].url,
            imgList: JSON.parse(item.main_image),
            name: item.name,
            price: item.price,
            typeName: item.type_name,
            count: item.stock,
            onSale: item.on_sale,
          };
        });
        this.tableData = data;
        console.log(data);
        this.loading = false;
      });
    },
    // 去编辑
    handleEdit(index, row) {
      console.log(row.id);
      this.$router.push({ path: "/goodsShow/editGoods", query: { id: row.id, opt: "edit" } })
    },
    toDelete(row) {
      console.log(row);
      this.loading = true;
      axios({
        url: `/goods/deleteGoods?goodsId=${row.id}`,
      }).then((res) => {
        console.log(res);
        this.$notify({
          title: "删除成功",
          type: "success",
        });
        this.loading = false;
        window.location.reload();
      });
    },
    changeSale(item) {
      console.log(item);
      console.log("id:" + item.id + "  on_sale:" + item.onSale);
      let upInfo = {
        goodsId: item.id,
        onSale: item.onSale ? "1" : "0",
      };
      this.loading = true;
      axios({
        method: "post",
        url: "/goods/updateGoodsStatus",
        data: upInfo,
      }).then((res) => {
        if (res.status == 200) {
          setTimeout(() => {
            this.loading = false;
            Message({
              message: "修改成功",
              type: "success",
            });
          }, 200);
        } else {
          this.loading = false;
          Message({
            message: "服务器出错啦",
            type: "error",
          });
        }
      });
    },
    refresh() {
      this.initData()
      Message({
        message: "成功",
        type: "success",
      });
    },
  },
  computed: {
    pageTotal() {
      return this.tableData.length;
    },
    calcTableData() {
      return this.tableData.length > 0
    },
    isShow() {
      return this.$route.path === '/goodsShow'
    },
    isEmpty() {
      return this.tableData.length === 0;
    },
    adminRole() {
      if (JSON.parse(localStorage.getItem('adminInfo')).role === '2') {
        return true
      }
      return false
    }
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="scss" scoped></style>
