# zhx-shop

### 项目技术栈
```
 服务器端：node.js + MySQL + express 等
 客户端：Vue2 + Vant2 + Axios 等
 管理端：Vue2 + Element UI + Axios 等
```
### 项目运行环境
```
​ Node.js + MySQL
 SQL脚本文件： zhx-serve/MySQL/db.sql
 数据库配置文件：zhx-server/dao/DBconn.js , 默认配置： 
 const dbConfig = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "db",
};

 后台超级管理员账号：admin 密码：123456
```

## 安装依赖
```
npm install
```

### Compiles and hot-reloads for development
```
 后端：npm start
```
```
 前端：npm run serve
```

### Compiles and minifies for production
```
npm run build
```

