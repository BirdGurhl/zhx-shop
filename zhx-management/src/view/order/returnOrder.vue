<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table v-loading="tableLoading"
      :data="tableData.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="slot-table">
            <!-- 订单商品 -->
            <el-table :data="props.row.itemList" :border="false" style="width: 100%">
              <el-table-column prop="boss_id" label="发布者ID"></el-table-column>
              <el-table-column prop="goods_id" label="商品ID">
              </el-table-column>
              <el-table-column prop="goods_name" label="商品名称" width="180">
              </el-table-column>
              <el-table-column label="商品图片">
                <template slot-scope="scope">
                  <el-image style="width: 60px; height: 60px" :src="scope.row.goods_image"
                    :preview-src-list="[scope.row.goods_image]">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="quantity" label="数量">x{{ scope.row.quantity }}</el-table-column> -->
              <el-table-column label="数量" align="center">
                <template slot-scope="scope">
                  x{{ scope.row.quantity }}
                </template>
              </el-table-column>
              <el-table-column prop="send_type" label="快递方式" align="center"></el-table-column>
              <el-table-column label="状态" align="center"
                :filters="[{ text: '已取消', value: '-2' }, { text: '退货中', value: '-1' }, { text: '待发货', value: '0' }, { text: '待收货', value: '1' }, { text: '已完成', value: '2' }]"
                :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.order_status === '-2' && scope.row.return_status !== '1'"
                    type="info">已取消</el-tag>
                  <el-tag v-if="scope.row.order_status === '-2' && scope.row.return_status === '1'"
                    type="info">拒绝退货</el-tag>
                  <el-tag v-if="scope.row.order_status === '-1'" type="danger">退货中</el-tag>
                  <el-tag v-if="scope.row.order_status === '0'" type="warning">待发货</el-tag>
                  <el-tag v-if="scope.row.order_status === '1'">待收货</el-tag>
                  <el-tag v-if="scope.row.order_status === '2' && scope.row.return_status !== '1'"
                    type="success">已完成</el-tag>
                  <el-tag v-if="scope.row.order_status === '2' && scope.row.return_status === '1'"
                    type="info">已退货</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button v-role v-if="scope.row.order_status === '0' && scope.row.send_status !== '1'" size="mini"
                    type="warning" @click="deliverCheck(scope.row)">发货
                  </el-button>
                  <el-button v-role v-if="scope.row.order_status != '-2' && scope.row.order_status != '2'" size="mini"
                    type="danger" @click="closeOrderBtn(scope.row)">关闭
                  </el-button>
                  <span v-else>/</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 订单信息 -->
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="下单用户ID">
                <span>{{ props.row.user_id }}</span>
              </el-form-item>
              <el-form-item label="收件电话">
                <span>{{ props.row.receiver_phone }}</span>
              </el-form-item>
              <el-form-item label="收件人">
                <span>{{ props.row.receiver_name }}</span>
              </el-form-item>
              <el-form-item label="校区">
                <span>{{ props.row.receiver_province }}</span>
              </el-form-item>
              <el-form-item label="楼栋">
                <span>{{ props.row.receiver_city }}</span>
              </el-form-item>
              <!-- <el-form-item label="县区">
                <span>{{ props.row.receiver_district }}</span>
              </el-form-item> -->
              <!-- <el-form-item label="地区代码">
                <span>{{ props.row.receiver_areaCode }}</span>
              </el-form-item> -->
              <el-form-item label="楼层/宿舍号">
                <span>{{ props.row.receiver_address }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="最后更新">
                <span>{{ props.row.update_time }}</span>
              </el-form-item>
              <div v-if="props.row.itemList.some(item => item.return_status == '1')">
                <el-form-item :label="'退货理由(' + index + ')'" v-for="(order, index) in props.row.itemList"
                  v-if="order.return_info">
                  <span>{{ order.return_info }}</span>
                </el-form-item>
              </div>
              <div v-if="props.row.itemList.some(item => item.return_status != '1' && item.order_status == '-2')">
                <el-form-item :label="'取消理由(' + index + ')'" v-for="(order, index) in props.row.itemList"
                  v-if="order.close_info">
                  <span>{{ order.close_info }}</span>
                </el-form-item>
              </div>

            </el-form>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <div class="slot-table">
            <el-table :data="props.row.itemList" :border="false" style="width: 100%">
              <el-table-column prop="goods_id" label="商品ID" width="180">
              </el-table-column>
              <el-table-column prop="goods_name" label="商品名称" width="180">
              </el-table-column>
              <el-table-column label="商品图片" width="180">
                <template slot-scope="scope">
                  <el-image style="width: 60px; height: 60px" :src="scope.row.goods_image"
                    :preview-src-list="[scope.row.goods_image]">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量"></el-table-column>
            </el-table>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户ID">
                <span>{{ props.row.user_id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.receiver_phone }}</span>
              </el-form-item>
              <el-form-item label="联系名称">
                <span>{{ props.row.receiver_name }}</span>
              </el-form-item>
              <el-form-item label="省市">
                <span>{{ props.row.receiver_province }}</span>
              </el-form-item>
              <el-form-item label="城市">
                <span>{{ props.row.receiver_city }}</span>
              </el-form-item>
              <el-form-item label="县区">
                <span>{{ props.row.receiver_district }}</span>
              </el-form-item>
              <el-form-item label="地区代码">
                <span>{{ props.row.receiver_areaCode }}</span>
              </el-form-item>
              <el-form-item label="详细住址">
                <span>{{ props.row.receiver_address }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="最后更新">
                <span>{{ props.row.update_time }}</span>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="订单ID" prop="order_id">
      </el-table-column>
      <el-table-column label="订单创建日期" prop="create_time" sortable>
      </el-table-column>
      <!-- 全部退货/部分退货 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.returnNum < scope.row.totalNum" type="warning">部分退货</el-tag>
          <el-tag v-else type="danger">全部退货</el-tag>
        </template>
      </el-table-column>
      <!-- 商品数量 -->
      <el-table-column align="center" label="商品数量" prop="totalNum">
      </el-table-column>
      <!-- 退货数量 -->
      <el-table-column align="center" label="退货数量" prop="returnNum">
      </el-table-column>
      <el-table-column align="center" label="总价格">
        <template slot-scope="scope">
          <span style="color:#ff5e00">{{ scope.row.totalPrice }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="支付价格">
        <template slot-scope="scope">
          <span style="color:#ff5e00">{{scope.row.payment===null?'':scope.row.payment}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="退货理由">
        <template slot-scope="scope">
          <span >{{scope.row.payment===null?'':scope.row.return_info}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-role v-if="scope.row.order_status==='-1' && scope.row.return_status!=='1'" size="mini" type="danger" @click="allowRetrun(scope.row)">通过申请
          </el-button>
          <el-tag v-if="scope.row.order_status==='-1' && scope.row.return_status==='1'" type="success">该订单已退货</el-tag>
        </template>
      </el-table-column> -->
      <template slot="empty">
        <el-empty description="空空如也"></el-empty>
      </template>
    </el-table>

    <aside>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page.currentPage" :page-sizes="[10, 50, 100, 150]" :page-size="50"
        layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
      </el-pagination>
    </aside>

    <!-- 提示框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认同意该用户的退货申请：</span>
      <p style="line-height:30px">退货理由：<span style="color:red">{{ returnInfo }}</span></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/api/user"
export default {
  data() {
    return {
      tableData: [],
      tableLoading: false,
      loading: false,
      dialogVisible: false,
      orderId: '',
      page: {
        currentPage: 1,
        pageSize: 50
      },
      returnInfo: ''
    }
  },
  computed: {
    pageTotal() {
      return this.tableData.length;
    },
  },
  methods: {
    filterTag(value, row) {
      return value == row.order_status
    },
    handleSizeChange(val) {
      // 更改页面显示个数时触发此函数
      console.log(val);
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;

    },
    allowRetrun(row) {
      this.orderId = row.order_id
      this.returnInfo = row.return_info
      this.dialogVisible = true
    },
    refresh() {
      this.getAllOrder()
    },
    allow() {
      let data = {
        orderId: this.orderId,
        returnStatus: "1"
      }
      console.log(data);
      service._changeReturnOrder(data).then(res => {
        if (res.data.status === 200) {
          this.$notify({
            title: '成功',
            message: '商品退货成功',
            type: 'success'
          });
          this.dialogVisible = false
          this.getAllOrder()
        }
      })
    },
    // getAllOrder() {
    //   this.tableLoading = true;
    //   service._getAllReturnOrders().then(res => {
    //     this.tableData = res.data.res
    //     console.log(this.tableData);
    //     this.tableLoading = false
    //   })
    // },
    getAllOrder() {
      this.tableLoading = true;
      service._getOrderDetailFromStatus({ orderStatus: -1 }).then(res => {
        let arr = this.getOrderId(res.data.data)
        for (let index = 0; index < arr.length; index++) {
          service._getOrderdetailFromId({ orderId: arr[index].order_id }).then(result => {
            arr[index].totalNum = result.data.data.length
            arr[index].totalPrice = result.data.data.reduce((totalPrice, curResult) => { return totalPrice + curResult.total_price_item ? parseInt(curResult.total_price_item) : 0 }, 0)
          })
        }
        this.tableData = arr
        this.tableLoading = false
      })
    },
    // 根据orderID给订单详情分类
    getOrderId(originalArray) {
      const newArray = originalArray.reduce((acc, cur) => {
        // 在累加器中查找是否已有当前orderID的数据
        const existingData = acc.find((data) => data.order_id === cur.order_id)
        const currentIndex = acc.findIndex((data) => data.order_id === cur.order_id)

        if (existingData) {
          // 如果已有数据，将当前数据加入到对应的itemList数组中
          acc[currentIndex].totalNum = acc[currentIndex].totalNum + 1
          acc[currentIndex].returnNum = acc[currentIndex].returnNum + 1
          acc[currentIndex].totalPrice = acc[currentIndex].totalPrice + cur.total_price_item
          existingData.itemList.push(cur);
        } else {
          // 如果没有数据，创建新的数据项并加入到累加器中
          acc.push({
            ...cur,
            order_id: cur.order_id,
            create_time: cur.create_time,
            totalNum: 1,
            returnNum: 1,
            totalPrice: cur.total_price_item,
            itemList: [cur]
          });
        }
        return acc

      }, [])
      console.log(newArray);
      return newArray
    },
  },
  created() {
    this.getAllOrder()
  }
}
</script>

<style lang="scss" scoped>
.slot-table {
  box-sizing: border-box;
  padding-left: 50px;
}

aside {
  margin-top: 10px;
}</style>