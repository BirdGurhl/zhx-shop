<template>
  <div class="container">
    <div class="addGoods">
      <el-row v-loading="loading">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark form-section">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择分类">
                  <el-option v-for="item in typeList" :key="item.typeId" :label="item.typeName"
                    :value="item.typeId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否在售" prop="delivery">
                <el-switch v-model="ruleForm.onSale"></el-switch>
              </el-form-item>
              <div class="price-count">
                <el-form-item label="价格" prop="price">
                  <el-input type="price" v-model.number="ruleForm.price" autocomplete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="数量" prop="count">
                  <el-input type="count" v-model.number="ruleForm.count" autocomplete="off">
                  </el-input>
                </el-form-item>
              </div>

              <!-- 上传图片 -->
              <el-form-item label="商品图片">
                <section class="img-form">
                  <el-upload action="api/upload" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-success="uploadSuccess" :file-list="imgInfo.imgList">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="imgInfo.dialogVisible">
                    <img width="100%" :src="imgInfo.dialogImageUrl" alt="" />
                  </el-dialog>
                </section>
              </el-form-item>
              <!-- <el-form-item label="商品简述" prop="detail">
                <el-input type="textarea" v-model="ruleForm.subtitle"></el-input>
              </el-form-item> -->
              <el-form-item label="发布者">
                <el-autocomplete class="inline-input" v-model="UserInfo.nickname" value-key="nickname"
                  :fetch-suggestions="querySearch" placeholder="请输入内容" @select="selectUser"
                   :disabled="Boolean(id)">
                  <!-- <el-button slot="append" icon="el-icon-search" @click="selectUser"></el-button> -->
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="商品信息" prop="detail">
                <el-input type="textarea" v-model="ruleForm.detail"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="type === 'add'" type="primary" @click="submitForm('ruleForm')">
                  立即创建</el-button>
                <el-button v-else-if="type === 'edit'" @click="submitForm('ruleForm')" type="primary">
                  修改</el-button>
                <el-button @click="cancel">取消</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import "nprogress/nprogress.css";
