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
                sUser.id = users[users.length - 1].id + 1
                sUser.age = 0
                sUser.myFocus = []
                sUser.focusMe = []
                sUser.myIgnore = []
                sUser.Isadministrator = 2
                sUser.interest = []
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
            pwd: [],
            identify: []
        }
        for (let item of alluser) {
            userlist.user.push(item.userName)
            userlist.pwd.push(item.passWord)
            userlist.identify.push(item.id)
        }
        var i = userlist.user.indexOf(name.admin)
        if (i != -1) {
            if (userlist.pwd[i] == name.mima) {
                if (conYzm == name.yzm) {
                    callback({
                        logCode: 1,
                        message: '登录成功',
                        id: userlist.identify[i],
                        admin: alluser[i].Isadministrator
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
    // 获取头像
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
    // 获取当前登录的用户
exports.getCurrentUser = (id, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                const dt = JSON.parse(data).user
                const Inde = dt.find(item => {
                    return parseInt(id) == item.id
                })
                if (Inde != -1) {
                    callback(Inde)
                } else {
                    callback()
                }
            }
        })
    }
    // 修改用户信息
exports.UpdateUserInfo = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var UU = {

                }
                UU.user = JSON.parse(data).user
                const Ind = UU.user.findIndex(item => {
                    return config.id == item.id
                })
                if (Ind != -1) {
                    UU.user[Ind] = config
                    fs.writeFile(dbPath, JSON.stringify(UU), err => {
                        if (err) {
                            callback(err)
                        } else {
                            callback({
                                code: 1,
                                message: '修改成功'
                            })
                        }
                    })
                } else {
                    callback({
                        code: 0,
                        message: '修改失败'
                    })
                }
            }
        })
    }
    // 上传用户头像
exports.UploadAvator = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                const User = JSON.parse(data).user

                var UsrList = {}
                const index = User.findIndex(item => {
                    return config.identify == item.id
                })
                if (index != -1) {
                    User[index].touxiang = config.src
                    UsrList.user = User
                    fs.writeFile(dbPath, JSON.stringify(UsrList), err => {
                        if (err) {
                            callback(err)
                        } else {
                            callback({
                                code: 1,
                                message: '修改头像成功'
                            })
                        }
                    })
                } else {
                    callback(err)
                }
            }
        })
    }
    // 修改密码
exports.UpdatePwd = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                const User = JSON.parse(data).user
                var UserList = {}
                const index = User.findIndex(item => {
                    return config.identify == item.id
                })
                if (index != -1) {
                    if (User[index].passWord == config.initalPwd) {
                        User[index].passWord = config.newPwd
                        UserList.user = User
                        fs.writeFile(dbPath, JSON.stringify(UserList), err => {
                            if (err) {
                                callback(err)
                            } else {
                                callback({
                                    code: 1,
                                    message: "密码修改成功"
                                })
                            }
                        })
                    } else {
                        callback({
                            code: 0,
                            message: '原密码错误'
                        })
                    }
                } else {
                    callback(err)
                }
            }
        })
    }
    // 获取除了自己所有用户
