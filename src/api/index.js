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

export const req1_reg = (data) => {
    return req1({
        url: '/register',
        method: 'POST',
        data
    })
}