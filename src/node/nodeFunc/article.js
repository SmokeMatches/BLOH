const fs = require('fs')
const uuid = require('node-uuid')
const dbPath = './publicStatic/article.json'
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
        articleList.article.cover = body.cover.message ? body.cover.message : []
        articleList.article.title = body.title
        articleList.article.content = body.content
        articleList.article.Channel = body.channel
        articleList.article.articleId = thisId
        articleList.article.date = now
        articleList.article.user = userName

        // 判断是存为草稿还是发布
        if (qy.draft == 'true') {
            articleList.article.status = 0
        } else {
            articleList.article.status = 2
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
                    Dat[i].title = config.title
                    Dat[i].content = config.content
                    Dat[i].Channel = config.Channel
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