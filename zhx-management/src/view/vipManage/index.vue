<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        </div>
      </el-col>
    </el-row>
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
            <el-table-column label="用户ID" prop="id" align="center"></el-table-column>
            <el-table-column label="头像" align="center">
              <template slot-scope="scope">
                <el-image style="width: 60px; height: 60px" :src="scope.row.img" :preview-src-list="[scope.row.img]">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column label="昵称" prop="nickName" align="center"> </el-table-column>

            <el-table-column label="手机号" prop="phone" align="center"> </el-table-column>
            <!-- <el-table-column label="邮箱" prop="email" align="center">
            </el-table-column> -->
            <el-table-column label="状态" prop="status" align="center"> </el-table-column>
            <el-table-column align="center" label="操作" v-if="adminRole">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status==='正常'" slot="reference" size="mini" type="danger" @click="toBan(scope.row)">封禁</el-button>
                <el-popconfirm title="确认解除封禁吗？" @confirm="relieve(scope.row)">
                  <el-button v-if="scope.row.status!=='正常'" slot="reference" size="mini" type="success">解除封禁</el-button>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 50, 100, 150]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </aside>
    <div>
      <el-dialog title="确认封禁此用户？" :visible.sync="dialogVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="封禁理由" prop="banInfo">
            <el-input v-model="ruleForm.banInfo"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import service from "@/api/user"
import mixin from "@/mixin/index"
export default {
  mixins:[mixin],
  data() {
    return {
      tableData: [],
      ruleForm: {
        banInfo: ''
      },
      rules: {
        banInfo: [
          { required: true, message: '请输入封禁理由', trigger: 'blur' }
        ],
      },
      search: '',
      banInfo: '',
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10
      },
      dialogVisible: false,
    }
  },
  computed: {
    pageTotal() {
      return this.tableData.length;
    },
  },
  methods: {
    handleSizeChange(val) {
      // 更改页面显示个数时触发此函数
      console.log(val);
      this.page.pageSize = val;
    },
    refresh(){
      this.getUserInfo()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let data = {
            userId: this.banInfo.id,
            userStatus: "-1",
            banInfo: this.ruleForm.banInfo
          }
          service._changeUserStatus(data).then(res => {
            if (res.data.status === 200) {
              this.$notify({
                title: '成功',
                message: '该用户账号已被封禁！',
                type: 'success'
              });
              this.dialogVisible = false
              this.getUserInfo()
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    toBan(info) {
      console.log(info);
      this.banInfo = info
      this.dialogVisible = true

    },
    relieve(info) {
      console.log(info);
      let data = {
        userId: info.id,
        userStatus: "0",
        banInfo: ''
      }

      service._changeUserStatus(data).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: '成功',
            message: '封禁已解除！',
            type: 'success'
          });
          this.getUserInfo()
        }
      })

    },
    getUserInfo() {
      service._getUsersInfo().then(res => {
        console.log(res);
        this.tableData = res.data.lst.map(item => {
          return {
            id: item.user_id,
            img: item.headImg,
            nickName: item.nickname,
            phone: item.userphone,
            email: item.email,
            status: item.role === '0' ? '正常' : '封禁中(' + item.banInfo + ')',

          }
        })
      })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style>
</style>