import axios from "axios";
import service from "@/api/user"
export default {
  data() {
    return {
      id: "",
      ruleForm: {
        name: "",
        category: "",
        onSale: false,
        price: "",
        count: "",
        subtitle: "",
        detail: "",
        imgList: "",
        user_id: ""
      },
      UserInfo: {},
      UserInfoList: [],
      loading: false,
      typeList: [],
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, message: "至少输入3个字符", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
        ],
        count: [
          { required: true, message: "数量不能为空" },
          { type: "number", message: "数量必须为数字值" },
        ],
        detail: [
          { required: true, message: "请输入商品信息描述", trigger: "blur" },

        ],
      },
      opt: "",
      imgInfo: {
        dialogImageUrl: "",
        dialogVisible: false,
        imgList: [],
      },
    };
  },
  computed: {
    type() {
      return this.opt;
    },
  },
  methods: {
    // 选中发布者
    selectUser(user) {
      this.UserInfo = user
      this.ruleForm.user_id = this.UserInfo.user_id
    },
    // 发布者输入建议
    querySearch(queryString, cb) {
      let results = []
      if (queryString) {
        results = this.UserInfoList.filter(user => {
          return (user.nickname.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        })
      } else {
        results = this.UserInfoList
      }
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 添加商品
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.imgInfo.imgList.length > 0) {
            //  将图片列表转换为JSON字符串
            this.ruleForm.imgList = JSON.stringify(this.imgInfo.imgList);
            console.log(this.ruleForm);
            if (this.opt === 'add') {
              this.loading = true;
              this.addGoods().then(res => {
                this.$message({
                  type: "success",
                  message: "添加成功"
                })
                this.loading = false;
                this.$router.push({ path: "/goodsShow" })
              });
            } else if (this.opt === "edit") {
              this.loading = true;
              this.editGoods().then(res => {
                this.loading = false;
                this.$parent.initData();
                this.$notify({
                  title: 'success',
                  message: '修改成功',
                  type: 'success'
                });
                this.$router.push({ path: "/goodsShow" })

              })
            }

          } else {
            this.$notify.error({
              title: "error",
              message: "请至少选择一张图片",
            });
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加商品接口
    addGoods() {
      return new Promise((resolve, reject) => {
        axios({
          url: "/goods/addGoods",
          method: "post",
          data: this.ruleForm
        }).then(res => {
          resolve(res);
        })
      })
    },
    // 修改商品接口
    editGoods() {
      return new Promise((resolve, reject) => {
        let data = {
          ...this.ruleForm,
          goodsId: this.id
        }
        axios({
          url: "/goods/editGoods",
          method: "post",
          data
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 重置输入信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 从文件列表中删除
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.imgInfo.imgList = this.imgInfo.imgList.filter(
        (item) => item.uid !== file.uid
      );

      new Promise((resolve, reject) => {
        axios({
          url: "/upload/delete",
          method: 'post',
          data: { filename: file.name }
        })
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
            resolve(res);
          })
          .catch((err) => {
            this.$message({
              type: "success",
              message: "删除失败",
            });
            reject(err);
          });
      });
    },
    handlePictureCardPreview(file) {
      this.imgInfo.dialogImageUrl = file.url;
      this.imgInfo.dialogVisible = true;
    },
    uploadSuccess(res, file, fileList) {
      console.log(res);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "上传成功",
        });
        this.imgInfo.imgList.push(res.imgInfo);
        console.log(this.imgInfo.imgList);
      }
    },
    cancel() {
      this.$router.push({ path: "/goodsShow" });
    },
    // 获取类型
    getGroupAll() {
      return new Promise((resolve, reject) => {
        axios({
          url: "/goods/groupAll",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取商品信息
    getGoodsInfo() {
      return new Promise((resolve, reject) => {
        axios({
          url: `/goods/goodsFromId?goodsId=${this.id}`
        }).then(res => {
          resolve(res);
        })
      })
    },
    // 处理商品信息
    dealWithGoodsInfo(data) {
      this.ruleForm =
      {
        name: data.name,
        category: data.cate_id,
        onSale: data.on_sale === '1' ? true : false,
        price: parseFloat(data.price),
        count: parseFloat(data.stock),
        subtitle: data.subtitle,
        detail: data.detail,
        imgList: data.main_image,
        user_id: data.user_id
      }
      if (data.main_image) {
        this.imgInfo.imgList = JSON.parse(data.main_image)
      }

    },
    // 获取用户列表
    getUserInfo() {
      service._getUsersInfo().then(res => {
        // this.UserInfoList = res.data.lst.map(item => {
        //   return {
        //     id: item.user_id,
        //     img: item.headImg,
        //     nickName: item.nickname,
        //     phone: item.userphone,
        //     email: item.email,
        //     status: item.role === '0' ? '正常' : '封禁中(' + item.banInfo + ')',
        //   }
        // })
        this.UserInfoList = res.data.lst.filter(item => {
          return item.role === '0'
        })
        if (this.id) {
          let result = res.data.lst.filter(item => {
            return item.user_id == this.ruleForm.user_id
          })
          this.UserInfo = result[0]
        }
      })
    }
  },
  created() {
    // 获取当前页面的类型
    this.opt = this.$route.query.opt;
    // 获取id如果没有则认为是添加页面
    this.id = this.$route.query.id
    // 发送获取类型的请求
    this.getGroupAll().then((res) => {
      // 将获取到的数据处理并赋给typeList
      this.typeList = res.data.list.map((item) => {
        return {
          typeId: item.cate_id,
          typeName: item.type_name,
        };
      });
      // 如果id存在则查询
      if (this.id) {
        console.log("不为空");
        this.loading = true;
        this.getGoodsInfo().then(res => {
          if (res.data.status === 200) {
            this.dealWithGoodsInfo(res.data.data);
            this.loading = false;
            this.getUserInfo()
          }
        })
      } else {
        this.getUserInfo()
      }
    })
  },
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
  background: #fff;
}

.bg-purple {
  background: #d3dce6;
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
  background-color: #f9fafc;
}

.form-section {
  padding: 20px 10px;
}

.price-count {
  display: flex;
}

.img-form {
  margin: 20px 0;
  box-sizing: border-box;
}
</style>
