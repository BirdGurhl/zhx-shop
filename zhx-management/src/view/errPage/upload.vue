<template>
  <div>
    <el-upload action="api/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="uploadSuccess" :file-list="imgList">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.imgList = this.imgList.filter((item) => item.uid !== file.uid);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(res, file, fileList) {
      console.log(res);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "上传成功",
        });
        this.imgList.push(res.imgInfo);
      }
    },
  },
};
</script>

<style>
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  height: auto !important;
}
</style>
