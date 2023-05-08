<template>
  <div class="container">
    <div class="type-section">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAddCate">添加分类</el-button>
            <el-button type="primary" icon="el-icon-refresh-right" @click="refresh">刷新</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-table v-loading="loading" :data="tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
              <el-table-column prop="index" label="序号" width="250" align="center">
                <template slot-scope="scope">
                  <span v-text="scope.$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="类型编号" width="250" align="center">
              </el-table-column>
              <el-table-column prop="title" label="类型名称" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center" v-if="adminRole">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete( scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 50, 100, 150]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :title="type" :visible.sync="dialogFormVisible">
      <el-form :model="cateForm" :rules="rules" ref="cateForm">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="cateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm('cateForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import axios from 'axios';
import service from "@/api/user"
import minix from "@/mixin/index"
export default {
  mixins:[minix],
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      loading: false,
      opt: "",
      cateForm: {
        id: "",
        name: ""
      },
      rules: {
        name: [{ required: true, message: "类型名称不允许为空", trigger: "blur" }]
      },
      page: {
        currentPage: 1,
        pageSize: 10,
      }
    };
  },
  computed: {
    type() {
      if (this.opt === 'add') {
        return '添加分类'
      } else {
        return '编辑分类'
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
    },
    handleEdit(index, item) {
      console.log(index, item);
      this.opt = "edit"
      this.dialogFormVisible = true;
      this.cateForm.name = item.title
      this.cateForm.id = item.id

    },
    handleDelete(item) {
      console.log(item);
      service._deleteCate({ cateId: item.id }).then(res => {
        if (res.data.status === 202) {
           this.$notify({
          title: '警告',
          message: '该类型下存在商品，不允许删除！',
          type: 'warning'
        });
        } else if (res.data.status === 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
          this.initData().then(response => {
            this.dealWithCategory(response.data.list)

          });
        }
      })
    },
    openAddCate() {
      this.opt = "add"
      this.dialogFormVisible = true;
      this.cateForm.name = ''

    },

    // 初始化类型数据
    initData() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        axios({
          url: "/goods/groupAll"
        }).then(res => {
          this.loading = false;
          resolve(res)
        })
      })
    },
    // 处理类型数据
    dealWithCategory(cate) {
      console.log(cate);
      this.tableData = cate.map(item => {
        return {
          id: item.cate_id,
          title: item.type_name
        }
      })
    },

    // 添加分类
    addCate() {
      return new Promise((resolve, reject) => {
        let data = {
          cateName: this.cateForm.name
        }
        this.addLoading = true
        axios({
          url: "/goods/addGoodsCategory",
          method: "post",
          data
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 编辑分类
    updateCate() {
      return new Promise((resolve, reject) => {
        let data = {
          cateId: this.cateForm.id,
          cateName: this.cateForm.name
        }
        axios({
          url: "/goods/updateCate",
          method: "post",
          data
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addForm(cateForm) {
      this.$refs[cateForm].validate((valid) => {
        if (valid) {
          if (this.opt === 'add') {
            this.addCate().then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                })
                this.dialogFormVisible = false;
                this.initData().then(response => {
                  this.dealWithCategory(response.data.list)
                });
              } else if (res.status === 202) {
                this.$notify({
                  title: 'warning',
                  message: '该类型已存在',
                  type: 'warning'
                });
              }
            })
          } else if (this.opt === 'edit') {
            this.updateCate().then(res => {
              this.$message({
                type: "success",
                message: "修改成功"
              })
              this.dialogFormVisible = false;
              this.initData().then(response => {
                this.dealWithCategory(response.data.list)
              });
            })
          }


        } else {
          return false;
        }
      });
    },
    refresh(){
      this.initData().then(response => {
      this.dealWithCategory(response.data.list)
    });
    }
  },
  created() {
    this.refresh()
  }


};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
}
.bg-purple {
  background: #f1f4f6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}

.el-button--primary {
  background-color: #fff;
  border-color: #409eff;
  color: #409eff;
  transition: all 0.3s;
}
.el-button--primary:focus {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover {
  background: #409eff !important;
  border-color: #409eff !important;
  color: #fff;
}
</style>
