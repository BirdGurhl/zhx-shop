<template>
  <div class="container">
    <div class="addGoods">
      <el-row v-loading="loading">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark form-section">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="管理员账号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="管理员密码" prop="pass">
                <el-input v-model="ruleForm.pass"></el-input>
              </el-form-item>
              <el-form-item label="管理员电话" prop="phone">
                <el-input v-model.number="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="是否启用" prop="delivery">
                <el-switch v-model="ruleForm.enable"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button v-if="type === 'add'" type="primary" @click="submitForm('ruleForm')">
                  立即录入</el-button>
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
import service from "@/api/user"
export default {
  data() {
    return {
      id: "",
      ruleForm: {
        name: "",
        pass: "",
        phone: '',
        enable: false,
      },
      loading: false,
      typeList: [],
      rules: {
        name: [
          { required: true, message: "请输入管理员姓名", trigger: "blur" },
          { min: 3, message: "至少输入3个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入管理员手机号", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
        ],
      },
      opt: "",
    };
  },
  computed: {
    type() {
      return this.opt;
    },
  },
  methods: {
    // 添加商品
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit")
          let data = {
            name: this.ruleForm.name,
            pass: this.ruleForm.pass,
            phone: this.ruleForm.phone,
            adminStatus: this.ruleForm.enable
          }
          service._addAdmin(data).then(res => {
            if (res.data.status === 200) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
              this.cancel()
            }
          })

        }
      });
    },


    // 重置输入信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 从文件列表中删除



    cancel() {
      this.$router.push({ path: "/adminManage" });
    },


  },
  created() {
    // 获取当前页面的类型
    this.opt = this.$route.query.opt;
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
