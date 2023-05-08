const DBconn = require('./DBconn')


module.exports = {
  checkTypeHasGoods(conn,cateId) {
    return new Promise((resolve, reject) => {
       const sql = `select * from goods where cate_id = ${cateId}`
       conn.query(sql, (err, res) => {
         if (!err) {
           if (res.length > 0) {
             resolve({
               code: 1,
               msg: "该类型下存在商品",
            })
           } else if (res.length === 0) {
             resolve({
               code: 0,
               msg: '该类型下不存在商品',
             })
          }
         } else {
           reject({
             status: 500,
             msg: '出现意外的错误',
             data: err,
           })
         }
       })
    })
  },
  deleteCate(cateId,success,fail) {
    const connection = DBconn.getConn()
    this.checkTypeHasGoods(connection, cateId).then(res => {
      console.log(res);
      if (res.code === 1) {
        success({
          status: 202,
          msg:"该类型下存在商品，删除失败！"
        })
      } else if (res.code === 0) {
        const sql = `delete from category where cate_id = '${cateId}'`
        connection.query(sql, (err, res) => {
          if (!err) {
            success({
              status: 200,
              msg:"删除成功"
            })
          } else {
            fail({
              status: 500,
              err
            })
          }
        })
      }
    }).catch(err => {
      fail({
        err
      })
    })
  }
}

