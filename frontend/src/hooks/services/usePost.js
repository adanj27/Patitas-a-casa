import { useEffect, useState } from "react";
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';

//api/url
const usePost = (url, data) => {
    const [status, setStatus] = useState();
	const { isAuthenticated } = useAuth(); 
    

    useEffect(() => {
        const post = async () => {
            try {
                if (!isAuthenticated) {
                    console.error('Usuario no autenticado');
                    setStatus(403);
                    return;
                }

                const token = localStorage.getItem('token');
                await axios.post(url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setStatus(200);
            } catch (error) {
                setStatus(403);
            }
        };

        post(); // Llama a la función post dentro del efecto

    }, [url, data, isAuthenticated]);

    return status;
}

export default usePost;