var express = require('express')
var router = express.Router()
const userdb = require('../dao/usersdb')
const md5 = require('md5')

function getRandom() {
  let random = ''
  for (let i = 0; i < 9; i++) {
    random += Math.round(Math.random() * 9)
  }

  return random
}

function getData(n) {
  n = new Date(n)
  return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
}

// 注册
router.post('/register', function (req, res, next) {
  // res.json({
  //   status: "访问成功",
  // });

  // 获取用户注册的参数
  // 获取手机号码
  let userPhone = req.body.userPhone
  // 获取账号密码
  let password = req.body.password
  // 初始化昵称
  let nickname = 'User' + getRandom()
  // 初始化用户权限
  let role = req.body.role
  // 初始化用户创建时间
  let createTime = getData(new Date())
  console.log(createTime)

  let userInfo = {
    userPhone,
    password,
    nickname,
    role,
    createTime,
  }
  console.log(nickname)
  userdb.addUser(userInfo, (data) => {
    res.json(data)
  })
})

// 登录
router.post('/login', function (req, res, next) {
  let userPhone = req.body.userPhone
  let password = req.body.password
  // 登录时间
  let currentTime = getData(new Date())
  if (userPhone == undefined || password == undefined) {
    res.json({
      status: 500,
      msg: '参数类型不正确',
    })
  } else {
    let userInfo = {
      userPhone,
      password,
      currentTime
    }

    userdb.login(
      userInfo,
      (data) => {
        res.json(data)
      },
      (data) => {
        res.json(data)
      }
    )
  }
})

// 增加收货地址

router.post('/addAddress', (req, res, next) => {
  const userId = req.body.userId || ''
  const name = req.body.name || ''
  const tel = req.body.tel || ''
  const province = req.body.province || ''
  const city = req.body.city || ''
  const areaCode = req.body.areaCode || ''
  const addressDetail = req.body.addressDetail || ''
  const createTime = getData(new Date())
  const isDefault = req.body.isDefault || false
  const addrInfo = {
    userId,
    name,
    tel,
    province,
    city,
    areaCode,
    addressDetail,
    createTime,
    isDefault,
  }
  console.log(addrInfo)
  if (isDefault) {
    userdb.resetDefaultAddress(userId).then(r => {
      userdb.addAddress(
        addrInfo,
        (info) => {
          res.json(info)
        },
        (errInfo) => {
          res.json(errInfo)
        }
      )
    }).catch(err => {
      res.json(err)
    })
  } else {
    userdb.addAddress(
      addrInfo,
      (info) => {
        res.json(info)
      },
      (errInfo) => {
        res.json(errInfo)
      }
    )
  }
})

