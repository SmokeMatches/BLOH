const fs = require('fs')
const { config } = require('process')

var dbPath = './publicStatic/image.json'

exports.getimage = (config, callback) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (data) {
            const list = JSON.parse(data).images
            var reglist = { images: [] }
            if (config.collect) {
                for (let i = 0; i < list.length; i++) {
                    const reg = list[i].collect.find(item => {
                        return config.collect == item
                    })
                    if (reg) {
                        reglist.images.push(list[i])
                    }
                }
                callback(reglist)
            } else {
                callback(data)
            }

        } else {
            callback(err)
        }
    })
}
exports.publishImg = (config, callback) => {
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
                imglist.push(config)
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