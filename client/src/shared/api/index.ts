import axios from 'axios'

export const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000',
})
