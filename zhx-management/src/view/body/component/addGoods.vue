<template>
  <div class="addGoods">
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark form-section">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="region">
              <el-select v-model="ruleForm.type" placeholder="请选择分类">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否在售" prop="delivery">
              <el-switch v-model="ruleForm.onSale"></el-switch>
            </el-form-item>

            <div class="price-count">
              <el-form-item
                label="价格"
                prop="price"
                :rules="[
                  { required: true, message: '价格不能为空' },
                  { type: 'number', message: '价格必须为数字值' },
                ]"
              >
                <el-input
                  type="price"
                  v-model.number="ruleForm.price"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="数量"
                prop="count"
                :rules="[
                  { required: true, message: '数量不能为空' },
                  { type: 'number', message: '数量必须为数字值' },
                ]"
              >
                <el-input
                  type="count"
                  v-model.number="ruleForm.count"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>

            <!-- 上传图片 -->
            <section class="img-form">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :on-exceed="lim"
                :file-list="imgObj.imgArr"
                :on-progress="uploadProgress"
                :on-error="upError"
                :on-success="upSuccess"
                :on-change="upLoadImg"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!imgObj.disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!imgObj.disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="imgObj.dialogVisible">
                <img width="100%" :src="imgObj.dialogImageUrl" alt="" />
              </el-dialog>
            </section>

            <el-form-item label="商品信息" prop="detail">
              <el-input type="textarea" v-model="ruleForm.detail"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        type: "",
        onSale: false,
        price: "",
        count: "",
        detail: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, message: "至少输入3个字符", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" },
        ],
        detail: [
          { required: true, message: "请输入商品信息描述", trigger: "blur" },
          { min: 10, message: "至少输入10个字符", trigger: "blur" },
        ],
      },

      imgObj: {
        imgArr: [],
        dialogImageUrl: "",
        dialogVisible: false,
        disabled: false,
      },
    };
  },

  methods: {
    // 添加商品
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置输入信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handlePictureCardPreview(file) {
      this.imgObj.dialogImageUrl = file.url;
      this.imgObj.dialogVisible = true;
      console.log(111);
    },
    // 上传文件数量限制
    lim(files, fileList) {
      Message({
        message: "超出最大上传限制",
        type: "warning",
      });
    },
    // 上传过程（后续使用axios请求后可删）
    uploadProgress(event, file, fileList) {
      nProgress.start();
    },
    // 上传失败
    upError(err, file, fileList) {
      nProgress.done();
      Message({
        message: "上传失败",
        type: "error",
      });
    },
    // 上传成功
    upSuccess(response, file, fileList) {
      nProgress.done();
      Message({
        message: "success",
        type: "success",
      });
    },
    // 上传图片
    upLoadImg(file, fileList) {
      console.log(file);
    },
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
  padding-left: 100px;
}
</style>
