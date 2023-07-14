import { useState } from "react";
import axios from 'axios'

//api/url
const usePost = (url, data) => {
    const [ status, setStatus ] = useState();

    const post = async () => {
        try {
            await axios.post(url, data)
            setStatus(200)
        } catch (error) {
            setStatus(403)
        }
    }

    post()

    return status;
}

export default usePost;