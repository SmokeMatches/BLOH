import { req1 } from 'utils/index.js'

//用户登录接口封装函数
export const req1_log = (config) => {
    return req1({
        url: '/login',
        type: 'get',
        params: config
    })
}

//获取图片验证码
export const req1_yzm = () => {
        return req1({
            url: '/yzm',
            type: 'get',
        })
    }
    //注册接口函数
export const req1_reg = (data) => {
        return req1({
            url: '/register',
            method: 'POST',
            data
        })
    }
    //获取所有用户接口函数
export const req1_all = () => {
        return req1({
            url: '/',
        })
    }
    //获取用户头像接口函数
export const req1_avator = (data) => {
    return req1({
        url: '/avator',
        method: 'post',
        data
    })
}

// 获取当前登录用户的信息
export const geCurrentUser = (id) => {
        return req1({
            url: '/getcurrentuser',
            params: id
        })
    }
    // 修改当前用户信息
export const UpUserINfo = (config => {
        return req1({
            url: '/updateuserinfo',
            method: 'patch',
            data: config
        })
    })
    // 修改密码
export const UpdatePwd = (config) => {
        return req1({
            url: '/updatepassword',
            method: 'patch',
            data: config
        })
    }
    // 获取所有用户除自己
export const GEtUsr = (config) => {
        return req1({
            url: "/alluser",
            method: 'get',
            params: config
        })
    }
    // 添加关注/取关
export const addFocus = (config) => {
        return req1({
            url: '/addfocus',
            method: 'patch',
            data: config
        })
    }
    // 拉黑/取黑
export const laHei = (config) => {
        return req1({
            url: '/lahei',
            method: 'patch',
            data: config
        })
    }
    // 关注页面取关、拉黑页面关注
export const addBlur = (config) => {
        return req1({
            url: "/addblur",
            method: 'patch',
            data: config
        })
    }
    // 关注页面拉黑、拉黑页面取消拉黑
export const OnlyIngnore = (config) => {
        return req1({
            url: "/onlyignore",
            method: 'patch',
            data: config
        })
    }
    // 获取用户权限
export const GetUs = config => {
        return req1({
            url: "/getuserAdmin",
            params: config
        })
    }
    // 设置用户是否为管理员
export const changeAdm = config => {
    return req1({
        url: "/changeadmin",
        method: 'patch',
        data: config
    })
}