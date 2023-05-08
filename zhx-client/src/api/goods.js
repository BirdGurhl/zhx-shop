import * as api from '@/api/api'

import request from '@/utils/request'


export default {
  // 查看所有分类
  _allGroup() {
    return request({
      url: api.ALLGROUP,
    })
  },
  // 获取最新的前5项
  _getLastGoods() {
    return request({
      url: api.GETLASTGOODS,
    })
  },

  // 根据商品类型查找商品
  _getGoodsFromType(typeId, userId) {
    return request({
      url: api.GETGOODSFROMTYPE,
      params: {
        typeId,
        userId
      }
    })
  },
  // 根据商品ID查询单个商品
  _getGoodsFromId(id) {
    return request({
      url: api.GETGOODSFROMID + '?goodsId=' + id,
    })
  },
  // 根据用户ID查询用户商品
  _goodsFromUserId(id) {
    return request({
      url: api.GETGOODSFROMUSERID + '?userId=' + id,
    })
  },
  // 添加购物车
  _saveCart(data) {
    return request({
      url: api.SAVECART,
      method: "post",
      data
    })
  },
  // 根据用户ID查询购物车
  _getCartFromId(userId) {
    return request({
      url: api.GETCARTFROMID + '?userId=' + userId,
    })
  },
  _deleteCart(data) {
    return request({
      url: api.DELETECART,
      method: "post",
      data
    })
  },
  // 添加收藏
  _addCollection(data) {
    return request({
      url: api.ADDCOLLECTION,
      method: "post",
      data
    })
  },
  _isCollection(data) {
    return request({
      url: api.ISCOLLECTION,
      method: "post",
      data
    })
  },
  // 删除收藏
  _deleteCollection(data) {
    return request({
      url: api.DELETECONNECTION,
      method: "post",
      data
    })
  },
  // 模糊查询
  _findGoods(data) {
    return request({
      url: api.FINDGOODS,
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
  // 删除文件
  _deleteFile(data) {
    return request({
      url: api.DELETEFILE,
      method: 'post',
      data,
    })
  },
  _addgoods(data) {
    return request({
      url: api.ADDGOODS,
      method: 'post',
      data,
    })
  },
  _editgoods(data) {
    return request({
      url: api.EDITGOODS,
      method: 'post',
      data,
    })
  },
  _deleteGoods(goodId) {
    return request({
      url: api.DELETEGOODS + `?goodsId=${goodId}`,
    })
  },
  // 获取所有公告
  _getAllNotice() {
    return request({
      url: api.GETALLNOTICE,
    })
  },
}
