var express = require('express')
var router = express.Router()
const catedb = require('../dao/catedb')


router.post("/deleteCate", (req, res, next) => {
  const cateId = req.body.cateId

  catedb.deleteCate(cateId, (info) => {
    res.json(info)
  }, (errInfo) => {
    res.json(errInfo)
  })
})


module.exports = router
