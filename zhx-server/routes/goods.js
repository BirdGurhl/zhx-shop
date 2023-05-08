const { json } = require('express')
var express = require('express')
var router = express.Router()
const goodsdb = require('../dao/goodsdb')

/*获取yyyy-mm-dd hh:mm:ss */
function timestampToTime() {
  let date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

// 添加商品类型
router.post('/addGoodsType', (req, res, next) => {
  let token = req.headers.Authorization
  console.log('token', token)

  // 获取父级ID
  let parentId = req.body.parentId
  // 获取商品名称
  let name = req.body.name
  // 获取类型状态
  let status = req.body.status
  // 创建时间
  let createTime = timestampToTime()

  let typeInfo = {
    parentId,
    name,
    status,
    createTime,
  }

  //添加商品类型
  goodsdb.addGoodsType(
    typeInfo,
    (successData) => {
      //   成功时的回调
      res.json(successData)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

// 添加商品
router.post('/addGoods', (req, res, next) => {
  const token = req.headers.Authorization
  console.log('token', token)
  // 获取类型ID
  const typeId = req.body.category
  // 获取用户ID
  const user_id = req.body.user_id ? req.body.user_id : 10020
  //   获取商品详细名称
  const name = req.body.name
  //   获取商品简称
  const subtitle = req.body.subtitle ? req.body.subtitle : ''
  //   获取商品主要图片
  const mainImage = req.body.imgList
  //   获取商品次要小图
  // const subImage = req.body.subImage;
  //   获取商品描述
  const detail = req.body.detail
  //   获取商品价格
  const price = req.body.price
  //   获取商品库存
  const stock = req.body.count
  //   获取在售状态
  const status = req.body.onSale ? '1' : '0'
  //   创建日期
  const createTime = timestampToTime()
  const update_time = createTime

  let goodsInfo = {
    typeId,
    user_id,
    name,
    subtitle,
    mainImage,
    // subImage,
    detail,
    price,
    stock,
    status,
    createTime,
    update_time
  }
  console.log('goodsInfo', goodsInfo);
  goodsdb.addGoods(
    goodsInfo,
    (successData) => {
      res.json(successData)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

// 修改商品信息
router.post('/editGoods', (req, res, next) => {
  const token = req.headers.Authorization
  console.log('token', token)
  // 获取商品id
  const goodsId = req.body.goodsId
  // 获取类型ID
  const typeId = req.body.category
  // 获取用户ID
  const user_id = req.body.user_id ? req.body.user_id : 10006
  //   获取商品详细名称
  const name = req.body.name
  //   获取商品简称
  const subtitle = req.body.subtitle
  //   获取商品主要图片
  const mainImage = req.body.imgList
  //   获取商品次要小图
  // const subImage = req.body.subImage;
  //   获取商品描述
  const detail = req.body.detail
  //   获取商品价格
  const price = req.body.price
  //   获取商品库存
  const stock = req.body.count
  //   获取在售状态
  const status = req.body.onSale ? '1' : '0'
  //   修改日期
  const updateTime = timestampToTime()

  let goodsInfo = {
    goodsId,
    typeId,
    user_id,
    name,
    subtitle,
    mainImage,
    // subImage,
    detail,
    price,
    stock,
    status,
    updateTime,
  }
  console.log(goodsInfo)
  goodsdb.editGoods(goodsInfo, (data) => {
    res.json(data);
  }, (errData) => {
    res.json(errData)
  })
})

// 查看所有商品

router.get('/allGoods', (req, res, next) => {
  // console.log("allGoods");
  const token = req.headers.Authorization

  goodsdb.allGoods(
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

// 修改商品售卖状态
router.post('/updateGoodsStatus', (req, res, next) => {
  console.log('updateGoodsStatus')
  const token = req.headers.Authorization

  // 获取参数
  const goodsId = req.body.goodsId
  const onSale = req.body.onSale

  const upInfo = {
    goodsId,
    onSale,
  }
  goodsdb.updateOnSale(
    upInfo,
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})
// 删除商品
router.get('/deleteGoods', (req, res, next) => {
  const token = req.headers.Authorization

  // 获取商品ID
  let goodsId = req.query.goodsId

  goodsdb.deleteGoods(
    goodsId,
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

// 获取分类列表

router.get('/groupAll', (req, res, next) => {
  let token = req.headers.Authorization

  goodsdb.groupAll(
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

// 根据ID查询商品

router.get('/goodsFromId', (req, res, next) => {
  let token = req.headers.Authorization

  let id = req.query.goodsId

  goodsdb.goodsFromId(
    id,
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})
// 根据用户ID查询用户商品

router.get('/goodsFromUserId', (req, res, next) => {
  let token = req.headers.Authorization

  let id = req.query.userId

  goodsdb.goodsFromUserId(
    id,
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

// 添加商品类型
router.post("/addGoodsCategory", (req, res, next) => {
  const token = req.headers.Authorization

  const cateName = req.body.cateName

  const createTime = timestampToTime()

  let info = {
    cateName,
    createTime,
  }
  console.log(info);
  goodsdb.addGoodsCate(info, (data) => {
    console.log(data);
    res.json(data)
  }, (errData) => {
    console.log(errData);
    res.json(errData)
  })

})

// 根据类型ID修改类型名称
router.post("/updateCate", (req, res, next) => {
  const token = req.headers.Authorization

  const cateId = req.body.cateId;
  const cateName = req.body.cateName;

  let info = {
    cateId,
    cateName
  }
  console.log(info);
  goodsdb.updateCate(info, (data) => {
    res.json(data)
  }, (errData) => {
    res.json(errData)
  })
})

//根据分类id查找商品
router.get("/getGoodsFromType", (req, res, next) => {
  const token = req.headers.Authorization
  const cateId = req.query.typeId
  const userId = req.query.userId
  let data = {
    cateId,
    userId: userId ? userId : null
  }
  console.log('cateid', data);
  goodsdb.getGoodsFromType(data, (data) => {
    console.log(data);
    res.json(data)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 获取最新的前5项
router.get("/getLastGoods", (req, res, next) => {
  const token = req.headers.Authorization
  goodsdb.getLastGoods(
    (data) => {
      res.json(data)
    },
    (errData) => {
      res.json(errData)
    }
  )
})

router.post("/saveCart", (req, res, next) => {
  const token = req.headers.Authorization
  const goodsId = req.body.goodsId
  const userId = req.body.userId
  const createTime = timestampToTime()

  const cartInfo = {
    goodsId,
    userId,
    createTime,
  }

  goodsdb.saveCart(cartInfo, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

router.get('/getCartFromId', (req, res, next) => {
  const token = req.headers.Authorization
  const userId = req.query.userId
  goodsdb.getCartFromId(userId, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })

})


router.post('/deleteCart', (req, res, next) => {
  const token = req.headers.Authorization
  const cartId = req.body.cartId

  goodsdb.deleteCart(cartId, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 添加收藏
router.post('/addCollection', (req, res, next) => {
  const token = req.headers.Authorization
  const userId = req.body.userId
  const goodsId = req.body.goodsId
  const createTime = timestampToTime()

  let goodsInfo = {
    userId,
    goodsId,
    createTime,
  }
  goodsdb.addCollection(goodsInfo, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 查询商品是否被收藏
router.post('/isCollection', (req, res, next) => {
  const token = req.headers.Authorization
  const userId = req.body.userId
  const goodsId = req.body.goodsId

  let goodsInfo = {
    userId,
    goodsId,
  }

  goodsdb.isCollection(goodsInfo, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })

})

// 删除收藏
router.post('/deleteCollection', (req, res, next) => {
  const collId = req.body.collId

  goodsdb.deleteCollection(collId, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 模糊查询
router.post('/findGoods', (req, res, next) => {
  const goodsName = req.body.goodsName

  goodsdb.findGoods(goodsName, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})

// 查看所有公告
router.get('/getAllNotice', (req, res, next) => {
  goodsdb.getAllNotice(
    (info) => {
      res.json(info)
    },
    (errInfo) => {
      res.json(errInfo)
    }
  )
})

module.exports = router
