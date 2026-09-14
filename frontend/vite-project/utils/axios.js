import axios from 'axios';
console.log("API URL:", import.meta.env.VITE_SERVER_URL)
const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
})

export default api