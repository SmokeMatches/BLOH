//相当于封装路由
var fs = require('fs')
const axios = require('axios')
const url = require('url')

const user = require('../nodeFunc/user')
const article = require('../nodeFunc/article')
var dbPath = './publicStatic/user.json'
var express = require('express')
    //1创建一个路有容器
var router = express.Router()
    //2把路由都挂载到router路由容器中
var conYzm = ''
    //获取所有用户接口
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
    //获取用户头像接口
router.post('/avator', (req, res) => {
        user.getAavtor(req.body.userName, (data, err) => {
            if (err) {
                res.status(500).send('服务器出错了')
            } else
                res.send(data)
        })
    })
    //获取文章接口
router.get('/article', (req, res) => {
        article.getArticle((data, err) => {
            if (err) {
                console.log(2);
                res.send('报错了')
            } else {
                const dat = JSON.parse(data)
                article.SetPage(req.query, dat, Page => {
                    res.send(Page)
                })
            }
        })
    })
    //删除文章
router.delete('/delArticle/:id', (req, res) => {
        const id = req.params.id
        article.getArticle((data, err) => {
            if (err) {
                res.status(5000).send('查询文章失败')
            } else {
                const art = JSON.parse(data)
                article.delArticle(id, art, data => {
                    res.send(data)
                })
            }
        })
    })
    // 添加文章
router.post('/addArticle', (req, res) => {
        article.addArticle(req.query, req.body, (data) => {
            res.send(data)
        })
    })
    // 获取需要修改的文章
router.get('/getarticleId/:id', (req, res) => {
        article.getArticleId(req.params.id, (data) => {
            res.send(data)
        })
    })
    // 提交文章修改
router.patch('/updateArticle/:id', (req, res) => {
    article.EditorArticle(req.params.id, req.body, data => {
        res.send(data)
    })
})
module.exports = router