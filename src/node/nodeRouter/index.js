const express = require('express')
const fs = require('fs')
const axios = require('axios')
const url = require('url')
const multer = require('multer')

const user = require('../nodeFunc/user')
const article = require('../nodeFunc/article')
const image = require('../nodeFunc/image')
const { config } = require('process')

const app = express()

// const objMulter = multer({ dest: '../../upload' }); //用户上传文件存入dest目录下
// app.use(objMulter.any());


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
    // 上传头像
router.post('/uploadAvator', multer({
        //设置文件存储路径
        dest: '../public/user' //user文件如果不存在则会自己创建一个。
    }).single('file'), function(req, res, next) {
        console.log(123);
        if (req.file.length === 0) { //判断一下文件是否存在，也可以在前端代码中进行判断。
            // res.render("error", { message: "上传文件不能为空！" });
            // return
            res.send({
                message: "上传文件不能为空"
            })
        } else {
            let file = req.file;
            let fileInfo = {};
            fs.renameSync('../public/user/' + file.filename, '../public/user/' + file.originalname); //这里修改文件名字，比较随意。
            // 获取文件信息
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = file.size;
            fileInfo.path = file.path;
            // 设置响应类型及编码
            res.set({
                'content-type': 'application/json; charset=utf-8'
            });
            let imglist = { identify: parseInt(req.body.identify) }
            imglist.src = `/user/${file.originalname}`
            user.UploadAvator(imglist, data => {
                res.send(data)
            })
        }
    })
    // 修改密码
router.patch('/updatepassword', (req, res) => {
        user.UpdatePwd(req.body, (data => {
            res.send(data)
        }))
    })
    // 获取全站用户（除自己）
router.get('/alluser', (req, res) => {
        user.GetUser(req.query, data => {
            res.send(data)
        })
    })
    // 添加关注/取关
router.patch('/addfocus', (req, res) => {
        user.addFocus(req.body, data => {
            res.send(data)
        })
    })
    // 拉黑用户/取黑
router.patch('/lahei', (req, res) => {
        user.laHei(req.body, data => {
            res.send(data)
        })
    })
    // 关注页面取关、拉黑页面关注
router.patch('/addblur', (req, res) => {
        user.OnlyBlur(req.body, data => {
            res.send(data)
        })
    })
    // 关注页面拉黑、拉黑页面取消拉黑
router.patch('/onlyignore', (req, res) => {
        user.OnlyWhait(req.body, data => {
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
                if (req.query.userName) {
                    article.SetPageMine(req.query.userName, data0 => {
                        article.SetPage(req.query, data0, Page => {
                            res.send(Page)
                        })
                    })
                } else {
                    const dat = JSON.parse(data)
                    article.SetPage(req.query, dat, Page => {
                        res.send(Page)
                    })
                }

            }
        })
    })
    // 状态页面获取文章
router.get('/getarticlestatus', (req, res) => {
        article.getarticleStatus(req.query, data => {
            res.send(data)
        })
    })
    // 审核通过和驳回草稿
router.put('/changestatusSF', (req, res) => {
        article.changeStatus(req.body, data => {
            res.send(data)
        })
    })
    // 审核驳回为失败
router.put('/rejectCaogao', (req, res) => {
        article.RejectCaoGao(req.body, data => {
            res.send(data)
        })
    })
    //删除文章
router.delete('/delArticle', (req, res) => {
        article.getArticle((data, err) => {
            if (err) {
                res.status(5000).send('查询文章失败')
            } else {
                const art = JSON.parse(data)
                article.delArticle(req.query, art, data => {
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
    // 由草稿发布
router.post('/publisharticle', (req, res) => {
        article.CaoGaoToFaBu(req.query.id, data => {
            res.send(data)
        })
    })
    // 添加封面
router.post('/uploadcover', multer({
        //设置文件存储路径
        dest: '../public/cover' //upload文件如果不存在则会自己创建一个。
    }).single('file'), function(req, res, next) {
        if (req.file.length === 0) { //判断一下文件是否存在，也可以在前端代码中进行判断。
            // res.render("error", { message: "上传文件不能为空！" });
            // return
            res.send({
                message: "上传文件不能为空"
            })
        } else {
            let file = req.file;
            let fileInfo = {};
            fs.renameSync('../public/cover/' + file.filename, '../public/cover/' + file.originalname); //这里修改文件名字，比较随意。
            // 获取文件信息
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = file.size;
            fileInfo.path = file.path;
            console.log(file);
            console.log(file.originalname);
            // 设置响应类型及编码
            res.set({
                'content-type': 'application/json; charset=utf-8'
            });
            const src = `/cover/${file.originalname}`
            res.send(src)
        }
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
    // 获取评论
router.get('/getcomment', (req, res) => {
        article.GETCom(req.query, data => {
            res.send(data)
        })
    })
    // 发表评论
router.put('/publishcomment', (req, res) => {
        article.PUBLIC(req.body, data => {
            res.send(data)
        })
    })
    // 获取图片素材
router.get('/getimage', (req, res) => {
        image.getimage(req.query, (data, err) => {
            if (data) {
                res.send(data)
            } else {
                res.send(err)
            }
        })
    })
    // 添加素材
router.post('/uploadImg', multer({
        //设置文件存储路径
        dest: '../public/upload' //upload文件如果不存在则会自己创建一个。
    }).single('file'), function(req, res, next) {
        if (req.file.length === 0) { //判断一下文件是否存在，也可以在前端代码中进行判断。
            // res.render("error", { message: "上传文件不能为空！" });
            // return
            res.send({
                message: "上传文件不能为空"
            })
        } else {
            let file = req.file;
            let fileInfo = {};
            fs.renameSync('../public/upload/' + file.filename, '../public/upload/' + file.originalname); //这里修改文件名字，比较随意。
            // 获取文件信息
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = file.size;
            fileInfo.path = file.path;
            console.log(file);
            console.log(file.originalname);
            // 设置响应类型及编码
            res.set({
                'content-type': 'application/json; charset=utf-8'
            });
            let imglist = {}
            imglist.collect = []
            imglist.src = `/upload/${file.originalname}`
            image.publishImg(imglist, data => {
                res.send(data)
            })
        }
    })
    // 添加收藏或者删除收藏
router.patch('/addcollectimg', (req, res) => {
        image.collectImg(req.body, datt => {
            res.send(datt)
        })
    })
    // 删除素材接口
router.delete('/delimage', (req, res) => {
        image.delImg(req.body, data => {
            res.send(data)
        })
    })
    // 评论文章接口
router.get('/commentarticle', (req, res) => {
        article.GetArticlMes(req.query.Page, data => {
            res.send(data)
        })
    })
    // 修改文章是否评论权限
router.patch('/updatearticlequanxian', (req, res) => {
        article.updateCompermissions(req.body, (data) => {
            res.send(data)
        })
    })
    // 修改用户信息
router.get('/getcurrentuser', (req, res) => {
        user.getCurrentUser(req.query.id, data => {
            res.send(data)
        })
    })
    // 修改用户信息
router.patch('/updateuserinfo', (req, res) => {
        user.UpdateUserInfo(req.body, (data) => {
            res.send(data)
        })
    })
    // 获取用户权限信息
router.get('/getuserAdmin', (req, res) => {
        user.UserTotal(req.query, data => {
            res.send(data)
        })
    })
    // 设置用户是否为管理员
router.patch('/changeadmin', (req, res) => {
    user.changeAdmin(req.body, data => {
        res.send(data)
    })
})
module.exports = router