import * as api from "@/api/api"

import request from "@/utils/request"

export default {
  // _getList() {
  //   return request({
  //     url: api.ALL,
  //   })
  // },
  // 注册接口
  _register(data) {
    return request({
      url: api.REGISTER,
      method: 'post',
      data,
    })
  },
  // 登录接口
  _login(data) {
    return request({
      url: api.LOGIN,
      method: 'post',
      data,
    })
  },
  // 增加收货地址
  _addAddress(data) {
    return request({
      url: api.ADDADDRESS,
      method: 'post',
      data,
    })
  },
  // 根据ID查询收货地址
  _getAddress(data) {
    return request({
      url: api.GETADDRESS,
      method: 'post',
      data,
    })
  },
  _getAddr(data) {
    return request({
      url: api.GETADDR,
      method: 'post',
      data,
    })
  },
  // 根据地址ID修改地址
  _updateAddr(data) {
    return request({
      url: api.UPDATEADDR,
      method: 'post',
      data,
    })
  },
  // 删除地址
  _deleteAddr(data) {
    return request({
      url: api.DELETEADDR,
      method: "post",
      data
    })
  },
  // 提交订单
  _subOrder(data) {
    return request({
      url: api.SUBORDER,
      method: "post",
      data
    })
  },
  _getOrderFromId(id) {
    return request({
      url: api.GETORDERFROMID + '?orderId=' + id,
    })
  },
  // 改变订单状态
  _changeOrderStatus(data) {
    return request({
      url: api.CHANGEORDERSTATUS,
      method: "post",
      data
    })
  },
  // 改变订单详情状态
  _changeOrderItem(data) {
    return request({
      url: api.CHANGEORDERITEM,
      method: "post",
      data
    })
  },
  _getOrderFromStatus(data) {
    return request({
      url: api.GETORDERFROMSTATUE,
      method: "post",
      data
    })
  },
  _getOrderNotDeel(data) {
    return request({
      url: api.GETORDERNOTDEEL,
      method: "post",
      data
    })
  },
  _payOrder(data) {
    return request({
      url: api.PAYORDER,
      method: "post",
      data
    })
  },
  // 根据用户ID查询收藏列表
  _getUsersCollection(data) {
    return request({
      url: api.GETUSERSCOLLECTION,
      method: "post",
      data
    })
  },
  // 上传文件
  _upload(data) {
    return request({
      url: api.UOLOAD,
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  // 根据用户ID查询用户信息
  _getUserInfo(data) {
    return request({
      url: api.GETUSERINFO,
      method: "post",
      data
    })
  },
  // 根据用户ＩＤ修改信息
  _updateUserInfo(data) {
    return request({
      url: api.UPDATEUSERINFO,
      method: "post",
      data
    })
  },
  // 退货
  _returnOrder(data) {
    return request({
      url: api.RETURNORDER,
      method: "post",
      data
    })
  },
  // 根据用户ID、订单状态查找订单明细
  _getOrderItemByUserId(data) {
    return request({
      url: api.GETORDERITEMBYUSERID,
      method: "post",
      data
    })
  },

  // 根据发布者ID、订单状态查找订单明细
  _getOrderItemByBossId(data) {
    return request({
      url: api.GETORDERITEMBYBOSSID,
      method: "post",
      data
    })
  },
}