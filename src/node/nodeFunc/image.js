const fs = require('fs')
const uuid = require('node-uuid')

var dbPath = './publicStatic/image.json'

exports.getimage = (config, callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (data) {
            const pageData = JSON.parse(data).images

            var reglist = { images: [], total: 0 }
            const pageSize = 12 // 每一页大小
            const num = pageSize * config.page //查询的最多页数

            if (config.collect) {
                var Plist = []
                for (let i = 0; i < pageData.length; i++) {
                    const reg = pageData[i].collect.find(item => {
                        return config.collect == item
                    })
                    if (reg) {
                        Plist.push(pageData[i])
                    }
                }
                const len = Plist.length
                reglist.total = len
                if (num <= len) {
                    reglist.images = Plist.slice(num - pageSize, num) //返回的数据
                    callback(reglist)
                } else if (num >= len && num - pageSize < len) {
                    reglist.images = Plist.slice(num - pageSize)
                    callback(reglist)
                } else {
                    reglist.images = Plist.slice(0, pageSize)
                    callback(reglist)
                }
            } else {
                reglist.total = pageData.length
                if (num <= pageData.length) {
                    reglist.images = pageData.slice(num - pageSize, num) //返回的数据
                    callback(reglist)
                } else if (num >= pageData.length && num - pageSize < pageData.length) {
                    reglist.images = pageData.slice(num - pageSize)
                    callback(reglist)
                } else {
                    reglist.images = pageData.slice(0, pageSize)
                    callback(reglist)
                }
            }

        } else {
            callback(err)
        }
    })
}
exports.publishImg = (config, callback) => {
    // 生成随机id
    const thisId = uuid.v1()
    var ImageList = {}
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            callback({
                code: 0,
                message: '服务器出错啦'
            })
        } else {
            const imglist = JSON.parse(data).images
            const iSexist = imglist.find(item => {
                return config.src == item.src
            })
            if (iSexist) {
                callback({
                    code: 0,
                    message: '不能重复发布素材'
                })
            } else {
                config.id = thisId
                imglist.unshift(config)
                ImageList.images = imglist
                fs.writeFile(dbPath, JSON.stringify(ImageList), error => {
                    if (error) {
                        callback({
                            code: 0,
                            message: '发布素材失败'
                        })
                    } else {
                        callback({
                            code: 1,
                            message: "发布素材成功"
                        })
                    }
                })
            }

        }
    })
}
exports.collectImg = (config, callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            callback(err)
        } else {
            const AllImage = JSON.parse(data).images
            var AllList = {
                    images: []
                }
                // 找到当前点击项的索引
            const FindId = AllImage.findIndex(item => {
                return config.ImgId == item.id
            })
            if (config.isCollect) {
                // 找到属于当前账号收藏的索引
                const index = AllImage[FindId].collect.findIndex(item0 => {
                    return config.identify == item0
                })
                if (index != -1) {
                    AllImage[FindId].collect.splice(index, 1)
                    AllList.images = AllImage
                    fs.writeFile(dbPath, JSON.stringify(AllList), err => {
                        if (err) {
                            callback({
                                code: 0,
                                message: '删除收藏失败'
                            })
                        } else {
                            callback({
                                code: 1,
                                message: '删除收藏成功'
                            })
                        }
                    })
                } else {
                    callback({
                        code: 0,
                        message: '删除收藏失败'
                    })
                }
            } else {
                AllImage[FindId].collect.push(config.identify)
                AllList.images = AllImage
                fs.writeFile(dbPath, JSON.stringify(AllList), err => {
                    if (err) {
                        callback({
                            code: 0,
                            message: '添加收藏失败'
                        })
                    } else {
                        callback({
                            code: 1,
                            message: '添加收藏成功'
                        })
                    }
                })
            }
        }
    })

}
exports.delImg = (config, callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            callback({
                code: 0,
                message: 'ERROR .....'
            })
        } else {
            var AllList = JSON.parse(data).images
            var RAllList = {

            }
            if (config.Sel == '1') {
                const Who = AllList.findIndex(item => {
                    return config.id == item.id
                })
                if (Who != -1) {
                    const index = AllList[Who].collect.findIndex(item0 => {
                        return config.identify == item0
                    })
                    if (index != -1) {
                        AllList[Who].collect.splice(index, 1)
                        RAllList.images = AllList
                        fs.writeFile(dbPath, JSON.stringify(RAllList), (err) => {
                            if (err) {
                                callback({
                                    code: 0,
                                    message: "删除收藏失败啦"
                                })
                            } else {
                                callback({
                                    code: 1,
                                    message: "删除收藏成功"
                                })
                            }
                        })
                    } else {
                        callback({
                            code: 0,
                            message: "删除收藏失败了"
                        })
                    }
                } else {
                    callback({
                        code: 0,
                        message: "删除收藏失败"
                    });
                }
            } else {
                const index = AllList.findIndex(item => {
                    return config.id == item.id
                })
                if (index != -1) {
                    AllList.splice(index, 1)
                    RAllList.images = AllList
                    fs.writeFile(dbPath, JSON.stringify(RAllList), (err) => {
                        if (err) {
                            callback({
                                code: 0,
                                message: "服务器错误，删除素材失败"
                            })
                        } else {
                            callback({
                                code: 1,
                                message: "删除素材成功"
                            })
                        }
                    })
                } else {
                    callback({
                        code: 0,
                        message: '删除素材失败啦'
                    })
                }
            }
        }
    })

}