import { useState } from 'react'
import axios from 'axios'

const useGet = (url) => {
    const [data, setData] = useState()
    const [status, setStatus] = useState('')

    const fetch = async () => {
        try {
          const response = await axios.get(url);
          setData(response.data);
          setStatus('200');
        } catch (error) {
            setStatus(error)
        }
    }

    fetch()

    return { data, status }
}



export default { useGet }