// 根据用户ID查询收货地址
router.post('/getAddressFromId', (req, res, next) => {
  const userId = req.body.userId || ''

  userdb.getAddressFromId(
    userId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据地址ID查询地址
router.post('/getAddr', (req, res, next) => {
  const addrId = req.body.addrId

  userdb.getAddr(
    addrId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})
//根据地址ID更新当前地址
router.post('/updateAddr', (req, res, next) => {
  const userId = req.body.userId || ''
  const addrId = req.body.addrId || ''
  const name = req.body.name || ''
  const tel = req.body.tel || ''
  const province = req.body.province || ''
  const city = req.body.city || ''
  const areaCode = req.body.areaCode || ''
  const addressDetail = req.body.addressDetail || ''
  const isDefault = req.body.isDefault || false
  const updateTime = getData(new Date())
  const addrInfo = {
    userId,
    addrId,
    name,
    tel,
    province,
    city,
    areaCode,
    addressDetail,
    updateTime,
    isDefault
  }
  console.log(addrInfo)
  if (isDefault) {
    userdb.resetDefaultAddress(userId).then(r => {
      userdb.updateAddress(
        addrInfo,
        (info) => {
          res.json(info)
        },
        (errInfo) => {
          res.json(errInfo)
        }
      )
    }).catch(err => {
      res.json(err)
    })
  } else {
    userdb.updateAddress(
      addrInfo,
      (info) => {
        res.json(info)
      },
      (errInfo) => {
        res.json(errInfo)
      }
    )
  }

})

// 根据地址ID删除地址
router.post('/deleteAddr', (req, res, next) => {
  const addrId = req.body.addrId || ''
  userdb.deleteAddr(
    addrId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      console.log(errInfo)
      res.json(errInfo)
    }
  )
})

// 提交订单

router.post('/subOrder', (req, res, next) => {
  setTimeout(() => {
    const userId = req.body.userId || ''
    const addrId = req.body.addrId || ''
    const goodsList = JSON.parse(req.body.goods)
    const totalPrice = req.body.totalPrice
    const orderId = Date.parse(new Date())
    const status = '0' // 待收货
    const createTime = getData(new Date())
    const currentTime = createTime

    let orderInfo = {
      userId,
      addrId,
      orderId,
      status,
      createTime,
      totalPrice,
      currentTime
    }
    userdb
      .addOrder(orderInfo)
      .then((info) => {
        if (info.msg === 'OK') {
          let flags = []
          for (let i = 0; i < goodsList.length; i++) {
            flags.push(userdb.addOrderDetail(orderInfo, goodsList[i]))
          }
          if (flags.find((item) => item === false)) {
            res.json({
              status: 500,
              msg: '失败',
            })
          } else {
            res.json({
              status: 200,
              orderId: orderId,
              msg: '成功',
            })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, 1000)
})

// 根据订单ID查询订单
router.get('/getOrderFromId', (req, res, next) => {
  const orderId = req.query.orderId

  userdb.getOrderFromId(
    orderId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据订单ID查询订单
router.post('/getOrderdetailFromId', (req, res, next) => {
  const orderId = req.body.orderId

  userdb.getOrderdetailFromId(
    orderId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})
console.log(getData(new Date()));
//更新订单详情
router.post('/changeOrderItem', (req, res, next) => {
  const orderId = req.body.orderId || req.body.order_id
  const order_item_id = req.body.order_item_id
  const orderStatus = req.body.orderStatus || req.body.order_status
  const send_type = req.body.send_type || '自提'
  const waybill_code = req.body.waybill_code || ''
  const currentTime = getData(new Date())
  let orderInfo = {
    ...req.body,
    orderId,
    order_item_id,
    orderStatus,
    currentTime,
    send_type,
    waybill_code
  }
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

  userdb.changeOrderItem(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      console.log(errInfo);
      res.json(errInfo)
    }
  )
})
// 更新订单状态
router.post('/changeOrderStatus', (req, res, next) => {
  const orderId = req.body.orderId
  const orderStatus = req.body.orderStatus
  const currentTime = getData(new Date())
  let orderInfo = {
    orderId,
    orderStatus,
    currentTime
  }
  userdb.changeOrderStatus(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据订单状态查找订单
router.post('/getOrderFromStatus', (req, res, next) => {
  const userId = req.body.userId
  const orderStatus = req.body.orderStatus

  let orderInfo = {
    userId,
    orderStatus,
  }
  userdb.getOrderFromStatus(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})
// 根据订单状态查找订单详情
router.post('/getOrderDetailFromStatus', (req, res, next) => {
  const orderStatus = req.body.orderStatus

  let orderInfo = {
    orderStatus,
  }
  userdb.getOrderDetailFromStatus(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据用户ID和订单状态查找订单明细
router.post('/getOrderItemByUserId', (req, res, next) => {
  const userId = req.body.userId
  const orderStatus = req.body.orderStatus
  const onlyUser = req.body.onlyUser || null

  let orderInfo = {
    userId,
    orderStatus,
    onlyUser
  }
  userdb.getOrderItemByUserId(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据发布者ID、订单状态查找订单明细
router.post('/getOrderItemByBossId', (req, res, next) => {
  const userId = req.body.userId
  const orderStatus = req.body.orderStatus

  let orderInfo = {
    userId,
    orderStatus,
  }
  userdb.getOrderItemByBossId(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 查找用户未处理订单
router.post('/getOrderNotDeel', (req, res, next) => {

  const userId = req.body.userId
  userdb.getOrderNotDeel(
    userId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 支付
router.post('/payOrder', (req, res, next) => {
  const orderId = req.body.orderId
  const orderStatus = req.body.orderStatus
  const totalPrice = req.body.totalPrice
  const payType = req.body.payType
  const payTime = getData(new Date())

  let orderInfo = {
    orderId,
    orderStatus,
    totalPrice,
    payType,
    payTime,
  }
  userdb.payOrder(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据用户ID查询收藏表
router.post('/getUsersCollection', (req, res, next) => {
  const userId = req.body.userId

  userdb.getUsersCollection(
    userId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 根据用户ID查询用户信息
router.post('/getUserInfo', (req, res, next) => {
  const userId = req.body.userId

  userdb.getUserInfo(
    userId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 更新用户信息

router.post('/updateUserInfo', (req, res, next) => {
  const userId = req.body.userId
  const nickName = req.body.nickName
  const email = req.body.email
  const headImg = req.body.headImg
  const userDesc = JSON.parse(req.body.userDesc)
  // const userDesc = req.body.userDesc
  console.log(userDesc);
  let data = {
    userId,
    nickName,
    email,
    headImg,
    userDesc
  }
  userdb.updataUserInfo(data, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 退货
router.post("/returnOrder", (req, res, next) => {
  const orderId = req.body.orderId
  const message = req.body.message
  const orderStatus = req.body.orderStatus

  let orderInfo = {
    orderId,
    message,
    orderStatus,
  }

  userdb.returnOrder(orderInfo, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})




module.exports = router
