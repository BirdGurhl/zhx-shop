const { json } = require("express");
var express = require("express");
var router = express.Router();
let fs = require('fs')
let path = require("path");
const multer = require('multer');
let localhost = 'localhost'

// 设置存储文件的路径和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../", "public/upload"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.').pop());
  }
})
// 创建multer对象
const upload = multer({ storage: storage })
// 创建multer对象
// const upload = multer({ dest: path.resolve(__dirname, "../", "public/upload") })
router.post("/", upload.any(), (req, res, next) => {
  console.log("upload");
  console.log(req);

  res.json({
    status: 200,
    msg: "上传成功",
    imgInfo: {
      name: req.files[0].filename,
      url: "http://"+ localhost +":3000" + "/public/upload/" + req.files[0].filename,
      uid: req.files[0].filename,
      status: 'success',
    },
  });
});

router.post('/delete', (req, res) => {
  console.log(req.body.filename);
  const filename = req.body.filename; // 从请求中获取要删除的文件名
  let filepath = path.resolve(__dirname, "../", "public/upload", filename)
  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File ${filename} does not exist`);
      res.status(200).json({ message: '文件不存在', status: 200 }); // 返回删除结果
      return;
    } else {
      fs.unlinkSync(filepath); // 删除文件
      res.status(200).json({ message: '删除成功', status: 200 }); // 返回删除结果
    }
  });

});

module.exports = router;
