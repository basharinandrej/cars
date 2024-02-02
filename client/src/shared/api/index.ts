import axios from 'axios'

export const instanceAxios = axios.create({
    baseURL: process.env.CLIENT_APP_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});