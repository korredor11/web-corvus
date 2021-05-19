import axios from 'axios'
import { history } from './history'
import { message } from 'antd'

const getAuthToken = () => localStorage.getItem('authToken')
// const getAuthToken = () => '123'
const clearAuthToken = () => localStorage.removeItem('authToken')

const defaults = {
    baseURL: 'http://127.0.0.1:3000',
    headers: () => ({
        'Content-Type': 'application/json',
        'Authorization': getAuthToken() ? `Bearer ${getAuthToken()}` : undefined,
    }),
}

const _api = (method, url, param) => new Promise((resolve, reject) => {
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
            console.log(err)
            // NULL error SHOULD NOT HAPPEND
            if (!err) {
                message.error('Un erro ocurrio en el cliente. Por favor contacte el administrador!')
                window.history.push('/login')
            }
            // Network Connection error
            else if (err.message && err.message === 'Network Error') {
                message.error('Ocurrio un problema al concetar con la internet. Por favor verifique su conexión.')
            }
            // RESPONSE ERROR WITHOUT SPECIFICATIONS
            else if (!err.response) {
                message.error('No fue possible interpretar el error. Por favor contacte el adminsitrador!')
            }
            // INVALID ATHENTICATION
            else if (err.response.status && err.response.status === 401) {
                message.error('Por favor realize el login.')
                clearAuthToken()
                history.push('/login')
            }
            // FORBIDEN AUTHENTICATION
            else if (err.response.status && err.response.status === 403) {
                message.error('Permisso a la pantalla bloqueado!')
                window.history.back()
            }
            // Normal error handling!
            else {
                reject(err.response.data)
            }
        })
})

const _handleError = (err) => {
    if (err && err.message) {
        message.error(err.message)
    } else {
        message.error('Un error inesperado há ocurrido. Por favor intente nuevamente')
        window.history.back()
    }
}

export const api = {
    req: (...args) => _api(...args),
    get: (...args) => _api('get', ...args),
    post: (...args) => _api('post', ...args),
    put: (...args) => _api('put', ...args),
    delete: (...args) => _api('delete', ...args),
    handleError: (...args) => _handleError(...args),
}