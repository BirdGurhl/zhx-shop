const DBconn = require('./DBconn')

module.exports = {
  adminLogin(adminInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from admin where admin_name = '${adminInfo.userPhone}' and admin_pass = '${adminInfo.password}'`
    connection.query(sql, (err, res) => {
      if (!err) {
        if (res.length > 0) {
          console.log(res);
          if (res[0].admin_status == 'false') {
            fail({
              status: 201,
              msg: '该账号还未启用',
            })
          } else {
            success({
              status: 200,
              msg: '登录成功',
              data: {
                adminId: res[0].admin_id,
                adminName: res[0].admin_name,
                role: res[0].admin_role,
              },
            })
          }

        } else if (res.length == 0) {
          // console.log();
          fail({
            status: 201,
            msg: '用户名或密码错误',
          })
        }
        // mysql.closeConn();
      } else {
        fail({
          status: 500,
          err,
        })
        // mysql.closeConn();
      }
    })
  },
  getUsersInfo(success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from users`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '查询成功',
          lst: res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
      DBconn.closeConn(connection)
    })
  },

  // 改变用户账号状态
  changeUsersStatus(userInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update users set role = '${userInfo.userStatus}',banInfo='${userInfo.banInfo}' where user_id='${userInfo.userId}'`
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '成功',
        })
      } else {
        fail({
          status: 500,
          msg: err,
        })
      }
      DBconn.closeConn(connection)
    })
  },

  // 新增公告
  addNotice(noticeInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `insert into notice_sys(notice_detail,admin_id,create_time,update_time) values('${noticeInfo.detail}','${noticeInfo.adminId}','${noticeInfo.createTime}','${noticeInfo.createTime}')`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '新增成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
      DBconn.closeConn(connection)
    })
  },
  // 查看所有公告
  getAllNotice(success, fail) {
    const connection = DBconn.getConn()
    const sql = `select n.notice_id, n.notice_detail,n.admin_id,a.admin_name,a.admin_role,n.create_time,n.update_time from notice_sys n , admin a where n.admin_id = a.admin_id`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: 'OK',
          res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
  // 修改公告
  updateNotice(noticeInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update notice_sys set notice_detail='${noticeInfo.detail}',update_time='${noticeInfo.updateTime}' where notice_id = '${noticeInfo.noticeId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '修改成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
      DBconn.closeConn(connection)
    })
  },

  // 删除公告
  deleteNotice(noticeId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `delete from notice_sys where notice_id = '${noticeId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '删除成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 查询所有订单
  getAllOrder(success, fail) {
    const connection = DBconn.getConn()
    const sql = `select o.order_id, o.user_id,o.address_id,o.payment,o.payment_type,o.order_status,o.payment_time,o.send_time,o.create_time,o.update_time,o.total_price,o.send_status,a.receiver_name,a.receiver_phone,a.receiver_province,a.receiver_city,a.receiver_district,a.receiver_address,a.receiver_areaCode,a.postCode from order_info o,address a where o.address_id = a.address_id order by o.create_time desc`
    connection.query(sql, (err, res) => {
      if (!err) {
        this.getAllOrders(res, connection, success)
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
  async getAllOrders(arr, conn, success) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].itemList = await this.getOrdersItem(arr[i].order_id, conn)
    }
    success({
      status: 200,
      res: arr,
    })
  },

  getOrdersItem(orderId, conn) {
    return new Promise((resolve, reject) => {
      const sql = `select * from order_item where order_id = '${orderId}'`
      conn.query(sql, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },

  // 查看所有退货订单
  getAllReturnOrder(success, fail) {
    const connection = DBconn.getConn()
    const sql = `select o.order_id, o.user_id,o.address_id,o.payment,o.payment_type,o.order_status,o.payment_time,o.send_time,o.create_time,o.update_time,o.total_price,o.send_status,a.receiver_name,a.receiver_phone,a.receiver_province,a.receiver_city,a.receiver_district,a.receiver_address,a.receiver_areaCode,a.postCode,o.return_info,o.return_status from order_info o,address a where o.address_id = a.address_id and o.order_status='-1' order by o.create_time desc`
    connection.query(sql, (err, res) => {
      if (!err) {
        this.getAllOrders(res, connection, success)
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 改变发货状态
  changeOrderDeliverStatus(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    // 设置订单状态和最后更新时间
    let sql = `update order_item set order_status = '${orderInfo.orderStatus}',update_time = '${orderInfo.currentTime}' `
    let middleSql = ''
    let lastSql = ` where order_item_id = '${orderInfo.order_item_id}'`
    console.log(orderInfo.orderStatus);
    switch (orderInfo.orderStatus) {
      case '-2':  // 取消订单 （同意退货/关闭订单）

        break;
      case '-1':  // 退货   （申请退货）

        break;
      case '0':   // 待发货 （创建订单）

        break;
      case '1':   // 待收货 (发货操作)
        // 更改发货状态send_status：1已发货，！=1 未发货
        // 发货时间send_time
        // 发货方式send_type：'自提'，'快递'
        // 如果是快递，填写运单号waybill_code：
        middleSql = `,send_status = 1,send_time = '${orderInfo.currentTime}',send_type = '${orderInfo.send_type}'`
        if (orderInfo.send_type == '快递') {
          middleSql += `,waybill_code = '${orderInfo.waybill_code}'`
        }
        // 最后修改库存
        break;
      case '2':   // 已完成 （收货操作）

        break;
      default:
        break;
    }
    sql = sql + middleSql + lastSql

    console.log(sql);
    connection.query(sql, (err, res) => {
      if (!err) {
        // 如果是发货，要修改库存
        if (orderInfo.orderStatus == '1') {

        }
        success({
          status: 200,
          msg: '成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
      DBconn.closeConn(connection)
    })
  },

  changeOrderReturnStatus(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update order_info set return_status = '${orderInfo.returnStatus}' where order_id = '${orderInfo.orderId}'`

    connection.query(sql, (err, res) => {
      if (!err) {

        success({
          status: 200,
          msg: '成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
      DBconn.closeConn(connection)
    })
  },

  addAdmin(adminInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `insert into admin(admin_name,admin_pass,admin_role,admin_status,create_time,phone) values('${adminInfo.name}','${adminInfo.pass}','${adminInfo.role}','${adminInfo.adminStatus}','${adminInfo.createTime}','${adminInfo.phone}')`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '添加成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 查看所有管理员
  getAllAdmin(success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from admin where admin_role='2'`
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '查询成功',
          res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
  changeAdminStatus(adminInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update admin set admin_status = '${adminInfo.adminStatus}' where admin_id = '${adminInfo.adminId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '修改成功',
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 删除管理员
  deleteAdmin(adminId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `delete from admin where admin_id = '${adminId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '删除成功',
          res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
}