exports.GetUser = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var USA = JSON.parse(data).user
                const index = USA.findIndex(item => {
                    return config.identify == item.id
                })
                var DataUser = { user: [] }
                const Size = 10
                const ID = parseInt(config.Fans)
                if (index != -1) {
                    const myProfile = USA.slice(index, index + 1)
                    USA.splice(index, 1)
                    if (ID == 0) {
                        const len = USA.length
                        for (let key in USA) {
                            let gg = myProfile[0].myFocus.includes(USA[key].id)
                            if (gg) {
                                USA[key].isFocus = gg
                            } else {
                                USA[key].isFocus = false
                            }
                        }
                        for (let key in USA) {
                            let gg = myProfile[0].myIgnore.includes(USA[key].id)
                            if (gg) {
                                USA[key].isIgnore = gg
                            } else {
                                USA[key].isIgnore = false
                            }
                        }
                        DataUser.total = len
                        if (config.page * Size > len && (config.page - 1) * Size <= len) {
                            DataUser.user = USA.slice((config.page - 1) * Size)
                            callback(DataUser)
                        } else if (config.page * Size <= len) {
                            DataUser.user = USA.slice((config.page - 1) * Size, config.page * Size)
                            callback(DataUser)
                        } else {
                            DataUser.user = USA.slice(0, 9)
                            callback(DataUser)
                        }
                    } else if (ID == 1) {
                        for (let key in USA) {
                            const index1 = myProfile[0].myFocus.findIndex(item2 => {
                                return USA[key].id == item2
                            })
                            if (index1 != -1) {
                                DataUser.user.push(USA[key])
                            }

                        }
                        const len = DataUser.user.length
                        DataUser.total = len
                        if (config.page * Size > len && (config.page - 1) * Size <= len) {
                            DataUser.user = DataUser.user.slice((config.page - 1) * Size)
                            callback(DataUser)
                        } else if (config.page * Size <= len) {
                            DataUser.user = DataUser.user.slice((config.page - 1) * Size, config.page * Size)
                            callback(DataUser)
                        } else {
                            DataUser.user = DataUser.user.slice(0, 9)
                        }
                    } else if (ID == 2) {
                        for (let key in USA) {
                            const index1 = myProfile[0].myIgnore.findIndex(item2 => {
                                return USA[key].id == item2
                            })
                            if (index1 != -1) {
                                DataUser.user.push(USA[key])
                            }

                        }
                        const len = DataUser.user.length
                        DataUser.total = len
                        if (config.page * Size > len && (config.page - 1) * Size <= len) {
                            DataUser.user = DataUser.user.slice((config.page - 1) * Size)
                            callback(DataUser)
                        } else if (config.page * Size <= len) {
                            DataUser.user = DataUser.user.slice((config.page - 1) * Size, config.page * Size)
                            callback(DataUser)
                        } else {
                            DataUser.user = DataUser.user.slice(0, 9)
                        }
                    } else {
                        for (let key in USA) {
                            const index9 = USA[key].myFocus.findIndex(item8 => {
                                return config.identify == item8
                            })
                            if (index9 != -1) {
                                DataUser.user.push(USA[key])
                            }
                        }
                        for (let key in DataUser.user) {
                            let gg = myProfile[0].myFocus.includes(DataUser.user[key].id)
                            if (gg) {
                                DataUser.user[key].isFocus = gg
                            } else {
                                DataUser.user[key].isFocus = false
                            }
                        }
                        for (let key in DataUser.user) {
                            let gg = myProfile[0].myIgnore.includes(DataUser.user[key].id)
                            if (gg) {
                                DataUser.user[key].isIgnore = gg
                            } else {
                                DataUser.user[key].isIgnore = false
                            }
                        }
                        const len = DataUser.user.length
                        DataUser.total = len
                        if (config.page * Size > len && (config.page - 1) * Size <= len) {
                            DataUser.user = DataUser.user.slice((config.page - 1) * Size)
                            callback(DataUser)
                        } else if (config.page * Size <= len) {
                            DataUser.user = DataUser.user.slice((config.page - 1) * Size, config.page * Size)
                            callback(DataUser)
                        } else {
                            DataUser.user = DataUser.user.slice(0, 9)
                        }
                    }
                } else {
                    callback(err)
                }
            }
        })
    }
    // 添加关注/取关
exports.addFocus = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var USA = JSON.parse(data).user
                const index = USA.findIndex(item => {
                    return config.identify == item.id
                })
                var DataUser = {}
                if (index != -1) {
                    const Ind = USA[index].myIgnore.findIndex(item0 => {
                        return config.identify1 == item0
                    })
                    if (Ind != -1) {
                        USA[index].myIgnore.splice(Ind, 1)
                        const sort = USA[index].myFocus.findIndex(item1 => {
                            return config.identify1 == item1
                        })
                        if (sort == -1) {
                            USA[index].myFocus.push(parseInt(config.identify1))
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 1,
                                        message: '关注该用户成功'
                                    })
                                }
                            })
                        } else {
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 0,
                                        message: '已经关注过该用户'
                                    })
                                }
                            })

                        }
                    } else {
                        const sort = USA[index].myFocus.findIndex(item1 => {
                            return config.identify1 == item1
                        })
                        if (sort == -1) {
                            USA[index].myFocus.push(parseInt(config.identify1))
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 1,
                                        message: '关注该用户成功'
                                    })
                                }
                            })
                        } else {
                            callback({
                                code: 0,
                                message: '已经关注过该用户'
                            })
                        }
                    }
                } else {
                    callback(err)
                }
            }
        })
    }
    // 拉黑/拉白
exports.laHei = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var USA = JSON.parse(data).user
                const index = USA.findIndex(item => {
                    return config.identify == item.id
                })
                var DataUser = {}
                if (index != -1) {
                    const Ind = USA[index].myFocus.findIndex(item0 => {
                        return config.identify1 == item0
                    })
                    if (Ind != -1) {
                        USA[index].myFocus.splice(Ind, 1)
                        const sort = USA[index].myIgnore.findIndex(item1 => {
                            return config.identify1 = item1
                        })
                        if (sort == -1) {
                            USA[index].myIgnore.push(parseInt(config.identify1))
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 1,
                                        message: '已将该用户拉黑'
                                    })
                                }
                            })
                        } else {
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 0,
                                        message: '当前用户已在你的黑名单中'
                                    })
                                }
                            })

                        }
                    } else {
                        const sort = USA[index].myIgnore.findIndex(item1 => {
                            return config.identify1 = item1
                        })
                        if (sort == -1) {
                            USA[index].myIgnore.push(parseInt(config.identify1))
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 1,
                                        message: '已将该用户拉黑'
                                    })
                                }
                            })
                        } else {
                            callback({
                                code: 0,
                                message: '当前用户已在你的黑名单中'
                            })
                        }
                    }
                } else {
                    callback(err)
                }
            }
        })
    }
    // 只取关
