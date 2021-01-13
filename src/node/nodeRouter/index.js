//相当于封装路由
var fs = require('fs')
const axios = require('axios')
const url = require('url')

const user = require('../nodeFunc/user')
var dbPath = './publicStatic/user.json'
var express = require('express')
    // var Student = require('./student')
    //1创建一个路有容器
var router = express.Router()
    //2把路由都挂载到router路由容器中
var conYzm = ''
router.get('/', function(req, res) {
        user.UserAll((data, err) => {
            if (err) {
                res.end('查询失败')
            } else {
                var Sdata = JSON.stringify(data)
                res.end(Sdata)
            }
        })
    })
    //登录路由接口
router.get('/login', function(req, res) {
        user.UserAll((data, err) => {
            if (err) {
                res.status(500).send('Server Error')
            } else {
                const dt = JSON.parse(data).user
                user.login(req.query, conYzm, dt, (dtt, err) => {
                    if (err) {
                        res.status(500).send("server error")
                    } else {
                        res.end(JSON.stringify(dtt))
                    }
                })
            }
        })
    })
    //验证码路由接口
router.get('/yzm', function(req, res) {
        const yzm = JSON.stringify(user.Genyzm())
        conYzm = JSON.parse(yzm).a + JSON.parse(yzm).b + JSON.parse(yzm).c + JSON.parse(yzm).d
        res.end(yzm)
    })
    // 注册路由接口
router.post('/register', (req, res) => {
    user.UserAll((data, err) => {
        if (err) {
            res.status(500).send('Server Error')
        } else {
            var ulist = JSON.parse(data).user
            user.register(conYzm, ulist, req.body, (dat, err) => {
                if (err) {
                    res.status(500).send("Server Error 500")
                } else {
                    res.end(JSON.stringify(dat))
                }
            })
        }
    })
})

module.exports = router