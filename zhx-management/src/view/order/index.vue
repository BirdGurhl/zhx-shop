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
                  <el-tag v-if="scope.row.order_status === '-2' && scope.row.return_status !== '1'" type="info">已取消</el-tag>
                  <el-tag v-if="scope.row.order_status === '-2' && scope.row.return_status === '1'" type="info">拒绝退货</el-tag>
                  <el-tag v-if="scope.row.order_status === '-1'" type="danger">退货中</el-tag>
                  <el-tag v-if="scope.row.order_status === '0'" type="warning">待发货</el-tag>
                  <el-tag v-if="scope.row.order_status === '1'">待收货</el-tag>
                  <el-tag v-if="scope.row.order_status === '2' && scope.row.return_status !== '1' " type="success">已完成</el-tag>
                  <el-tag v-if="scope.row.order_status === '2' && scope.row.return_status === '1'" type="info">已退货</el-tag>
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
                <el-form-item :label="'退货理由(' + index + ')'" v-for="(order, index) in props.row.itemList" v-if="order.return_info">
                  <span>{{ order.return_info }}</span>
                </el-form-item>
              </div>
              <div v-if="props.row.itemList.some(item => item.return_status != '1' && item.order_status == '-2')">
                <el-form-item :label="'取消理由(' + index + ')'" v-for="(order, index) in props.row.itemList" v-if="order.close_info">
                  <span>{{ order.close_info }}</span>
                </el-form-item>
              </div>

            </el-form>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="order_id">
      </el-table-column>
      <el-table-column label="订单创建日期" prop="create_time" sortable>
      </el-table-column>
      <el-table-column label="收件人" prop="receiver_name" align="center">
      </el-table-column>
      <el-table-column label="收件号码" prop="receiver_phone" align="center">
      </el-table-column>
      <el-table-column label="商品数量" prop="itemList.length" align="center">
      </el-table-column>
      <!-- <el-table-column label="状态"
        :filters="[{ text: '已取消', value: '-2' }, { text: '退货中', value: '-1' }, { text: '待发货', value: '0' }, { text: '待收货', value: '1' }, { text: '已完成', value: '2' }]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_status === '-2'" type="info">已取消</el-tag>
          <el-tag v-if="scope.row.order_status === '-1'" type="danger">退货中</el-tag>
          <el-tag v-if="scope.row.order_status === '0'" type="warning">待发货</el-tag>
          <el-tag v-if="scope.row.order_status === '1'">待收货</el-tag>
          <el-tag v-if="scope.row.order_status === '2'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.order_status === '3'">等待收货</el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="支付类型" prop="payment_type">
        <template slot-scope="scope">
          <span v-if="scope.row.payment_type==='weixin'">微信</span>
          <span v-if="scope.row.payment_type==='zhifubao'">支付宝</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="总价格">
        <template slot-scope="scope">
          <span style="color:#ff5e00">{{ scope.row.total_price }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="支付价格">
        <template slot-scope="scope">
          <span style="color:#ff5e00">{{scope.row.payment===null?'':scope.row.payment}}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-role v-if="scope.row.order_status === '1' && scope.row.send_status !== '1'" size="mini"
            type="danger" @click="deliverCheck(scope.row)">发货
          </el-button>
          <el-tag v-if="scope.row.order_status === '2'" type="success">该订单已完成</el-tag>
          <el-tag v-if="scope.row.order_status === '0'" type="danger">等待用户支付</el-tag>
          <el-tag v-if="scope.row.order_status === '1' && scope.row.send_status === '1'">等待用户收货</el-tag>
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
      <span>确认发货？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delivr">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="closeDialogVisible" width="30%">
      <span>确认关闭订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeOrder">确 定</el-button>
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
      closeDialogVisible: false,
      orderId: '',
      order_item_id: '',
      checkOrder: {},
      page: {
        currentPage: 1,
        pageSize: 50
      }
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
    // 确认取消
    closeOrder() {
      let data = {
        ...this.checkOrder,
        goods_id: this.goods_id,
        order_item_id: this.order_item_id,
        order_status: "-2"
      }
      service._changeOrderItem(data).then(res => {
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
          this.closeDialogVisible = false
          this.getAllOrder()
        }
      })
    },
    // 点击取消
    closeOrderBtn(row) {
      this.orderId = row.order_id
      this.order_item_id = row.order_item_id
      this.goods_id = row.goods_id
      this.checkOrder = row
      this.closeDialogVisible = true
    },

    // 确认发货
    delivr() {
      let data = {
        ...this.checkOrder,
        goods_id: this.goods_id,
        order_item_id: this.order_item_id,
        order_status: "1"
      }
      service._changeOrderItem(data).then(res => {
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
          this.dialogVisible = false
          this.getAllOrder()
        }
      })
    },

    // 点击发货
    deliverCheck(row) {
      this.orderId = row.order_id
      this.order_item_id = row.order_item_id
      this.goods_id = row.goods_id
      this.checkOrder = row
      this.dialogVisible = true
    },

    // 点击刷新
    refresh() {
      this.getAllOrder()
    },

    // 获取订单列表
    getAllOrder() {
      this.tableLoading = true;
      service._getAllOrders().then(res => {
        console.log(res);
        this.tableData = res.data.res
        console.log(this.tableData);
        this.tableLoading = false
      })
    }
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
}
</style>