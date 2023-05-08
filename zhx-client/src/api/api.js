export const CONTEXT = '';
// 登录接口
export const LOGIN = CONTEXT + '/users/login'

// 注册
export const REGISTER = CONTEXT + '/users/register'
// 获取所有商品类型
export const ALLGROUP = CONTEXT + '/goods/groupAll'
// 根据商品类型Id获取商品
export const GETGOODSFROMTYPE = CONTEXT + '/goods/getGoodsFromType'

// 获取最新的前5项
export const GETLASTGOODS = CONTEXT + '/goods/getLastGoods'

// 根据ID查询单个商品
export const GETGOODSFROMID = CONTEXT + '/goods/goodsFromId'

// 根据用户ID查询商品
export const GETGOODSFROMUSERID = CONTEXT + '/goods/goodsFromUserId'

// 添加商品
export const ADDGOODS = CONTEXT + '/goods/addGoods'

// 编辑商品
export const EDITGOODS = CONTEXT + '/goods/editGoods'

// 删除商品
export const DELETEGOODS = CONTEXT + '/goods/deleteGoods'

// 添加至购物车
export const SAVECART = CONTEXT + '/goods/saveCart'

// 根据用户ID查询购物车
 export const GETCARTFROMID = CONTEXT + '/goods/getCartFromId'

//  删除购物车
export const DELETECART = CONTEXT + '/goods/deleteCart'

// 增加收货地址
export const ADDADDRESS = CONTEXT + '/users/addAddress'

// 根据ID查询收货地址
export const GETADDRESS = CONTEXT + '/users/getAddressFromId'

// 根据地址ID查询单个地址
export const GETADDR = CONTEXT + '/users/getAddr'

// 根据地址ID修改地址
export const UPDATEADDR = CONTEXT + '/users/updateAddr'

// 根据地址ID删除地址
export const DELETEADDR = CONTEXT + '/users/deleteAddr'

//用户提交订单
export const SUBORDER = CONTEXT + '/users/subOrder'

//  根据订单ID查询订单详情
export const GETORDERFROMID = CONTEXT + '/users/getOrderFromId'

//改变订单状态
export const CHANGEORDERSTATUS = CONTEXT + '/users/changeOrderStatus'

//改变订单详情状态
export const CHANGEORDERITEM = CONTEXT + '/users/changeOrderItem'

// 根据订单状态查找订单
export const GETORDERFROMSTATUE = CONTEXT + '/users/getOrderFromStatus'

// 查找用户未处理订单
export const GETORDERNOTDEEL = CONTEXT + '/users/getOrderNotDeel'

// 支付
export const PAYORDER = CONTEXT + '/users/payOrder'

// 添加收藏

export const ADDCOLLECTION = CONTEXT + '/goods/addCollection'

// 判断商品是否被收藏

export const ISCOLLECTION = CONTEXT + '/goods/isCollection'

// 删除收藏
export const DELETECONNECTION = CONTEXT + '/goods/deleteCollection'

// 根据用户ID 查询收藏
export const GETUSERSCOLLECTION = CONTEXT + '/users/getUsersCollection'

// 上传文件
export const UOLOAD = CONTEXT + '/upload'

// 删除文件
export const DELETEFILE = CONTEXT + '/upload/delete'

// 根据用户ID 查询用户信息
export const GETUSERINFO = CONTEXT + '/users/getUserInfo'

// 根据用户ID修改信息
export const UPDATEUSERINFO = CONTEXT + '/users/updateUserInfo'

// 模糊查询
export const FINDGOODS = CONTEXT + '/goods/findGoods'

// 退货
export const RETURNORDER = CONTEXT + '/users/returnOrder'

// 根据用户ID、订单状态查找订单明细
export const GETORDERITEMBYUSERID = CONTEXT + '/users/getOrderItemByUserId'

// 根据发布者ID、订单状态查找订单明细
export const GETORDERITEMBYBOSSID = CONTEXT + '/users/getOrderItemByBossId'

// 获取所有公告
export const GETALLNOTICE = CONTEXT + '/goods/getAllNotice'
