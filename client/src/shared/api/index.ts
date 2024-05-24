import axios from 'axios'
import {APP_SERVER_URL} from '../constans' // такой импорт запрещён

export const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: APP_SERVER_URL,
})
