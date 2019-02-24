import axios from 'axios'
import { Message, Loading } from 'element-ui' 
import router from '@/router/index'
axios.defaults.baseURL = 'http://127.0.0.1:5001'
// 定义loading变量
let loading

// 使用Element Loading.service 方法
function startLoading() {
    loading = Loading.service({
        lock: true,
        background: 'rgba(0,0,0,0.7)'
    })
}

// 使用Element Loading.close 方法
function endLoading() {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
    // 加载
    startLoading()
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(config => {
    endLoading()
    return config
}, error => {
    Message.error(error.response.data)
    const { status } = error.response
    if (status == 401) {
        Message.error('token值无效，请重新登录')
        // 清除token
        localStorage.removeItem('eleToken')

        // 页面跳转
        router.push('/login')
    }
    return Promise.reject(error)
})

export default axios