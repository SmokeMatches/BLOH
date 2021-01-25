import { req2 } from 'utils/index'
// 获取文章
export const getArticle = (page) => {
        return req2({
            url: '/article',
            params: page
        })
    }
    // 删除文章
export const delArticle = (id) => {
    return req2({
        url: `/delArticle/${id}`,
        method: 'delete'
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

// 获取需要修改的文章
export const getArticleId = (id) => {
    return req2({
        url: `/getarticleId/${id}`,
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

// 获取评论
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