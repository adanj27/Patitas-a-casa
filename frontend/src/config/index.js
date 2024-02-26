import axios from 'axios'

axios.defaults.baseURL = process.env.API || "http://localhost:4000/api"
