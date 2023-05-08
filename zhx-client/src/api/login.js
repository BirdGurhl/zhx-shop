import * as api from "@/api/api"

import request from "@/utils/request"

export default {
  _getList() {
    return request({
      url: api.ALL,
    })
  }
}