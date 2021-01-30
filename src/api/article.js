import { req2 } from 'utils/index'
// 获取文章
export const getArticle = (page) => {
        return req2({
            url: '/article',
            params: page
        })
    }
    // 删除文章
export const delArticle = (config) => {
    return req2({
        url: `/delArticle`,
        method: 'delete',
        params: config
    })
}

// 添加文章
export const addArticle = (data, draft) => {
        return req2({
            url: '/addArticle',
            method: 'post',
            params: {
                draft
            },
            data
        })
    }
    // 由草稿发布文章
export const PublishArt = (config) => {
        return req2({
            url: '/publisharticle',
            method: 'post',
            params: config
        })
    }
    // 获取需要修改的文章
export const getArticleId = (id) => {
        return req2({
            url: `/getarticleId/${id}`,
        })
    }
    // 获取状态管理页文章
export const GEtArtStatus = (config) => {
        return req2({
            url: '/getarticlestatus',
            params: config
        })
    }
    // 审核通过和驳回草稿
export const ChangeSF = (config) => {
    return req2({
        url: '/changestatusSF',
        method: 'put',
        data: config
    })
}
export const RejectCaogao = (config) => {
        return req2({
            url: '/rejectCaogao',
            method: 'put',
            data: config
        })
    }
    // 编辑文章
export const updateArticle = (id, data) => {
    return req2({
        url: `/updateArticle/${id}`,
        method: 'patch',
        data
    })
}

// 获取评论页
export const getComment = (Page = 1) => {
    return req2({
        url: "/commentarticle",
        params: {
            Page
        }
    })
}

// 修改评论权限
export const UpPersimision = (data) => {
    return req2({
        url: "/updatearticlequanxian",
        method: 'patch',
        data
    })
}

// 获取当前文章的评论
export const getComm = (config) => {
    return req2({
        url: '/getcomment',
        params: config
    })
}

// 添加评论
export const PublishComm = (config) => {
    return req2({
        url: '/publishcomment',
        method: 'put',
        data: config
    })
}