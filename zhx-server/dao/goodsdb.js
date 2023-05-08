const DBconn = require('./DBconn')

module.exports = {
  // 判断类型是否重复
  checkType(typeInfo, connection) {
    //   返回promise对象
    return new Promise((resolve, reject) => {
      //判断类型重复的sql语句
      const sql = `select name from category where name = '${typeInfo.name}'`
      // 查询
      connection.query(sql, (err, res) => {
        if (!err) {
          if (res.length > 0) {
            resolve({
              status: 1,
              msg: '已有此类型',
            })
          } else {
            resolve({
              status: 0,
              msg: '可以添加',
            })
          }
        } else {
          console.log(err)
          reject({
            status: 500,
            msg: '服务器出错了',
          })
        }
      })
    })
  },
  // 添加商品类型
  addGoodsType(typeInfo, success, fail) {
    let connection = DBconn.getConn()
    const sql = `insert into category(parent_id,name,status,type_create_time) values('${typeInfo.parentId}','${typeInfo.name}','${typeInfo.status}','${typeInfo.createTime}')`

    this.checkType(typeInfo, connection)
      .then((data) => {
        if (data.status === 1) {
          fail({
            status: 1,
            msg: data.msg,
          })
          DBconn.closeConn(connection)
        } else if (data.status === 0) {
          connection.query(sql, (err, res) => {
            if (!err) {
              console.log(res)
              success({
                status: 200,
                msg: '添加成功',
              })
              DBconn.closeConn(connection)
            } else {
              fail({
                status: 500,
                msg: '服务器出错了',
              })
              DBconn.closeConn(connection)
            }
          })
        }
      })
      .catch((res) => {
        console.log(res)
        fail(res)
      })
  },

  //   判断是否有此类型

  checkTypeExis(goodsInfo, connection) {
    return new Promise((resolve, reject) => {
      let sql = `select cate_id from category where cate_id = '${goodsInfo.typeId}'`

      connection.query(sql, (err, res) => {
        if (!err) {
          console.log(res)
          if (res.length > 0) {
            resolve({
              status: 0,
              msg: '存在该类型',
            })
          } else {
            reject({
              status: 1,
              msg: '不存在此类型',
            })
          }
        } else {
          reject({
            status: 500,
            msg: '服务器出错啦',
          })
        }
      })
    })
  },

  // 添加商品
  addGoods(goodsInfo, success, fail) {
    console.log(goodsInfo)

    const connection = DBconn.getConn()

    this.checkTypeExis(goodsInfo, connection)
      .then((res) => {
        console.log(res)
        if (res.status === 0) {
          console.log('可以添加')
          const sql = `insert into goods(cate_id,user_id,name,subtitle,main_image,detail,price,stock,on_sale,create_time,update_time) values('${goodsInfo.typeId}','${goodsInfo.user_id}','${goodsInfo.name}','${goodsInfo.subtitle}','${goodsInfo.mainImage}','${goodsInfo.detail}','${goodsInfo.price}','${goodsInfo.stock}','${goodsInfo.status}','${goodsInfo.createTime}','${goodsInfo.update_time}')`

          connection.query(sql, (err, res) => {
            if (!err) {
              success({
                status: 200,
                msg: '添加成功',
                data:{
                  goodId:res.insertId
                }
              })
              DBconn.closeConn(connection)
            } else {
              console.log(err)
              fail({
                status: 500,
                msg: '服务器出错啦',
              })
              DBconn.closeConn(connection)
            }
          })
        } else if (res.status === 1) {
          fail({
            status: 201,
            msg: '抱歉，没有此该类型',
          })
          DBconn.closeConn(connection)
        }
      })
      .catch((res) => {
        fail(res)
      })
  },
  // 修改商品
  editGoods(goodsInfo, success, fail) {
    const connection = DBconn.getConn()
    console.log(goodsInfo);
    const sql = `update goods set cate_id = '${goodsInfo.typeId}', user_id = '${goodsInfo.user_id}',subtitle = '${goodsInfo.subtitle}',name = '${goodsInfo.name}', main_image = '${goodsInfo.mainImage}',
    detail = '${goodsInfo.detail}', price = '${goodsInfo.price}',stock='${goodsInfo.stock}',on_sale = '${goodsInfo.status}' , update_time = '${goodsInfo.updateTime}'
    where goods_id = '${goodsInfo.goodsId}'`

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
  // 查询所有商品
  allGoods(success, fail) {
    const connection = DBconn.getConn()
    const sql = 'select * from goods g,category c where g.cate_id = c.cate_id ORDER BY update_time DESC'
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '查询成功',
          res,
        })
        DBconn.closeConn(connection)
      } else {
        fail({
          status: 500,
          msg: '查询失败',
          err,
        })
      }
    })
  },
  // 修改商品状态
  updateOnSale(upInfo, success, fail) {
    const connection = DBconn.getConn()
    console.log(upInfo)
    const sql = `update goods set on_sale='${upInfo.onSale}' where goods_id='${upInfo.goodsId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '修改成功',
        })
        DBconn.closeConn(connection)
      } else {
        console.log(err)
        fail({
          status: 500,
          msg: '修改失败',
        })
      }
    })
  },

  // 删除商品
  deleteGoods(goodsId, success, fail) {
    const connection = DBconn.getConn()

    const sql = `delete from goods where goods_id ='${goodsId}'`
    console.log(sql);
    connection.query(sql, (err, res) => {
      if (!err) {
        console.log(res);
        success({
          status: 200,
          msg: '删除成功',
        })
        DBconn.closeConn(connection)
      } else {
        fail({
          status: 500,
          msg: '服务器错误',
          err,
        })
        DBconn.closeConn(connection)
      }
    })
  },
  // 查看所有分类
  groupAll(success, fail) {
    const connection = DBconn.getConn()

    const sql = `select * from category ORDER BY type_create_time ASC`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '查询成功',
          list: res,
        })
        DBconn.closeConn(connection)
      } else {
        fail({
          status: 500,
          err,
        })
        DBconn.closeConn(connection)
      }
    })
  },

  // 根据Id查找单个商品的信息

  goodsFromId(id, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from goods where goods_id = ${id} `

    connection.query(sql, (err, res) => {
      if (!err) {
        if (res.length > 0) {
          success({
            status: 200,
            msg: '查询成功',
            data: res[0],
          })
        } else {
          fail({
            status: 201,
            msg: '该商品不存在',
            data: res[0],
          })
        }
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
  // 根据用户Id查找用户商品的信息

  goodsFromUserId(id, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from goods where user_id = ${id} ORDER BY update_time DESC`
    console.log(sql);
    connection.query(sql, (err, res) => {
      if (!err) {
        if (res.length > 0) {
          success({
            status: 200,
            msg: '查询成功',
            data: res,
          })
        } else {
          fail({
            status: 201,
            msg: '该商品不存在',
            data: res,
          })
        }
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },

  // 判断类型是否存在
  checkCate(info, connection) {
    return new Promise((resolve, reject) => {
      const sql = `select * from category where type_name = '${info.cateName}'`
      connection.query(sql, (err, res) => {
        if (!err) {
          if (res.length > 0) {
            resolve({
              Code: 1,
              msg: '该类型已存在',
            })
          } else if (res.length === 0) {
            resolve({
              Code: 0,
              msg: '可以添加',
            })
          }
        } else {
          reject(err)
        }
      })
    })
  },

  // 添加商品类型
  addGoodsCate(info, success, fail) {
    const connection = DBconn.getConn()

    this.checkCate(info, connection).then((res) => {
      if (res.Code === 0) {
        const sql = `insert into category(type_name,type_create_time) values('${info.cateName}','${info.createTime}')`

        connection.query(sql, (err, res) => {
          if (!err) {
            success({
              status: 200,
              msg: '添加成功',
            })
          } else {
            fail({
              status: 500,
              msg: '添加失败',
              err,
            })
          }

          DBconn.closeConn(connection)
        })
      } else if (res.Code === 1) {
        fail({
          status: 202,
          msg: '该类型已存在',
        })
      }
    })
  },

  // 修改类型名称
  updateCate(info, success, fail) {
    const connection = DBconn.getConn()

    const sql = `update category set type_name = '${info.cateName}' where cate_id = '${info.cateId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '修改成功',
        })
      } else {
        fail({
          status: 500,
          msg: '修改失败',
          err,
        })
      }
    })
  },

  // 根据类型Id查找商品
  getGoodsFromType(data, success, fail) {
    const connection = DBconn.getConn()
    
    // const sql = `select * from goods where cate_id = ${data.cateId} and user_id `
    let sql = `SELECT * FROM goods WHERE cate_id = ${data.cateId} AND on_sale = 1`
    if (data.userId) {
      sql = sql +` AND (user_id IS NULL OR user_id <> ${data.userId})`
    }
    sql = sql + ` ORDER BY update_time DESC`
    console.log(sql);
    connection.query(sql, (err, res) => {
      
      if (!err) {
        console.log(res);
        success({
          status: 200,
          msg: '查询成功',
          data: res,
        })
        DBconn.closeConn(connection)
      } else {
        fail({
          status: 500,
          msg: '出现意外的错误',
          data: err,
        })
      }
    })
  },

  // 获取最新的前5项在售
  getLastGoods(success, fail) {
    const connection = DBconn.getConn()

    const sql = `SELECT * FROM goods
    WHERE on_sale = 1
    ORDER BY STR_TO_DATE(update_time, '%Y-%m-%d %H:%i:%s') DESC
    LIMIT 5;`

    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '查询成功',
          list: res,
        })
        DBconn.closeConn(connection)
      } else {
        fail({
          status: 500,
          err,
        })
        DBconn.closeConn(connection)
      }
    })
  },

  // 查询购物车中是否已存在此商品
  checkSameFromCart(conn, cartInfo) {
    return new Promise((resolve, reject) => {
      const sql = `select * from cart where user_id = '${cartInfo.userId}' and goods_id = '${cartInfo.goodsId}'`
      conn.query(sql, (err, res) => {
        if (!err) {
          if (res.length > 0) {
            resolve({
              isSame: 1,
              msg: '该购物车已存在',
            })
          } else {
            resolve({
              isSame: 0,
              msg: '不存在，可以添加',
            })
          }
        } else {
          reject({
            err,
          })
        }
      })
    })
  },

  // 将商品添加至购物车

  saveCart(cartInfo, success, fail) {
    const connection = DBconn.getConn()

    this.checkSameFromCart(connection, cartInfo)
      .then((res) => {
        if (res.isSame === 0) {
          const sql = `insert into cart(user_id,goods_id,create_time) values('${cartInfo.userId}','${cartInfo.goodsId}','${cartInfo.createTime}')`
          connection.query(sql, (err, res) => {
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
        } else if (res.isSame === 1) {
          success({
            status: 201,
            msg: '该商品已存在',
          })
        }
        DBconn.closeConn(connection)
      })
      .catch((e) => {
        fail({ e })
        DBconn.closeConn(connection)
      })
  },

  // 获取购物车列表
  getCartFromId(userId, success, fail) {
    const connection = DBconn.getConn()

    const sql = `select * from cart,goods where cart.user_id='${userId}' and cart.goods_id = goods.goods_id `
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          res,
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

  // 删除购物车

  deleteCart(cartId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `delete from cart where cart_id = '${cartId}'`
    connection.query(sql, (err, res) => {
      if (!err) {
        success({
          status: 200,
          msg: '删除成功',
        })
      } else {
        fail({
          status: 500,
          msg: '删除失败',
        })
      }
    })
  },

  // 添加收藏
  addCollection(goodsInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `insert into user_collections(user_id,goods_id,create_time) values('${goodsInfo.userId}','${goodsInfo.goodsId}','${goodsInfo.createTime}')`

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
  // 查询商品是否被收藏
  isCollection(goodsInfo, success, fail) {
    const connection = DBconn.getConn()
    const sql = `select * from user_collections where user_id = '${goodsInfo.userId}' and goods_id = '${goodsInfo.goodsId}'`

    connection.query(sql, (err, res) => {
      if (!err) {
        if (res.length > 0) {
          success({
            status: 200,
            isCode: 1,
            data: res,
            msg: '该商品已被收藏',
          })
        } else if (res.length === 0) {
          success({
            status: 200,
            isCode: 0,
            msg: '该商品未被收藏',
          })
        }
      } else {
        fail({
          status: 500,
          err,
        })
      }
    })
  },
  // 删除收藏
  deleteCollection(collId, success, fail) {
    const connection = DBconn.getConn()
    const sql = `delete from user_collections where coll_id = '${collId}'`

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
  //  模糊查询商品
  findGoods(goodsName, success, fail) {
    const connection = DBconn.getConn()
    const sql = `SELECT g.*
    FROM goods g
    LEFT JOIN users u ON g.user_id = u.user_id
    WHERE g.name LIKE '%${goodsName}%' OR u.nickname LIKE '%${goodsName}%'`

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
      DBconn.closeConn(connection)
    })
  },
    // 查看所有公告
  getAllNotice(success, fail) {
    const connection = DBconn.getConn()
    const sql = `select n.notice_id, n.notice_detail,n.admin_id,a.admin_name,a.admin_role,n.create_time,n.update_time from notice_sys n , admin a where n.admin_id = a.admin_id ORDER BY update_time DESC LIMIT 5`
    console.log(sql);
    connection.query(sql, (err, res) => {
      console.log(res);
      if (!err) {
        success({
          status: 200,
          msg: 'OK',
          data:res
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
}
