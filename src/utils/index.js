import axios from 'axios'

//请求图片。暂未用到
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.xnlf.com/',
        timeout: 5000
    })
    instance.interceptors.response.use((res) => {
        res = 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        return res
    })
    return instance(config)
}

//配置用户接口
export function req1(config) {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 3000
    })
    return instance(config)
}

//配置文章接口
export const req2 = axios.create({
    baseURL: '/api',
    timeout: 3000
})