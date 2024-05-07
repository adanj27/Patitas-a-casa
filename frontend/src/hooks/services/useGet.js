import { useEffect, useState } from 'react'
// import axios from 'axios'
import axios from "../../config"
// axios.defaults.baseURL = "https://patitas-deploy.onrender.com/api"

const useGet = (url) => {
    const [data, setData] = useState()
    const [status, setStatus] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try {
              const response = await axios.get(`/v1/${url}`);
              setData(response.data);
              setStatus('200');
            } catch (error) {
                setStatus(error.message || 'Error fetching data');
            }
        }
    
        fetch()
    }, [])

    return { data, status }
}



export default useGet