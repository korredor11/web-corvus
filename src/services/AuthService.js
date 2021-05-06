// fetch('https://jsonplaceholder.typicode.com/todos')
//     .then(response => response.json())
//     .then(result => setCategories(result))

import axios from 'axios'
import { message } from 'antd'

export const authenticate = async (username, password) => {
    return axios.post('http://localhost:8080/login', {
        name: username,
        password: password,
    })
        .then(response => response.data)
        .catch(err => {
            const data = err.response.data
            message.error(data.message)
        })
}
