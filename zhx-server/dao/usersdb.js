const DBconn = require('./DBconn')
const mysql = require('./DBconn')
const goodsdb = require('./goodsdb')
const md5 = require('md5')
const jwt = require('jsonwebtoken')


module.exports = {
  // 注册
  addUser(userInfo, success, fail) {
    // console.log("111");
    let connection = mysql.getConn()

    let sql = `Select * from users where userphone = ${userInfo.userPhone}`

    connection.query(sql, (err, res) => {
      if (!err) {
        if (res.length > 0) {
          success({
            status: 201,
            msg: '该用户已被注册',
          })
        } else if (res.length == 0) {
          let insertSql = `insert into users(userphone,password,nickname,role,create_time) value('${userInfo.userPhone}','${md5(userInfo.password)}','${userInfo.nickname}','${userInfo.role}','${userInfo.createTime}')`
          connection.query(insertSql, (err, res) => {
            if (!err) {
              console.log(res)
              success({
                status: 200,
                msg: '注册成功',
              })
              DBconn.closeConn(connection)
            } else {
              console.log(err)
            }
          })
        }
        console.log(res.length)
      } else {
        console.log('err', err)
      }
    })
  },
  // 登录
  login(userInfo, success, fail) {
    let connection = mysql.getConn()

    let sql = `select * from users where userphone = '${userInfo.userPhone}' and password = '${md5(userInfo.password)}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        if (res.length > 0) {
          let token = jwt.sign(userInfo.userPhone, 'lck')
          success({
            status: 200,
            msg: '登录成功',
            data: {
              userId: res[0].user_id,
              nickname: res[0].nickname,
              role: res[0].role,
              email: res[0].email,
              token,
              banInfo: res[0].banInfo,
              headImg: res[0].headImg
            },
          })
          let sql1 = `UPDATE users SET last_login_time = '${userInfo.currentTime}' WHERE user_id = '${res[0].user_id}';`
          connection.query(sql1, (err, res) => {
            console.log('更新登录', res);
          })
        } else if (res.length == 0) {
          // console.log();
          fail({
            status: 201,
            msg: '用户名或密码错误',
          })
          console.log('查无此人')
        } else {
          fail({
            msg: '用户名或密码错误',
          })
        }
        // mysql.closeConn();
      } else {
        fail({
          status: 500,
          err
        })
        // mysql.closeConn();
      }
    })
  },

  // 增加地址
  addAddress(info, success, fail) {
    const connection = DBconn.getConn()
    const sql = `insert into address(user_id,receiver_name,receiver_phone,receiver_province,receiver_city,receiver_address,receiver_areaCode,create_time,update_time,isDefault) values('${info.userId}','${info.name}','${info.tel}','${info.province}','${info.city}','${info.addressDetail}','${info.areaCode}','${info.createTime}','${info.createTime}','${info.isDefault}')`
    console.log(sql);
    connection.query(sql, (err, res) => {
      console.log(err);
      if (!err) {
        success({
          status: 200,
          msg: '添加成功',
        })
      } else {
        fail({
          status: 500,
          msg: '添加失败',
        })
      }
    })
    DBconn.closeConn(connection)
  },

  getAddressFromId(userId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from address where user_id = '${userId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          data: res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
  // 根据地址ID查询地址
  getAddr(addrId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from address where address_id = '${addrId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          data: res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })

    DBconn.closeConn(connection)
  },
  // 重置用户默认收货地址
  resetDefaultAddress(userId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update address set isDefault='false' where user_id = '${userId}'`
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, res) => {
        console.log(err);
        if (!err) {
          resolve({
            status: 200,
            data: res,
          })
        } else {
          reject({
            status: 500,
            err,
          })
        }
      })
    })
  },
  // 根据地址ID更新地址
  updateAddress(info, success, fail) {
    const connection = DBconn.getConn()

    const sql = `update address set receiver_name='${info.name}',receiver_phone='${info.tel}',receiver_province='${info.province}',receiver_city = '${info.city}',receiver_address = '${info.addressDetail}',receiver_areaCode='${info.areaCode}',update_time='${info.updateTime}',isDefault='${info.isDefault}' where address_id = '${info.addrId}'`
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
    DBconn.closeConn(connection)
  },
  // 根据地址ID删除地址
  deleteAddr(addrId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `delete from address where address_id = ${addrId}`

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
    DBconn.closeConn(connection)
  },

  // 增加订单
  addOrder(orderInfo) {
    return new Promise((resolve, reject) => {
      const connection = DBconn.getConn()
      const sql = `insert into order_info(order_id,user_id,address_id,order_status,create_time,update_time,total_price) values('${orderInfo.orderId}','${orderInfo.userId}','${orderInfo.addrId}','${orderInfo.status}','${orderInfo.createTime}','${orderInfo.createTime}','${orderInfo.totalPrice}')`

      connection.query(sql, (err, res) => {
        if (!err) {
          resolve({
            msg: 'OK',
          })
        } else {
          reject({
            msg: err,
          })
        }
      })
      DBconn.closeConn(connection)
    })
  },

  // 增加订单明细
  addOrderDetail(orderInfo, goods) {
    console.log(orderInfo, goods)
    const connection = DBconn.getConn()
    const sql = `insert into order_item(boss_id,user_id,order_id,goods_id,goods_name,goods_image,quantity,total_price_item,create_time,update_time,order_status,send_type) values('${goods.userId}','${orderInfo.userId}','${orderInfo.orderId}','${goods.id}','${goods.title}','${goods.thumb}','${goods.num}','${goods.num * goods.price}','${orderInfo.currentTime}','${orderInfo.currentTime}','${orderInfo.status}','${goods.sendType}')`
    const sql2 = `delete from cart where cart_id = '${goods.cartId}'`
    connection.query(sql, (err, res) => {
      if (!err) {
        connection.query(sql2, (err, res) => {
          if (!err) {
            return true
          }
        })
      } else {
        DBconn.closeConn(connection)
        return false
      }
    })
  },

  // 根据订单ID查询订单
  getOrderFromId(orderId, success, fail) {
    const connection = DBconn.getConn()

    const sql = `select * from order_info i , order_item m where i.order_id = '${orderId}' and i.order_id  = m.order_id`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          data: res,
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
  // 根据订单ID查询订单详情
  getOrderdetailFromId(orderId, success, fail) {
    const connection = DBconn.getConn()

    const sql = `select * from order_item  where order_id = '${orderId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          data: res,
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
  // 更新订单状态
  changeOrderStatus(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    let sql = `update order_info set order_status = '${orderInfo.orderStatus}',update_time = '${orderInfo.currentTime}', where order_id = '${orderInfo.orderId}'`
    switch (orderInfo.orderStatus) {
      case '-2':  // 取消订单 （同意退货/关闭订单）

        break;
      case '-1':  // 退货   （申请退货）

        break;
      case '0':   // 待发货 （创建订单）

        break;
      case '1':   // 待收货 (发货操作)

        break;
      case '2':   // 已完成 （收货操作）

        break;
      default:
        break;
    }


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
  // 更新订单详情
  changeOrderItem(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    // 设置订单状态和最后更新时间
    let sql = `update order_item set order_status = '${orderInfo.orderStatus}',update_time = '${orderInfo.currentTime}' `
    let middleSql = ''
    let lastSql = ` where order_item_id = '${orderInfo.order_item_id}'`
    console.log(orderInfo.orderStatus);
    switch (orderInfo.orderStatus.toString()) {
      case '-2':  // 取消订单 （拒绝退货/关闭订单）

        // 如果是拒绝退货
        if (orderInfo.return_status === '1' && orderInfo.close_info) {
          // 填写订单关闭时间,修改退货处理状态,拒绝理由
          middleSql = `,close_time = '${orderInfo.currentTime}',return_status = 1,close_info = '${orderInfo.close_info}'`
        }

        // 如果是关闭订单
        else if (orderInfo.return_status !== '1' && orderInfo.close_info) {
          // 填写取消理由 与 订单关闭时间
          middleSql = `,close_time = '${orderInfo.currentTime}',close_info = '${orderInfo.close_info}'`
        }

        else {
          return fail({
            status: 500,
            err: '请补充必要理由'
          })
        }
        break;
      case '-1':  // 退货   （申请退货）
        if (orderInfo.return_info) {
          // 退货状态 1 ,退货原因
          middleSql = `,return_info = '${orderInfo.return_info}',return_status = 1`
        }
        else {
          return fail({
            status: 500,
            err: '没有订单状态参数'
          })

        }
        break;
      case '0':   // 待发货 （创建订单）
        return fail({
          status: 500,
          err: '不能修改为待发货状态!'
        })
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
        break;
      case '2':   // 已完成 （确认收货/同意退货/取消退货/订单评价）
        // 如果是同意退货
        if (orderInfo.return_status === '1' && orderInfo.return_info) {
          // 填写订单关闭时间,修改退货处理状态
          middleSql = `,close_time = '${orderInfo.currentTime}',return_status = 1`
        }

        // 如果是取消退货 这时候orderInfo.return_status === '1' 可能有评价,但return_info 为空
        else if (orderInfo.return_status === '1' && !orderInfo.return_info) {
          // 填写订单关闭时间,修改退货处理状态0,退货原因
          middleSql = `,close_time = '${orderInfo.currentTime}',return_status = 0,return_info= ''`
        }

        // 如果是确认收货,退货状态不为1,且没有评论
        else if (orderInfo.return_status !== '1' && !(orderInfo.boss_evaluation || orderInfo.user_evaluation)) {
          // 填写订单关闭时间
          middleSql = `,close_time = '${orderInfo.currentTime}'`
        }

        // 如果是评价(已收货/同意退货的商品可以进行评价)
        else if (orderInfo.boss_evaluation || orderInfo.user_evaluation || orderInfo.return_info) {
          // 填写订单关闭时间,评价信息
          middleSql = `,close_time = '${orderInfo.currentTime}'`
          if (orderInfo.boss_evaluation) {
            middleSql += `,boss_evaluation = '${orderInfo.boss_evaluation}'`
          }
          if (orderInfo.user_evaluation) {
            middleSql += `,user_evaluation = '${orderInfo.user_evaluation}'`
          }
        }
        else {
          return fail({
            status: 500,
            err: '没有订单状态参数'
          })
        }
        break;
      default:
        return fail({
          status: 500,
          err: '没有订单状态参数'
        })
        break;
    }
    sql = sql + middleSql + lastSql

    console.log(sql);

    // 如果是发货，要修改库存
    if (orderInfo.orderStatus == '1') {
      this.editGoodStock(orderInfo, success, fail, connection, sql, 'subtract')
    }
    // 如果是退货,也要修改库存
    else if (orderInfo.orderStatus == '2' && orderInfo.return_status === '1' && orderInfo.return_info) {
      this.editGoodStock(orderInfo, success, fail, connection, sql, 'add')
    }
    else {
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
    }


  },

  // 修改商品库存
  editGoodStock(orderInfo, success, fail, connection, sql, flag) {
    goodsdb.goodsFromId(orderInfo.goods_id, (res1 => {
      if (res1.status == 200) {
        let curStock = 0
        if (flag == 'add') {
          curStock = parseInt(res1.data.stock) + parseInt(orderInfo.quantity)
        } else {
          curStock = parseInt(res1.data.stock) - parseInt(orderInfo.quantity)
        }
        console.log('orderInfo.quantity', orderInfo.quantity);
        console.log('res1.data.stock', res1.data.stock);
        console.log('curStock', curStock);
        let goodsInfo = {
          goodsId: res1.data.goods_id,
          typeId: res1.data.cate_id,
          user_id: res1.data.user_id,
          name: res1.data.name,
          subtitle: res1.data.subtitle,
          mainImage: res1.data.main_image,
          detail: res1.data.detail,
          price: res1.data.price,
          stock: curStock,
          status: curStock <= 0 ? 0 : 1,
          updateTime: orderInfo.currentTime,
        }
        // 如果发货且没有库存
        if (flag == 'subtract' && curStock < 0) {
          fail({
            status: 500,
            err: '失败! 库存不足',
          })
        } else {
          // 修改商品信息
          goodsdb.editGoods(goodsInfo, (res2 => {
            if (res2.status == 200) {
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
            }
          }), (err => {
            fail(err)
          })
          )
        }
      }
    }), (err => {
      fail(err)
    })
    )
  },

  // 根据订单ID查找订单明细
  getOrderItem(orderId, conn) {
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



  // 根据订单状态查找订单
  getOrderFromStatus(orderInfo, success, fail) {
    const connection = DBconn.getConn()

    let isAllSQL = orderInfo.orderStatus == undefined ? '' : `i.order_status = '${orderInfo.orderStatus}' and`

    const sql = `select * from order_info i  where ${isAllSQL} i.user_id = '${orderInfo.userId}' ORDER BY create_time DESC`


    connection.query(sql, (err, res) => {
      if (!err) {
        this.getData(res, connection, success)
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 根据订单状态查找订单
  getOrderDetailFromStatus(orderInfo, success, fail) {
    const connection = DBconn.getConn()

    const o = `o.order_item_id,
    o.boss_id,
    o.user_id,
    o.order_id,
    o.goods_id,
    o.order_status,
    o.goods_name,
    o.goods_image,
    o.quantity,
    o.total_price_item,
    o.create_time,
    o.update_time,
    o.send_status,
    o.send_type,
    o.send_time,
    o.return_status,
    o.return_info,
    o.boss_evaluation,
    o.user_evaluation,
    o.close_info,
    o.close_time,
    o.waybill_code,
    o.current_unit_type,`

    const a = `a.address_id,
    a.user_id,
    a.receiver_name,
    a.receiver_phone,
    a.receiver_province,
    a.receiver_city,
    a.receiver_address,
    a.receiver_areaCode,
    a.create_time,
    a.update_time,
    a.isDefault,
    a.receiver_district,
    a.postCode`
    // const sql = `SELECT * FROM order_item WHERE order_status='${orderInfo.orderStatus}' ORDER BY update_time DESC`
    const sql = `SELECT ${o} + ${a}
    FROM order_info
    JOIN order_item o ON order_info.order_id = o.order_id
    JOIN address a ON order_info.address_id = a.address_id
    WHERE o.order_status = -1;`

    console.log(sql);
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '成功',
          data: res
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


  async getData(arr, conn, success) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].itemList = await this.getOrderItem(arr[i].order_id, conn)
    }
    success({
      status: 200,
      res: arr,
    })
  },

  // 根据用户ID、订单状态查找订单明细
  getOrderItemByUserId(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    // orderStatus为空或者undefined
    let isAllSQL = orderInfo.orderStatus == undefined ? '' : `AND order_status=${orderInfo.orderStatus}`

    let sql = ''
    // 如果没有userId字段，返回所有指定状态的订单
    if (!orderInfo.userId && orderInfo.orderStatus) {
      sql = `SELECT * FROM order_item WHERE order_status=${orderInfo.orderStatus} ORDER BY update_time DESC`
    }
    else if (orderInfo.onlyUser) {
      sql = `SELECT * FROM order_item WHERE user_id=${orderInfo.userId} ${isAllSQL} ORDER BY create_time DESC`
    }
    else {
      sql = `SELECT * FROM order_item WHERE (boss_id=${orderInfo.userId} OR user_id=${orderInfo.userId}) ${isAllSQL} ORDER BY create_time DESC`
    }
    console.log(Boolean(orderInfo.onlyUser));
    console.log(sql);
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '成功',
          data: res
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

  // 根据发布者ID、订单状态查找订单明细
  getOrderItemByBossId(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    let isAllSQL = orderInfo.orderStatus == undefined ? '' : `AND order_status=${orderInfo.orderStatus}`

    const sql = `SELECT * FROM order_item WHERE boss_id=${orderInfo.userId} ${isAllSQL} ORDER BY create_time DESC`
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '成功',
          data: res
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

  // 查找用户未处理订单
  getOrderNotDeel(userId, success, fail) {
    const connection = DBconn.getConn()
    // 卖方boss_id = userId
    // 交易中的数量:order_status === '-1' || order_status === '0'
    // 交易完成但未评价的数量:order_status === '2' && order.boss_evaluation
    const sql1 = `SELECT 
    COUNT(CASE WHEN order_status = '-1' OR order_status = '0' THEN 1 END) as bossTradingNum, 
    COUNT(CASE WHEN order_status = '2' AND (boss_evaluation IS NULL OR (LENGTH(trim(boss_evaluation))=0)) THEN 1 ELSE NULL END) as bossNotEvaluationNum
    FROM order_item 
    WHERE boss_id = ${userId}`

    // 买方:user_id = userId
    // 待收货(发货中):order_status === '1'
    // 退货(退货中): order_status === '-1'
    // 已收货(已完成但未评价的数量):order_status === '2' && user_evaluation
    const sql2 = `SELECT 
    COUNT(CASE WHEN order_status = '1' THEN 1 ELSE NULL END) AS userNotReceivingNum,
    COUNT(CASE WHEN order_status = '-1' THEN 1 ELSE NULL END) AS userReturningNum,
    COUNT(CASE WHEN order_status = '2' AND (user_evaluation IS NULL OR (LENGTH(trim(user_evaluation))=0))  THEN 1 ELSE NULL END) AS userNotEvaluationNum
    FROM order_item 
    WHERE user_id = ${userId}`

    let data = {}
    connection.query(sql1, (err, res) => {
      if (!err) {
        data = { ...res[0] }
        connection.query(sql2, (err1, res1) => {
          if (!err) {
            data = {
              ...data,
              ...res1[0]
            }
            console.log('num', data)
            success({
              status: 200,
              msg: '成功',
              data: data
            })
          }
          else {
            fail({
              status: 500,
              err1,
            })
          }
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
  // 支付订单
  payOrder(orderInfo, success, fail) {
    const connection = DBconn.getConn()

    const sql = `update order_info set order_status = '${orderInfo.orderStatus}',payment = '${orderInfo.totalPrice}', payment_type='${orderInfo.payType}',payment_time='${orderInfo.payTime}' where order_id = '${orderInfo.orderId}'`

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
  // 根据用户ID 查询收藏
  getUsersCollection(userId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select c.coll_id ,c.user_id,c.goods_id ,g.cate_id,g.name,g.main_image,g.detail,g.price,g.stock,g.on_sale  from user_collections c,goods g where c.user_id='${userId}' and c.goods_id = g.goods_id`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '查询成功',
          data: res,
        })
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 根据用户ID查询用户信息
  getUserInfo(userId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from users where user_id = '${userId}'`
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          data: res,
          msg: "查询成功"
        })
        DBconn.closeConn(connection)
      } else {
        fail({
          status: 500,
          err
        })
        DBconn.closeConn(connection)
      }
    })
  },

  // 根据用户ID更新用户信息
  updataUserInfo(userInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update users set nickname='${userInfo.nickName}',email='${userInfo.email}',headImg='${userInfo.headImg}',userDesc='${userInfo.userDesc}' where user_id='${userInfo.userId}'`
    console.log(sql);
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: "修改成功"
        })
      } else {
        console.log(err);
        fail({
          status: 500,
          err
        })
      }
    })
  },

  // 退货

  returnOrder(orderInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `update order_info set order_status='${orderInfo.orderStatus}',return_info='${orderInfo.message}' where order_id = '${orderInfo.orderId}'`
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: "修改成功"
        })
      } else {
        fail({
          status: 500,
          err
        })
      }
      DBconn.closeConn(connection)
    })
  }
}
