import { req2 } from 'utils/index'

// 获取图片素材

export const getimage = (IsCol) => {
    return req2({
        url: "/getimage",
        params: IsCol
    })
}

export const uploadImg = () => {
    return req2({
        url: "uploadImg",
        method: 'post'
    })
}