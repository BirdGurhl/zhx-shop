<template>
  <div class='contrainer'>
    <van-form @submit="onSubmit" validate-first @failed="onFailed">
      <!-- 商品名称 -->
      <van-field v-model="ruleForm.name" name="name" label="商品名称" placeholder="商品名称"
        :rules="[{ required: true, message: '请填写商品名称' }]" />
      <!-- 商品类型 -->
      <van-field readonly clickable name="picker" :value="ruleForm.categoryName" label="类型" placeholder="点击选择商品类型"
        @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="typeNameList" value-key="label" @confirm="onConfirm"
          @cancel="showPicker = false" />
      </van-popup>
      <!-- 价格、数量 -->
      <div class="price-count">
        <van-field v-model="ruleForm.price" name="price" type="number" placeholder="价格"
          :rules="[{ required: true, message: '请填写商品价格' }]" />
        <van-field v-model="ruleForm.count" name="count" type="number" placeholder="数量"
          :rules="[{ required: true, message: '请填写商品数量' }]" />
      </div>
      <!-- 商品图片 -->
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="uploadFilesData" :before-read="beforeRead" :max-count="5" />
        </template>
      </van-field>
      <!-- 商品简述 -->
      <!-- <van-field v-model="ruleForm.subtitle" name="subtitle" label="简述" placeholder="请输入商品简述"
        :rules="[{ required: true, message: '商品简述' }]" /> -->
      <!-- 商品信息 -->
      <van-field v-model="ruleForm.detail" name="detail" rows="2" autosize label="商品信息" type="textarea"
        placeholder="请输入商品信息" :rules="[{ required: true, message: '商品简述' }]" />
      <!-- 提交 -->
      <div class="submit" style="margin: 0.15rem;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import service from '@/api/goods.js'
