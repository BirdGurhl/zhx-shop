<template>
  <div class="container">
    <div v-if="isShow">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-refresh" @click="addAdmin">管理员录入</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
          </div>
        </el-col>
      </el-row>

      <!-- table -->
      <el-row>
        <el-col :span="24">
          <div class="showTable">
            <el-table v-loading="loading" element-loading-text="处理中..." empty-text="空空如也" border element-loading-background="rgba(255, 255, 255, 0.6)" :data="
              tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)
            " style="width: 100%">
              <el-table-column label="排序" prop="order_id" align="center">
                <template slot-scope="scope">
                  <span v-text="scope.$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column label="管理员ID" prop="id" align="center"></el-table-column>
              <el-table-column label="管理员名称" prop="name" align="center"> </el-table-column>
              <el-table-column label="管理员密码" prop="pass" align="center"> </el-table-column>
              <el-table-column label="管理员手机号" prop="phone" align="center"> </el-table-column>
              <el-table-column label="录入时间" prop="createTime" align="center">
              </el-table-column>
              <el-table-column label="是否启用" align="center">
                <template slot-scope="scoped">
                  <el-switch v-model="scoped.row.enable" active-color="#13ce66" inactive-color="#ff4949" @change="changeSale(scoped.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scoped">
                  <el-button size="mini" type="danger" @click="checkDeleteAdmin(scoped.row)">删除</el-button>
                </template>
              </el-table-column>
              <template slot="empty">
                <el-empty description="空空如也"></el-empty>
              </template>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
      <span>确认移除该管理员吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteAdmin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/api/user"
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 10
      },
      isShow: true,
      dialogVisible: false,
      adminId: "",
    }
  },
  methods: {
    refresh() {

    },
    addAdmin() {
      this.$router.push({ path: '/editManage', query: { opt: "add" } })
    },
    checkDeleteAdmin(row) {
      console.log(row);
      this.adminId = row.id
      this.dialogVisible = true
    },
    deleteAdmin() {
      if (this.adminId !== '') {
        service._deleteAdmin({ adminId: this.adminId }).then(res => {
          if (res.data.status === 200) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          this.dialogVisible = false

            this.getAllAdmins()

          }
        })
      }
    },
    changeSale(row) {
      let data = {
        adminId: row.id,
        adminStatus: row.enable.toString()
      }
      service._changeAdminStatus(data).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.getAllAdmins()
          
        }
      })
    },
    getAllAdmins() {
      service._getAllAdmin().then(res => {
        if (res.status === 200) {
          this.tableData = res.data.res.map(item => {
            return {
              id: item.admin_id,
              name: item.admin_name,
              pass: item.admin_pass,
              phone: item.phone,
              createTime: item.create_time,
              enable: item.admin_status === 'true' ? true : false
            }
          })
        }
      })
    }
  },
  computed: {
    pageTotal() {
      return this.tableData.length;
    },
  },
  created() {
    this.getAllAdmins()
  }
}
</script>

<style lang="scss" scoped>
</style>