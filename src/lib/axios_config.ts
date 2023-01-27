import axios from 'axios'

export const axiosConfig = axios.create({
  baseURL: 'http://192.168.1.178:4000',
  timeout: 2000,
})