exports.OnlyBlur = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var USA = JSON.parse(data).user
                const index = USA.findIndex(item => {
                    return config.identify == item.id
                })
                var DataUser = {}
                if (index != -1) {
                    const myProfile = USA.slice(index, index + 1)
                    const IND = myProfile[0].myFocus.findIndex(item1 => {
                        return config.identify1 == item1
                    })
                    if (IND == -1) {
                        const Ind = USA[index].myIgnore.findIndex(item0 => {
                            return config.identify1 == item0
                        })
                        if (Ind != -1) {
                            USA[index].myIgnore.splice(Ind, 1)
                            USA[index].myFocus.push(parseInt(config.identify1))
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 1,
                                        message: '关注该用户成功'
                                    })
                                }
                            })
                        }
                    } else {
                        USA[index].myFocus.splice(IND, 1)
                        DataUser.user = USA
                        fs.writeFile(dbPath, JSON.stringify(DataUser), err => {
                            if (err) {
                                callback(err)
                            } else {
                                callback({
                                    code: 1,
                                    message: '取关成功'
                                })
                            }
                        })
                    }
                } else {
                    callback({
                        code: 0,
                        message: '取关失败'
                    })
                }
            }
        })
    }
    // 只拉黑
exports.OnlyWhait = (config, callback) => {
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var USA = JSON.parse(data).user
                const index = USA.findIndex(item => {
                    return config.identify == item.id
                })
                var DataUser = {}
                if (index != -1) {
                    const myProfile = USA.slice(index, index + 1)
                    const IND = myProfile[0].myFocus.findIndex(item1 => {
                        return config.identify1 == item1
                    })
                    if (IND == -1) {
                        const Ind = USA[index].myIgnore.findIndex(item0 => {
                            return config.identify1 == item0
                        })
                        if (Ind != -1) {
                            USA[index].myIgnore.splice(Ind, 1)
                            DataUser.user = USA
                            fs.writeFile(dbPath, JSON.stringify(DataUser), error => {
                                if (error) {
                                    callback(error)
                                } else {
                                    callback({
                                        code: 1,
                                        message: '取消拉黑该用户成功'
                                    })
                                }
                            })
                        }
                    } else {
                        USA[index].myFocus.splice(IND, 1)
                        USA[index].myIgnore.push(parseInt(config.identify1))
                        DataUser.user = USA
                        fs.writeFile(dbPath, JSON.stringify(DataUser), err => {
                            if (err) {
                                callback(err)
                            } else {
                                callback({
                                    code: 1,
                                    message: '取消拉黑此用户成功'
                                })
                            }
                        })
                    }
                } else {
                    callback({
                        code: 0,
                        message: '取关失败'
                    })
                }
            }
        })
    }
    // 获取用户是否是列表（所有）
exports.UserTotal = (config, callback) => {
        const size = 10
        this.UserAll((data, err) => {
            if (err) {
                callback(err)
            } else {
                var Data = JSON.parse(data).user
                var UserList = { user: [] }
                if (config.Isadministrator) {
                    for (let i in Data) {
                        if (config.Isadministrator == Data[i].Isadministrator) {
                            UserList.user.push(Data[i])
                        }
                    }
                    var len = UserList.user.length
                    UserList.total = len
                    if (len >= config.page * size) {
                        UserList.user = UserList.user.slice((config.page - 1) * size, config.page * size)
                        callback(UserList)
                    } else if (config.page * size > len && (config.page - 1) * size < len) {
                        UserList.user = UserList.user.slice((config.page - 1) * size)
                        callback(UserList)
                    } else {
                        UserList.user = UserList.user.slice(0, 9)
                        callback(UserList)
                    }
                } else {
                    const len = Data.length
                    UserList.user = Data
                    UserList.total = len
                    if (len >= config.page * size) {
                        UserList.user = UserList.user.slice((config.page - 1) * size, config.page * size)
                        callback(UserList)
                    } else if (config.page * size > len && (config.page - 1) * size < len) {
                        UserList.user = UserList.user.slice((config.page - 1) * size)
                        callback(UserList)
                    } else {
                        UserList.user = UserList.user.slice(0, 9)
                        callback(UserList)
                    }
                }
            }
        })
    }
    // 设置用户是否为管理员
exports.changeAdmin = (config, callback) => {
    this.UserAll((data, err) => {
        if (err) {
            callback(err)
        } else {
            var UserList = {}
            var Data = JSON.parse(data).user
            const index = Data.findIndex(item0 => {
                return config.identify == item0.id
            })
            if (index == -1) {
                callback(err)
            } else {
                if (config.Isadmin == 1) {
                    Data[index].Isadministrator = 2
                    UserList.user = Data
                } else {
                    Data[index].Isadministrator = 1
                    UserList.user = Data
                }
                fs.writeFile(dbPath, JSON.stringify(UserList), error => {
                    if (error) {
                        callback(error)
                    } else {
                        callback({
                            code: 1,
                            message: '设置用户等级成功'
                        })
                    }
                })
            }
        }
    })
}