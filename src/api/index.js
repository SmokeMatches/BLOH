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