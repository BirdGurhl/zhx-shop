var express = require('express')
var router = express.Router()
const adminDb = require('../dao/admindb')
const md5 = require('md5')

function getData(n) {
  n = new Date(n)
  return n.toISOString().replace(/T/,' ').slice(0,-5)
}
console.log(getData(new Date()));
// 获取用户信息
router.get('/getUsersInfo', (req, res, next) => {
  adminDb.getUsersInfo(
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 改变用户状态
router.post('/changeUsersStatus', (req, res, next) => {
  const userId = req.body.userId
  const userStatus = req.body.userStatus
  const banInfo = req.body.banInfo

  let userInfo = {
    userId,
    userStatus,
    banInfo,
  }

  adminDb.changeUsersStatus(
    userInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 管理员登录
router.post('/adminLogin', (req, res, next) => {
  const userPhone = req.body.adminName
  const password = md5(req.body.password)
  const adminInfo = {
    userPhone,
    password,
  }
  adminDb.adminLogin(
    adminInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})
// 新增公告
router.post('/addNotice', (req, res, next) => {
  const detail = req.body.detail
  const adminId = req.body.adminId
  const createTime = getData(new Date())
  let noticeInfo = {
    detail,
    adminId,
    createTime,
  }
  adminDb.addNotice(
    noticeInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 查看所有公告
router.get('/getAllNotice', (req, res, next) => {
  adminDb.getAllNotice(
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 修改公告
router.post('/updateNotice', (req, res, next) => {
  const noticeId = req.body.noticeId
  const detail = req.body.detail
  const updateTime = getData(new Date())

  let noticeInfo = {
    noticeId,
    detail,
    updateTime,
  }
  adminDb.updateNotice(
    noticeInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 删除公告
router.post('/deleteNotice', (req, res, next) => {
  const noticeId = req.body.noticeId
  adminDb.deleteNotice(
    noticeId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 查看所有订单
router.get('/getAllOrders', (req, res, next) => {
  adminDb.getAllOrder(
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 发货
router.post('/deliverGoods', (req, res, next) => {
  const orderId = req.body.orderId || req.body.order_id
  const order_item_id = req.body.order_item_id
  const orderStatus = req.body.orderStatus || req.body.order_status
  const send_type = req.body.send_type || '自提'
  const waybill_code = req.body.waybill_code || ''
  const currentTime = getData(new Date())
  let orderInfo = {
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
  adminDb.changeOrderDeliverStatus(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 查询所有退货物品

router.get('/getAllReturnOrders', (req, res, next) => {
  adminDb.getAllReturnOrder(
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 通过退货
router.post('/allowReturn', (req, res, next) => {
  const orderId = req.body.orderId
  const returnStatus = req.body.returnStatus
  let orderInfo = {
    orderId,
    returnStatus,
  }
  adminDb.changeOrderReturnStatus(
    orderInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 新增管理员
router.post('/addAdmin', (req, res, next) => {
  const name = req.body.name
  const pass = md5(req.body.pass)
  const role = '2'
  const adminStatus = req.body.adminStatus
  const phone = req.body.phone
  const createTime = getData(new Date())
  
  let adminInfo = {
    name,
    pass,
    role,
    adminStatus,
    phone,
    createTime,
  }
  adminDb.addAdmin(adminInfo, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })

})

// 查看所有管理员
router.get("/getAllAdmin", (req, res, next) => {
  
  adminDb.getAllAdmin((info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 改变管理员状态
router.post("/changeAdminStatus", (req, res, next) => {

  const adminId = req.body.adminId
  const adminStatus = req.body.adminStatus
  let adminInfo = {
    adminId,
    adminStatus,
  }
  adminDb.changeAdminStatus(adminInfo,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

// 删除管理员
router.post("/deleteAdmin", (req, res, next) => {

  const adminId = req.body.adminId
  adminDb.deleteAdmin(
    adminId,
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})
module.exports = router
