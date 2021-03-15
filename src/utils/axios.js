import axios from 'axios'

// 创建 axios 实例
export const service = axios.create({
    baseURL: '/api', // api base_url
    timeout: 9000 // 请求超时时间
})




