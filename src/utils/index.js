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

//配置请求本地服务器
export function req1(config) {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 2000
    })
    return instance(config)
}