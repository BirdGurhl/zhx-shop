const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "db",
};
let connection = null;
module.exports = {
  getConn() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("连接成功");
      }
    });

    return connection;
  },

  closeConn(connect) {
    if (connect) {
      connect.end((err) => {
        if (err) {
          console.log("数据库关闭失败");
          console.log(err);
        } else {
          console.log("数据库关闭成功");
        }
      });
    } else {
      connection.end((err) => {
        if (err) {
          console.log("数据库关闭失败");
          console.log(err);
        } else {
          console.log("数据库关闭成功");
        }
      });
    }

  },
};
