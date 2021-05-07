import axios from 'axios'
import { history } from './history'

const getAuthToken = () => localStorage.getItem('authToken')
const storeAuthToken = (token) => localStorage.setItem('authToken', token)
const clearAuthToken = () => localStorage.removeItem('authToken')

const defaults = {
    baseURL: 'http://localhost:8080',
    headers: () => ({
        'Content-Type': 'application/json',
        'Authorization': getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
    }),
}

export const api = (method, url, param) => new Promise((resolve, reject) => {
    axios({
        url: `${defaults.baseURL}${url}`,
        method: method,
        headers: defaults.headers(),
        params: method === 'get' ? param : undefined,
        data: method !== 'get' ? param : undefined,
        paramsSerializer: () => 'TODO',
    })
        .then(response => resolve(response.data))
        .catch(err => {
            if (err.response.status === 404) {
                clearAuthToken()
                history.push('/login')
            } else {
                console.log(err.response.status)
                reject(err.response.data)
            }
        })
})

export default {
    get: (...args) => api('get', ...args),
    post: (...args) => api('post', ...args),
    put: (...args) => api('put', ...args),
    delete: (...args) => api('delete', ...args),
}