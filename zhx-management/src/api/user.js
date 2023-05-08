import * as api from '@/api/api'

import request from '@/utils/service'

export default {
  _allGoods() {
    return request({
      url: api.ALLGOODS,
    })
  },
  _getUsersInfo() {
    return request({
      url: api.GETUSERSINFO,
    })
  },
  // 改变用户状态
  _changeUserStatus(data) {
    return request({
      url: api.CHANGEUSERSTATUS,
      method: 'post',
      data,
    })
  },
  // 管理员登录
  _adminLogin(data) {
    return request({
      url: api.ADMINLOGIN,
      method: 'post',
      data,
    })
  },
  // 新增公告
  _addNotice(data) {
    return request({
      url: api.ADDNOTICE,
      method: 'post',
      data,
    })
  },
  // 获取所有公告
  _getAllNotice() {
    return request({
      url: api.GETALLNOTICE,
    })
  },
  _updateNotice(data) {
    return request({
      url: api.UPDATENOTICE,
      method: 'post',
      data,
    })
  },
  _deleteNotice(data) {
    return request({
      url: api.DELETENOTICE,
      method: 'post',
      data,
    })
  },
  // 删除类型
  _deleteCate(data) {
    return request({
      url: api.DELETECATE,
      method: 'post',
      data,
    })
  },
  // 获取所有订单
  _getAllOrders() {
    return request({
      url: api.GETALLORDERS,
    })
  },
  // 改变订单状态
  _changeOrderStatus(data) {
    return request({
      url: api.CHANGEORDERSTATUS,
      method: 'post',
      data,
    })
  },

  // 改变订单详细
  _changeOrderItem(data) {
    return request({
      url: api.CHANGEORDERITEM,
      method: 'post',
      data,
    })
  },
  // 获取所有退货商品
  _getAllReturnOrders() {
    return request({
      url: api.GETALLRETURNORDERS,
    })
  },
  // 同意退货
  _changeReturnOrder(data) {
    return request({
      url: api.ALLOWRETURNORDER,
      method: 'post',
      data,
    })
  },
  // 新增管理员
  _addAdmin(data) {
    return request({
      url: api.ADDADMIN,
      method: 'post',
      data,
    })
  },
  _getAllAdmin() {
    return request({
      url: api.GETALLADMINS,
    })
  },
  _changeAdminStatus(data) {
    return request({
      url: api.UPDATEADMINMANAGE,
      method: 'post',
      data,
    })
  },
  _deleteAdmin(data) {
    return request({
      url: api.DELETEADMIN,
      method: 'post',
      data,
    })
  },
  _getOrderDetailFromStatus(data) {
    return request({
      url: api.GETORDERDETAILFROMSTATUS,
      method: 'post',
      data,
    })
  },
  _getOrderdetailFromId(data) {
    return request({
      url: api.GETORDERDETAILFROMID,
      method: 'post',
      data,
    })
  },
}
