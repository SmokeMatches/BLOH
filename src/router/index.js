import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Login = () =>
    import ('views/Login/login')
const Home = () =>
    import ('views/Home/home')
const Register = () =>
    import ('views/Login/register')

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
        name: 'home',
        component: Home,
        meta: {
            title: '主页'
        },
        // children:[
        //     {
        //         path:'/',
        //         name:'main',
        //         component:Main
        //     }
        // ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router