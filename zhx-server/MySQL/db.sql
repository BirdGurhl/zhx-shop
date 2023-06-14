/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : localhost:3306
 Source Schema         : db

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 14/06/2023 17:50:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `address_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地址ID',
  `user_id` int(255) NULL DEFAULT NULL COMMENT '用户ID',
  `receiver_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '收货人姓名',
  `receiver_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '收货号码',
  `receiver_province` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '校区',
  `receiver_city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '楼栋',
  `receiver_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '详细地址（宿舍楼层、房间号）',
  `receiver_areaCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '校区楼栋编码',
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '最后更新',
  `isDefault` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '0' COMMENT '是否为默认收货地址',
  `receiver_district` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `postCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`address_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (26, 10072, '李', '18575844545', '海珠北区', '八栋', '8207', '120300', '2023-05-11 14:15:02', '2023-05-11 14:15:02', 'true', NULL, NULL);
INSERT INTO `address` VALUES (25, 10021, '李传锴', '18575844517', '海珠北区', '八栋', '8027', '120300', '2023-5-2 05:23:44', '2023-5-2 05:23:44', 'true', NULL, NULL);

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `admin_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `admin_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '登录账号',
  `admin_pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `admin_role` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '1超级管理员 2普通管理员',
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '最后更新',
  `headImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '头像url',
  `admin_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'true启用 false不启用',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '联系方式',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10000011 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (10000000, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', NULL, NULL, NULL, 'true', NULL);
INSERT INTO `admin` VALUES (10000005, 'abc', 'e10adc3949ba59abbe56e057f20f883e', '2', '2023-4-20 09:36:16', NULL, NULL, 'true', '18575844517');
INSERT INTO `admin` VALUES (10000008, 'lck', 'e10adc3949ba59abbe56e057f20f883e', '2', '2023-5-1 00:06:06', NULL, NULL, 'false', '10086');
INSERT INTO `admin` VALUES (10000007, 'haha', 'e10adc3949ba59abbe56e057f20f883e', '2', '2023-5-1 00:04:06', NULL, NULL, 'true', '2137614766');
INSERT INTO `admin` VALUES (10000009, 'no-Permissions', 'e10adc3949ba59abbe56e057f20f883e', '2', '2023-5-2 06:09:03', NULL, NULL, 'false', '2117112765');
INSERT INTO `admin` VALUES (10000010, 'admin1', 'e10adc3949ba59abbe56e057f20f883e', '2', '2023-5-8 14:17:10', NULL, NULL, 'true', '13212742056');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `cart_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NULL DEFAULT NULL,
  `goods_id` int(255) NULL DEFAULT NULL,
  `quantity` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 117 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (108, 10021, 100066, NULL, '2023-05-02 05:07:20', NULL);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `cate_id` int(255) NOT NULL AUTO_INCREMENT,
  `parent_id` int(255) NOT NULL DEFAULT 0,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'on',
  `type_create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type_update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`cate_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 761 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (734, 0, '更多', 'on', '2023-04-16 16:50:03', NULL);
