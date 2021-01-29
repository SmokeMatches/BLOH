const fs = require('fs')
const uuid = require('node-uuid')
const dbPath = './publicStatic/article.json'
const UsrPath = './publicStatic/user.json'
    // 获取所有文章
exports.getArticle = (callback) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(data)
            }
        })
    }
    // 获取分页文章
exports.SetPage = (config1, config2, callback) => {
        var pagelist = {}
        const len = config2.article //赋值
            // pagelist.len = len.length //总长度
        if (config1.status) {
            if (config1.channel) {
                if (config1.page) {
                    var pageSort = []
                    for (let i = 0; i < len.length; i++) {
                        if (config1.status == len[i].status && config1.channel == len[i].Channel) {
                            pageSort.push(len[i])
                        }
                    }
                    pagelist.len = pageSort.length //分类后的总长度

                    if (pageSort.length >= 10 * config1.page) {
                        let page0 = pageSort.slice((config1.page - 1) * 10, config1.page * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else if (pageSort.length < config1.page * 10 && pageSort.length > (config1.page - 1) * 10) {
                        let page0 = pageSort.slice((config1.page - 1) * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else {
                        callback(pagelist)
                    }
                } else {
                    var pageSort1 = []
                    for (let i = 0; i < len.length; i++) {
                        if (config1.status == len[i] && config1.channel == len[i].Channel) {
                            pageSort1.push(len[i])
                        }
                    }
                    pagelist.len = pageSort1.length //分类后的总长度
                    if (pageSort1.length > 10) {
                        let page = pageSort1.slice(0, 10)
                        pagelist.page = page
                        callback(pagelist)
                    } else {
                        pagelist.page = pageSort1
                        callback(pagelist)
                    }
                }
            } else {
                if (config1.page) {
                    var pageSort = []
                    for (let i = 0; i < len.length; i++) {
                        if (config1.status == len[i].status) {
                            pageSort.push(len[i])
                        }
                    }
                    pagelist.len = pageSort.length //分类后的总长度

                    if (pageSort.length >= 10 * config1.page) {
                        let page0 = pageSort.slice((config1.page - 1) * 10, config1.page * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else if (pageSort.length < config1.page * 10 && pageSort.length > (config1.page - 1) * 10) {
                        let page0 = pageSort.slice((config1.page - 1) * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else {
                        callback(pagelist)
                    }
                } else {
                    var pageSort1 = []
                    for (let i = 0; i < len.length; i++) {
                        if (config1.status == len[i]) {
                            pageSort1.push(len[i])
                        }
                    }
                    pagelist.len = pageSort1.length //分类后的总长度
                    if (pageSort1.length > 10) {
                        let page = pageSort1.slice(0, 10)
                        pagelist.page = page
                        callback(pagelist)
                    } else {
                        pagelist.page = pageSort1
                        callback(pagelist)
                    }
                }
            }
        } else {
            if (config1.channel) {
                if (config1.page) {
                    var pageSort = []
                    for (let i = 0; i < len.length; i++) {
                        if (config1.channel == len[i].Channel) {
                            pageSort.push(len[i])
                        }
                    }
                    pagelist.len = pageSort.length //分类后的总长度
                    if (pageSort.length >= 10 * config1.page) {
                        let page0 = pageSort.slice((config1.page - 1) * 10, config1.page * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else if (pageSort.length < config1.page * 10 && pageSort.length > (config1.page - 1) * 10) {
                        let page0 = pageSort.slice((config1.page - 1) * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else {
                        callback(pagelist)
                    }
                } else {
                    var pageSort1 = []
                    for (let i = 0; i < len.length; i++) {
                        if (config1.channel == len[i].Channel) {
                            pageSort1.push(len[i])
                        }
                    }
                    pagelist.len = pageSort1.length //分类后的总长度
                    if (pageSort1.length > 10) {
                        let page = pageSort1.slice(0, 10)
                        pagelist.page = page
                        callback(pagelist)
                    } else {
                        pagelist.page = pageSort1
                        callback(pagelist)
                    }
                }
            } else {
                pagelist.len = len.length //不分类的总长度
                if (config1.page) {
                    if (len.length >= 10 * config1.page) {
                        let page0 = len.slice((config1.page - 1) * 10, config1.page * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    } else if (len.length < config1.page * 10 && len.length > (config1.page - 1) * 10) {
                        let page0 = len.slice((config1.page - 1) * 10)
                        pagelist.page = page0
                        callback(pagelist)
                    }
                } else {
                    if (len.length >= 10) {
                        let page = len.slice(0, 10)
                        pagelist.page = page
                        callback(pagelist)
                    } else {
                        pagelist.page = len
                        callback(pagelist)
                    }
                }
            }
        }
    }
    // 删除文章
exports.delArticle = (id, art, callback) => {
        for (let i = 0; i < art.article.length; i++) {
            if (id == art.article[i].articleId)
                art.article.splice(i, 1)
        }
        var articlelit = {}
        articlelit.article = art.article
        fs.writeFile(dbPath, JSON.stringify(articlelit), function(err) {
            if (err) {
                callback({
                    code: 0,
                    message: '删除失败'
                })
            }
            callback({
                code: 1,
                message: '删除成功'
            })
        })
    }
    // 添加文章
exports.addArticle = (qy, body, callback) => {
        var articleList = {
            article: {}
        }
        var AllArticle = {}

        //生成时间
        var date = new Date()
        var Months = date.getMonth() + 1
        var Dates = date.getDate()
        var Hours = date.getHours()
        var Minutes = date.getMinutes()
        var Seconds = date.getSeconds()
        var now = date.getFullYear() + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds;
        // 生成随机id
        const thisId = uuid.v1()

        // 获取当前登录用户
        const userName = body.userName

        // 存入对象便于存入文件中
        articleList.article.cover = body.cover ? body.cover : []
        articleList.article.title = body.title
        articleList.article.content = body.content
        articleList.article.Channel = body.channel
        articleList.article.articleId = thisId
        articleList.article.date = now
        articleList.article.user = userName
        articleList.article.comment = []
        articleList.article.IsCom = false
        articleList.article.fanscomment = []

        // 判断是存为草稿还是发布
        if (qy.draft == 'true') {
            articleList.article.status = 0
        } else {
            articleList.article.status = 1
        }
        // 调用获取所有文章的函数
        this.getArticle((data, err) => {
            if (data) {
                var dat = JSON.parse(data).article
                var hh = dat.find(item => {
                    return thisId === item.articleId
                })
                if (hh) {
                    callback({
                        code: 0,
                        message: '添加失败，请重试'
                    })
                } else {
                    dat.unshift(articleList.article)
                    AllArticle.article = dat
                    fs.writeFile(dbPath, JSON.stringify(AllArticle), function(err) {
                        if (err) {
                            callback({
                                code: 0,
                                message: '添加失败'
                            })
                        }
                        callback({
                            code: 1,
                            message: '添加成功'
                        })
                    })
                }
            } else {
                callback(err)
            }
        })




    }
    // 获取评论
exports.GETCom = (config, callback) => {
        const size = 10
        var list = {}
        this.getArticle((data, err) => {
            if (err) {
                callback(err)
            } else {
                var Data = JSON.parse(data).article
                const article = Data.find(item => {
                    return config.articleId == item.articleId
                })
                if (article == -1) {
                    callback(err)
                } else {
                    var len = article.comment.length
                    list.total = len
                    if (len >= config.page * size) {
                        list.comment = article.comment.slice((config.page - 1) * size, config.page * size)
                        callback(list)
                    } else if (config.page * size > len && (config.page - 1) * size < len) {
                        list.comment = article.comment.slice((config.page - 1) * size)
                        callback(list)
                    } else {
                        list.comment = article.comment.slice(0, 9)
                        callback(list)
                    }
                }
            }
        })
    }
    // 发布评论
exports.PUBLIC = (config, callback) => {
        this.getArticle((data, err) => {
            if (err) {
                callback(err)
            } else {
                var Data = JSON.parse(data).article
                    // 定义存储所有文章的对象
                var UUU = {}
                    // 声明存储评论的对象
                var comUser = {}
                    // 获取当前文章信息
                const index = Data.findIndex(item1 => {
                    return config.articleId == item1.articleId
                })
                if (index == -1) {
                    callback(err)
                } else {
                    // 读取评论用户信息，准备存储
                    fs.readFile(UsrPath, 'utf8', (error, res) => {
                        if (error) {
                            callback(error)
                        } else {
                            const USE = JSON.parse(res).user
                            let admin = USE.find(item => {
                                return config.identify == item.id
                            })
                            if (admin == -1) {
                                callback(error)
                            } else {
                                //生成时间
                                var date = new Date()
                                var Months = date.getMonth() + 1
                                var Dates = date.getDate()
                                var Hours = date.getHours()
                                var Minutes = date.getMinutes()
                                var Seconds = date.getSeconds()
                                var now = date.getFullYear() + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds;
                                comUser.name = admin.userName,
                                    comUser.touxiang = admin.touxiang
                                comUser.time = now
                                comUser.content = config.content
                                    // 判断是否是粉丝
                                const admin1 = USE.find(item2 => {
                                    return Data[index].user == item2.userName
                                })
                                if (admin1 == -1) {
                                    callback(error)
                                } else {
                                    const id = admin.myFocus.findIndex(itme3 => {
                                        return admin1.id == itme3
                                    })
                                    if (id == -1) {
                                        Data[index].comment.unshift(comUser)
                                        UUU.article = Data
                                        fs.writeFile(dbPath, JSON.stringify(UUU), err1 => {
                                            if (err1) {
                                                callback(err1)
                                            } else {
                                                callback({
                                                    code: 1,
                                                    message: '添加评论成功'
                                                })
                                            }
                                        })
                                    } else {
                                        Data[index].fanscomment.unshift(comUser)
                                        Data[index].comment.unshift(comUser)
                                        UUU.article = Data
                                        fs.writeFile(dbPath, JSON.stringify(UUU), err1 => {
                                            if (err1) {
                                                callback(err1)
                                            } else {
                                                callback({
                                                    code: 1,
                                                    message: '添加评论成功'
                                                })
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    })
                }

            }
        })
    }
    // 获取指定文章,便于修改
exports.getArticleId = (id, callback) => {
        this.getArticle((data, err) => {
            if (err) {
                callback(err)
            } else {
                const AllArticle = JSON.parse(data).article
                const thisArticle = AllArticle.find(item => {
                    return id == item.articleId
                })
                if (thisArticle) {
                    callback(thisArticle)
                } else {
                    callback('用户不存在,请刷新重试')
                }
            }
        })
    }
    // 修改文章、提交
exports.EditorArticle = (id, config, callback) => {
        this.getArticle((data, err) => {
            if (data) {
                var reArticleList = {}
                var Dat = JSON.parse(data).article
                for (let i = 0; i < Dat.length; i++) {
                    if (id == Dat[i].articleId) {
                        Dat[i] = config
                    }
                }
                reArticleList.article = Dat
                fs.writeFile(dbPath, JSON.stringify(reArticleList), function(err) {
                    if (err) {
                        callback({
                            code: 0,
                            message: '修改失败'
                        })
                    }
                    callback({
                        code: 1,
                        message: '修改成功'
                    })
                })
            } else {
                callback(err)
            }
        })
    }
    // 评论页面获取文章
exports.GetArticlMes = (id, callback) => {
        const size = 10
        this.getArticle((data, err) => {
            if (err) {
                callback(err)
            } else {
                const dt = JSON.parse(data).article
                const len = dt.length
                var TableF = {
                    total: len
                }
                if (len < id * size && len > (id - 1) * size) {
                    TableF.renderD = dt.slice(size * (id - 1))
                    callback(TableF)
                } else if (len > id * size) {
                    TableF.renderD = dt.slice((id - 1) * size, id * size)
                    callback(TableF)
                } else {
                    TableF.renderD = dt
                    callback(TableF)
                }
            }
        })
    }
    // 修改文章评论权限
exports.updateCompermissions = (config, callback) => {
    this.getArticle((data, err) => {
        if (err) {
            callback(err)
        } else {
            const dt = JSON.parse(data).article
            var Articl = {

            }
            const DDD = dt.findIndex(item => {
                return config.id == item.articleId
            })
            if (DDD != -1) {
                if (config.quan) {
                    dt[DDD].IsCom = true
                    Articl.article = dt
                    fs.writeFile(dbPath, JSON.stringify(Articl), err => {
                        if (err) {
                            callback({
                                code: 0,
                                message: '修改权限失败，服务器错误'
                            })
                        } else {
                            callback({
                                code: 1,
                                message: '修改权限成功'
                            })
                        }
                    })
                } else {
                    dt[DDD].IsCom = false
                    Articl.article = dt
                    fs.writeFile(dbPath, JSON.stringify(Articl), err => {
                        if (err) {
                            callback({
                                code: 0,
                                message: '修改权限失败，服务器错误'
                            })
                        } else {
                            callback({
                                code: 1,
                                message: '修改权限成功'
                            })
                        }
                    })
                }
            } else {
                callback({
                    code: 0,
                    message: '服务器内部错误'
                })
            }
        }
    })
}