import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ENV from '../env'

let env = String(process.env.REACT_APP_ENVIRONMENT)
console.info('----------------------------')
console.info('env =>', env)
console.info('----------------------------')
let SERVER_URL = ENV[env].API_BASE_URL
console.info('----------------------------')
console.info('SERVER_URL =>', SERVER_URL)
console.info('----------------------------')
let apiCall = axios.create({
    baseURL: SERVER_URL,
    // headers: {
    //     'X-Custom-Header': 'foobar',
    // },
})

apiCall.interceptors.request.use(
    async function (req) {
        try {
            const token = await AsyncStorage.getItem('token')
            console.info('----------------------------')
            console.info('token =>', token)
            console.info('----------------------------')
            if (token) {
                req.headers = {
                    ...req.headers,
                    Authorization: 'Bearer ' + token,
                    token,
                }
            }
            return req
        } catch (error) {
            console.log('Error retrieving token:', error)
            return req
        }
    },
    (err) => {
        console.log('err', err)
        return Promise.reject(err)
    }
)

apiCall.interceptors.response.use(
    async (resp) => {
        if (resp?.data) {
            return resp.data
        }
        return resp
    },
    (err) => {
        console.log('err', err)
        return Promise.reject(err)
    }
)

export default apiCall