INSERT INTO `category` VALUES (726, 0, '服饰', 'on', '2023-04-16 16:44:18', NULL);
INSERT INTO `category` VALUES (733, 0, '数码', 'on', '2023-04-16 16:41:55', NULL);
INSERT INTO `category` VALUES (727, 0, '美妆', 'on', '2023-04-16 16:44:52', NULL);
INSERT INTO `category` VALUES (728, 0, '日用品', 'on', '2023-04-16 16:44:59', NULL);
INSERT INTO `category` VALUES (729, 0, '鞋帽', 'on', '2023-04-16 16:45:26', NULL);
INSERT INTO `category` VALUES (730, 0, '教材教辅', 'on', '2023-04-16 16:45:31', NULL);
INSERT INTO `category` VALUES (731, 0, '文具', 'on', '2023-04-16 16:45:36', NULL);
INSERT INTO `category` VALUES (760, 0, '测试分类', 'on', '2023-05-08 16:09:02', NULL);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goods_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `cate_id` int(255) NOT NULL COMMENT '分类id',
  `user_id` int(8) NOT NULL DEFAULT 0 COMMENT '发布者uid',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品名称',
  `subtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品简述',
  `main_image` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '商品图片',
  `detail` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '商品描述',
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品价格',
  `stock` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品库存',
  `on_sale` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '1：在售，0：不在售',
  `create_time` datetime NULL DEFAULT NULL COMMENT '发布时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '最后更新',
  `sub_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`goods_id`) USING BTREE,
  INDEX `cate_id_wj`(`cate_id`) USING BTREE,
  INDEX `user_id_wj`(`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 100103 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (100070, 730, 1024, '《数据库系统概论》', '', '[{\"name\":\"1682972896241.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972896241.jpg\",\"uid\":\"1682972896241.jpg\",\"status\":\"success\"}]', '第四版，无笔记，部分高亮。售价：70元。种类：图书。\n', '70', '1', '1', '2023-05-02 04:28:16', '2023-05-02 04:28:16', NULL);
INSERT INTO `goods` VALUES (100071, 730, 1034, '《深入理解计算机系统》第三版', '', '[{\"name\":\"1682972947408.webp\",\"url\":\"http://localhost:3000/public/upload/1682972947408.webp\",\"uid\":\"1682972947408.webp\",\"status\":\"success\"}]', '完好无损', '5', '1', '1', '2023-05-02 04:29:07', '2023-05-02 04:29:07', NULL);
INSERT INTO `goods` VALUES (100069, 730, 1070, '《计算机操作系统》', '', '[{\"name\":\"1682972814907.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972814907.jpg\",\"uid\":\"1682972814907.jpg\",\"status\":\"success\"}]', '第三版，无笔记，边角磨损。售价：60元。种类：图书。', '60', '1', '1', '2023-05-02 04:26:55', '2023-05-02 04:26:55', NULL);
INSERT INTO `goods` VALUES (100067, 730, 1026, '《Java编程思想》', '', '[{\"name\":\"1682972663528.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972663528.jpg\",\"uid\":\"1682972663528.jpg\",\"status\":\"success\"}]', '非常新，无笔记。售价：80元。种类：图书。', '12', '1', '1', '2023-05-02 04:24:23', '2023-05-02 04:24:23', NULL);
INSERT INTO `goods` VALUES (100068, 730, 1031, '《数据结构与算法分析》', '', '[{\"name\":\"1682972728175.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972728175.jpg\",\"uid\":\"1682972728175.jpg\",\"status\":\"success\"}]', '《数据结构与算法分析》\n少数笔记，封面有磨损，其他很新。售价：50元。种类：图书。', '19', '1', '1', '2023-05-02 04:25:28', '2023-05-02 04:25:28', NULL);
INSERT INTO `goods` VALUES (100066, 733, 1034, '二手Nikon D5600 单反相机+18-55套头', '', '[{\"name\":\"1682972610963.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972610963.jpg\",\"uid\":\"1682972610963.jpg\",\"status\":\"success\"},{\"name\":\"1682972610964.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972610964.jpg\",\"uid\":\"1682972610964.jpg\",\"status\":\"success\"}]', '二手Nikon D5600 单反相机+18-55套头\n　　Nikon D5600单反相机，附带18-55', '2800', '1', '1', '2023-05-02 04:23:31', '2023-05-09 04:23:31', NULL);
INSERT INTO `goods` VALUES (100065, 733, 1031, '彩色打印机 HP M254dw', '', '[{\"name\":\"1682972526348.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972526348.jpg\",\"uid\":\"1682972526348.jpg\",\"status\":\"success\"},{\"name\":\"1682972526354.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972526354.jpg\",\"uid\":\"1682972526354.jpg\",\"status\":\"success\"}]', 'HP M254dw彩色打印机', '800', '1', '1', '2023-05-02 04:22:06', '2023-05-02 04:22:06', NULL);
INSERT INTO `goods` VALUES (100064, 733, 1071, '迪士尼乐园版Switch主机（限量版）', '', '[{\"name\":\"1682972475942.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972475942.jpg\",\"uid\":\"1682972475942.jpg\",\"status\":\"success\"},{\"name\":\"1682972475944.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972475944.jpg\",\"uid\":\"1682972475944.jpg\",\"status\":\"success\"}]', '　　迪士尼乐园版Switch主机，附带三合一包和国行游戏卡', '3800', '1', '1', '2023-05-02 04:21:16', '2023-05-02 04:21:16', NULL);
INSERT INTO `goods` VALUES (100063, 733, 1035, '罗技MK235无线键鼠套装 家用办公', '', '[{\"name\":\"1682972400365.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972400365.jpg\",\"uid\":\"1682972400365.jpg\",\"status\":\"success\"},{\"name\":\"1682972400366.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972400366.jpg\",\"uid\":\"1682972400366.jpg\",\"status\":\"success\"}]', '罗技MK235无线键鼠套装，适用于家用和办公，价格为100元，属于配件类商品。', '110', '1', '1', '2023-05-02 04:20:00', '2023-05-02 04:20:00', NULL);
INSERT INTO `goods` VALUES (100062, 733, 1034, '华为Mate30 Pro 5G 256GB 全网通 附送原装壳 全新未拆封', '', '[{\"name\":\"1682972334668.jpg\",\"url\":\"http://localhost:3000/public/upload/1682972334668.jpg\",\"uid\":\"1682972334668.jpg\",\"status\":\"success\"}]', '全网通 附送原装壳 全新未拆封\n支持5G网络，拥有256GB存储容量，全新未拆封，原装壳附赠，价格为5200元，属于手机类商品', '5200', '1', '1', '2023-05-02 04:18:54', '2023-05-02 04:18:54', NULL);
INSERT INTO `goods` VALUES (100061, 733, 1027, '二手Apple Watch', '', '[{\"name\":\"1682971895849.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971895849.jpg\",\"uid\":\"1682971895849.jpg\",\"status\":\"success\"},{\"name\":\"1682971895852.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971895852.jpg\",\"uid\":\"1682971895852.jpg\",\"status\":\"success\"}]', 'Series 6，续航能力强\n表带基本没用，运行很流畅，配件完整', '1500', '1', '1', '2023-05-02 04:11:36', '2023-05-02 04:11:36', NULL);
INSERT INTO `goods` VALUES (100059, 733, 1024, '二手iPhone XR 颜色很好看，外观无刮痕', '', '[{\"name\":\"1682971764267.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971764267.jpg\",\"uid\":\"1682971764267.jpg\",\"status\":\"success\"}]', '电池健康度良好，没有进水，还有配件', '3200', '1', '1', '2023-05-02 04:09:24', '2023-05-08 04:09:24', NULL);
INSERT INTO `goods` VALUES (100060, 733, 1033, '二手iPad Pro 2021年款，运行速度快', '', '[{\"name\":\"1682971828068.webp\",\"url\":\"http://localhost:3000/public/upload/1682971828068.webp\",\"uid\":\"1682971828068.webp\",\"status\":\"success\"},{\"name\":\"1682971828072.webp\",\"url\":\"http://localhost:3000/public/upload/1682971828072.webp\",\"uid\":\"1682971828072.webp\",\"status\":\"success\"}]', '屏幕干净，运行无卡顿，有手写笔', '4500', '1', '1', '2023-05-02 04:10:28', '2023-05-02 04:10:28', NULL);
INSERT INTO `goods` VALUES (100058, 733, 1027, '二手iMac  2017年款，性能稳定', '', '[{\"name\":\"1682971695724.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971695724.jpg\",\"uid\":\"1682971695724.jpg\",\"status\":\"success\"},{\"name\":\"1682971695728.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971695728.jpg\",\"uid\":\"1682971695728.jpg\",\"status\":\"success\"}]', '配置不错，外观无磕碰，使用时间短，卖家换了新款', '6800', '1', '1', '2023-05-02 04:08:15', '2023-05-02 04:08:15', NULL);
INSERT INTO `goods` VALUES (100057, 733, 1069, '二手MacBook Pro 2019款', '', '[{\"name\":\"1682971541107.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971541107.jpg\",\"uid\":\"1682971541107.jpg\",\"status\":\"success\"},{\"name\":\"1682971541109.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971541109.jpg\",\"uid\":\"1682971541109.jpg\",\"status\":\"success\"}]', '电池续航很好，处理器快速响应，屏幕清晰，性价比很高', '5500', '5', '1', '2023-05-02 04:05:41', '2023-05-02 04:05:41', NULL);
INSERT INTO `goods` VALUES (100056, 733, 1034, '联想ThinkPad X1 Carbon 9th 笔记本	', '', '[{\"name\":\"1682971393344.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971393344.jpg\",\"uid\":\"1682971393344.jpg\",\"status\":\"success\"},{\"name\":\"1682971393345.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971393345.jpg\",\"uid\":\"1682971393345.jpg\",\"status\":\"success\"}]', 'ThinkPad X1 Carbon 9th 笔记本电脑\n用了差不多一年', '6999', '4', '1', '2023-05-02 04:03:13', '2023-05-02 04:03:13', NULL);
INSERT INTO `goods` VALUES (100053, 734, 10020, 'YONEX牌羽毛球拍	', '', '[{\"name\":\"1682971128506.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971128506.jpg\",\"uid\":\"1682971128506.jpg\",\"status\":\"success\"},{\"name\":\"1682971128507.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971128507.jpg\",\"uid\":\"1682971128507.jpg\",\"status\":\"success\"}]', 'YONEX牌羽毛球拍，用了一个学期，一起完好，质量杠杠滴\nYONEX牌羽毛球拍，用了一个学期，一起完好，质量杠杠滴\nYONEX牌羽毛球拍，用了一个学期，一起完好，质量杠杠滴', '99', '22', '1', '2023-05-02 03:58:48', '2023-05-07 14:26:28', NULL);
INSERT INTO `goods` VALUES (100054, 730, 1026, '高等数学	', '', '[{\"name\":\"1682971240696.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971240696.jpg\",\"uid\":\"1682971240696.jpg\",\"status\":\"success\"}]', '高等数学上下两册', '5', '23', '1', '2023-05-02 04:00:40', '2023-05-02 04:00:40', NULL);
INSERT INTO `goods` VALUES (100055, 733, 1069, '三星Galaxy S21 Ultra 5G ', '', '[{\"name\":\"1682971326807.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971326807.jpg\",\"uid\":\"1682971326807.jpg\",\"status\":\"success\"},{\"name\":\"1682971326861.jpg\",\"url\":\"http://localhost:3000/public/upload/1682971326861.jpg\",\"uid\":\"1682971326861.jpg\",\"status\":\"success\"}]', '这是一部全新的三星Galaxy S21 Ultra 5G 手机，具有高端配置。	', '3999', '3', '1', '2023-05-02 04:02:07', '2023-05-02 04:02:07', NULL);
INSERT INTO `goods` VALUES (100050, 734, 1069, '26英寸山地自行车', '', '[{\"name\":\"1682969407549.jpg\",\"url\":\"http://localhost:3000/public/upload/1682969407549.jpg\",\"uid\":\"1682969407549.jpg\",\"status\":\"success\"},{\"name\":\"1682969407547.jpg\",\"url\":\"http://localhost:3000/public/upload/1682969407547.jpg\",\"uid\":\"1682969407547.jpg\",\"status\":\"success\"},{\"name\":\"1682969407544.jpg\",\"url\":\"http://localhost:3000/public/upload/1682969407544.jpg\",\"uid\":\"1682969407544.jpg\",\"status\":\"success\"}]', '这是一辆全新的26英寸山地自行车。', '599', '13', '1', '2023-05-02 02:53:18', '2023-05-02 03:30:08', NULL);
INSERT INTO `goods` VALUES (100072, 730, 1024, '《JavaScript高级程序设计》第四版', '', '[{\"name\":\"1682973000393.webp\",\"url\":\"http://localhost:3000/public/upload/1682973000393.webp\",\"uid\":\"1682973000393.webp\",\"status\":\"success\"}]', '新书，无笔记', '18', '21', '1', '2023-05-02 04:30:00', '2023-05-02 04:30:00', NULL);
INSERT INTO `goods` VALUES (100073, 728, 1071, 'Nike 高帮篮球鞋 41码	', '', '[{\"name\":\"1682973092162.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973092162.jpg\",\"uid\":\"1682973092162.jpg\",\"status\":\"success\"}]', '鞋子颜色为黑白，码数为41，已经穿过，但是底部磨损不是很严重	', '150', '14', '1', '2023-05-02 04:31:32', '2023-05-02 04:31:32', NULL);
INSERT INTO `goods` VALUES (100074, 726, 1031, 'Supreme 帽衫 S 码	', '', '[{\"name\":\"1682973142331.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973142331.jpg\",\"uid\":\"1682973142331.jpg\",\"status\":\"success\"},{\"name\":\"1682973142335.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973142335.jpg\",\"uid\":\"1682973142335.jpg\",\"status\":\"success\"}]', 'Supreme品牌帽衫，尺码为S，衣服颜色为黑色，标志为白色。衣服面料为纯棉，非常舒适。这件帽衫是二手的，但是只穿过几次，非常新。', '100', '4', '1', '2023-05-02 04:32:22', '2023-05-02 04:32:22', NULL);
INSERT INTO `goods` VALUES (100075, 726, 1033, 'Adidas 运动裤 36 码', '', '[{\"name\":\"1682973187372.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973187372.jpg\",\"uid\":\"1682973187372.jpg\",\"status\":\"success\"},{\"name\":\"1682973187374.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973187374.jpg\",\"uid\":\"1682973187374.jpg\",\"status\":\"success\"}]', '这条Adidas运动裤是二手的，但是质量非常好，几乎是全新的。尺码为36码，裤子颜色为深灰色。它有一个小口袋，可以放钥匙或者手机。面料是舒适的涤纶，很透气。	', '199', '3', '1', '2023-05-02 04:33:07', '2023-05-02 04:33:07', NULL);
INSERT INTO `goods` VALUES (100076, 726, 1033, 'Zara 男士休闲裤 34 码	', '', '[{\"name\":\"1682973291498.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973291498.jpg\",\"uid\":\"1682973291498.jpg\",\"status\":\"success\"},{\"name\":\"1682973291499.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973291499.jpg\",\"uid\":\"1682973291499.jpg\",\"status\":\"success\"}]', '这条Zara品牌的男士休闲裤是二手的，但是穿过的次数不多，非常新。尺码为34码，裤子颜色为灰色。它有一个小口袋，可以放钥匙或者手机。面料是舒适的棉，很透气。', '150', '17', '1', '2023-05-02 04:34:51', '2023-05-02 04:34:51', NULL);
INSERT INTO `goods` VALUES (100077, 726, 1029, '高领毛衣 S 码	', '', '[{\"name\":\"1682973337526.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973337526.jpg\",\"uid\":\"1682973337526.jpg\",\"status\":\"success\"}]', '这件高领毛衣是二手的，但是只穿过几次，非常新。尺码为S，衣服颜色为浅灰色。面料是舒适的羊毛，非常保暖', '49', '5', '1', '2023-05-02 04:35:37', '2023-05-02 04:35:37', NULL);
INSERT INTO `goods` VALUES (100078, 726, 1023, 'Vans 家居拖鞋 38 码	', '', '[{\"name\":\"1682973458765.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973458765.jpg\",\"uid\":\"1682973458765.jpg\",\"status\":\"success\"},{\"name\":\"1682973458768.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973458768.jpg\",\"uid\":\"1682973458768.jpg\",\"status\":\"success\"}]', '这双Vans家居拖鞋是二手的，但是只穿过几次，非常新。尺码为38码，鞋子颜色为粉色，鞋底颜色为白色。拖鞋底部有花纹，可以防滑。	', '299', '15', '1', '2023-05-02 04:37:39', '2023-05-02 04:37:39', NULL);
INSERT INTO `goods` VALUES (100079, 727, 10021, '资生堂红腰子着哩	', '', '[{\"name\":\"1682973585959.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973585959.jpg\",\"uid\":\"1682973585959.jpg\",\"status\":\"success\"},{\"name\":\"1682973585964.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973585964.jpg\",\"uid\":\"1682973585964.jpg\",\"status\":\"success\"}]', '资生堂红腰子着哩，90%新，清爽不油腻，不闷痘，适合油皮或者夏季使用，滋润肌肤，改善肌肤暗沉，有效提亮肤色。	', '80', '12', '1', '2023-05-02 04:39:46', '2023-05-02 04:39:46', NULL);
INSERT INTO `goods` VALUES (100080, 727, 1031, 'SK-II 修护精华露	', '', '[{\"name\":\"1682973635754.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973635754.jpg\",\"uid\":\"1682973635754.jpg\",\"status\":\"success\"},{\"name\":\"1682973635756.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973635756.jpg\",\"uid\":\"1682973635756.jpg\",\"status\":\"success\"}]', '质地清爽易吸收，有效淡化细纹，亮白修护肌肤，容量50ml，只用过1/3。	', '99', '3', '1', '2023-05-02 04:40:36', '2023-05-02 04:40:36', NULL);
INSERT INTO `goods` VALUES (100081, 727, 1023, 'La Mer 海蓝之谜精华露	', '', '[{\"name\":\"1682973675153.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973675153.jpg\",\"uid\":\"1682973675153.jpg\",\"status\":\"success\"}]', '以海洋能量深度滋润肌肤，提亮肤色，减少细纹，容量30ml，只用过一次。	', '600', '5', '1', '2023-05-02 04:41:15', '2023-05-02 04:41:15', NULL);
INSERT INTO `goods` VALUES (100082, 727, 1029, 'Kiehls 牛油果眼霜	', '', '[{\"name\":\"1682973707172.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973707172.jpg\",\"uid\":\"1682973707172.jpg\",\"status\":\"success\"},{\"name\":\"1682973753639.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973753639.jpg\",\"uid\":\"1682973753639.jpg\",\"status\":\"success\"}]', '眼霜质地柔滑，保湿护理肌肤，能够淡化黑眼圈，缓解眼部干燥，容量14g，只用过1/2。	', '300', '31', '1', '2023-05-02 04:42:33', '2023-05-02 04:42:33', NULL);
INSERT INTO `goods` VALUES (100083, 727, 1070, 'YSL 持妆粉底液	', '', '[{\"name\":\"1682973807213.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973807213.jpg\",\"uid\":\"1682973807213.jpg\",\"status\":\"success\"},{\"name\":\"1682973807217.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973807217.jpg\",\"uid\":\"1682973807217.jpg\",\"status\":\"success\"}]', '服帖自然，提亮肤色，持久不脱妆，色号BD50，容量30ml，只用过1/3。', '300', '2', '1', '2023-05-02 04:43:27', '2023-05-02 05:46:03', NULL);
INSERT INTO `goods` VALUES (100084, 727, 1028, 'SK-II 护肤彩妆套装	', '', '[{\"name\":\"1682973906577.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973906577.jpg\",\"uid\":\"1682973906577.jpg\",\"status\":\"success\"}]', '包括护肤、精华、面霜、面膜、粉底液等多个产品，超值优惠，只用过其中几个。	', '269', '12', '1', '2023-05-02 04:45:06', '2023-05-02 04:45:06', NULL);
INSERT INTO `goods` VALUES (100085, 727, 1027, '宠爱之名精华乳', '', '[{\"name\":\"1682973971059.jpg\",\"url\":\"http://localhost:3000/public/upload/1682973971059.jpg\",\"uid\":\"1682973971059.jpg\",\"status\":\"success\"}]', '宠爱之名精华乳，95%新，适合肤质干燥的人使用，滋润肌肤，改善肌肤干燥，淡化细纹，提亮肤色，使肌肤光滑柔嫩，效果明显，容量150ml，使用期限至2024年12月。	', '169', '3', '1', '2023-05-02 04:46:11', '2023-05-02 04:46:11', NULL);
INSERT INTO `goods` VALUES (100086, 730, 1031, '《Linux命令行与Shell脚本编程大全》', '', '[{\"name\":\"1682974017963.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974017963.jpg\",\"uid\":\"1682974017963.jpg\",\"status\":\"success\"}]', '第三版，无笔记，封面轻微刮痕。', '25', '12', '1', '2023-05-02 04:46:58', '2023-05-02 04:46:58', NULL);
INSERT INTO `goods` VALUES (100087, 728, 1033, '星巴克陶瓷咖啡杯	', '', '[{\"name\":\"1682974074053.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974074053.jpg\",\"uid\":\"1682974074053.jpg\",\"status\":\"success\"}]', '二手星巴克陶瓷咖啡杯，容量约300ml，款式时尚，外观精美，适合用于家庭或办公场所。', '27', '11', '1', '2023-05-02 04:47:54', '2023-05-02 04:47:54', NULL);
INSERT INTO `goods` VALUES (100088, 733, 1070, '富士X-T2相机	', '', '[{\"name\":\"1682974106477.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974106477.jpg\",\"uid\":\"1682974106477.jpg\",\"status\":\"success\"}]', '二手富士X-T2相机，镜头18-55mm，像素2400万，支持4K视频录制，外观完好，性能稳定，适合摄影爱好者使用。	', '5999', '0', '0', '2023-05-02 04:48:26', '2023-05-02 05:42:34', NULL);
INSERT INTO `goods` VALUES (100089, 734, 1071, '宜家单人床', '', '[{\"name\":\"1682974160265.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974160265.jpg\",\"uid\":\"1682974160265.jpg\",\"status\":\"success\"}]', '二手宜家单人床，尺寸约1.2m×2m，颜色白色，材质优质，床垫可拆洗，适合学生或单身人士使用。	', '499', '14', '1', '2023-05-02 04:49:20', '2023-05-02 04:49:20', NULL);
INSERT INTO `goods` VALUES (100090, 728, 1070, '雨伞	', '', '[{\"name\":\"1682974199716.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974199716.jpg\",\"uid\":\"1682974199716.jpg\",\"status\":\"success\"}]', '带花纹的普通伞，新旧程度8成新，自带伞套	', '14', '0', '0', '2023-05-02 04:49:59', '2023-05-13 01:20:22', NULL);
INSERT INTO `goods` VALUES (100091, 728, 1029, '电熨斗	', '', '[{\"name\":\"1682974267092.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974267092.jpg\",\"uid\":\"1682974267092.jpg\",\"status\":\"success\"}]', '棕色电熨斗，熨斗头有轻微刮痕，使用感觉良好	', '45', '15', '1', '2023-05-02 04:51:07', '2023-05-02 04:51:07', NULL);
INSERT INTO `goods` VALUES (100092, 728, 1033, '闹钟	', '', '[{\"name\":\"1682974334263.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974334263.jpg\",\"uid\":\"1682974334263.jpg\",\"status\":\"success\"},{\"name\":\"1682974334266.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974334266.jpg\",\"uid\":\"1682974334266.jpg\",\"status\":\"success\"}]', '古董铃铛闹钟，金属材质，有点生锈，但能正常工作	', '20', '11', '1', '2023-05-02 04:52:14', '2023-05-02 04:52:14', NULL);
INSERT INTO `goods` VALUES (100093, 731, 1033, '机械闹钟', '', '[{\"name\":\"1682974405091.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974405091.jpg\",\"uid\":\"1682974405091.jpg\",\"status\":\"success\"}]', '古董铃铛闹钟，金属材质，有点生锈，但能正常工作	', '49', '24', '1', '2023-05-02 04:53:25', '2023-05-02 04:53:25', NULL);
INSERT INTO `goods` VALUES (100094, 728, 10021, '电子闹钟', '', '[{\"name\":\"1682974425505.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974425505.jpg\",\"uid\":\"1682974425505.jpg\",\"status\":\"success\"}]', '古董铃铛闹钟，金属材质，有点生锈，但能正常工作	', '11', '11', '1', '2023-05-02 04:53:45', '2023-05-02 04:53:45', NULL);
INSERT INTO `goods` VALUES (100095, 731, 1022, '派克万年青笔	', '', '[{\"name\":\"1682974477750.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974477750.jpg\",\"uid\":\"1682974477750.jpg\",\"status\":\"success\"}]', '适合学生用的一支派克万年青钢笔，使用时间约1年，笔头略有磨损	', '15', '12', '1', '2023-05-02 04:54:38', '2023-05-02 04:54:38', NULL);
INSERT INTO `goods` VALUES (100096, 731, 1030, '笔 派克', '', '[{\"name\":\"1682974549893.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974549893.jpg\",\"uid\":\"1682974549893.jpg\",\"status\":\"success\"}]', '派克51明年复刻大佬们期待吗？  …', '19', '23', '1', '2023-05-02 04:55:50', '2023-05-02 04:55:50', NULL);
INSERT INTO `goods` VALUES (100097, 731, 1070, '派克笔', '', '[{\"name\":\"1682974593666.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974593666.jpg\",\"uid\":\"1682974593666.jpg\",\"status\":\"success\"},{\"name\":\"1682974593670.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974593670.jpg\",\"uid\":\"1682974593670.jpg\",\"status\":\"success\"}]', '德国品牌的黑色墨水，50ml装，使用量不到1/4	', '20', '1', '1', '2023-05-02 04:56:33', '2023-05-02 04:56:33', NULL);
INSERT INTO `goods` VALUES (100098, 734, 1025, '立式文件柜	', '', '[{\"name\":\"1682974638292.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974638292.jpg\",\"uid\":\"1682974638292.jpg\",\"status\":\"success\"},{\"name\":\"1682974638608.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974638608.jpg\",\"uid\":\"1682974638608.jpg\",\"status\":\"success\"}]', '三层立式文件柜，颜色为灰色，使用时间约2年	', '145', '22', '1', '2023-05-02 04:57:18', '2023-05-02 04:57:18', NULL);
INSERT INTO `goods` VALUES (100099, 729, 1070, '可拆洗懒人拖鞋', '', '[{\"name\":\"1682974694659.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974694659.jpg\",\"uid\":\"1682974694659.jpg\",\"status\":\"success\"},{\"name\":\"1682974694964.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974694964.jpg\",\"uid\":\"1682974694964.jpg\",\"status\":\"success\"}]', '现代简约款可拆洗懒人拖鞋，男女均可，码数为40	', '25', '1', '1', '2023-05-02 04:58:15', '2023-05-02 04:58:15', NULL);
INSERT INTO `goods` VALUES (100100, 734, 1069, '电动背包', '', '[{\"name\":\"1682974753537.jpg\",\"url\":\"http://localhost:3000/public/upload/1682974753537.jpg\",\"uid\":\"1682974753537.jpg\",\"status\":\"success\"}]', '带有USB充电口的电动背包，可充电式风扇和光源，使用时间1年	', '199', '18', '1', '2023-05-02 04:59:13', '2023-05-02 04:59:13', NULL);
INSERT INTO `goods` VALUES (100102, 729, 10021, '豆豆鞋', '', '[{\"name\":\"1683939391402.jpg\",\"url\":\"http://localhost:3000/public/upload/1683939391402.jpg\",\"uid\":\"1683939391402.jpg\",\"status\":\"success\"}]', '黑色豆豆鞋41码，买回来没穿过', '99', '1', '1', '2023-05-13 08:56:31', '2023-05-13 08:56:31', NULL);

-- ----------------------------
-- Table structure for notice_sys
-- ----------------------------
DROP TABLE IF EXISTS `notice_sys`;
CREATE TABLE `notice_sys`  (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `notice_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `admin_id` int(255) NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice_sys
-- ----------------------------
INSERT INTO `notice_sys` VALUES (11, '毕业照正装租赁！+V：18575844505', 10000010, '2023-5-10 15:03:40', '2023-05-10 09:09:47');
INSERT INTO `notice_sys` VALUES (9, '五一没有假放哟！', 10000007, '2023-5-2 06:05:44', '2023-5-2 06:05:44');
INSERT INTO `notice_sys` VALUES (8, '5月3号上午要停电啦！', 10000005, '2023-5-1 00:18:56', '2023-5-1 00:18:56');

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info`  (
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '订单ID',
  `user_id` int(8) NULL DEFAULT NULL COMMENT '下单用户ID',
  `address_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '收货地址ID',
  `payment` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '实付金额',
  `payment_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '支付方式',
  `order_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '订单状态：-1退货中、0未支付、1待收货、2已完成',
  `payment_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '付款时间',
  `send_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '发货时间',
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '最后更新',
  `total_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '总金额',
  `send_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '发货状态：1为发货，！=1 代发货',
  `return_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '退货原因',
  `return_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '退货状态：1为已处理，！=1 待处理',
  `close_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `end_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `postage` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_info
-- ----------------------------
INSERT INTO `order_info` VALUES ('1683940783000', 10021, '25', NULL, NULL, '0', NULL, NULL, '2023-05-13 01:19:43', '2023-05-13 01:19:43', '14', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `order_info` VALUES ('1683814515000', 10072, '26', NULL, NULL, '0', NULL, NULL, '2023-05-11 14:15:15', '2023-05-11 14:15:15', '410', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `order_info` VALUES ('1682977295000', 10021, '25', NULL, NULL, '0', NULL, NULL, '2023-5-2 05:41:35', '2023-5-2 05:41:35', '6324', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `order_info` VALUES ('1682976530000', 10021, '25', NULL, NULL, '0', NULL, NULL, '2023-5-2 05:28:50', '2023-5-2 05:28:50', '63', NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`  (
  `order_item_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '订单商品ID',
  `boss_id` int(8) NULL DEFAULT NULL COMMENT '商品发布者ID',
  `user_id` int(8) NULL DEFAULT NULL COMMENT '下单用户ID',
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '订单ID',
  `goods_id` int(12) NULL DEFAULT NULL COMMENT '商品ID',
  `order_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '订单状态：-2已取消 -1退货中、0待发货、1待收货、2已完成',
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品名称',
  `goods_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '商品图片',
  `quantity` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '下单商品数量',
  `total_price_item` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '金额',
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '最后更新',
  `send_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '发货状态：1已发货，！=1 未发货',
  `send_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '\'自提\'，\'快递\'',
  `send_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '发货时间',
  `return_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '退货状态：1为已处理，！=1 待处理',
  `return_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '退货原因',
  `boss_evaluation` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '卖家评价',
  `user_evaluation` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '买家评论',
  `close_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '取消理由/拒绝退货理由',
  `close_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '完成时间',
  `waybill_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '运单号',
  `current_unit_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`order_item_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 70 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO `order_item` VALUES (69, 1070, 10021, '1683940783000', 100090, '-1', '雨伞	', 'http://localhost:3000/public/upload/1682974199716.jpg', '1', '14', '2023-05-13 01:19:43', '2023-05-13 01:21:26', '1', '快递', '2023-05-13 01:20:22', '1', '不想要了', '很好！', '很好的卖家！', NULL, '2023-05-13 01:21:16', 'sf12482109381', NULL);
INSERT INTO `order_item` VALUES (66, 1070, 10021, '1682977295000', 100083, '1', 'YSL 持妆粉底液	', 'http://localhost:3000/public/upload/1682973807213.jpg', '1', '300', '2023-5-2 05:41:35', '2023-5-2 05:46:03', '1', '自提', '2023-5-2 05:46:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `order_item` VALUES (67, 1070, 10072, '1683814515000', 100083, '0', 'YSL 持妆粉底液	', 'http://localhost:3000/public/upload/1682973807213.jpg', '1', '300', '2023-05-11 14:15:15', '2023-05-11 14:15:15', NULL, '自提', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `order_item` VALUES (68, 1035, 10072, '1683814515000', 100063, '0', '罗技MK235无线键鼠套装 家用办公', 'http://localhost:3000/public/upload/1682972400365.jpg', '1', '110', '2023-05-11 14:15:15', '2023-05-11 14:15:15', NULL, '快递', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `order_item` VALUES (65, 1070, 10021, '1682977295000', 100088, '-2', '富士X-T2相机	', 'http://localhost:3000/public/upload/1682974106477.jpg', '1', '5999', '2023-5-2 05:41:35', '2023-5-2 05:52:46', '1', '快递', '2023-5-2 05:42:34', '1', '有磕碰，不是很想要', NULL, NULL, '没库存了！', '2023-5-2 05:52:46', 'SF13007460553', NULL);
INSERT INTO `order_item` VALUES (64, 1070, 10021, '1682977295000', 100099, '-2', '可拆洗懒人拖鞋', 'http://localhost:3000/public/upload/1682974694659.jpg', '1', '25', '2023-5-2 05:41:35', '2023-5-2 05:47:23', NULL, '自提', NULL, NULL, NULL, NULL, NULL, '不要了', '2023-5-2 05:47:23', NULL, NULL);
INSERT INTO `order_item` VALUES (62, 1029, 10021, '1682976530000', 100077, '-2', '高领毛衣 S 码	', 'http://localhost:3000/public/upload/1682973337526.jpg', '1', '49', '2023-5-2 05:28:50', '2023-5-2 05:34:27', NULL, '自提', NULL, NULL, NULL, NULL, NULL, '不想要了', '2023-5-2 05:34:27', NULL, NULL);
INSERT INTO `order_item` VALUES (63, 1070, 10021, '1682976530000', 100090, '2', '雨伞	', 'http://localhost:3000/public/upload/1682974199716.jpg', '1', '14', '2023-5-2 05:28:50', '2023-5-2 07:34:34', '1', '自提', '2023-5-2 05:38:40', '1', '不要了', NULL, '很爽快的卖家，愉快的交易！', NULL, '2023-5-2 07:34:34', NULL, NULL);

-- ----------------------------
-- Table structure for pay_info
-- ----------------------------
DROP TABLE IF EXISTS `pay_info`;
CREATE TABLE `pay_info`  (
  `pay_info_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NULL DEFAULT NULL,
  `order_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `pay_platform` int(255) NULL DEFAULT NULL,
  `platform_number` int(255) NULL DEFAULT NULL,
  `platform_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`pay_info_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pay_info
-- ----------------------------
INSERT INTO `pay_info` VALUES (1, 1024, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (2, 1034, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (3, 1070, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (4, 1026, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (5, 1031, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (6, 1034, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (7, 1031, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (8, 1071, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (9, 1035, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (10, 1034, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (11, 1027, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (12, 1024, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (13, 1033, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (14, 1027, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (15, 1069, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (16, 1034, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (17, 1025, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (18, 1026, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (19, 1069, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (20, 1069, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (21, 1024, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (22, 1071, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (23, 1031, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (24, 1033, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (25, 1033, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (26, 1029, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (27, 1023, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (28, 10021, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (29, 1031, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (30, 1023, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (31, 1029, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (32, 1070, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (33, 1028, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (34, 1027, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (35, 1031, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (36, 1033, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (37, 1070, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (38, 1071, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (39, 1070, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (40, 1029, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (41, 1033, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (42, 1033, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (43, 10021, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (44, 1022, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (45, 1030, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (46, 1070, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (47, 1025, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (48, 1070, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `pay_info` VALUES (49, 1069, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_collections
-- ----------------------------
DROP TABLE IF EXISTS `user_collections`;
CREATE TABLE `user_collections`  (
  `coll_id` int(255) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL,
  `goods_id` int(255) NOT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`coll_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_collections
-- ----------------------------
INSERT INTO `user_collections` VALUES (27, 10021, 100090, '2023-05-13 09:19:09');
INSERT INTO `user_collections` VALUES (26, 10021, 100066, '2023-05-02 05:07:30');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'uid',
  `userphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '登录手机号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '邮箱',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '用户名',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '最后更新',
  `headImg` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '头像url',
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '用户状态 0正常 -1封禁',
  `banInfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '封禁理由',
  `userDesc` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '个人简介',
  `last_login_time` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10073 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1032, '2117112765', 'e10adc3949ba59abbe56e057f20f883e', 'huyunxi70@gmail.com', '胡云熙', '2003-12-14 16:41:30', '2020-10-15 11:07:29', 'http://localhost:3000/public/upload/userHeadImgxzbiD2b2uF.jpg', '0', NULL, NULL, '2023-05-02 04:17:19');
INSERT INTO `users` VALUES (1031, '75584699782', 'e10adc3949ba59abbe56e057f20f883e', 'ziyijiang10@icloud.com', '江子异', '2013-05-17 05:54:10', '2008-01-15 16:21:19', 'http://localhost:3000/public/upload/userHeadImgFWO2iOfi5L.jpg', '0', NULL, NULL, '2023-05-02 04:27:26');
INSERT INTO `users` VALUES (1030, '76027454529', 'e10adc3949ba59abbe56e057f20f883e', 'jiehong5@icloud.com', '秦杰宏', '2010-09-19 11:55:35', '2002-12-22 15:59:47', 'http://localhost:3000/public/upload/userHeadImgBPg5oM5sDt.jpg', '0', NULL, NULL, '2017-05-28 22:14:32');
INSERT INTO `users` VALUES (1029, '284099598', 'e10adc3949ba59abbe56e057f20f883e', 'yiszekwan10@yahoo.com', '葉詩君', '2001-07-16 16:50:13', '2000-10-25 00:04:39', 'http://localhost:3000/public/upload/userHeadImgW526lRunsC.jpg', '0', NULL, NULL, '2000-01-18 22:38:30');
INSERT INTO `users` VALUES (1028, '17505663689', 'e10adc3949ba59abbe56e057f20f883e', 'kamank5@yahoo.com', '官家文', '2010-03-12 23:50:45', '2004-08-21 07:30:20', 'http://localhost:3000/public/upload/userHeadImgLmxLwgulvH.jpg', '0', NULL, NULL, '2018-02-11 12:05:21');
INSERT INTO `users` VALUES (1027, '15308165173', 'e10adc3949ba59abbe56e057f20f883e', 'xrui@gmail.com', '许睿', '2023-04-23 01:43:13', '2020-02-19 23:18:40', 'http://localhost:3000/public/upload/userHeadImgNT7Hr32AuP.jpg', '0', NULL, NULL, '2011-07-30 20:46:54');
INSERT INTO `users` VALUES (1026, '15433616700', 'e10adc3949ba59abbe56e057f20f883e', 'tinwingm8@hotmail.com', '梅天榮', '2012-01-16 17:57:35', '2004-10-03 00:31:03', 'http://localhost:3000/public/upload/userHeadImgUlhbeBmMJ5.jpg', '0', NULL, NULL, '2013-11-25 15:02:52');
INSERT INTO `users` VALUES (1025, '7603680483', 'e10adc3949ba59abbe56e057f20f883e', 'cheung1@mail.com', '張秀文', '2023-03-16 02:54:31', '2003-04-28 23:05:38', 'http://localhost:3000/public/upload/userHeadImg8cetvwQQEN.jpg', '0', NULL, NULL, '2007-11-21 02:19:15');
INSERT INTO `users` VALUES (1024, '19402891265', 'e10adc3949ba59abbe56e057f20f883e', 'hoyinchic@icloud.com', '戚浩然', '2011-10-14 16:35:38', '2011-01-19 05:42:31', 'http://localhost:3000/public/upload/userHeadImgSXn7uRWQRt.jpg', '0', NULL, NULL, '2007-06-22 19:21:41');
INSERT INTO `users` VALUES (1023, '14120632086', 'e10adc3949ba59abbe56e057f20f883e', 'xiong1@gmail.com', '熊杰宏', '2017-04-20 22:13:27', '2022-01-02 23:41:45', 'http://localhost:3000/public/upload/userHeadImgjZeJruyD5E.jpg', '0', NULL, NULL, '2007-02-19 02:18:27');
INSERT INTO `users` VALUES (1022, '15034647580', 'e10adc3949ba59abbe56e057f20f883e', 'lusu@gmail.com', '苏璐', '2010-02-06 19:48:19', '2009-04-10 07:17:43', 'http://localhost:3000/public/upload/userHeadImgg72CZYHY5V.jpg', '0', NULL, NULL, '2014-08-03 08:22:39');
INSERT INTO `users` VALUES (10020, '18575844505', 'e10adc3949ba59abbe56e057f20f883e', '', '基努李维斯', '2023-05-01 23:06:42', NULL, 'http://localhost:3000/public/upload/1682956627855.jpg', '0', '', '仲恺人不骗仲恺人！诚信交易，互惠仲恺人，有意可直接私聊\nwx：18575844505', '2023-05-13 00:47:13');
INSERT INTO `users` VALUES (10021, '18575844517', 'e10adc3949ba59abbe56e057f20f883e', '', '青豆', '2010-02-01 00:00:00', NULL, 'http://localhost:3000/public/upload/1683938561547.jpg', '0', NULL, '计算机专业，需要教材的滴滴！\n+V 18575844517', '2023-05-13 00:42:20');
INSERT INTO `users` VALUES (1033, '15406140952', 'e10adc3949ba59abbe56e057f20f883e', 'jlu@outlook.com', '卢嘉伦', '2018-06-27 22:56:23', '2008-01-01 12:03:17', 'http://localhost:3000/public/upload/userHeadImgNzycL1kZns.jpg', '0', NULL, NULL, '2020-04-13 06:29:42');
INSERT INTO `users` VALUES (1034, '76964776849', 'e10adc3949ba59abbe56e057f20f883e', 'lulu8@outlook.com', '卢璐', '2009-04-20 03:13:25', '2020-07-15 19:47:31', 'http://localhost:3000/public/upload/userHeadImgpZrCCqaUR1.jpg', '0', NULL, NULL, '2023-05-11 08:07:52');
INSERT INTO `users` VALUES (1035, '217563626', 'e10adc3949ba59abbe56e057f20f883e', 'zozh6@gmail.com', '邹致远', '2000-12-13 15:49:01', '2005-04-09 07:32:29', 'http://localhost:3000/public/upload/userHeadImgcXNN7sAOOY.jpg', '0', NULL, NULL, '2014-09-25 10:48:47');
INSERT INTO `users` VALUES (10072, '18575844545', 'e10adc3949ba59abbe56e057f20f883e', NULL, 'User482648733', '2023-05-11 13:48:16', NULL, NULL, '0', NULL, NULL, '2023-05-11 13:48:28');
INSERT INTO `users` VALUES (1067, '19607200858', 'e10adc3949ba59abbe56e057f20f883e', 'koochiuwai@mail.com', '谷朝偉', '2017-05-07 20:39:26', '2007-03-09 13:16:38', 'http://localhost:3000/public/upload/userHeadImg337UDWcpw3.jpg', '0', NULL, NULL, '2006-07-24 07:37:56');
INSERT INTO `users` VALUES (1068, '16515506776', 'e10adc3949ba59abbe56e057f20f883e', 'waimanwu@hotmail.com', '胡慧敏', '2014-02-10 15:57:08', '2000-10-11 05:55:32', 'http://localhost:3000/public/upload/userHeadImgEy6wWQYHW1.jpg', '0', NULL, NULL, '2016-11-01 04:55:07');
INSERT INTO `users` VALUES (1069, '15621386832', 'e10adc3949ba59abbe56e057f20f883e', 'yuningxu@icloud.com', '徐宇宁', '2014-05-18 17:27:44', '2018-08-11 21:28:56', 'http://localhost:3000/public/upload/userHeadImgYUuQeeDNuX.jpg', '0', NULL, NULL, '2007-08-07 08:14:56');
INSERT INTO `users` VALUES (1070, '2008827660', 'e10adc3949ba59abbe56e057f20f883e', 'yizhennan@yahoo.com', '尹震南', '2003-07-29 08:41:56', '2003-09-28 10:38:08', 'http://localhost:3000/public/upload/1683938956727.jpg', '0', NULL, '', '2023-05-13 00:47:37');
INSERT INTO `users` VALUES (1071, '7552979637', 'e10adc3949ba59abbe56e057f20f883e', 'lxia46@gmail.com', '林晓明', '2010-10-18 10:44:07', '2013-04-20 10:25:36', 'http://localhost:3000/public/upload/userHeadImg4LdvTSy0lE.jpg', '0', NULL, NULL, '2016-05-27 08:21:46');

SET FOREIGN_KEY_CHECKS = 1;
