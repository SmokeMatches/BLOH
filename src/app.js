const express = require('express')
const path = require('path')
const app = express()
const router = require('./node/nodeRouter/index.js')
    //引入body-parser中间件
const bodyParser = require('body-parser')
    //配置body-parser中间件
app.use(bodyParser.urlencoded({ extened: false }))
app.use(bodyParser.json())

app.use(express.static('publicStatic'))

app.use(router)

app.listen(4000, () => {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:4000 来访问');
})