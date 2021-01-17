const fs = require('fs')

const dbPath = './publicStatic/user.json'
    // 保存用户到本地文件
const save = function(User, callback) {
        fs.readFile(dbPath, 'utf8', function(err, data) {
            if (err) {
                return callback(err)
            } else {
                var users = JSON.parse(data).user
                    //把验证码拿出来再存数据
                var sUser = {}
                sUser.userName = User.userName
                sUser.passWord = User.passWord
                sUser.touxiang = '/img/user.png'
                    //设置默认其他数据
                sUser.gender = 0
                sUser.age = 0
                sUser.Isadministrator = 0
                    //保存对象数据到数组中
                users.push(sUser)
                var fileData = JSON.stringify({
                        user: users
                    })
                    //保存字符串到文件中
                fs.writeFile(dbPath, fileData, function(err) {
                    if (err) {
                        return callback(err)
                    }
                    return callback(null)
                })
            }

        })
    }
    // 获取用户列表
exports.UserAll = (callback) => {
        fs.readFile(dbPath, 'utf8', function(err, data) {
            if (err) {
                return callback(err)
            } else {
                return callback(data)
            }
        })
    }
    // 登录验证方法
exports.login = (name, conYzm, alluser, callback) => {
        var userlist = {
            user: [],
            pwd: []
        }
        for (let item of alluser) {
            userlist.user.push(item.userName)
            userlist.pwd.push(item.passWord)
        }
        var i = userlist.user.indexOf(name.admin)
        if (i != -1) {
            if (userlist.pwd[i] == name.mima) {
                if (conYzm == name.yzm) {
                    callback({
                        logCode: 1,
                        message: '登录成功'
                    });
                } else {
                    callback({
                        logCode: 0,
                        message: '验证码错误'
                    });
                }
            } else {
                callback({
                    logCode: 0,
                    message: '账号或者密码错误'
                });
            }
        } else {
            callback({
                logCode: 0,
                message: '账号不存在'
            });
        }
    }
    // 生成验证码
exports.Genyzm = () => {
        const a = Math.floor(Math.random() * 10).toString()
        const b = Math.floor(Math.random() * 10).toString()
        const c = Math.floor(Math.random() * 10).toString()
        const d = Math.floor(Math.random() * 10).toString()
        return { a, b, c, d }
    }
    // 注册方法
exports.register = (config0, config1, config2, callback) => {
    const uPattern = /^[a-zA-Z0-9]{3,16}$/
        // const pPattern = /^[a-zA-Z0-9]{4,16}$/
    var userlist = {
        user: [],
        pwd: []
    }
    for (let item of config1) {
        userlist.user.push(item.userName)
        userlist.pwd.push(item.passWord)
    }
    var i = userlist.user.indexOf(config2.userName)
    if (i != -1) {
        callback({
            IsCode: 0,
            message: '该账号已经注册'
        })
    } else {
        if (uPattern.test(config2.userName) && uPattern.test(config2.passWord)) {
            if (config2.yzm == config0) {
                save(config2, (suc, err) => {
                    if (err) {
                        callback({
                            IsCode: 0,
                            message: '服务器错误'
                        })
                    } else {
                        callback({
                            IsCode: 1,
                            message: '注册成功'
                        })
                    }
                })
            } else {
                callback({
                    IsCode: 0,
                    message: "验证码错误"
                })
            }
        } else {
            callback({
                IsCode: 0,
                message: '注册失败，请检查输入格式'
            })
        }
    }

}
exports.getAavtor = (config, callback) => {
    this.UserAll((data, err) => {
        if (err) {
            return err
        } else {
            const UserList = JSON.parse(data)
            for (let item of UserList.user) {
                if (config == item.userName) {
                    callback(item.touxiang)
                }
            }
        }
    })
}