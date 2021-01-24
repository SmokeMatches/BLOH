import { req2 } from 'utils/index'

// 获取图片素材

export const getimage = (IsCol) => {
        return req2({
            url: "/getimage",
            params: IsCol
        })
    }
    // 发布图片素材
export const uploadImg = () => {
        return req2({
            url: "uploadImg",
            method: 'post'
        })
    }
    // 添加收藏
export const AddcollectImg = (config) => {
    return req2({
        url: '/addcollectimg',
        method: 'patch',
        data: config
    })
}
export const DelImg = (config => {
    return req2({
        url: "/delimage",
        method: 'delete',
        data: config
    })
})