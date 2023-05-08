<template>
  <div class="container">
    <!-- 按钮部分 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button v-role type="primary" icon="el-icon-circle-plus-outline" @click="addNotice">新增公告</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
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
            <el-table-column label="公告ID" prop="noticeId" align="center"></el-table-column>
            <el-table-column label="公告内容" prop="content" align="center"> </el-table-column>
            <el-table-column label="创建人" prop="createUser" align="center"> </el-table-column>
            <el-table-column label="创建时间" prop="createTime" align="center">
            </el-table-column>
            <el-table-column label="修改时间" prop="updateTime" align="center"> </el-table-column>
            <el-table-column align="center" label="操作" v-if="adminRole">
              <template slot-scope="scope">
                <el-button slot="reference" size="mini" type="danger" @click="toEdit(scope.row)">编辑</el-button>
                <el-popconfirm title="确认删除吗？" @confirm="deleteNotice(scope.row)">
                  <el-button slot="reference" size="mini" type="error">删除</el-button>
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
    <!-- 弹出框 -->
    <el-dialog :title="type" :visible.sync="dialogFormVisible">
      <el-form :model="noticeForm" :rules="rules" ref="noticeForm">
        <el-form-item label="公告内容" prop="detail">
          <el-input v-model="noticeForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm('noticeForm')">确 定</el-button>
      </div>
    </el-dialog>
    <aside>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 50, 100, 150]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </aside>
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
      search: "",
      dialogFormVisible: false,
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10
      },
      noticeForm: {
        detail: ""
      },
      rules: {
        detail: [{ required: true, message: "公告内容不允许为空！", trigger: "blur" }],
      },
      opt: '',
      noticeId: ''
    }
  },
  methods: {
    refresh(){
      this.getNotice()
    },
    deleteNotice(row) {
      console.log(111);
      service._deleteNotice({ noticeId: row.noticeId }).then(res => {
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '公告删除成功！',
            type: 'success'
          });
          this.getNotice()
        }
      })
    },
    handleSizeChange(val) {
      // 更改页面显示个数时触发此函数
      console.log(val);
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;

    },
    toEdit(detail) {
      this.opt = 'edit'
      this.noticeId = detail.noticeId
      this.noticeForm.detail = detail.content
      this.dialogFormVisible = true
    },
    addNotice() {
      this.opt = 'add'
      this.noticeForm.detail = ''
      this.dialogFormVisible = true
    },
    addForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.opt === 'add') {
            let data = {
              detail: this.noticeForm.detail,
              adminId: this.$store.state.adminInfo.adminId
            }
            service._addNotice(data).then(res => {
              if (res.data.status === 200) {
                this.$notify({
                  title: '成功',
                  message: '公告添加成功！',
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getNotice()
              }
            })
          }
          if (this.opt === 'edit') {
            console.log("edit");
            let data = {
              noticeId: this.noticeId,
              detail: this.noticeForm.detail
            }
            service._updateNotice(data).then(res => {
              if (res.data.status === 200) {
                this.$notify({
                  title: '成功',
                  message: '公告修改成功！',
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getNotice()
              }
            })
          }
        } else {
          return false;
        }
      });


    },
    getNotice() {
      service._getAllNotice().then(res => {
        console.log(res);
        this.tableData = res.data.res.map(item => {
          return {
            noticeId: item.notice_id,
            content: item.notice_detail,
            createUser: item.admin_name,
            createTime: item.create_time,
            updateTime: item.update_time === null ? '' : item.update_time
          }
        })
      })
    }
  },
  computed: {
    pageTotal() {
      return this.tableData.length;
    },
    type() {
      if (this.opt === 'add') {
        return "新增公告"
      } else if (this.opt === 'edit') {
        return "编辑公告"
      }
    }
  },
  created() {
    this.getNotice()
  }
}
</script>

<style lang="scss" scoped>
</style>