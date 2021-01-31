import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Login = () =>
    import ('views/Login/login')
const Home = () =>
    import ('views/Home/home')
const Register = () =>
    import ('views/Login/register')
const Content = () =>
    import ('views/Home/compon/main/content')
const Material = () =>
    import ('views/Home/compon/main/material')
const Article = () =>
    import ('views/Home/compon/main/article')
const Comment = () =>
    import ('views/Home/compon/main/comments')
const Fans = () =>
    import ('views/Home/compon/main/fans')
const Profile = () =>
    import ('views/Home/compon/main/profile')
const User = () =>
    import ('views/Home/compon/main/User')
const ArticleDetail = () =>
    import ('views/Home/compon/main/articleDetail')
const myArticle = () =>
    import ('views/Home/compon/main/myarticle')
const articleGuan = () =>
    import ('views/Home/compon/main/articleGuanli')
const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: '主页'
        },
        children: [{
                path: '',
                name: 'content',
                component: Content
            },
            {
                path: 'content',
                name: 'content',
                component: Content
            },
            {
                path: 'materical',
                name: 'materical',
                component: Material
            },
            {
                path: 'article',
                name: 'article',
                component: Article
            },
            {
                path: 'comment',
                name: 'comment',
                component: Comment
            },
            {
                path: 'fans',
                name: 'fans',
                component: Fans
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile
            },
            {
                path: 'user',
                name: 'user',
                component: User
            }, {
                path: 'articledetail',
                name: 'articledetail',
                component: ArticleDetail
            }, {
                path: 'myarticle',
                name: 'myArticle',
                component: myArticle
            }, {
                path: 'articleguanli',
                name: 'articleguanli',
                component: articleGuan
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/register') {
        next()
    } else if (to.path == '/login') {
        next()
    } else {
        if (window.sessionStorage.getItem('user')) {
            next()
        } else {
            next('/login')
        }
    }
})
export default router