export default {
  name: 'goodFrom',
  data() {
    return {
      ruleForm: {
        goodsId: "",
        name: "",
        category: "",
        categoryName: "",
        onSale: false,
        price: "",
        count: "",
        subtitle: "",
        detail: "",
        imgList: [],
      },
      showPicker: false,
      typeList: [],
      typeNameList: [],
      uploadFilesData: [],  // 上传组件中的数据
      uploadFilesRes: [],   // 图片传回的数据
      // previewOptions: {     // 预览列表
      //   images: [],
      //   closeable: true,
      // }
    }
  },
  // props:[title],
  computed: {},
  components: {},
  created() {
    // 获取所有分类
    this.getAllGroup().then(res => {
      if (this.$route.query.goodId) {
        this.ruleForm.goodsId = this.$route.query.goodId
        // 获取商品信息 
        this.getGoodsFromId()
      }
    })

  },
  mounted() {
  },
  methods: {
    // 提交表单
    async onSubmit(values) {
      if (this.uploadFilesData.length > 0) {
        // 上传图片
        let UploadFlag = await Promise.all(
          this.uploadFilesData.map(async element => {
            // 如果是编辑商品页面,且这张图片有name属性，说明是之前回传保存的，服务器上已经存在
            if (this.$route.query.goodId && element.name) {
              // return new Promise.resolve(true)
              return true
            }
            // return new Promise.resolve(await this.uploadFile(element)) 
            let flag = await this.uploadFile(element)
            return flag
          })
        ).then(flagPromiseArr => {  // 所有图片上传完成之后
          // 判断是否都上传成功
          const allDataValid = flagPromiseArr.every((valid) => valid)
          // 因为外面被await包裹，这里需要返回值需要封装为一个promise，否则外层将是同步方法，不会阻塞后面代码执行
          return Promise.resolve(allDataValid);
        })
        console.log('UploadFlag', UploadFlag)
        // 如果上传失败,取消提交表单
        if (!UploadFlag) return

        // 如果是编辑页面，还要判断是否删除图片
        let originImgNum = this.uploadFilesData.filter(item => item.hasOwnProperty('name')).length
        if (this.$route.query.goodId && originImgNum !== this.uploadFilesRes.length) {
          // 遍历初始的图片回传数据
          let deleteFlag = await Promise.all(
            this.uploadFilesRes.map(async (item, index) => {
              // 在组件上传图片列表中寻找是否有该图片，没有则删除
              let flag = this.uploadFilesData.findIndex(element => {
                return element.name && element.name === item.name
              })
              // 如果没找到，说明被删除了，执行删除
              if (flag === -1) {
                console.log('执行删除');
                let temp = await this.deleteFile(index)
                console.log(temp);
                return temp
              } else {
                return true
              }
            })
          ).then(flagPromiseArr => {
            console.log('flagPromiseArr', flagPromiseArr);
            const allDataValid = flagPromiseArr.every((valid) => valid)
            // 因为外面被await包裹，这里需要返回值需要封装为一个promise，否则外层将是同步方法，不会阻塞后面代码执行
            console.log('allDataValid', allDataValid);
            return Promise.resolve(allDataValid);
          })
          // 如果删除失败,取消提交表单
          if (!deleteFlag) {
            this.$toast('修改失败')
            console.log('deleteFlag', deleteFlag);
            return
          }
        }
        // 如果是编辑商品页面，提交修改商品表信息
        if (this.$route.query.goodId) {
          return this.editGood()
        } else {
          // 如果是添加商品页面，添加商品
          console.log('如果是添加商品页面，添加商品');
          return this.addGood()
        }

      } else {
        this.$toast('请至少选择一张图片')
      }
    },

    // 表单验证失败
    onFailed() {
      this.$toast('请完善表单信息！')
    },

    // 类型选择提交
    onConfirm(value) {
      this.ruleForm.categoryName = value.label;
      this.ruleForm.category = value.value;
      this.showPicker = false;
    },

    // 上传图片前
    beforeRead(file) {
      console.log(file);
      const isJPG = file.type.indexOf('image') != -1;
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$toast('上传头像图片只能是 JPG 格式!');
        return false;
      }

      if (!isLt4M) {
        this.$toast('上传头像图片大小不能超过 4MB!');
        return false;
      }
      return true;
    },


    // 上传图片请求
    uploadFile(element) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("fileType", 'IMAGE');
        formData.append('file', element.file);
        service._upload(formData).then((res) => {
          if (res.status !== 200) {
            throw new Error('res.status !== 200')
          }
          // 上传成功后的处理
          console.log(res);
          // this.previewOptions.images.push(res.imgInfo.url)  // 预览图片列表url
          this.ruleForm.imgList.push(res.imgInfo)
          console.log(this.ruleForm.imgList)
          resolve(true)
        }).catch((error) => {
          // 上传失败后的处理
          console.log(error);
          this.$toast('提交失败，图片上传失败')
          reject(false)
        });
      })
    },

    // 删除图片请求
    deleteFile(index) {
      return new Promise((resolve, reject) => {

        let filename = this.uploadFilesRes[index].name
        service._deleteFile({ filename }).then(res => {
          if (res.status !== 200) {
            throw new Error('res.status !== 200')
          }
          console.log(res);
          this.ruleForm.imgList.splice(index, 1)
          console.log(this.ruleForm.imgList);
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },

    // 修改商品信息请求
    editGood() {
      let goodId = this.$route.query.goodId
      console.log(this.ruleForm);
      return service._editgoods({
        ...this.ruleForm,
        imgList: JSON.stringify(this.ruleForm.imgList),
        user_id: this.$store.state.userInfo.userId,
        onSale: 1,
        goodsId: goodId
      }).then(res => {
        if (res.status !== 200) {
          throw new Error('res.status !== 200')
        }
        this.$toast('修改成功,2s后跳转至商品页')
        setTimeout(() => {
          this.$router.replace({ path: '/detail', query: { id: goodId } })
        }, 2000);
        return true
      }).catch(err => {
        console.log(err)
        this.$toast('修改失败')
        return false
      })
    },

    // 添加商品信息请求
    addGood() {
      console.log(this.ruleForm.imgList);
      // 创建商品
      return service._addgoods({
        ...this.ruleForm,
        imgList: JSON.stringify(this.ruleForm.imgList),
        user_id: this.$store.state.userInfo.userId,
        onSale: 1,
      }).then(res => {
        if (res.status == 200) {
          this.$toast('发布成功,2s后跳转至商品页')
          let goodId = res.data.goodId
          setTimeout(() => {
            this.$router.replace({ path: '/detail', query: { id: goodId } })
          }, 2000);
          return true
        } else {
          throw new Error('res.status !== 200')
        }
      }).catch(err => {
        console.log(err)
        this.$toast('添加商品失败')
        return false
      })
    },

    // 获取所有分类
    getAllGroup() {
      return new Promise((resolve, reject) => {
        service._allGroup()
          .then((res) => {
            if (res.status === 200) {
              this.typeList = res.list
              this.typeNameList = res.list.map((item, index) => {
                return {
                  value: item.cate_id,
                  label: item.type_name,
                  // defaultIndex: index
                }
              })
              resolve({ status: "OK" })
            }
          })
          .catch((e) => {
            reject(e)
          })
      })
    },

    // 获取商品信息
    getGoodsFromId() {
      return new Promise((resolve, reject) => {
        service._getGoodsFromId(this.ruleForm.goodsId).then(res => {
          if (res.status === 200) {
            // this.goodsInfo = res.data
            // // 处理换行符
            // this.goodsInfo.detail = this.goodsInfo.detail.replace(/\n/g, '<br>')
            // this.imgList = JSON.parse(res.data.main_image)
            let typeIndex = this.typeNameList.findIndex(item => item.value === res.data.cate_id)
            this.ruleForm = {
              goodsId: res.data.goods_id,
              name: res.data.name,
              category: res.data.cate_id,
              categoryName: this.typeNameList[typeIndex].label,
              onSale: Boolean(res.data.on_sal),
              price: res.data.price,
              count: res.data.stock,
              subtitle: res.data.subtitle,
              detail: res.data.detail,
              imgList: JSON.parse(res.data.main_image),
            }
            let obj = JSON.parse(res.data.main_image)
            this.uploadFilesRes = [...obj]
            this.uploadFilesData = obj.map(imgInfo => {
              // this.previewOptions.images.push(imgInfo.url)  // 预览图片列表url
              return {
                ...imgInfo,
                closeable: true,
              }
            })
            console.log(this.uploadFilesData);
            resolve({ status: "OK" })
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
  }
}
</script>
<style lang='scss' scoped>
.contrainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.van-form {
  margin-top: 0.15rem;
  background-color: #fff;

  .price-count {
    display: flex;
  }

  .van-field {
    // margin-bottom: 0.05rem;
    border-bottom: 0.01rem solid #ffb6ce;
  }
}
</style>
