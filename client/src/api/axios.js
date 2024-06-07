import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Axios_Instance  = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export default Axios_Instance