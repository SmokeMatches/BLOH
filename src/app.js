const express = require('express')
const path = require('path')
const app = express()
    //引入body-parser中间件
const bodyParser = require('body-parser')
    // 设置允许所有域名跨域
app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})

// 引入路由文件
const router = require('./node/nodeRouter/index.js')

//配置body-parser中间件
app.use(bodyParser.urlencoded({ extened: false }))
app.use(bodyParser.json())

// 配置静态文件夹
app.use(express.static('publicStatic'))

app.use(router)

app.listen(4000, () => {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:4000 来访问');
})