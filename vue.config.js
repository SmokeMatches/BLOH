const path = require('path'); //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
            .set('network', resolve('src/network'))
            .set('plugins', resolve('src/plugins'))
            .set('api', resolve('src/api'))
            .set('styles', resolve('src/styles'))
            .set('utils', resolve('src/utils'))
            .set('public', resolve('src/public'))
            //set第一个参数：设置的别名，第二个参数：设置的路径
            　　　　
    },
    configureWebpack: {
        devServer: {
            proxy: {
                //名字可以自定义，用于指定哪些请求需要被 target 对应的主机代理
                // 当前 devServer 的地址是 localhost:8080 , 需要代理的地址是 localhost:3000
                '/api': {
                    target: 'http://127.0.0.1:4000', //设置你调用的接口域名和端口号 别忘了加http
                    changeOrigin: true, //这里设置是否跨域
                    pathRewrite: { // 路径重写
                        '^/api': ''
                    }
                }
            }
        }
    }

}